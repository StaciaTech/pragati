import type { ValidationReport } from "@/ai/flows/generate-validation-report";

export const MOCK_INNOVATOR_USER = {
  id: 'innovator-001',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  password: 'innovatorpass',
  isEmailVerified: true,
  isAccountLocked: false,
  credits: 5,
  college: 'Pragati University',
  role: 'Innovator',
};

// New comprehensive definitions from the prompt
export const CLUSTER_WEIGHTS = {
  "Core Idea & Innovation": 0.20,
  "Market & Commercial Opportunity": 0.25,
  "Execution & Operations": 0.15,
  "Business Model & Strategy": 0.15,
  "Team & Organizational Health": 0.10,
  "External Environment & Compliance": 0.10,
  "Risk & Future Outlook": 0.05,
};

export const PARAMETER_WEIGHTS: Record<string, Record<string, number>> = {
  "Core Idea & Innovation": {
    "Novelty & Uniqueness": 0.30,
    "Problem-Solution Fit & Market Need": 0.45,
    "User Experience (UX) & Usability Potential": 0.25,
  },
  "Market & Commercial Opportunity": {
    "Market Validation": 0.40,
    "Geographic Specificity (India)": 0.30,
    "Product-Market Fit": 0.30,
  },
  "Execution & Operations": {
    "Technical Feasibility": 0.40,
    "Operational Viability": 0.30,
    "Scalability Potential": 0.30,
  },
  "Business Model & Strategy": {
    "Financial Viability": 0.60,
    "Defensibility": 0.40,
  },
  "Team & Organizational Health": {
    "Founder-Fit": 0.60,
    "Culture/Values": 0.40,
  },
  "External Environment & Compliance": {
    "Regulatory (India)": 0.40,
    "Sustainability (ESG)": 0.30,
    "Ecosystem Support (India)": 0.30,
  },
  "Risk & Future Outlook": {
    "Risk Assessment": 0.40,
    "Investor Attractiveness": 0.30,
    "Academic/National Alignment": 0.30,
  },
};

export const SUB_PARAMETER_DEFINITIONS = {
  "Core Idea & Innovation": {
    parameters: {
      "Novelty & Uniqueness": {
        subParameters: {
          "Originality": { weight: 0.60, objective: "To determine if the core idea is genuinely new, a significant improvement, or a disruptive concept compared to existing solutions globally." },
          "Differentiation": { weight: 0.40, objective: "To identify how the proposed solution stands out from direct and indirect competitors, highlighting its unique selling propositions (USPs)." }
        }
      },
      "Problem-Solution Fit & Market Need": {
        subParameters: {
          "Problem Clarity & Severity": { weight: 0.20, objective: "To gauge the intensity and prevalence of the problem being addressed for the target users/customers." },
          "Target Audience Identification & Definition": { weight: 0.15, objective: "To clearly define the specific demographic, professional role, and context of the primary target users." },
          "Customer Pain Points Validation": { weight: 0.20, objective: "To validate that the identified pain points are genuinely experienced and severe enough for customers to seek and pay for a solution." },
          "Solution Efficacy": { weight: 0.20, objective: "To evaluate how well the proposed product or service truly solves the identified problem, meeting user needs and expectations." },
          "Customer Willingness to Pay": { weight: 0.15, objective: "To assess the target customers' readiness and ability to pay for the proposed solution." },
          "Jobs-to-Be-Done (JTBD) Alignment": { weight: 0.10, objective: "To ensure the solution aligns with the fundamental 'jobs' customers are trying to get done, including functional, emotional, and social aspects." }
        }
      },
      "User Experience (UX) & Usability Potential": {
        subParameters: {
          "Intuitive Design": { weight: 0.60, objective: "To assess how easy and natural it is for users to understand, learn, and interact with the product or service without extensive training." },
          "Accessibility Compliance": { weight: 0.40, objective: "To ensure the product adheres to standards that make it usable by people with disabilities, promoting inclusivity and legal compliance." }
        }
      }
    }
  },
  "Market & Commercial Opportunity": {
    parameters: {
      "Market Validation": {
        subParameters: {
          "Market Size (TAM)": { weight: 0.60, objective: "To estimate the total potential revenue if 100% of the target market adopted the solution (TAM), the portion accessible (SAM), and the realistic share obtainable (SOM)." },
          "Competitive Intensity": { weight: 0.40, objective: "To analyze the number, size, and aggressiveness of existing competitors in the market." }
        }
      },
      "Geographic Specificity (India)": {
        subParameters: {
          "Regulatory Landscape": { weight: 0.50, objective: "To understand the legal and policy environment in India that affects the project's operation, including licensing, data, and industry-specific laws." },
          "Infrastructure Readiness": { weight: 0.50, objective: "To evaluate if the necessary physical and digital infrastructure is adequately developed in India to support the solution." }
        }
      },
      "Product-Market Fit": {
        subParameters: {
          "User Engagement": { weight: 0.50, objective: "To predict how deeply and frequently users will interact with the product or service after initial adoption." },
          "Retention Potential": { weight: 0.50, objective: "To estimate the likelihood of users continuing to use the product over an extended period." }
        }
      }
    }
  },
  "Execution & Operations": {
    parameters: {
      "Technical Feasibility": {
        subParameters: {
          "Technology Maturity": { weight: 0.50, objective: "To assess the stability, reliability, and widespread adoption of the core technologies proposed for the solution, and identify associated R&D risks." },
          "Scalability & Performance": { weight: 0.50, objective: "To determine if the technical architecture and underlying systems can efficiently handle increasing user numbers, data volumes, or transaction loads." }
        }
      },
      "Operational Viability": {
        subParameters: {
          "Resource Availability": { weight: 0.50, objective: "To check if the necessary human talent (skilled professionals), financial capital, and material supplies are readily accessible to execute the project." },
          "Process Efficiency": { weight: 0.50, objective: "To evaluate how streamlined and optimized the internal processes (e.g., AI model training, content generation, customer service, delivery) will be, minimizing waste and maximizing output." }
        }
      },
      "Scalability Potential": {
        subParameters: {
          "Business Model Scalability": { weight: 0.50, objective: "To assess if the revenue model allows revenue to grow disproportionately faster than costs as the business expands." },
          "Market Expansion Potential": { weight: 0.50, objective: "To identify how easily the product/service can be introduced into new geographic markets, demographics, or use cases beyond the initial target." }
        }
      }
    }
  },
  "Business Model & Strategy": {
    parameters: {
      "Financial Viability": {
        subParameters: {
          "Revenue Stream Diversity": { weight: 0.50, objective: "To identify how many distinct and sustainable ways the project plans to generate income." },
          "Profitability & Margins": { weight: 0.50, objective: "To project the percentage of revenue that turns into profit after accounting for all costs (gross and net margins)." }
        }
      },
      "Defensibility": {
        subParameters: {
          "Intellectual Property (IP)": { weight: 0.50, objective: "To assess the strength and breadth of legal protection for the project's unique innovations." },
          "Network Effects": { weight: 0.50, objective: "To determine if the value of the product or service increases for existing users as more new users join." }
        }
      }
    }
  },
  "Team & Organizational Health": {
    parameters: {
      "Founder-Fit": {
        subParameters: {
          "Relevant Experience": { weight: 0.50, objective: "To evaluate if the founding team possesses direct, hands-on experience in the industry, technology, or business model proposed." },
          "Complementary Skills": { weight: 0.50, objective: "To assess if the team has a balanced mix of essential skills (e.g., technical, business development, marketing, operations) needed for holistic execution." }
        }
      },
      "Culture/Values": {
        subParameters: {
          "Mission Alignment": { weight: 0.50, objective: "To understand how deeply the team members' personal values and goals resonate with the project's core mission and purpose." },
          "Diversity & Inclusion": { weight: 0.50, objective: "To assess the presence of diverse perspectives (gender, ethnicity, background, thought) within the team and a commitment to inclusive practices." }
        }
      }
    }
  },
  "External Environment & Compliance": {
    parameters: {
      "Regulatory (India)": {
        subParameters: {
          "Data Privacy Compliance": { weight: 0.50, objective: "To ensure the project's handling of user data adheres to relevant Indian data protection laws (e.g., DPDP Act) and international standards." },
          "Sector-Specific Compliance": { weight: 0.50, objective: "To verify adherence to regulations unique to the project's industry in India (e.g., UGC for EdTech, specific AI guidelines)." }
        }
      },
      "Sustainability (ESG)": {
        subParameters: {
          "Environmental Impact": { weight: 0.50, objective: "To assess the project's footprint on the natural environment (e.g., carbon emissions, waste generation, resource consumption)." },
          "Social Impact (SDGs)": { weight: 0.50, objective: "To evaluate how the project contributes to or impacts the United Nations Sustainable Development Goals (SDGs) and broader social well-being." }
        }
      },
      "Ecosystem Support (India)": {
        subParameters: {
          "Government & Institutional Support": { weight: 0.50, objective: "To identify potential assistance from government programs, incubators, accelerators, or other institutional bodies in India." },
          "Investor & Partner Landscape": { weight: 0.50, objective: "To understand the availability and appetite of investors (VCs, angels) and potential strategic partners for the project in India." }
        }
      }
    }
  },
  "Risk & Future Outlook": {
    parameters: {
      "Risk Assessment": {
        subParameters: {
          "Technical Risks": { weight: 0.34, objective: "To identify potential challenges and failure points related to the technology development, implementation, or long-term maintenance." },
          "Market Risks": { weight: 0.33, objective: "To assess external uncertainties that could negatively impact the project's market success." },
          "Operational Risks": { weight: 0.33, objective: "To identify potential failures in the day-to-day running of the business." }
        }
      },
      "Investor Attractiveness": {
        subParameters: {
          "ROI Potential": { weight: 0.50, objective: "To estimate the potential return on investment for financiers." },
          "Exit Strategy Feasibility": { weight: 0.50, objective: "To identify clear and attractive paths for investors to realize a return on their investment." }
        }
      },
      "Academic/National Alignment": {
        subParameters: {
          "Research Synergy": { weight: 0.50, objective: "To assess if the project contributes new knowledge, methods, or insights that can advance academic research." },
          "National Priority Alignment": { weight: 0.50, objective: "To determine how well the project aligns with broader national policies and initiatives in India." }
        }
      }
    }
  }
};

export const SCORING_RUBRIC = {
  "5": "Excellent: Strong evidence, highly aligned with success factors, minimal risk, clear advantage.",
  "4": "Good: Positive evidence, generally aligned, minor areas for improvement/risk.",
  "3": "Moderate: Mixed evidence, some clear challenges/risks, requires attention.",
  "2": "Weak: Significant gaps, major challenges/risks, requires substantial rework.",
  "1": "Poor: No evidence, fundamental flaws, highly problematic, major red flags.",
  "N/A": "Not Applicable: The sub-parameter is not relevant to this specific idea."
};

export const VALIDATION_OUTCOMES = {
  "GOOD": {
    "range": "4.0 - 5.0",
    "recommendation": "Approved for Next Step (Consultancy): Idea has strong potential, minimal significant red flags. Focus on execution and scaling."
  },
  "MODERATE": {
    "range": "2.5 - 3.9",
    "recommendation": "Requires AI-Guided Modification & Re-upload: Idea has potential but with notable weaknesses or missing information. Please review the detailed report and make necessary revisions."
  },
  "NOT RECOMMENDED": {
    "range": "1.0 - 2.4",
    "recommendation": "Idea Not Viable (at this stage): Idea has fundamental flaws or significant unaddressed risks. Please consider a fundamental re-evaluation of the core concept."
  }
};

export const MOCK_CLUSTER_DEFINITIONS = SUB_PARAMETER_DEFINITIONS; // Legacy compatibility

// The initial weights for the UI slider components on the "Submit Idea" page
export const INITIAL_CLUSTER_WEIGHTS = {
  "Core Idea & Innovation": 20,
  "Market & Commercial Opportunity": 25,
  "Execution & Operations": 15,
  "Business Model & Strategy": 15,
  "Team & Organizational Health": 10,
  "External Environment & Compliance": 10,
  "Risk & Future Outlook": 5,
};

export let MOCK_IDEAS: Array<{
  id: string;
  title: string;
  description: string;
  collegeId: string;
  collegeName: string;
  domain: string;
  innovatorName: string;
  innovatorEmail: string;
  status: string;
  dateSubmitted: string;
  version: string;
  report: ValidationReport | null; // The new comprehensive report
  clusterWeights?: Record<string, number>; // Legacy
  feedback?: { overall: string; details: { aspect: string; score: number; comment: string }[] } | null; // Legacy
  consultationStatus: string;
  consultationDate: string | null;
  consultationTime: string | null;
  ttcAssigned: string | null;
}> = [
  // Existing ideas can be left as is, new ideas will use the `report` field.
  // Note: For existing ideas, the report page will show "not available".
  {
    id: 'IDEA-001',
    title: 'AI-Powered Smart Farming',
    description: 'An intelligent system using AI to optimize crop yield and detect diseases early.',
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'Agriculture',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Approved',
    dateSubmitted: '2024-07-01',
    version: 'V1.0',
    report: null,
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: {
      overall: 'Excellent idea with strong market potential. Ready for MVP development.',
      details: [
        { aspect: 'Core Idea', score: 4.5, comment: 'Highly innovative approach to agriculture.' },
        { aspect: 'Market Opportunity', score: 4.0, comment: 'Addresses a significant need in modern farming.' },
        { aspect: 'Execution', score: 3.8, comment: 'Technical challenges exist but are surmountable.' },
        { aspect: 'Business Model', score: 4.0, comment: 'Clear revenue streams and sustainable model.' },
        { aspect: 'Team', score: 4.2, comment: 'Strong team with relevant expertise.' },
        { aspect: 'Compliance', score: 4.5, comment: 'Good understanding of regulatory landscape.' },
        { aspect: 'Risk & Strategy', score: 4.0, comment: 'Well-defined strategy and risk mitigation.' },
      ],
    },
    consultationStatus: 'Scheduled',
    consultationDate: '2024-07-20',
    consultationTime: '10:00',
    ttcAssigned: 'TTC_001',
  },
  {
    id: 'IDEA-002',
    title: 'Decentralized Education Platform',
    description: 'A blockchain-based platform for peer-to-peer learning with verified credentials.',
    collegeId: 'COL002',
    collegeName: 'Global School of Innovation',
    domain: 'EdTech',
    innovatorName: 'John Smith',
    innovatorEmail: 'john.smith@example.com',
    status: 'Moderate',
    dateSubmitted: '2024-07-05',
    version: 'V1.0',
    report: null,
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: {
      overall: 'Interesting concept, but scalability and user adoption are concerns. Requires refinement.',
      details: [
        { aspect: 'Core Idea', score: 4.0, comment: 'Novel application of blockchain in education.' },
        { aspect: 'Market Opportunity', score: 2.5, comment: 'Target audience and monetization strategy need refinement.' },
        { aspect: 'Execution', score: 3.0, comment: 'Blockchain integration adds complexity.' },
        { aspect: 'Business Model', score: 2.8, comment: 'Revenue model needs more clarity.' },
        { aspect: 'Team', score: 3.2, comment: 'Team needs more blockchain expertise.' },
        { aspect: 'Compliance', score: 3.5, comment: 'Regulatory aspects of blockchain in education need deeper analysis.' },
        { aspect: 'Risk & Strategy', score: 3.0, comment: 'Scalability risks are significant.' },
      ],
    },
    consultationStatus: 'Pending',
    consultationDate: null,
    consultationTime: null,
    ttcAssigned: null,
  },
];

export let MOCK_CONSULTATIONS = [
  {
    id: 'CONS-001',
    ideaId: 'IDEA-001',
    title: 'Discussion on MVP for Smart Farming',
    date: '2024-07-20',
    time: '10:00 AM',
    mentor: 'Dr. Emily White',
    status: 'Scheduled',
    milestones: ['MVP Scope Defined', 'Tech Stack Selection'],
    files: ['MVP_Proposal_V1.pdf'],
  },
  {
    id: 'CONS-002',
    ideaId: 'IDEA-002',
    title: 'Market Strategy Review for EdTech',
    date: '2024-07-18',
    time: '02:00 PM',
    mentor: 'Prof. Alex Green',
    status: 'Completed',
    milestones: ['Business Model Refined'],
    files: ['Market_Analysis_Feedback.pdf'],
  },
];

export let MOCK_CREDIT_REQUESTS = [
  { id: 'CR-COL-001', requesterType: 'College', requesterId: 'COL001', requesterName: 'Pragati University', amount: 50, status: 'Pending', date: '2024-07-10', purpose: 'Bulk credits for new semester' },
  { id: 'CR-INV-001', requesterType: 'Innovator', requesterId: 'innovator-001', requesterName: 'Jane Doe', amount: 1, status: 'Pending', date: '2024-07-15', purpose: 'Need 1 credit for new idea submission' },
];

export let MOCK_COLLEGES = [
  { id: 'COL001', name: 'Pragati Institute of Technology', principalEmail: 'principal.pit@pragati.com', ttcLimit: 5, creditsAvailable: 100, currentPlanId: 'PLAN001' },
  { id: 'COL002', name: 'Global School of Innovation', principalEmail: 'principal.gsi@pragati.com', ttcLimit: 3, creditsAvailable: 75, currentPlanId: 'PLAN001' },
  { id: 'COL003', name: 'Tech University Chennai', principalEmail: 'principal.tuc@pragati.com', ttcLimit: 7, creditsAvailable: 120, currentPlanId: 'PLAN002' },
];

export let MOCK_PLANS = [
  { id: 'PLAN001', name: 'Essential', pricePerCredit: 500, minCredits: 20, totalAmount: 10000, features: ['20 Idea Submissions', 'Basic Feedback', '5 TTCs'], enabled: true },
  { id: 'PLAN002', name: 'Advance', pricePerCredit: 490, minCredits: 50, totalAmount: 24500, features: ['50 Idea Submissions', 'Detailed Feedback', '10 TTCs', '2 Consultations'], enabled: true },
  { id: 'PLAN003', name: 'Advance Pro', pricePerCredit: 475, minCredits: 100, totalAmount: 47500, features: ['Unlimited Idea Submissions', 'Premium Feedback', '15 TTCs', 'Unlimited Consultations'], enabled: true },
  { id: 'PLAN004', name: 'Enterprises', pricePerCredit: 0, minCredits: 0, totalAmount: 0, features: ['Custom Limits', 'Dedicated Support', 'Tailored Solutions', 'Contact Us for Pricing'], enabled: true },
];

export let MOCK_TTCS = [
  { id: 'TTC_001', name: 'Dr. Priya Sharma', email: 'priya.sharma@pragati.com', collegeId: 'COL001', expertise: ['AI', 'Machine Learning'], maxConsultations: 3, currentConsultations: 1, status: 'Active' },
  { id: 'TTC_002', name: 'Mr. Rahul Verma', email: 'rahul.verma@pragati.com', collegeId: 'COL001', expertise: ['Blockchain', 'FinTech'], maxConsultations: 2, currentConsultations: 0, status: 'Active' },
  { id: 'TTC_003', name: 'Ms. Sneha Reddy', email: 'sneha.reddy@pragati.com', collegeId: 'COL002', expertise: ['Robotics', 'IoT'], maxConsultations: 4, currentConsultations: 0, status: 'Active' },
];

export let MOCK_INNOVATORS = [
  { id: 'INV001', name: 'Jane Doe', email: 'jane.doe@example.com', collegeId: 'COL001', credits: 50, status: 'Active' },
  { id: 'INV002', name: 'John Smith', email: 'john.smith@example.com', collegeId: 'COL002', credits: 30, status: 'Active' },
  { id: 'INV003', name: 'Alice Johnson', email: 'alice.j@example.com', collegeId: 'COL001', credits: 20, status: 'Active' },
  { id: 'INV004', name: 'Bob Brown', email: 'bob.b@example.com', collegeId: 'COL001', credits: 0, status: 'Inactive' },
];

export const MOCK_PRINCIPAL_USERS = [
    { email: 'principal.pit@pragati.com', password: 'principalpass', name: 'Principal PIT', collegeId: 'COL001' },
    { email: 'principal.gsi@pragati.com', password: 'principalpass', name: 'Principal GSI', collegeId: 'COL002' },
    { email: 'principal.tuc@pragati.com', password: 'principalpass', name: 'Principal TUC', collegeId: 'COL003' },
];

export let MOCK_CREDIT_ASSIGNMENT_HISTORY = [
  { id: 1, date: '2024-07-10', ttcId: 'TTC_001', innovatorId: 'INV001', amount: 10, action: 'Assigned' },
  { id: 2, date: '2024-07-12', ttcId: 'TTC_001', innovatorId: 'INV003', amount: 5, action: 'Assigned' },
];

export let MOCK_TTC_AUDIT_TRAIL = [
  { id: 1, timestamp: '2024-07-15 11:00 AM', ttc: 'Dr. Priya Sharma', action: 'Scheduled consultation for IDEA-001' },
  { id: 2, timestamp: '2024-07-15 11:30 AM', ttc: 'Dr. Priya Sharma', action: 'Added feedback for IDEA-001' },
  { id: 3, timestamp: '2024-07-14 02:00 PM', ttc: 'Mr. Rahul Verma', action: 'Viewed Idea IDEA-002 report' },
];

export const STATUS_COLORS: { [key: string]: string } = {
    Validating: 'bg-gray-500 text-white',
    Approved: 'bg-green-500 text-white',
    GOOD: 'bg-green-500 text-white',
    Moderate: 'bg-yellow-500 text-white',
    MODERATE: 'bg-yellow-500 text-white',
    Rejected: 'bg-red-500 text-white',
    'NOT RECOMMENDED': 'bg-red-500 text-white',
    Pending: 'bg-blue-500 text-white',
    Scheduled: 'bg-indigo-500 text-white',
    Completed: 'bg-green-600 text-white',
    Active: 'bg-green-500 text-white',
    Inactive: 'bg-gray-500 text-white',
    Locked: 'bg-red-600 text-white',
    'Not Requested': 'bg-gray-400 text-white',
  };

  export const MOCK_SCORING_PRESETS = {
    "Balanced": {
      "Core Idea": 15, "Market Opportunity": 20, "Execution": 20,
      "Business Model": 15, "Team": 10, "Compliance": 10, "Risk & Strategy": 10
    },
    "Research": {
      "Core Idea": 30, "Market Opportunity": 10, "Execution": 15,
      "Business Model": 15, "Team": 10, "Compliance": 10, "Risk & Strategy": 10
    },
    "Commercialization": {
      "Core Idea": 10, "Market Opportunity": 30, "Execution": 15,
      "Business Model": 15, "Team": 10, "Compliance": 10, "Risk & Strategy": 10
    },
  };