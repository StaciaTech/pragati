'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing validation data.
 *
 * - summarizeValidationData - A function that summarizes validation data.
 * - SummarizeValidationDataInput - The input type for the summarizeValidationData function.
 * - SummarizeValidationDataOutput - The return type for the summarizeValidationData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidationDataSchema = z.object({
  ideaId: z.string().describe('Unique identifier for the idea submission.'),
  validationScore: z.number().describe('Overall validation score for the idea.'),
  keyInsights: z.array(z.string()).describe('Key insights or findings from the validation process.'),
});

export type ValidationData = z.infer<typeof ValidationDataSchema>;

const SummarizeValidationDataInputSchema = z.object({
  validationData: z.array(ValidationDataSchema).describe('Array of validation data objects to summarize.'),
  query: z.string().describe('User query, e.g. identify trends')
});

export type SummarizeValidationDataInput = z.infer<typeof SummarizeValidationDataInputSchema>;

const SummarizeValidationDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the validation data, highlighting promising ideas and trends.'),
});

export type SummarizeValidationDataOutput = z.infer<typeof SummarizeValidationDataOutputSchema>;

export async function summarizeValidationData(
  input: SummarizeValidationDataInput
): Promise<SummarizeValidationDataOutput> {
  return summarizeValidationDataFlow(input);
}

const summarizeValidationDataPrompt = ai.definePrompt({
  name: 'summarizeValidationDataPrompt',
  input: {
    schema: SummarizeValidationDataInputSchema,
  },
  output: {
    schema: SummarizeValidationDataOutputSchema,
  },
  prompt: `You are an AI assistant helping a college principal admin to identify promising ideas and trends from a set of idea submissions and their validation data.

You are provided with an array of validation data objects, each containing an ideaId, validationScore, and keyInsights.

Summarize the validation data, highlighting promising ideas (those with high validation scores and compelling insights) and any significant trends across the submissions.

Validation Data: {{{validationData}}}

Query: {{{query}}}
`,
});

const summarizeValidationDataFlow = ai.defineFlow(
  {
    name: 'summarizeValidationDataFlow',
    inputSchema: SummarizeValidationDataInputSchema,
    outputSchema: SummarizeValidationDataOutputSchema,
  },
  async input => {
    const {output} = await summarizeValidationDataPrompt(input);
    return output!;
  }
);
