'use server';

/**
 * @fileOverview AI flow that generates a comprehensive validation report for a submitted idea.
 * This flow makes a single, large call to the AI, asking it to generate the entire report
 * in a structured JSON format based on a detailed framework.
 *
 * - generateValidationReport - A function that generates the validation report.
 * - GenerateValidationReportInput - The input type for the generateValidationReport function.
 * - ValidationReportSchema - The Zod schema for the detailed report output.
 * - ValidationReport - The TypeScript type for the report output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  CLUSTER_WEIGHTS,
  PARAMETER_WEIGHTS,
  SUB_PARAMETER_DEFINITIONS,
  SCORING_RUBRIC,
  VALIDATION_OUTCOMES,
} from '@/lib/mock-data';

// Input Schema
export const GenerateValidationReportInputSchema = z.object({
  ideaName: z.string().describe('The name of the idea.'),
  ideaConcept: z.string().describe('The detailed concept of the idea.'),
  category: z.string().describe('The category or domain of the idea.'),
  institution: z.string().describe('The institution submitting the idea.'),
});
export type GenerateValidationReportInput = z.infer<
  typeof GenerateValidationReportInputSchema
>;

// Schemas for the detailed report structure
const SubParameterEvaluationSchema = z.object({
  assignedScore: z.union([z.number().int().min(1).max(5), z.string().refine(val => val === 'N/A')]),
  explanation: z.string(),
  assumptions: z.array(z.string()),
});

const DetailedEvaluationClustersSchema = z.object({
  "Core Idea & Innovation": z.object({
    "Novelty & Uniqueness": z.object({
      "Originality": SubParameterEvaluationSchema,
      "Differentiation": SubParameterEvaluationSchema
    }),
    "Problem-Solution Fit & Market Need": z.object({
      "Problem Clarity & Severity": SubParameterEvaluationSchema,
      "Target Audience Identification & Definition": SubParameterEvaluationSchema,
      "Customer Pain Points Validation": SubParameterEvaluationSchema,
      "Solution Efficacy": SubParameterEvaluationSchema,
      "Customer Willingness to Pay": SubParameterEvaluationSchema,
      "Jobs-to-Be-Done (JTBD) Alignment": SubParameterEvaluationSchema
    }),
    "User Experience (UX) & Usability Potential": z.object({
      "Intuitive Design": SubParameterEvaluationSchema,
      "Accessibility Compliance": SubParameterEvaluationSchema
    })
  }),
  "Market & Commercial Opportunity": z.object({
    "Market Validation": z.object({
      "Market Size (TAM)": SubParameterEvaluationSchema,
      "Competitive Intensity": SubParameterEvaluationSchema
    }),
    "Geographic Specificity (India)": z.object({
      "Regulatory Landscape": SubParameterEvaluationSchema,
      "Infrastructure Readiness": SubParameterEvaluationSchema
    }),
    "Product-Market Fit": z.object({
      "User Engagement": SubParameterEvaluationSchema,
      "Retention Potential": SubParameterEvaluationSchema
    })
  }),
  "Execution & Operations": z.object({
      "Technical Feasibility": z.object({
        "Technology Maturity": SubParameterEvaluationSchema,
        "Scalability & Performance": SubParameterEvaluationSchema
      }),
      "Operational Viability": z.object({
        "Resource Availability": SubParameterEvaluationSchema,
        "Process Efficiency": SubParameterEvaluationSchema
      }),
      "Scalability Potential": z.object({
        "Business Model Scalability": SubParameterEvaluationSchema,
        "Market Expansion Potential": SubParameterEvaluationSchema
      })
  }),
  "Business Model & Strategy": z.object({
    "Financial Viability": z.object({
      "Revenue Stream Diversity": SubParameterEvaluationSchema,
      "Profitability & Margins": SubParameterEvaluationSchema
    }),
    "Defensibility": z.object({
      "Intellectual Property (IP)": SubParameterEvaluationSchema,
      "Network Effects": SubParameterEvaluationSchema
    })
  }),
  "Team & Organizational Health": z.object({
    "Founder-Fit": z.object({
      "Relevant Experience": SubParameterEvaluationSchema,
      "Complementary Skills": SubParameterEvaluationSchema
    }),
    "Culture/Values": z.object({
      "Mission Alignment": SubParameterEvaluationSchema,
      "Diversity & Inclusion": SubParameterEvaluationSchema
    })
  }),
  "External Environment & Compliance": z.object({
    "Regulatory (India)": z.object({
      "Data Privacy Compliance": SubParameterEvaluationSchema,
      "Sector-Specific Compliance": SubParameterEvaluationSchema
    }),
    "Sustainability (ESG)": z.object({
      "Environmental Impact": SubParameterEvaluationSchema,
      "Social Impact (SDGs)": SubParameterEvaluationSchema
    }),
    "Ecosystem Support (India)": z.object({
      "Government & Institutional Support": SubParameterEvaluationSchema,
      "Investor & Partner Landscape": SubParameterEvaluationSchema
    })
  }),
  "Risk & Future Outlook": z.object({
    "Risk Assessment": z.object({
      "Technical Risks": SubParameterEvaluationSchema,
      "Market Risks": SubParameterEvaluationSchema,
      "Operational Risks": SubParameterEvaluationSchema
    }),
    "Investor Attractiveness": z.object({
      "ROI Potential": SubParameterEvaluationSchema,
      "Exit Strategy Feasibility": SubParameterEvaluationSchema
    }),
    "Academic/National Alignment": z.object({
      "Research Synergy": SubParameterEvaluationSchema,
      "National Priority Alignment": SubParameterEvaluationSchema
    })
  })
});

// Main Report Output Schema
export const ValidationReportSchema = z.object({
  ideaName: z.string(),
  ideaConcept: z.string(),
  overallScore: z.number(),
  validationOutcome: z.string(),
  recommendationText: z.string(),
  submissionDate: z.string(),
  pptUrl: z.string().url(),
  sections: z.object({
    executiveSummary: z.object({
      ideaName: z.string(),
      concept: z.string(),
      overallScore: z.number(),
      validationOutcome: z.string(),
      recommendation: z.string(),
      reportGeneratedOn: z.string(),
    }),
    pragatiAIServiceProcess: z.object({
      title: z.string(),
      description: z.string(),
      sections: z.array(z.object({ heading: z.string(), content: z.string() })),
    }),
    competitiveLandscape: z.object({
      title: z.string(),
      description: z.string(),
      sections: z.array(z.object({ heading: z.string(), content: z.string() })),
    }),
    projectEvaluationFramework: z.object({
      title: z.string(),
      description: z.string(),
      sections: z.array(
        z.object({
          heading: z.string(),
          content: z.string().optional(),
          subsections: z.array(z.object({ subheading: z.string(), content: z.string() })).optional(),
        })
      ),
    }),
    detailedEvaluation: z.object({
      title: z.string(),
      description: z.string(),
      clusters: DetailedEvaluationClustersSchema,
    }),
    conclusion: z.object({
      title: z.string(),
      content: z.string(),
    }),
    recommendations: z.object({
      title: z.string(),
      description: z.string(),
      items: z.array(z.string()),
    }),
    appendix: z.object({
      title: z.string(),
      items: z.array(z.string()),
    }),
  }),
});
export type ValidationReport = z.infer<typeof ValidationReportSchema>;

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
