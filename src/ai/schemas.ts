/**
 * @fileOverview This file defines the shared Zod schemas and TypeScript types for AI flows.
 * Separating schemas into their own file avoids Next.js server action export errors.
 */

import { z } from 'zod';

// Input Schema for the validation report generator
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
  assignedScore: z.number().int().min(1).max(5).describe("Score from 1-5"),
  explanation: z.string().describe("Concise explanation for the score (1-3 sentences)"),
  assumptions: z.array(z.string()).describe("List of assumptions made for this evaluation"),
});

const createSubParameterObject = (schema: z.ZodObject<any>) => z.object(
    Object.keys(schema.shape).reduce((acc, key) => {
        acc[key] = SubParameterEvaluationSchema;
        return acc;
    }, {} as Record<string, typeof SubParameterEvaluationSchema>)
);

const CoreIdeaAndInnovationSubParams = {
    "Originality": {}, "Differentiation": {},
    "Problem Clarity & Severity": {}, "Target Audience Identification & Definition": {},
    "Customer Pain Points Validation": {}, "Solution Efficacy": {},
    "Customer Willingness to Pay": {}, "Jobs-to-Be-Done (JTBD) Alignment": {},
    "Intuitive Design": {}, "Accessibility Compliance": {}
};

const MarketAndCommercialOpportunitySubParams = {
    "Market Size (TAM)": {}, "Competitive Intensity": {},
    "Regulatory Landscape": {}, "Infrastructure Readiness": {},
    "User Engagement": {}, "Retention Potential": {}
};

const ExecutionAndOperationsSubParams = {
    "Technology Maturity": {}, "Scalability & Performance": {},
    "Resource Availability": {}, "Process Efficiency": {},
    "Business Model Scalability": {}, "Market Expansion Potential": {}
};

const BusinessModelAndStrategySubParams = {
    "Revenue Stream Diversity": {}, "Profitability & Margins": {},
    "Intellectual Property (IP)": {}, "Network Effects": {}
};

const TeamAndOrganizationalHealthSubParams = {
    "Relevant Experience": {}, "Complementary Skills": {},
    "Mission Alignment": {}, "Diversity & Inclusion": {}
};

const ExternalEnvironmentAndComplianceSubParams = {
    "Data Privacy Compliance": {}, "Sector-Specific Compliance": {},
    "Environmental Impact": {}, "Social Impact (SDGs)": {},
    "Government & Institutional Support": {}, "Investor & Partner Landscape": {}
};

const RiskAndFutureOutlookSubParams = {
    "Technical Risks": {}, "Market Risks": {}, "Operational Risks": {},
    "ROI Potential": {}, "Exit Strategy Feasibility": {},
    "Research Synergy": {}, "National Priority Alignment": {}
};


export const DetailedEvaluationClustersSchema = z.object({
  "Core Idea & Innovation": z.object({
    "Novelty & Uniqueness": z.object({ "Originality": SubParameterEvaluationSchema, "Differentiation": SubParameterEvaluationSchema }),
    "Problem-Solution Fit & Market Need": z.object({ "Problem Clarity & Severity": SubParameterEvaluationSchema, "Target Audience Identification & Definition": SubParameterEvaluationSchema, "Customer Pain Points Validation": SubParameterEvaluationSchema, "Solution Efficacy": SubParameterEvaluationSchema, "Customer Willingness to Pay": SubParameterEvaluationSchema, "Jobs-to-Be-Done (JTBD) Alignment": SubParameterEvaluationSchema }),
    "User Experience (UX) & Usability Potential": z.object({ "Intuitive Design": SubParameterEvaluationSchema, "Accessibility Compliance": SubParameterEvaluationSchema })
  }),
  "Market & Commercial Opportunity": z.object({
    "Market Validation": z.object({ "Market Size (TAM)": SubParameterEvaluationSchema, "Competitive Intensity": SubParameterEvaluationSchema }),
    "Geographic Specificity (India)": z.object({ "Regulatory Landscape": SubParameterEvaluationSchema, "Infrastructure Readiness": SubParameterEvaluationSchema }),
    "Product-Market Fit": z.object({ "User Engagement": SubParameterEvaluationSchema, "Retention Potential": SubParameterEvaluationSchema })
  }),
  "Execution & Operations": z.object({
      "Technical Feasibility": z.object({ "Technology Maturity": SubParameterEvaluationSchema, "Scalability & Performance": SubParameterEvaluationSchema }),
      "Operational Viability": z.object({ "Resource Availability": SubParameterEvaluationSchema, "Process Efficiency": SubParameterEvaluationSchema }),
      "Scalability Potential": z.object({ "Business Model Scalability": SubParameterEvaluationSchema, "Market Expansion Potential": SubParameterEvaluationSchema })
  }),
  "Business Model & Strategy": z.object({
    "Financial Viability": z.object({ "Revenue Stream Diversity": SubParameterEvaluationSchema, "Profitability & Margins": SubParameterEvaluationSchema }),
    "Defensibility": z.object({ "Intellectual Property (IP)": SubParameterEvaluationSchema, "Network Effects": SubParameterEvaluationSchema })
  }),
  "Team & Organizational Health": z.object({
    "Founder-Fit": z.object({ "Relevant Experience": SubParameterEvaluationSchema, "Complementary Skills": SubParameterEvaluationSchema }),
    "Culture/Values": z.object({ "Mission Alignment": SubParameterEvaluationSchema, "Diversity & Inclusion": SubParameterEvaluationSchema })
  }),
  "External Environment & Compliance": z.object({
    "Regulatory (India)": z.object({ "Data Privacy Compliance": SubParameterEvaluationSchema, "Sector-Specific Compliance": SubParameterEvaluationSchema }),
    "Sustainability (ESG)": z.object({ "Environmental Impact": SubParameterEvaluationSchema, "Social Impact (SDGs)": SubParameterEvaluationSchema }),
    "Ecosystem Support (India)": z.object({ "Government & Institutional Support": SubParameterEvaluationSchema, "Investor & Partner Landscape": SubParameterEvaluationSchema })
  }),
  "Risk & Future Outlook": z.object({
    "Risk Assessment": z.object({ "Technical Risks": SubParameterEvaluationSchema, "Market Risks": SubParameterEvaluationSchema, "Operational Risks": SubParameterEvaluationSchema }),
    "Investor Attractiveness": z.object({ "ROI Potential": SubParameterEvaluationSchema, "Exit Strategy Feasibility": SubParameterEvaluationSchema }),
    "Academic/National Alignment": z.object({ "Research Synergy": SubParameterEvaluationSchema, "National Priority Alignment": SubParameterEvaluationSchema })
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
  pptUrl: z.string().optional(),
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
