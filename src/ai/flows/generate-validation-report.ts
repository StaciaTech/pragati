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
  ValidationReportSchema
} from '@/ai/schemas';


// Main exported function
export async function generateValidationReport(
  input: GenerateValidationReportInput
): Promise<ValidationReport> {
  return generateValidationReportFlow(input);
}


// The single, comprehensive prompt that generates the entire report
const validationReportPrompt = ai.definePrompt({
  name: 'validationReportPrompt',
  input: { schema: GenerateValidationReportInputSchema },
  output: { schema: ValidationReportSchema },
  prompt: `You are an expert AI-powered business and innovation consultant named 'Pragati AI', specializing in evaluating new ideas, particularly within the Indian context. Your goal is to provide a comprehensive, structured evaluation report for a given innovative idea. You must strictly adhere to the provided JSON output format and generate detailed, insightful content for each section.

**Idea Details:**
Idea Name: {{ideaName}}
Concept: {{ideaConcept}}
Category: {{category}}
Institution: {{institution}}

**Evaluation Framework Definitions (for your reference and scoring):**

**CLUSTER_WEIGHTS:**
${JSON.stringify(CLUSTER_WEIGHTS, null, 2)}

**PARAMETER_WEIGHTS:**
${JSON.stringify(PARAMETER_WEIGHTS, null, 2)}

**SUB_PARAMETER_DEFINITIONS:**
${JSON.stringify(SUB_PARAMETER_DEFINITIONS, null, 2)}

**SCORING_RUBRIC (Scale 1-5, N/A):**
${JSON.stringify(SCORING_RUBRIC, null, 2)}

**VALIDATION_OUTCOMES (for determining final outcome and recommendation):**
${JSON.stringify(VALIDATION_OUTCOMES, null, 2)}

**Instructions for Generating the Report (Strict Adherence Required):**
1.  **Output Format:** The entire response MUST be a single, valid JSON object. Do NOT include any extra text, markdown code blocks (like \`\`\`json), or conversational filler outside the JSON.
2.  **Content Generation:** Generate realistic, insightful, and detailed content for ALL fields in the 'Desired JSON Output Structure' below.
3.  **Scoring:** For the 'detailedEvaluation' section, assign a score from 1 to 5 (integer) or 'N/A' for each sub-parameter. The scores should reflect a critical, expert assessment of the idea based on the provided 'ideaConcept' and the 'SCORING_RUBRIC'.
4.  **Explanation & Assumptions:** For each sub-parameter's score, provide a concise 'explanation' (1-3 sentences) justifying the score. Also, list any 'assumptions' (as a list of strings) you made during your evaluation or specific points that require further validation from the innovator.
5.  **Recommendation Text:** The 'recommendationText' in the Executive Summary and Conclusion should be derived directly from the 'VALIDATION_OUTCOMES' based on the 'overallScore' you calculate/estimate for the idea.
6.  **Process & Competitive Landscape:** Generate a concise, informative overview for these sections, explaining them as if to the innovator.
7.  **Evaluation Framework Explanation:** Clearly explain the scoring rubric, the three levels of weightage (clusters, parameters, sub-parameters), and the weighted average calculation flow, referencing the provided definitions.
8.  **Overall Score Calculation:** Internally, calculate a realistic 'overallScore' (float, 1.0-5.0) for the idea based on your assigned sub-parameter scores and the provided weights. This score will drive the 'validationOutcome' and 'recommendationText'.

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
    console.log("Starting full report generation for idea:", input.ideaName);
    
    const { output } = await validationReportPrompt(input);

    if (!output) {
      throw new Error("AI evaluation failed to return the expected data structure.");
    }

    // The AI now calculates the score and generates all text.
    // We can add a secondary verification of the score here if needed,
    // but for now, we trust the AI's calculated output.
    console.log(`Report generated. Overall Score: ${output.overallScore}, Outcome: ${output.validationOutcome}`);

    return output;
  }
);