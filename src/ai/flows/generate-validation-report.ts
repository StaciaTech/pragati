'use server';

/**
 * @fileOverview AI flow that generates a validation report for a submitted idea.
 *
 * - generateValidationReport - A function that generates the validation report.
 * - GenerateValidationReportInput - The input type for the generateValidationReport function.
 * - GenerateValidationReportOutput - The return type for the generateValidationReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateValidationReportInputSchema = z.object({
  ideaDescription: z
    .string()
    .describe('A detailed description of the submitted idea.'),
  innovationScore: z.number().describe('The innovation score of the idea.'),
  impactScore: z.number().describe('The potential impact score of the idea.'),
  feasibilityScore: z.number().describe('The feasibility score of the idea.'),
  sustainabilityScore: z
    .number()
    .describe('The sustainability score of the idea.'),
  validationAssumptions: z
    .string()
    .describe('The assumptions made during the validation process.'),
});
export type GenerateValidationReportInput = z.infer<
  typeof GenerateValidationReportInputSchema
>;

const GenerateValidationReportOutputSchema = z.object({
  reportHtml: z
    .string()
    .describe('The generated HTML validation report for the idea.'),
});
export type GenerateValidationReportOutput = z.infer<
  typeof GenerateValidationReportOutputSchema
>;

export async function generateValidationReport(
  input: GenerateValidationReportInput
): Promise<GenerateValidationReportOutput> {
  return generateValidationReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateValidationReportPrompt',
  input: {schema: GenerateValidationReportInputSchema},
  output: {schema: GenerateValidationReportOutputSchema},
  prompt: `You are an AI expert in generating validation reports for submitted ideas. Based on the provided scores, assumptions, and idea description, create a detailed and visually appealing HTML report that summarizes the idea's strengths and weaknesses.

Idea Description: {{{ideaDescription}}}
Innovation Score: {{{innovationScore}}}
Impact Score: {{{impactScore}}}
Feasibility Score: {{{feasibilityScore}}}
Sustainability Score: {{{sustainabilityScore}}}
Validation Assumptions: {{{validationAssumptions}}}

Generate a well-structured HTML report including tiny conceptual diagrams where appropriate to visualize scores. The report should include:
- An overview of the idea.
- A summary of the validation process and key assumptions.
- A detailed breakdown of the scores and their implications, using diagrams.
- An overall conclusion about the idea's potential.

Ensure the HTML is valid and well-formatted.`,
});

const generateValidationReportFlow = ai.defineFlow(
  {
    name: 'generateValidationReportFlow',
    inputSchema: GenerateValidationReportInputSchema,
    outputSchema: GenerateValidationReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
