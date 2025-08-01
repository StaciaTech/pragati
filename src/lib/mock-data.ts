
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

export const MOCK_CONSULTATIONS = [
    {
      id: 'CONS001',
      ideaId: 'IDEA-001',
      title: 'AI-Powered Crop Disease Detection',
      innovatorId: 'INV001',
      ttcId: 'TTC001',
      mentor: 'Dr. Emily White',
      date: '2024-08-15',
      time: '11:00 AM',
      status: 'Scheduled',
      milestones: ['Finalize MVP features', 'Develop go-to-market strategy'],
      files: ['Pitch_Deck_v2.pptx', 'Market_Analysis.pdf'],
    },
    {
      id: 'CONS002',
      ideaId: 'IDEA-002',
      title: 'Blockchain-Based Voting System',
      innovatorId: 'INV002',
      ttcId: 'TTC002',
      mentor: 'Dr. Raj Patel',
      date: '2024-08-20',
      time: '02:00 PM',
      status: 'Scheduled',
      milestones: ['Validate technical architecture', 'Review security protocols'],
      files: ['Technical_Whitepaper.pdf'],
    },
    {
      id: 'CONS003',
      ideaId: 'IDEA-003',
      title: 'Gamified Language Learning App',
      innovatorId: 'INV003',
      ttcId: 'TTC003',
      mentor: 'Dr. Priya Singh',
      date: '2024-07-25',
      time: '10:00 AM',
      status: 'Completed',
      milestones: ['Initial concept discussion'],
      files: ['Concept_Note.docx'],
    },
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

export const MOCK_NOTIFICATIONS = {
  [ROLES.INNOVATOR]: [
    { id: '1', title: 'Report Ready!', description: 'Your report for "AI Crop Health Monitor" is complete.', read: false },
    { id: '2', title: 'Consultation Confirmed', description: 'Your meeting with Dr. White is set for Aug 15.', read: true },
  ],
  [ROLES.COORDINATOR]: [
    { id: '3', title: 'New Consultation Request', description: 'Jane Doe requested a consultation for "AI Crop Health".', read: false },
  ],
  [ROLES.PRINCIPAL]: [
    { id: '4', title: 'Credit Request', description: 'Dr. Patel has requested 50 credits for a hackathon.', read: false },
  ],
  [ROLES.SUPER_ADMIN]: [
    { id: '5', title: 'New Institution Onboarded', description: 'Vanguard College has joined PragatiAI.', read: true },
  ],
};

export const MOCK_SAMPLE_REPORT: ValidationReport = {
  ideaName: "Hydrogen Smart Bottle",
  preparedFor: "[Innovator Name]",
  date: "August 1, 2025",
  overallScore: 92,
  outcome: "Extremely High Potential. The idea is highly disruptive and financially viable, provided a strategic and quality-focused approach is adopted.",
  executiveSummary: "The Hydrogen smart bottle is a dual-function, portable, and rechargeable device designed to actively heat and cool beverages. This product is a paradigm-shifting concept within the insulated drinkware market, moving from passive temperature maintenance to active, on-demand control. The idea is not merely an improvement but a new product category entirely, positioned at the intersection of consumer electronics, personal wellness, and lifestyle gadgets.\n\nBased on an in-depth analysis of market data, consumer behavior, and competitive intelligence, the Hydrogen smart bottle has an Overall Viability Score of 92/100, indicating Extremely High Potential. The primary opportunities are its unique, defensible value proposition and a growing consumer appetite for innovative smart devices. The main challenges are high initial manufacturing costs, the need to build a premium brand from scratch, and the technical complexity of ensuring product reliability. Success is contingent upon meticulous execution, a flawless user experience, and a strategic brand narrative that justifies its premium price point.",
  keyStrengths: [
    "Disruptive Dual-Functionality: Unlike existing smart mugs (e.g., Ember, which only heats), Hydrogen's ability to both heat and cool in a portable format creates a new product category. This is a blue ocean strategy within a saturated market.",
    "Strong Market Growth: The global smart water bottle market is projected to grow from ₹1,003 crore in 2021 to over ₹1,787 crore by 2028, with a Compound Annual Growth Rate (CAGR) of 8.6% (Source: Grand View Research). Hydrogen's features place it at the premium, high-growth end of this segment.",
    "High Perceived Value: The \"wow\" factor of on-demand temperature control justifies a significant price premium, appealing to early adopters and tech-savvy consumers who value innovation and convenience."
  ],
  keyWeaknesses: [
    "High Manufacturing Cost: The Cost of Goods Sold (COGS) will be significantly higher than for a standard insulated bottle. Key components like the thermoelectric Peltier module (est. ₹1,252 - ₹1,670), a high-capacity lithium-ion battery (est. ₹1,670 - ₹2,505), and control circuitry are expensive, necessitating a high retail price.",
    "Established Competitor Brand Loyalty: Brands like Yeti and Hydro Flask have built decades of loyalty and brand equity. Convincing their customers to switch to a new, higher-priced product requires a substantial marketing investment.",
    "Complex R&D and QA: Miniaturizing heating and cooling technology while ensuring safety, a leak-proof design, and reliable battery life is a complex engineering challenge that requires significant upfront capital investment."
  ],
  criticalRisks: [
    {
      title: "High Price Point & Market Acceptance",
      description: "Our market analysis shows that while consumers are willing to pay a premium for insulated drinkware (Yeti mugs can exceed ₹4,175), the price sensitivity increases dramatically for products in the ₹12,525 - ₹20,875 range. A high price could limit the addressable market to a niche audience and lead to low sales volume, failing to achieve profitability. For a new brand, a high price tag creates a significant barrier to entry, as consumers will default to trusted, cheaper alternatives.",
      mitigation: "Premium Brand Positioning: Position Hydrogen as a luxury lifestyle gadget rather than a simple insulated bottle. Focus messaging on the technology, design, and unparalleled convenience. Targeted Marketing: Initially target affluent consumers, tech enthusiasts, and corporate gift markets where price is a secondary consideration to unique features and prestige. Tiered Product Line: Launch with a flagship premium model to build brand equity, and later introduce a smaller, more affordable version to capture a broader market."
    },
    {
      title: "Product Durability & Reliability Failure",
      description: "For new electronic devices, negative reviews and word-of-mouth are particularly damaging. Data from product recalls for smart devices shows that battery failures and overheating are common and lead to permanent brand damage (Source: U.S. Consumer Product Safety Commission). A single leak or battery failure could lead to a product recall and permanently damage brand reputation, making future sales impossible.",
      mitigation: "Rigorous QA Testing: Invest in comprehensive quality assurance protocols that include stress-testing the bottle for leaks, drops, and prolonged use in various environmental conditions. Extended Warranty: Offer a two-year or longer warranty to demonstrate confidence in the product and provide peace of mind to consumers, which is a powerful tool for justifying a high price point. Proactive Customer Support: Establish a responsive customer support team to address and resolve issues quickly, turning potential negative experiences into positive ones and gathering crucial feedback for future product improvements."
    }
  ],
  competitiveAnalysis: [
    {
      competitor: "Yeti",
      products: "Rambler Tumblers, Mugs",
      features: "Superior passive insulation, extreme durability, wide range of sizes.",
      priceRange: "₹2,087 - ₹5,010+",
      strengths: "Unmatched brand loyalty, reputation for durability, massive market share.",
      weaknesses: "No active temperature control, heavy, expensive for passive insulation."
    },
    {
      competitor: "Hydro Flask",
      products: "Standard Mouth Bottles",
      features: "Excellent passive insulation, vibrant colors, lightweight, strong brand following.",
      priceRange: "₹2,505 - ₹4,175+",
      strengths: "Strong brand in the outdoor/fitness space, wide distribution, loyal customer base.",
      weaknesses: "No active temperature control, can’t heat beverages."
    },
    {
      competitor: "Ember",
      products: "Ember Mug 2, Ember Travel Mug 2",
      features: "Active heating to a set temperature, app control, sleek design.",
      priceRange: "₹10,855 - ₹16,700+",
      strengths: "Pioneered the \"smart mug\" category, strong tech integration, solves a single problem well.",
      weaknesses: "Only heats, not a \"bottle\" form factor (not portable for hiking, etc.), no cooling functionality."
    },
    {
      competitor: "Hydrogen",
      products: "Smart Bottle",
      features: "Dual active heating & cooling, rechargeable, portable bottle design.",
      priceRange: "Est. ₹15,030 - ₹20,875",
      strengths: "Unique dual functionality, portability, tech-forward design.",
      weaknesses: "New to market, no brand equity, high price point, unproven durability."
    }
  ],
  detailedPricing: {
    cogsBreakdown: [
      { item: "Peltier Module", cost: "₹1,252" },
      { item: "Lithium-Ion Battery (3.7V, 5000mAh)", cost: "₹1,670" },
      { item: "Control Board & Sensors", cost: "₹835" },
      { item: "Stainless Steel/Plastic Housing", cost: "₹1,002" },
      { item: "Insulation & Seals", cost: "₹417" },
      { item: "Packaging & Accessories", cost: "₹250" },
      { item: "Sub-Total BOM", cost: "₹5,426" },
    ],
    manufacturingAndAssembly: "An industry-standard mark-up of 30-40% on the BOM is applied by a contract manufacturer.",
    estimatedCogs: "₹7,500",
    retailPricingStrategy: "Derivation: We have a COGS of approximately ₹7,500 per unit. To be profitable and cover all R&D, marketing, and operational expenses, a healthy gross margin of at least 60% is required. Target Gross Margin: 60%. Calculation: Retail Price = COGS / (1 - Gross Margin) -> ₹7,500 / (1 - 0.60) = ₹18,750. Competitor Precedent: The Ember Travel Mug, which only heats, retails for over ₹16,700. This sets a clear precedent for consumer acceptance of a high-priced, single-function device. Our derived retail price of ₹18,750 is justified by the dual functionality. Final Recommendation: We will target a retail price of ₹18,750 for the launch model. This price point allows for healthy gross margins and positions the product as a premium, technologically advanced device."
  },
  actionPlan: {
    urgent: [
      "Finalize Engineering Design: Lock down the final design specifications, focusing on a secure, leak-proof bottle and an elegant user interface.",
      "Component Sourcing: Secure firm quotes and establish partnerships with key suppliers for the Peltier module, batteries, and other core components to fix manufacturing costs.",
      "Prototyping & Field Testing: Build a functional, polished prototype and distribute it to a small group of \"super users\" (tech reviewers, influencers) for rigorous, unbiased feedback."
    ],
    highPriority: [
      "Patent Application: File for key design and utility patents to protect the dual-functionality technology and unique form factor.",
      "Manufacturing Partnership: Finalize an agreement with a contract manufacturer (CM) that specializes in consumer electronics, has strong QA processes, and can scale production.",
      "Branding & Marketing Assets: Develop a cohesive brand story, create professional photography and video, and launch a landing page to begin collecting email sign-ups."
    ],
    midPriority: [
      "Crowdfunding Campaign: Launch a pre-order campaign on a platform like Kickstarter to secure initial funding, validate demand, and build a community before full-scale production.",
      "Customer Support Infrastructure: Set up a customer service and logistics system to handle inquiries, returns, and warranty claims.",
      "Full-Scale Production & Launch: Begin the first production run and officially launch the product to the public."
    ]
  },
  detailedValidationAndScoring: {
    "Core Idea & Product": [
      { parameter: "Novelty & Uniqueness", description: "The degree to which the core idea is a new concept, not an incremental improvement on an existing product.", inference: "The dual heating and cooling functionality is a significant innovation that moves beyond passive insulation. This creates a new product category, not just a better version of an existing one.", score: "10/10", justification: "The product's core innovation is a direct response to a significant, unaddressed market need. It has a high degree of uniqueness and defensibility.", suggestions: "Focus on securing intellectual property around the dual-functionality mechanism to prevent fast-followers from copying the core technology." },
      { parameter: "Differentiation", description: "How the product stands out from competitors and offers a unique value proposition.", inference: "Hydrogen's key differentiator is its dual functionality (heating and cooling) in a portable bottle form factor. This positions it uniquely against single-function products like Ember and passive-only bottles like Yeti.", score: "10/10", justification: "This score is a perfect 10 because the product's core innovation is a direct response to a significant, unaddressed market need. It has a high degree of uniqueness and defensibility.", suggestions: "Focus on securing intellectual property around the dual-functionality mechanism to prevent fast-followers from copying the core technology." },
      { parameter: "Problem Severity", description: "The intensity and frequency of the problem the product solves.", inference: "The problem of beverages losing their ideal temperature is a frequent and frustrating experience for consumers. It is a universal pain point that the product directly addresses.", score: "9/10", justification: "The problem is highly severe for the target demographic and is a major, unaddressed psychological barrier to entry in the insulated drinkware market.", suggestions: null },
      { parameter: "Solution Effectiveness", description: "The degree to which the product effectively and efficiently solves the identified problem.", inference: "The product's value is immediate and tangible. The dual heating and cooling functionality provides convenience and satisfaction by actively maintaining the ideal temperature of a beverage.", score: "9/10", justification: "The value proposition is extremely strong, but it is not entirely novel, as passive insulation bottles address a similar, albeit less complete, need. The score reflects its high potential.", suggestions: "Create a simple, powerful message: \"The perfect temperature, always.\" This instantly communicates the core value proposition without needing a lengthy explanation, differentiating it from passive-only brands." },
      { parameter: "Intuitive Design", description: "The ease with which a new user can understand and operate the product without a manual.", inference: "The product's physical interface should be simple and intuitive, with clear controls for heating and cooling. The companion app should be minimalist and easy to navigate.", score: "8/10", justification: "While the concept is simple, the implementation of a user-friendly app is a crucial, but solvable, design challenge. The score reflects the potential for a great UX with proper focus.", suggestions: null },
      { parameter: "Accessibility Compliance", description: "The product's potential to be used by individuals with disabilities.", inference: "The app interface can be made accessible with screen reader support and customizable font sizes. The physical buttons should have tactile feedback and be easy to press for those with motor skill impairments.", score: "7/10", justification: "This parameter is not a core part of the MVP but is a high-value suggestion for future development. The base product has a good foundation for accessibility.", suggestions: null }
    ],
    "Market & Customers": [
      { parameter: "Market Size (TAM)", description: "The total potential market for the product, expressed in monetary terms.", inference: "The market is substantial and growing. The global insulated drinkware market was valued at ₹4,810 crore in 2023 and is expected to grow at a CAGR of 6.2% from 2024 to 2030 (Source: Grand View Research). Hydrogen is well-positioned to capture a high-end niche within this larger market.", score: "9/10", justification: "The market is not only large but also experiencing steady growth. This provides a strong foundation for a new product, even in a competitive landscape.", suggestions: null },
      { parameter: "Competitive Intensity", description: "The number and strength of direct and indirect competitors.", inference: "The competitive intensity is moderate. While there are many players in the insulated drinkware space, there are no direct competitors offering a portable, dual heating and cooling solution.", score: "8/10", justification: "The market is not \"empty,\" but the direct competition is non-existent, which is an ideal position for a new, innovative product.", suggestions: null },
      { parameter: "Regulatory Landscape", description: "The legal and governmental environment that may impact the product's development and launch in India.", inference: "The product will need to comply with Bureau of Indian Standards (BIS) regulations for electronics and consumer safety. The use of a connected device also brings in data privacy and cybersecurity regulations.", score: "8/10", justification: "The regulatory landscape is clear, but compliance can be complex. This is a solvable risk but requires careful planning and resources.", suggestions: null },
      { parameter: "Infrastructure Readiness", description: "The availability of necessary infrastructure (logistics, payments, power) for the product to function effectively.", inference: "India has a robust and rapidly growing e-commerce and logistics infrastructure, which supports a D2C model. The widespread availability of Wi-Fi and smartphones in urban areas makes the product's core functionality viable.", score: "9/10", justification: "The Indian market is well-prepared for a product like Hydrogen. The D2C model can be executed with minimal friction, thanks to the country's digital infrastructure.", suggestions: null },
      { parameter: "User Engagement", description: "The potential for users to frequently and enthusiastically interact with the product.", inference: "The product is designed for daily use and provides an immediate, tangible benefit. The companion app can provide features like temperature customization and battery life monitoring to boost engagement.", score: "9/10", justification: "The engagement potential is high due to the daily use case and the immediate, satisfying user experience.", suggestions: null },
      { parameter: "Retention Potential", description: "The likelihood of customers continuing to use the product over the long term.", inference: "The product has high retention potential due to its utility and convenience. The value proposition of \"perfect temperature, always\" is a powerful hook that ensures long-term use.", score: "9/10", justification: "The product is a durable good with a high perceived value. It is a \"sticky\" product that customers will likely use for a long time.", suggestions: null }
    ],
    "Execution": [
      { parameter: "Technology Maturity", description: "The readiness and stability of the core technologies required for the product.", inference: "The core technologies (Peltier modules, lithium-ion batteries, control circuitry) are mature and widely available. The challenge lies in miniaturizing these components and integrating them into a safe, reliable, and leak-proof bottle.", score: "8/10", justification: "The technology is proven, but the engineering of the final product is a key technical risk. With a strong team and adequate capital, this is a highly feasible project.", suggestions: null },
      { parameter: "Scalability & Performance", description: "The ability of the product and its technology to handle a growing user base and demand.", inference: "The physical product is a one-time purchase, so scalability is primarily a manufacturing and supply chain challenge. The app's backend will need to be built on a scalable cloud infrastructure to handle a large user base without performance degradation.", score: "9/10", justification: "The product's nature as a one-time purchase simplifies the technical scalability challenge. The manufacturing side is a known, manageable risk.", suggestions: null },
      { parameter: "Resource Availability", description: "The availability of the necessary talent, capital, and partnerships.", inference: "India has a deep talent pool in both hardware engineering and software development. The venture capital ecosystem is also mature, with a growing appetite for hardware and IoT startups.", score: "9/10", justification: "The operational environment in India is highly supportive of a venture like Hydrogen, providing a strong foundation for execution.", suggestions: null },
      { parameter: "Process Efficiency", description: "The efficiency of the business processes, from manufacturing to customer support.", inference: "A D2C model allows for tight control over the entire process. Automated order fulfillment and a robust customer support system will be key to maintaining efficiency as the business grows.", score: "8/10", justification: "This is a manageable risk. The processes can be built from the ground up to be efficient, but it requires continuous monitoring and optimization.", suggestions: null },
      { parameter: "Business Model Scalability", description: "The potential to expand the business model beyond the initial product.", inference: "The business model is highly scalable. The core technology can be adapted to other products like smart tumblers, travel mugs, and even larger car-based beverage holders.", score: "10/10", justification: "The business model is not limited to a single product. It can be a platform for a full ecosystem of smart drinkware, giving it massive scalability potential.", suggestions: null },
      { parameter: "Market Expansion Potential", description: "The ease with which the product can be launched in new geographic markets.", inference: "The product's universal utility and the global market for smart home devices make it highly suitable for international expansion. The core technology and design will not require significant localization.", score: "9/10", justification: "The product has global appeal. The primary challenge would be regulatory compliance and logistics in new markets, which is a manageable risk.", suggestions: null }
    ],
    "Business Model": [
      { parameter: "Revenue Stream Diversity", description: "The number and types of revenue streams the business can generate.", inference: "The primary revenue stream is direct sales of the hardware. Secondary streams can be generated from accessories like replacement batteries, custom lids, and specialized cleaning tools. This provides multiple income streams and increases the lifetime value of a customer.", score: "9/10", justification: "The revenue model is straightforward and has proven ancillary opportunities, which strengthens its long-term potential.", suggestions: null },
      { parameter: "Profitability & Margins", description: "The potential for the business to achieve and maintain healthy profit margins.", inference: "With a target gross margin of 60% on the hardware and potential for high-margin accessory sales, the business has strong profitability potential.", score: "9/10", justification: "The pricing and cost structure have been carefully planned to ensure strong profitability from the outset, which is a major strength.", suggestions: null },
      { parameter: "Intellectual Property (IP)", description: "The mechanisms in place to protect the business from competitors, such as patents, trademarks, and trade secrets.", inference: "The dual-functionality mechanism is the most defensible aspect. A utility patent on the specific heating and cooling technology would be a significant barrier to entry.", score: "9/10", justification: "The potential for strong IP is high due to the novel technology. The execution of a successful patent application is a complex process, but the opportunity is clear.", suggestions: null },
      { parameter: "Network Effects", description: "The phenomenon where the value of a product or service increases as more people use it.", inference: "The physical product itself has limited network effects. However, a companion app could build a community around recipes, usage tips, and personalized settings, creating a powerful feedback loop.", score: "8/10", justification: "The network effect is not inherent to the product, but it is an opportunity that can be built through a strong software layer, making the product more defensible over time.", suggestions: null }
    ],
    "Team": [
      { parameter: "Relevant Experience", description: "The background and expertise of the founding team as it relates to the product and industry.", inference: "The ideal founding team would include a hardware engineer with experience in miniaturization and thermal management, a software engineer with expertise in app development, and a business professional with a track record in consumer electronics and brand building.", score: "9/10", justification: "The required experience is specific but attainable. The founder's passion and vision for the product are the most important elements, but a skilled team is necessary for execution.", suggestions: null },
      { parameter: "Complementary Skills", description: "The degree to which the founders' skills and personalities complement each other.", inference: "A balanced team with complementary skills is essential to cover all aspects of the business. The team should be able to work together effectively and handle the inevitable challenges of a hardware startup.", score: "9/10", justification: "The team's ability to execute is a function of its cohesion and skill set. This is a critical factor for success.", suggestions: null },
      { parameter: "Mission Alignment", description: "The degree to which the team is aligned with the company's mission and vision.", inference: "The mission of providing convenience and enhancing daily life through technology is a powerful motivator. A team that is passionate about this vision will be more resilient and dedicated.", score: "10/10", justification: "This is a non-technical parameter, but it is fundamental to the long-term success of the business. A strong, aligned culture is a key differentiator.", suggestions: null },
      { parameter: "Diversity & Inclusion", description: "The commitment to building a diverse and inclusive team and culture.", inference: "A diverse team brings a variety of perspectives, which is crucial for identifying market opportunities and building a product that appeals to a broad audience.", score: "9/10", justification: "Diversity is a significant competitive advantage. The score reflects the potential for a strong, inclusive culture to be a core part of the company's identity.", suggestions: null }
    ],
    "Compliance": [
      { parameter: "Data Privacy Compliance", description: "Adherence to data protection laws, such as India's Digital Personal Data Protection Act, 2023.", inference: "The product's companion app will collect user data (e.g., usage patterns, temperature preferences). This data must be handled with the utmost care, in full compliance with the law.", score: "8/10", justification: "This is a manageable risk with proper planning, but non-compliance could lead to severe penalties. The score reflects the importance of addressing this from day one.", suggestions: null },
      { parameter: "Sector-Specific Compliance", description: "Compliance with regulations specific to consumer electronics and health-related products.", inference: "The product will need to be certified by the BIS for safety and quality. The use of batteries will also require compliance with specific safety standards.", score: "8/10", justification: "This is a standard and well-understood compliance requirement for consumer electronics in India. The process is clear, but requires careful execution.", suggestions: null },
      { parameter: "Environmental Impact", description: "The product's impact on the environment throughout its lifecycle.", inference: "The product's environmental impact comes from the manufacturing process and battery disposal. Efforts to use recycled materials and provide a clear e-waste disposal program are essential.", score: "7/10", justification: "The environmental impact is a key consideration for consumers, and a clear, well-communicated sustainability strategy is a powerful brand message.", suggestions: null },
      { parameter: "Social Impact (SDGs)", description: "The product's alignment with the UN's Sustainable Development Goals (SDGs).", inference: "The product aligns with several SDGs, including SDG 3 (Good Health and Well-being) by promoting hydration, and SDG 12 (Responsible Consumption and Production) by encouraging the use of a reusable bottle.", score: "8/10", justification: "The social impact is positive and directly linked to the product's value proposition. It is a powerful message for building brand equity.", suggestions: null },
      { parameter: "Government & Institutional Support", description: "The availability of government grants, incubators, and other institutional support for the product.", inference: "The Indian government has several initiatives to support \"Make in India\" and deep tech startups. There are numerous incubators and accelerators that can provide mentorship, funding, and networking opportunities.", score: "9/10", justification: "The government and institutional ecosystem in India is highly supportive of technology-driven startups, which is a major advantage.", suggestions: null },
      { parameter: "Investor & Partner Landscape", description: "The availability of funding and strategic partners.", inference: "India's venture capital ecosystem is mature, with a growing number of funds interested in hardware, IoT, and consumer brands. Potential partners include battery manufacturers, e-commerce platforms, and luxury brands.", score: "9/10", justification: "The funding and partnership landscape is highly favorable, providing a strong environment for the business to grow.", suggestions: null }
    ],
    "Risk & Strategy": [
      { parameter: "Technical Risks", description: "Potential technical challenges that could impact product development and functionality.", inference: "The primary technical risks are the miniaturization of the heating/cooling technology, battery safety, and the long-term durability of the electronic components.", score: "8/10", justification: "The technical risks are high but manageable with a skilled team and a well-planned R&D process.", suggestions: null },
      { parameter: "Market Risks", description: "Potential market-related challenges, such as competition, pricing, and consumer acceptance.", inference: "The primary market risks are the high price point limiting the addressable market and the challenge of building a new brand in a crowded space.", score: "8/10", justification: "The market risks are significant but have been carefully considered and have clear mitigation strategies.", suggestions: null },
      { parameter: "Valuation Potential", description: "The potential for the company to achieve a high valuation and provide a strong return on investment.", inference: "The product's high gross margin, large addressable market, and strong scalability potential make it highly attractive to investors.", score: "9/10", justification: "The fundamentals of the business model are strong, making it an attractive investment opportunity.", suggestions: null },
      { parameter: "Exit Strategy Viability", description: "The potential for the company to be acquired or go public in the future.", inference: "Potential acquirers could include major consumer electronics companies (e.g., Samsung, Xiaomi), smart home companies (e.g., Google, Amazon), or large drinkware brands looking to innovate.", score: "8/10", justification: "The exit potential is strong due to the product's position at the intersection of several large and growing industries.", suggestions: null },
      { parameter: "National Policy Alignment (India)", description: "The degree to which the product aligns with national policies and priorities.", inference: "The product aligns with the \"Make in India\" initiative and the government's push for a digital, tech-forward economy.", score: "9/10", justification: "The product aligns well with national priorities, which is a major advantage for a new startup.", suggestions: null },
      { parameter: "Academic/Research Contribution", description: "The product's potential to contribute to research and development in its field.", inference: "The development of the Hydrogen smart bottle could contribute to research in areas like thermal management, battery technology, and smart sensor integration.", score: "7/10", justification: "While the product's primary goal is commercial, it has the potential to contribute to academic research, which is a positive but secondary benefit.", suggestions: null }
    ]
  },
  aiAgentAnalysis: {
    introduction: "As part of our due diligence, an AI agent was deployed to scan for intellectual property and academic research relevant to the Hydrogen Smart Bottle idea. This process helps identify existing patents that could pose a risk, as well as scientific papers that validate the core technology or provide avenues for innovation.",
    findings: [
      { title: "Patent: 'Thermally controlled portable beverage container'", details: "Found a U.S. patent (US 10,XXX,XXX B2) describing a beverage container with a thermoelectric element for heating. While this is similar, it does not explicitly mention dual heating and cooling in a single, portable unit, leaving a potential white space for a new patent.", type: "Patent" },
      { title: "Research Paper: 'Miniaturized Peltier cooling systems for consumer electronics'", details: "This paper from the Journal of Applied Physics discusses the efficiency of small-scale Peltier modules. It provides valuable data on power consumption and heat dissipation, which is crucial for the engineering design of the Hydrogen Smart Bottle.", type: "Research Paper" },
      { title: "Patent: 'Temperature-regulating travel mug with wireless charging'", details: "Found an international patent (WO/20XX/XXXXXX) for a mug that heats beverages and includes a wireless charging base. This is a direct competitor to Ember, but its fixed mug form factor and lack of cooling differentiate it from our idea.", type: "Patent" },
    ]
  },
  sources: [
    { text: "Grand View Research: Reports on the global insulated drinkware and smart bottle markets.", url: "https://www.grandviewresearch.com/smart-home-market-report" },
    { text: "U.S. Consumer Product Safety Commission: Public data on product recalls and safety incidents for consumer electronics.", url: "https://www.cpsc.gov/recalls" },
    { text: "India Patent Office: Search for existing patents related to thermal drinkware and portable electronics.", url: "https://ipindia.gov.in/patents.htm" },
    { text: "Government of India: 'Make in India' and startup ecosystem initiatives.", url: "https://www.makeinindia.com" },
    { text: "U.S. Patent Office: US 10,XXX,XXX B2 - Thermally controlled portable beverage container", url: "https://uspto.gov/patent-search" },
    { text: "Journal of Applied Physics: Research paper on miniaturized Peltier cooling systems", url: "https://aip.scitation.org/journal/jap" },
    { text: "WIPO IP Portal: International patent search", url: "https://www.wipo.int/patents/en/" }
  ],
  disclaimer: "This report is a comprehensive analysis based on current market data, competitor intelligence, and established business frameworks. It is intended to provide a high-level strategic overview and is not a substitute for detailed financial modeling, legal counsel, or engineering consultation. All scores and suggestions are based on a synthesis of available information and expert judgment. Final product success depends on meticulous execution, adaptability, and the ability to respond to dynamic market conditions."
};

export const MOCK_IDEAS = [
    {
        id: 'IDEA-001',
        title: 'AI-Powered Crop Disease Detection',
        description: 'A mobile app that uses AI to detect crop diseases from images.',
        collegeId: 'COL001',
        collegeName: 'Pragati Institute of Technology',
        domain: 'Agriculture',
        innovatorId: 'INV001',
        innovatorName: 'Jane Doe',
        innovatorEmail: 'jane.doe@example.com',
        status: 'Approved',
        dateSubmitted: '2024-07-15',
        version: 'V1.0',
        report: null, // This will be populated below
        clusterWeights: {},
        feedback: null,
        consultationStatus: 'Scheduled',
        consultationDate: '2024-08-15',
        consultationTime: '11:00 AM',
        ttcAssigned: 'TTC001',
    },
    {
        id: 'IDEA-002',
        title: 'Blockchain-Based Voting System',
        description: 'A secure and transparent voting system using blockchain.',
        collegeId: 'COL001',
        collegeName: 'Pragati Institute of Technology',
        domain: 'FinTech',
        innovatorId: 'INV002',
        innovatorName: 'John Smith',
        innovatorEmail: 'john.smith@example.com',
        status: 'Moderate',
        dateSubmitted: '2024-07-18',
        version: 'V1.0',
        report: null,
        clusterWeights: {},
        feedback: null,
        consultationStatus: 'Pending',
        consultationDate: '2024-08-20',
        consultationTime: '02:00 PM',
        ttcAssigned: 'TTC002',
    },
    {
        id: 'IDEA-003',
        title: 'Gamified Language Learning App',
        description: 'An app that makes learning new languages fun and engaging.',
        collegeId: 'COL002',
        collegeName: 'Vanguard College of Engineering',
        domain: 'EdTech',
        innovatorId: 'INV003',
        innovatorName: 'Alisha Khan',
        innovatorEmail: 'alisha.khan@example.com',
        status: 'Rejected',
        dateSubmitted: '2024-07-20',
        version: 'V1.0',
        report: null,
        clusterWeights: {},
        feedback: null,
        consultationStatus: 'Not Requested',
        consultationDate: null,
        consultationTime: null,
        ttcAssigned: 'TTC003',
    },
];

MOCK_IDEAS.forEach(idea => {
    if (!idea.report) {
        const randomScore = Math.floor(Math.random() * 50 + 50); // 50-99
        let outcome;
        if (randomScore >= 85) outcome = "Exemplary";
        else if (randomScore >= 50) outcome = "Developing";
        else outcome = "Needs Refinement";

        idea.report = {
            ...MOCK_SAMPLE_REPORT,
            ideaName: idea.title,
            preparedFor: idea.innovatorName,
            date: idea.dateSubmitted,
            overallScore: randomScore,
            outcome: outcome,
        };
    }
});
