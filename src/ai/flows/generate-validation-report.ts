'use server';

/**
 * @fileOverview AI flow that generates a validation report for a submitted idea.
 * This flow now orchestrates a multi-step process:
 * 1. Evaluates each sub-parameter of the idea using a dedicated AI prompt.
 * 2. Calculates weighted scores for parameters, clusters, and the overall idea.
 * 3. Determines a final validation outcome (Approved, Moderate, Rejected).
 *
 * - generateValidationReport - A function that generates the validation report.
 * - GenerateValidationReportInput - The input type for the generateValidationReport function.
 * - GenerateValidationReportOutput - The return type for the generateValidationReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  MOCK_CLUSTER_DEFINITIONS,
  PARAMETER_WEIGHTS,
} from '@/lib/mock-data';

// Schemas for Input and Output

const GenerateValidationReportInputSchema = z.object({
  ideaTitle: z.string().describe('The title of the submitted idea.'),
  ideaDescription: z
    .string()
    .describe('A detailed description of the submitted idea.'),
  clusterWeights: z
    .record(z.number())
    .describe(
      'A dictionary of cluster names to their weightage (e.g., {"Core Idea": 20}).'
    ),
});
export type GenerateValidationReportInput = z.infer<
  typeof GenerateValidationReportInputSchema
>;

const SubParameterEvaluationSchema = z.object({
  assignedScore: z
    .number()
    .min(1)
    .max(5)
    .describe('The score from 1 to 5 for the sub-parameter.'),
  explanation: z
    .string()
    .describe(
      'A concise explanation for the score based on the idea concept and sub-parameter criteria.'
    ),
  assumptions: z
    .string()
    .describe(
      'A brief assumption or consideration that supports the evaluation.'
    ),
});

const FeedbackDetailSchema = z.object({
  aspect: z.string(),
  score: z.number(),
  comment: z.string(),
});

const GenerateValidationReportOutputSchema = z.object({
  status: z.enum(['Approved', 'Moderate', 'Rejected']),
  feedback: z.object({
    overall: z.string(),
    details: z.array(FeedbackDetailSchema),
  }),
});

export type GenerateValidationReportOutput = z.infer<
  typeof GenerateValidationReportOutputSchema
>;

// Main exported function
export async function generateValidationReport(
  input: GenerateValidationReportInput
): Promise<GenerateValidationReportOutput> {
  return generateValidationReportFlow(input);
}

// AI Prompt for evaluating a single sub-parameter
const subParameterEvaluationPrompt = ai.definePrompt({
  name: 'evaluateSubParameterPrompt',
  input: {
    schema: z.object({
      ideaTitle: z.string(),
      ideaDescription: z.string(),
      clusterName: z.string(),
      paramName: z.string(),
      subParamName: z.string(),
      subParamObjective: z.string(),
    }),
  },
  output: {
    schema: SubParameterEvaluationSchema,
  },
  prompt: `You are an expert AI idea validator for "Pragati - Idea to Impact Platform".
Your task is to evaluate an innovative idea based on a specific sub-parameter from our validation framework.
Provide an assigned score (1-5), a concise explanation for the score, and a brief assumption/consideration that justifies your evaluation.

**Idea Name:** {{{ideaTitle}}}
**Idea Concept:** {{{ideaDescription}}}

**Evaluation Context:**
- **Cluster:** {{{clusterName}}}
- **Parameter:** {{{paramName}}}
- **Sub-Parameter:** {{{subParamName}}}
- **Objective of this Sub-Parameter:** {{{subParamObjective}}}

**Scoring Rubric (1-5):**
- 5: Excellent (Strong evidence, highly aligned, minimal risk, clear advantage)
- 4: Good (Positive evidence, generally aligned, minor areas for improvement/risk)
- 3: Moderate (Mixed evidence, some clear challenges/risks, requires attention)
- 2: Weak (Significant gaps, major challenges/risks, requires substantial rework)
- 1: Poor (No evidence, fundamental flaws, highly problematic, major red flags)`,
});

// AI Prompt to generate the overall feedback summary
const overallFeedbackPrompt = ai.definePrompt({
    name: 'generateOverallFeedbackPrompt',
    input: {
        schema: z.object({
            ideaTitle: z.string(),
            overallScore: z.number(),
            validationOutcome: z.string(),
            clusterScores: z.record(z.number()),
        }),
    },
    output: {
        schema: z.object({
            overallFeedback: z.string().describe('A concise, overall summary of the feedback, highlighting strengths and weaknesses.')
        })
    },
    prompt: `Based on the validation results for the idea "{{{ideaTitle}}}", generate a concise overall feedback summary.
The idea received an overall score of {{{overallScore}}}/5.0, resulting in a verdict of "{{{validationOutcome}}}".

Cluster Scores:
{{#each clusterScores}}
- {{@key}}: {{this}}/5.0
{{/each}}

Provide a summary that explains the verdict, mentioning the strongest and weakest clusters.
Example: "The idea is 'Moderate' due to a strong 'Core Idea' but a weak 'Business Model'. The technical execution plan needs refinement."
`
});


// Main Genkit Flow
const generateValidationReportFlow = ai.defineFlow(
  {
    name: 'generateValidationReportFlow',
    inputSchema: GenerateValidationReportInputSchema,
    outputSchema: GenerateValidationReportOutputSchema,
  },
  async input => {
    const evaluatedData: any = {};
    const clusterScores: Record<string, number> = {};

    // 1. Evaluate each sub-parameter
    for (const [clusterName, clusterDef] of Object.entries(
      MOCK_CLUSTER_DEFINITIONS
    )) {
      evaluatedData[clusterName] = {};
      for (const [paramName, paramDef] of Object.entries(
        clusterDef.parameters
      )) {
        evaluatedData[clusterName][paramName] = {};
        for (const [subParamName, subParamDef] of Object.entries(
          paramDef.subParameters
        )) {
          console.log(`Evaluating: ${clusterName} > ${paramName} > ${subParamName}`);
          const evaluation = await subParameterEvaluationPrompt({
            ideaTitle: input.ideaTitle,
            ideaDescription: input.ideaDescription,
            clusterName,
            paramName,
            subParamName,
            subParamObjective: subParamDef, // Passing the description as objective
          });

          evaluatedData[clusterName][paramName][subParamName] = {
            ...evaluation.output,
            weight: 0.5, // Mock weight as it is not in the new data structure
          };
        }
      }
    }

    // 2. Calculate scores
    const calculateWeightedScore = (
      assignedScore: number,
      subParamWeight: number,
      paramWeight: number,
      clusterWeight: number
    ) => {
      return (assignedScore / 5) * subParamWeight * paramWeight * clusterWeight * 5;
    };

    let overallScore = 0;

    for (const [clusterName, clusterData] of Object.entries(evaluatedData)) {
      let clusterScore = 0;
      const clusterWeight = (input.clusterWeights[clusterName] || 0) / 100;

      for (const [paramName, paramData] of Object.entries(clusterData as any)) {
        const paramWeight = PARAMETER_WEIGHTS[clusterName]?.[paramName] || 0;
        let paramTotalWeight = 0;

        for (const [subParamName, subParam] of Object.entries(paramData as any)) {
            const subParamWeight = subParam.weight;
            paramTotalWeight += subParamWeight;

            overallScore += calculateWeightedScore(
                subParam.assignedScore,
                subParamWeight,
                paramWeight,
                clusterWeight
            );
        }
        // Normalize sub-param weights if they don't sum to 1
        if (paramTotalWeight > 0) {
            for (const [subParamName, subParam] of Object.entries(paramData as any)) {
                 clusterScore += (subParam.assignedScore / 5) * (subParam.weight / paramTotalWeight) * paramWeight;
            }
        }
      }
       clusterScores[clusterName] = clusterScore * 5; // Scale back to 5
    }

    // 3. Determine outcome
    const getValidationOutcome = (score: number): 'Approved' | 'Moderate' | 'Rejected' => {
      if (score >= 4.0) return 'Approved';
      if (score >= 2.5) return 'Moderate';
      return 'Rejected';
    };
    const validationOutcome = getValidationOutcome(overallScore);

    // 4. Generate overall feedback summary
    const feedbackSummary = await overallFeedbackPrompt({
        ideaTitle: input.ideaTitle,
        overallScore,
        validationOutcome,
        clusterScores,
    });


    // 5. Format final output
    const feedbackDetails = Object.entries(clusterScores).map(([aspect, score]) => ({
      aspect,
      score,
      comment: `The score for ${aspect} reflects its performance against key metrics.`, // Placeholder comment
    }));

    return {
      status: validationOutcome,
      feedback: {
        overall: feedbackSummary.output?.overallFeedback || "Feedback summary could not be generated.",
        details: feedbackDetails,
      },
    };
  }
);
