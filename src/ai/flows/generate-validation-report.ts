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

**Instructions for Generating the Report (Strict Adherence Required):**
1.  **Output Format:** The entire response MUST be a single, valid JSON object that conforms to the ValidationReportSchema. Do NOT include any extra text, markdown, or filler.
2.  **Scoring:** For the 'detailedEvaluation' section, assign a score from 1 to 5 (integer) or 'N/A' for each sub-parameter. The scores should reflect a critical, expert assessment of the idea based on the provided 'ideaConcept' and the scoring rubric.
3.  **Explanation & Assumptions:** For each sub-parameter's score, provide a concise 'explanation' (1-3 sentences) justifying the score. Also, list any 'assumptions' (as an array of strings) you made.
4.  **Calculations & Recommendations:** Internally calculate a realistic 'overallScore' (float, 1.0-5.0) based on your assigned scores and the provided weightings. The 'validationOutcome' and 'recommendationText' should be determined by this score.
5.  **Generate All Sections:** Populate all sections of the report (executiveSummary, pragatiAIServiceProcess, etc.) with realistic, insightful, and detailed content as if you were a top-tier consultant.
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
