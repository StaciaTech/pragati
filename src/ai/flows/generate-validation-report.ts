'use server';

/**
 * @fileOverview AI flow that generates a validation report for a submitted idea.
 * This flow now orchestrates a single, comprehensive AI call to evaluate all parameters.
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

const ParameterEvaluationSchema = z.record(SubParameterEvaluationSchema);
const ClusterEvaluationSchema = z.record(ParameterEvaluationSchema);

const FullEvaluationResponseSchema = z.object({
  evaluation: z.record(ClusterEvaluationSchema)
    .describe('An object where keys are cluster names. Each cluster contains its parameters, which in turn contain evaluated sub-parameters with scores, explanations, and assumptions.'),
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

// AI Prompt for evaluating the entire idea at once
const fullEvaluationPrompt = ai.definePrompt({
    name: 'fullEvaluationPrompt',
    input: {
        schema: z.object({
            ideaTitle: z.string(),
            ideaDescription: z.string(),
            framework: z.any().describe("The entire evaluation framework as a JSON object, including clusters, parameters, and sub-parameters with their objectives."),
        }),
    },
    output: {
        schema: FullEvaluationResponseSchema,
    },
    prompt: `You are an expert AI idea validator for "Pragati - Idea to Impact Platform".
Your task is to evaluate an innovative idea based on our entire validation framework.
For EACH sub-parameter in the provided framework, you must generate an assigned score (1-5), a concise explanation, and a brief assumption.

**Idea Name:** {{{ideaTitle}}}
**Idea Concept:** {{{ideaDescription}}}

**Evaluation Framework:**
\`\`\`json
{{{json framework}}}
\`\`\`

**Scoring Rubric (1-5):**
- 5: Excellent (Strong evidence, highly aligned, minimal risk, clear advantage)
- 4: Good (Positive evidence, generally aligned, minor areas for improvement/risk)
- 3: Moderate (Mixed evidence, some clear challenges/risks, requires attention)
- 2: Weak (Significant gaps, major challenges/risks, requires substantial rework)
- 1: Poor (No evidence, fundamental flaws, highly problematic, major red flags)

Your response MUST be a single JSON object containing the full evaluation, matching the required output schema precisely.
`,
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
    // 1. Evaluate all sub-parameters in a single AI call
    console.log("Starting full evaluation for idea:", input.ideaTitle);
    const evaluationResult = await fullEvaluationPrompt({
        ideaTitle: input.ideaTitle,
        ideaDescription: input.ideaDescription,
        framework: MOCK_CLUSTER_DEFINITIONS, // Pass the whole framework
    });

    const evaluatedData = evaluationResult.output?.evaluation;

    if (!evaluatedData) {
        throw new Error("AI evaluation failed to return the expected data structure.");
    }

    const clusterScores: Record<string, number> = {};

    // 2. Calculate scores
    const calculateWeightedScore = (
      assignedScore: number,
      subParamWeight: number,
      paramWeight: number,
      clusterWeight: number
    ) => {
      // Find the sub-parameter weight from the original definition
      return (assignedScore / 5) * subParamWeight * paramWeight * clusterWeight * 5;
    };

    let overallScore = 0;

    for (const [clusterName, clusterData] of Object.entries(evaluatedData)) {
        let clusterScore = 0;
        const clusterWeight = (input.clusterWeights[clusterName] || 0) / 100;
        const clusterDef = MOCK_CLUSTER_DEFINITIONS[clusterName as keyof typeof MOCK_CLUSTER_DEFINITIONS];

        for (const [paramName, paramData] of Object.entries(clusterData as any)) {
            const paramWeight = PARAMETER_WEIGHTS[clusterName]?.[paramName] || 0;
            const paramDef = clusterDef?.parameters[paramName as keyof typeof clusterDef.parameters];
            let paramTotalWeight = 0;
            let weightedParamScore = 0;

            for (const [subParamName, subParam] of Object.entries(paramData as any)) {
                 const subParamDef = paramDef?.subParameters[subParamName as keyof typeof paramDef.subParameters];
                 // Sub-parameter weight is now dynamically looked up from the definition, not part of the AI response
                 const subParamWeight = subParamDef && typeof subParamDef !== 'string' ? (subParamDef as any).weight : 0.5; // fallback weight
                 paramTotalWeight += subParamWeight;

                 weightedParamScore += (subParam.assignedScore / 5) * subParamWeight;
            }

            if (paramTotalWeight > 0) {
                 const normalizedParamScore = weightedParamScore / paramTotalWeight;
                 clusterScore += normalizedParamScore * paramWeight;
            }
        }
        clusterScores[clusterName] = clusterScore * 5; // Scale back to 5
    }

    // Calculate overall score by summing weighted cluster scores
    overallScore = Object.entries(clusterScores).reduce((acc, [clusterName, score]) => {
        const clusterWeight = (input.clusterWeights[clusterName] || 0) / 100;
        return acc + (score / 5) * clusterWeight;
    }, 0) * 5; // Final score on a 5-point scale


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
