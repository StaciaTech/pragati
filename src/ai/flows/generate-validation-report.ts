'use server';

/**
 * @fileOverview AI flow that generates a comprehensive validation report for a submitted idea.
 * This flow makes a single, large call to the AI, asking it to generate the entire report
 * in a structured JSON format based on a detailed framework.
 *
 * - generateValidationReport - A function that generates the validation report.
 */

import {ai} from '@/ai/genkit';
import {
  CLUSTER_WEIGHTS,
  PARAMETER_WEIGHTS,
  SUB_PARAMETER_DEFINITIONS,
  SCORING_RUBRIC,
  VALIDATION_OUTCOMES,
} from '@/lib/mock-data';
import {
  GenerateValidationReportInput,
  GenerateValidationReportInputSchema,
  ValidationReport,
  ValidationReportSchema,
  DetailedEvaluationClustersSchema,
} from '@/ai/schemas';
import { z } from 'zod';


// Main exported function
export async function generateValidationReport(
  input: GenerateValidationReportInput
): Promise<ValidationReport> {
  return generateValidationReportFlow(input);
}


// The prompt now focuses ONLY on generating the detailed evaluation scores.
const detailedEvaluationPrompt = ai.definePrompt({
  name: 'detailedEvaluationPrompt',
  input: { schema: GenerateValidationReportInputSchema },
  output: { schema: DetailedEvaluationClustersSchema },
  prompt: `You are an expert AI-powered business and innovation consultant. Your goal is to provide a comprehensive, structured evaluation for a given innovative idea.

**Idea Details:**
Idea Name: {{ideaName}}
Concept: {{ideaConcept}}
Category: {{category}}
Institution: {{institution}}

**Instructions:**
1.  **Output Format:** Your response MUST be a single, valid JSON object that conforms to the DetailedEvaluationClustersSchema.
2.  **Scoring:** For each sub-parameter, assign a score from 1 to 5 (integer) or 'N/A'.
3.  **Justification:** For each score, provide a concise 'explanation' (1-3 sentences) and list any 'assumptions' you made as an array of strings.
`,
});


// Main Genkit Flow
const generateValidationReportFlow = ai.defineFlow(
  {
    name: 'generateValidationReportFlow',
    inputSchema: GenerateValidationReportInputSchema,
    outputSchema: ValidationReportSchema,
  },
  async (input) => {
    console.log("Starting detailed evaluation generation for idea:", input.ideaName);
    
    // Step 1: Get the detailed evaluation from the AI
    const { output: detailedEvaluationClusters } = await detailedEvaluationPrompt(input);

    if (!detailedEvaluationClusters) {
      throw new Error("AI evaluation failed to return the detailed evaluation data.");
    }
    
    // Step 2: Calculate the overall score in code, not in the prompt
    let totalWeightedScore = 0;
    let totalWeightUsed = 0;

    for (const clusterName in SUB_PARAMETER_DEFINITIONS) {
        if (!CLUSTER_WEIGHTS[clusterName]) continue;

        for (const paramName in SUB_PARAMETER_DEFINITIONS[clusterName].parameters) {
            if (!PARAMETER_WEIGHTS[clusterName] || !PARAMETER_WEIGHTS[clusterName][paramName]) continue;
            
            for (const subParamName in SUB_PARAMETER_DEFINITIONS[clusterName].parameters[paramName].subParameters) {
                const subParamDef = SUB_PARAMETER_DEFINITIONS[clusterName].parameters[paramName].subParameters[subParamName];
                const scoreData = detailedEvaluationClusters[clusterName]?.[paramName]?.[subParamName];

                if (scoreData && typeof scoreData.assignedScore === 'number') {
                    const weight = (subParamDef.weight || 0) * (PARAMETER_WEIGHTS[clusterName][paramName] || 0) * (CLUSTER_WEIGHTS[clusterName] || 0);
                    totalWeightedScore += scoreData.assignedScore * weight;
                    totalWeightUsed += weight;
                }
            }
        }
    }

    const overallScore = totalWeightUsed > 0 ? totalWeightedScore / totalWeightUsed : 0;
    
    // Step 3: Determine outcome based on the calculated score
    const validationOutcome = 
        overallScore >= 4.0 ? "Approved" : 
        overallScore >= 2.5 ? "Moderate" : 
        "Rejected";
        
    const recommendationText = 
        validationOutcome === "Approved" ? "Idea has strong potential. Focus on execution and scaling." :
        validationOutcome === "Moderate" ? "Idea has potential but requires modification. Review the detailed report." :
        "Idea is not viable at this stage. Consider a fundamental re-evaluation.";


    // Step 4: Construct the full report object
    const report: ValidationReport = {
        ideaName: input.ideaName,
        ideaConcept: input.ideaConcept,
        overallScore: overallScore,
        validationOutcome: validationOutcome,
        recommendationText: recommendationText,
        submissionDate: new Date().toISOString().split('T')[0],
        pptUrl: '', // Optional, can be added later
        sections: {
            executiveSummary: {
                ideaName: input.ideaName,
                concept: input.ideaConcept,
                overallScore: overallScore,
                validationOutcome: validationOutcome,
                recommendation: recommendationText,
                reportGeneratedOn: new Date().toISOString().split('T')[0],
            },
            pragatiAIServiceProcess: {
                title: "Pragati AI Service Process",
                description: "This report was generated using Pragati AI's automated validation engine.",
                sections: [{ heading: "AI Evaluation", content: "The AI analyzed the idea based on a predefined framework." }],
            },
            competitiveLandscape: {
                title: "Competitive Landscape",
                description: "A brief overview of the competitive environment.",
                sections: [{ heading: "Key Competitors", content: "To be filled based on market research." }],
            },
            projectEvaluationFramework: {
                title: "Project Evaluation Framework",
                description: "The framework used for this evaluation.",
                sections: [{ heading: "Scoring Model", content: "A weighted scoring model across multiple clusters was used." }],
            },
            detailedEvaluation: {
                title: "Detailed Viability Assessment",
                description: "A granular breakdown of scores for each sub-parameter.",
                clusters: detailedEvaluationClusters,
            },
            conclusion: {
                title: "Conclusion",
                content: `Based on the evaluation, the idea '${input.ideaName}' shows ${validationOutcome.toLowerCase()} potential. The overall score is ${overallScore.toFixed(2)}/5.0.`,
            },
            recommendations: {
                title: "Recommendations",
                description: "Next steps based on the validation outcome.",
                items: [recommendationText],
            },
            appendix: {
                title: "Appendix",
                items: ["Glossary of terms can be added here."],
            },
        },
    };

    console.log(`Report generated. Overall Score: ${report.overallScore}, Outcome: ${report.validationOutcome}`);
    return report;
  }
);
