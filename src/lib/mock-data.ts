
import type { ValidationReport } from '@/ai/schemas';
import { ROLES, type Role } from './constants';

export const MOCK_INNOVATOR_USER = {
  id: 'innovator-001',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  password: 'innovatorpass',
  isEmailVerified: true,
  isAccountLocked: false,
  credits: 50,
  college: 'Pragati University',
  role: 'Innovator',
};

export const MOCK_PRINCIPAL_USERS = [
  {
    id: 'principal-001',
    name: 'Dr. Evelyn Reed',
    email: 'principal.reed@example.com',
    collegeId: 'COL001',
    role: 'College Principal Admin',
  }
];


export const MOCK_COLLEGES = [
    {
        id: 'COL001',
        name: 'Pragati Institute of Technology',
        principalEmail: 'principal.reed@example.com',
        status: 'Active',
        creditsAvailable: 100,
        ttcLimit: 5,
        currentPlanId: 'PLAN002-M'
    },
    {
        id: 'COL002',
        name: 'Vanguard College of Engineering',
        principalEmail: 'principal.vanguard@example.com',
        status: 'Active',
        creditsAvailable: 250,
        ttcLimit: 10,
        currentPlanId: 'PLAN003-Y'
    },
     {
        id: 'COL003',
        name: 'Apex University for the Arts',
        principalEmail: 'principal.apex@example.com',
        status: 'Inactive',
        creditsAvailable: 0,
        ttcLimit: 2,
        currentPlanId: 'PLAN001-M'
    }
];

export const MOCK_TTCS = [
    {
        id: 'TTC001',
        name: 'Dr. Emily White',
        email: 'emily.white@example.com',
        collegeId: 'COL001',
        expertise: ['HealthTech', 'AI/ML'],
        status: 'Active'
    },
    {
        id: 'TTC002',
        name: 'Dr. Raj Patel',
        email: 'raj.patel@example.com',
        collegeId: 'COL001',
        expertise: ['FinTech', 'Blockchain'],
        status: 'Active'
    },
    {
        id: 'TTC003',
        name: 'Dr. Priya Singh',
        email: 'priya.singh@example.com',
        collegeId: 'COL002',
        expertise: ['EdTech', 'SaaS'],
        status: 'Inactive'
    }
];

export const MOCK_INNOVATORS = [
    { id: 'INV001', name: 'Jane Doe', email: 'jane.doe@example.com', collegeId: 'COL001', credits: 50, status: 'Active' },
    { id: 'INV002', name: 'John Smith', email: 'john.smith@example.com', collegeId: 'COL001', credits: 20, status: 'Active' },
    { id: 'INV003', name: 'Alisha Khan', email: 'alisha.khan@example.com', collegeId: 'COL002', credits: 75, status: 'Active' },
    { id: 'INV004', name: 'Mike Johnson', email: 'mike.johnson@example.com', collegeId: 'COL001', credits: 10, status: 'Inactive' },
];


export const MOCK_PLANS = [
    { id: 'PLAN001-M', name: 'Innovator Monthly', interval: 'monthly', pricePerCredit: 1000, minCredits: 10, totalAmount: 10000, features: ['10 credits/month', 'Basic support'], enabled: true },
    { id: 'PLAN002-M', name: 'Institution Monthly', interval: 'monthly', pricePerCredit: 800, minCredits: 50, totalAmount: 40000, features: ['50 credits/month', 'Priority support', 'TTC module'], enabled: true },
    { id: 'PLAN003-M', name: 'Enterprises Monthly', interval: 'monthly', pricePerCredit: 0, minCredits: 0, totalAmount: 0, features: ['Unlimited credits', 'Dedicated support', 'All modules'], enabled: false },
    { id: 'PLAN001-Y', name: 'Innovator Yearly', interval: 'yearly', pricePerCredit: 850, minCredits: 120, totalAmount: 102000, features: ['120 credits/year', 'Basic support'], enabled: true },
    { id: 'PLAN002-Y', name: 'Institution Yearly', interval: 'yearly', pricePerCredit: 650, minCredits: 600, totalAmount: 390000, features: ['600 credits/year', 'Priority support', 'TTC module'], enabled: true },
    { id: 'PLAN003-Y', name: 'Enterprises Yearly', interval: 'yearly', pricePerCredit: 0, minCredits: 0, totalAmount: 0, features: ['Unlimited credits', 'Dedicated support', 'All modules'], enabled: true },
];


export const MOCK_CREDIT_REQUESTS = [
    { id: 'CR-TTC-001', requesterType: 'TTC' as const, requesterId: 'TTC002', requesterName: 'Dr. Raj Patel', amount: 50, status: 'Pending' as const, date: '2024-07-28', purpose: 'Need more credits for the upcoming hackathon.' },
    { id: 'CR-INV-001', requesterType: 'Innovator' as const, requesterId: 'INV002', requesterName: 'John Smith', amount: 10, status: 'Pending' as const, date: '2024-07-29', purpose: 'To resubmit my idea after making improvements.' },
    { id: 'CR-TTC-002', requesterType: 'TTC' as const, requesterId: 'TTC001', requesterName: 'Dr. Emily White', amount: 20, status: 'Approved' as const, date: '2024-07-25', purpose: 'Credits for new innovators.' },
    { id: 'CR-INV-002', requesterType: 'Innovator' as const, requesterId: 'INV003', requesterName: 'Alisha Khan', amount: 5, status: 'Rejected' as const, date: '2024-07-22', purpose: 'New idea submission.' },
];

export const MOCK_CREDIT_ASSIGNMENT_HISTORY = [
    { id: 'CA-001', ttcId: 'TTC001', innovatorId: 'INV001', amount: 10, date: '2024-07-20', action: 'Assigned' },
    { id: 'CA-002', ttcId: 'TTC001', innovatorId: 'INV002', amount: 5, date: '2024-07-21', action: 'Assigned' },
];

export const MOCK_TTC_AUDIT_TRAIL = [
    { id: 'AT-001', ttc: 'Dr. Emily White', timestamp: '2024-07-20 10:00 AM', action: 'Logged In' },
    { id: 'AT-002', ttc: 'Dr. Emily White', timestamp: '2024-07-20 10:05 AM', action: 'Assigned 10 credits to INV001' },
    { id: 'AT-003', ttc: 'Dr. Raj Patel', timestamp: '2024-07-21 11:00 AM', action: 'Viewed report for IDEA-002' },
];

export const MOCK_PRINCIPAL_AUDIT_TRAIL = [
    { id: 'PAT-001', actor: 'Dr. Evelyn Reed', timestamp: '2024-07-28 09:00 AM', action: 'Logged In' },
    { id: 'PAT-002', actor: 'Dr. Evelyn Reed', timestamp: '2024-07-28 09:05 AM', action: 'Approved credit request for Dr. Emily White' },
];


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
  "100-85": "Excellent: Strong evidence, highly aligned with success factors, minimal risk, clear advantage.",
  "84-70": "Good: Positive evidence, generally aligned, minor areas for improvement/risk.",
  "69-50": "Moderate: Mixed evidence, some clear challenges/risks, requires attention.",
  "49-25": "Weak: Significant gaps, major challenges/risks, requires substantial rework.",
  "24-1": "Poor: No evidence, fundamental flaws, highly problematic, major red flags.",
  "N/A": "Not Applicable: The sub-parameter is not relevant to this specific idea."
};


export const VALIDATION_OUTCOMES = {
  "Approved": {
    "range": "85-100",
    "recommendation": "Rocket Fuel! This idea is cleared for launch. Let's make it happen!"
  },
  "Moderate": {
    "range": "50-84",
    "recommendation": "Diamond in the Rough! There's solid potential here. Polish it up with the feedback and resubmit."
  },
  "Rejected": {
    "range": "0-49",
    "recommendation": "Back to the Lab! A great learning opportunity. Rethink the core concept and come back stronger."
  }
};

export const MOCK_CLUSTER_DEFINITIONS = SUB_PARAMETER_DEFINITIONS;

export const INITIAL_CLUSTER_WEIGHTS = {
  "Core Idea & Innovation": 20,
  "Market & Commercial Opportunity": 25,
  "Execution & Operations": 15,
  "Business Model & Strategy": 15,
  "Team & Organizational Health": 10,
  "External Environment & Compliance": 10,
  "Risk & Future Outlook": 5,
};

export const MOCK_SCORING_PRESETS = {
  "Balanced": {
    "Core Idea & Innovation": 20,
    "Market & Commercial Opportunity": 25,
    "Execution & Operations": 15,
    "Business Model & Strategy": 15,
    "Team & Organizational Health": 10,
    "External Environment & Compliance": 10,
    "Risk & Future Outlook": 5,
  },
  "Research-Focused": {
    "Core Idea & Innovation": 30,
    "Market & Commercial Opportunity": 10,
    "Execution & Operations": 20,
    "Business Model & Strategy": 10,
    "Team & Organizational Health": 10,
    "External Environment & Compliance": 10,
    "Risk & Future Outlook": 10
  },
  "Commercialization-Focused": {
    "Core Idea & Innovation": 10,
    "Market & Commercial Opportunity": 30,
    "Execution & Operations": 15,
    "Business Model & Strategy": 20,
    "Team & Organizational Health": 10,
    "External Environment & Compliance": 5,
    "Risk & Future Outlook": 10
  },
};


export const STATUS_COLORS: Record<string, string> = {
  'Approved': 'bg-green-500 text-white',
  'Exemplary': 'bg-green-500 text-white',
  'High Potential': 'bg-green-500 text-white',
  'Moderate': 'bg-yellow-500 text-white',
  'Developing': 'bg-yellow-500 text-white',
  'Rejected': 'bg-red-500 text-white',
  'Needs Refinement': 'bg-red-500 text-white',
  'Scheduled': 'bg-blue-500 text-white',
  'Pending': 'bg-gray-500 text-white',
  'Completed': 'bg-green-700 text-white',
  'Cancelled': 'bg-red-700 text-white',
  'Active': 'bg-green-500 text-white',
  'Inactive': 'bg-gray-500 text-white',
};

export const MOCK_IDEAS: {
  id: string;
  innovatorId: string;
  validationId: string;
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
  report: ValidationReport | null;
  clusterWeights: Record<string, number>;
  feedback: { overall: string; details: { aspect: string; score: number; comment: string }[] } | null;
  consultationStatus: 'Not Requested' | 'Pending' | 'Scheduled' | 'Completed' | 'Cancelled';
  consultationDate: string | null;
  consultationTime: string | null;
  ttcAssigned: string | null;
}[] = [
  {
    id: 'IDEA-001',
    innovatorId: 'INV001',
    validationId: 'VALID-001-001',
    title: "AI-Powered Smart Farming",
    description: "An intelligent system using AI to optimize crop yield and detect diseases early.",
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'Agriculture',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Approved',
    dateSubmitted: '2024-01-15',
    version: 'V1.0',
    report: null, // This will be populated later
    clusterWeights: { ...INITIAL_CLUSTER_WEIGHTS },
    feedback: null,
    consultationStatus: 'Scheduled',
    consultationDate: '2024-07-20',
    consultationTime: '11:00 AM',
    ttcAssigned: 'TTC001'
  },
  {
    id: 'IDEA-002',
    innovatorId: 'INV002',
    validationId: 'VALID-002-001',
    title: "Blockchain for Supply Chain",
    description: "A decentralized ledger for transparent and secure supply chain management.",
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'FinTech',
    innovatorName: 'John Smith',
    innovatorEmail: 'john.smith@example.com',
    status: 'Moderate',
    dateSubmitted: '2024-02-20',
    version: 'V1.0',
    report: null,
    clusterWeights: { ...INITIAL_CLUSTER_WEIGHTS },
    feedback: null,
    consultationStatus: 'Completed',
    consultationDate: '2024-06-15',
    consultationTime: '02:00 PM',
    ttcAssigned: 'TTC002'
  },
   {
    id: 'IDEA-003',
    innovatorId: 'INV001',
    validationId: 'VALID-003-001',
    title: "HealthTech Wearable for Seniors",
    description: "A wearable device that monitors vital signs and provides emergency alerts for seniors.",
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'HealthTech',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Rejected',
    dateSubmitted: '2024-03-10',
    version: 'V1.0',
    report: null,
    clusterWeights: { ...INITIAL_CLUSTER_WEIGHTS },
    feedback: null,
    consultationStatus: 'Not Requested',
    consultationDate: null,
    consultationTime: null,
    ttcAssigned: 'TTC001'
  },
   {
    id: 'IDEA-004',
    innovatorId: 'INV003',
    validationId: 'VALID-004-001',
    title: "AI Tutor for K-12",
    description: "A personalized AI tutor that adapts to each student's learning pace.",
    collegeId: 'COL002',
    collegeName: 'Vanguard College of Engineering',
    domain: 'EdTech',
    innovatorName: 'Alisha Khan',
    innovatorEmail: 'alisha.khan@example.com',
    status: 'Approved',
    dateSubmitted: '2024-04-05',
    version: 'V1.0',
    report: null,
    clusterWeights: { ...INITIAL_CLUSTER_WEIGHTS },
    feedback: null,
    consultationStatus: 'Pending',
    consultationDate: '2024-08-05',
    consultationTime: '03:00 PM',
    ttcAssigned: 'TTC003'
  },
  {
    id: 'IDEA-005',
    innovatorId: 'INV001',
    validationId: 'VALID-005-001',
    title: "Personalized Financial Advisor Bot",
    description: "An AI-powered chatbot that provides personalized financial advice.",
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'FinTech',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Moderate',
    dateSubmitted: '2024-05-22',
    version: 'V1.0',
    report: null,
    clusterWeights: { ...INITIAL_CLUSTER_WEIGHTS },
    feedback: null,
    consultationStatus: 'Not Requested',
    consultationDate: null,
    consultationTime: null,
    ttcAssigned: 'TTC002'
  }
];

export const MOCK_CONSULTATIONS = [
    {
        id: 'CONS-001',
        ideaId: 'IDEA-001',
        innovatorId: 'INV001',
        title: 'Discussion on MVP for Smart Farming',
        date: '2024-07-20',
        time: '11:00 AM',
        mentor: 'Dr. Emily White',
        status: 'Scheduled',
        milestones: ['Finalize sensor selection', 'Develop prototype roadmap'],
        files: ['SmartFarming_Pitch_V2.pdf', 'Sensor_Comparison.xlsx'],
    },
    {
        id: 'CONS-002',
        ideaId: 'IDEA-002',
        innovatorId: 'INV002',
        title: 'Review of Blockchain Architecture',
        date: '2024-06-15',
        time: '02:00 PM',
        mentor: 'Dr. Raj Patel',
        status: 'Completed',
        milestones: ['Decide on consensus algorithm', 'Outline smart contract logic'],
        files: ['SupplyChain_Architecture.png'],
    },
];

export const MOCK_NOTIFICATIONS: Record<Role, { id: number, title: string, description: string, read: boolean }[]> = {
  [ROLES.INNOVATOR]: [
    { id: 1, title: 'Report Ready: IDEA-005', description: 'Your validation report for "Personalized Financial Advisor Bot" is now available.', read: false },
    { id: 2, title: 'Consultation Confirmed', description: 'Your meeting with Dr. Emily White for IDEA-001 is confirmed for July 20th.', read: true },
  ],
  [ROLES.COORDINATOR]: [
    { id: 1, title: 'New Consultation Request', description: 'John Smith has requested a consultation for IDEA-002.', read: false },
    { id: 2, title: 'Credit Request from Innovator', description: 'Jane Doe has requested 10 additional credits.', read: false },
  ],
  [ROLES.PRINCIPAL]: [
    { id: 1, title: 'Credit Request from TTC', description: 'Dr. Emily White has requested 50 credits for her innovators.', read: false },
    { id: 2, title: 'Monthly Report Available', description: 'Your college\'s monthly innovation report for June is ready.', read: true },
  ],
  [ROLES.SUPER_ADMIN]: [
    { id: 1, title: 'New Institution Onboarded', description: 'Vanguard College of Engineering has joined PragatiAI.', read: true },
    { id: 2, title: 'High-Risk Idea Flagged', description: 'IDEA-003 has been flagged for manual review due to a very low score.', read: false },
  ],
};


// Populate mock reports after defining MOCK_IDEAS
MOCK_IDEAS.forEach(idea => {
    if(idea.status !== 'Pending') {
      let score = 0;
      if (idea.status === 'Approved') score = Math.floor(Math.random() * 16) + 85; // 85-100
      if (idea.status === 'Moderate') score = Math.floor(Math.random() * 25) + 50; // 50-74
      if (idea.status === 'Rejected') score = Math.floor(Math.random() * 40) + 10; // 10-49

      const getOutcome = (score: number) => {
        if (score >= 85) return "High Potential";
        if (score >= 50) return "Moderate";
        return "Needs Improvement";
      }
      
      const newReport: ValidationReport = JSON.parse(JSON.stringify(reportData));
      newReport.ideaName = idea.title;
      newReport.overallScore = score;
      newReport.outcome = getOutcome(score);
      newReport.preparedFor = idea.innovatorName;
      newReport.date = new Date().toISOString().split('T')[0];

      idea.report = newReport;
    }
});
