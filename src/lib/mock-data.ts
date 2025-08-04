
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

export const MOCK_SAMPLE_REPORT: any = {
    ideaName: "Economical AI Project Management Tool",
    input: {
      user_idea: "Ai project management tools for startup at economical cost with AI feature.",
      ai_understanding: "The user's core idea is to develop a B2B SaaS platform specifically for startups. The key value propositions are its affordable price point ('economical') and the integration of artificial intelligence features to differentiate it from existing solutions."
    },
    preparedFor: "Innovator Name",
    date: "August 4, 2025",
    overallScore: 8.7,
    outcome: "High Potential. The idea has a strong, defensible niche in a large and growing market. Success hinges on a robust execution strategy, particularly in a highly competitive landscape.",
    executiveSummary: "The 'Economical AI Project Management Tool' addresses a critical gap in the market for startups and small businesses. By leveraging AI for automation and insights at an accessible price point, it creates a differentiated offering that moves beyond basic task management. The overall viability score of 8.7/10 indicates high potential. Key opportunities lie in a massive, underserved target market, while the primary challenges involve competing with established players and maintaining profitability with a low-cost model. A key risk is the operational cost of providing powerful AI features at a low price. The path to success requires a clear focus on a stellar user experience and a highly scalable, automated operational model.",
    detailedValidationAndScoring: [
      {
        parameter_name: "Core Idea",
        description: "Assesses the fundamental concept, including its novelty, problem-solution fit, and usability potential.",
        sub_parameters: [
          {
            parameter_name: "1.1. Novelty & Uniqueness",
            description: "Evaluates how new and distinct the idea is compared to existing market solutions.",
            score: 8.5,
            inference: "The combination of an 'economical' price point and advanced AI features creates a defensible niche, a blue ocean strategy in a saturated market of either expensive enterprise tools or free, basic tools.",
            recommendations: ["Focus marketing efforts on this dual value proposition to attract the target audience.", "Invest in strong, proprietary branding that emphasizes both intelligence and affordability."],
            risk_level: "Low",
            sources_used: []
          },
          {
            parameter_name: "1.2. Problem-Solution Fit",
            description: "Examines the degree to which the idea solves a real and significant problem for the target audience.",
            score: 9.0,
            inference: "The solution directly addresses a clear problem: startups struggle to find powerful, yet affordable, project management tools that meet their dynamic needs. This ensures a strong product-market fit.",
            recommendations: ["Engage in continuous feedback loops with early-adopter startups to ensure the solution evolves with their needs.", "Develop a feedback system directly within the app to quickly gather user insights on new features."],
            risk_level: "Low",
            sources_used: []
          },
          {
            parameter_name: "1.3. UX/Usability Potential",
            description: "Analyzes the potential for the product to have an intuitive, user-friendly design with a low learning curve.",
            score: 8.0,
            inference: "For a tool targeting small teams, a minimal learning curve is crucial. The AI features must simplify workflows, not add complexity, to ensure widespread adoption.",
            recommendations: ["Conduct extensive user testing with a diverse group of non-technical founders and team members.", "Prioritize a clean, minimalist UI with clear visual cues and an intuitive onboarding tutorial."],
            risk_level: "Medium",
            sources_used: []
          }
        ]
      },
      {
        parameter_name: "Market Opportunity",
        description: "Analyzes the size of the target market, geographical relevance, and potential for product-market fit.",
        sub_parameters: [
          {
            parameter_name: "2.1. Market Validation (TAM, SAM, SOM)",
            description: "Defines the Total Addressable Market, Serviceable Addressable Market, and Serviceable Obtainable Market to gauge the scale of the opportunity.",
            score: 9.5,
            inference: "The Total Addressable Market (TAM) for project management software is vast, estimated at over $6.5 billion globally, growing at a CAGR of 11.2% (Source: Statista). The Serviceable Addressable Market (SAM) is the B2B SaaS market for small to medium businesses. The Serviceable Obtainable Market (SOM) is the specific niche of AI-powered, economical tools for early-stage startups, which is a rapidly growing segment, especially in regions like India.",
            recommendations: ["Target the most lucrative geographic markets first, such as India, which has a booming startup ecosystem.", "Focus on specific industry verticals initially (e.g., tech startups, creative agencies) to gain a foothold."],
            risk_level: "Low",
            sources_used: [{ description: "Statista Report: Project Management Software Market Size", url: "https://www.statista.com/outlook/dmo/enterprise-software/project-management-software/worldwide" }]
          },
          {
            parameter_name: "2.2. Geographic Specificity (India)",
            description: "Assesses the relevance and potential of the idea within a specific geographical context, in this case, India.",
            score: 9.5,
            inference: "India's thriving startup ecosystem and high rate of digital adoption present a massive opportunity. The market is also highly cost-sensitive, making an 'economical' offering particularly appealing and giving it a distinct advantage.",
            recommendations: ["Localize the product by offering support for key Indian languages and integrating with local payment gateways.", "Partner with Indian startup incubators and accelerators to gain early traction and credibility."],
            risk_level: "Low",
            sources_used: [{ description: "Startup India: Official Government of India Initiative", url: "https://www.startupindia.gov.in/" }]
          },
          {
            parameter_name: "2.3. Product-Market Fit",
            description: "Evaluates the degree to which a product satisfies a strong market demand.",
            score: 9.0,
            inference: "Early signals indicate a strong potential for product-market fit due to the clear alignment of features with the needs of the target audience. The core value proposition of 'powerful AI at an affordable price' is compelling and solves a tangible problem.",
            recommendations: ["Launch a Minimum Viable Product (MVP) and use user feedback to iteratively refine the feature set.", "Focus on a few key, high-impact AI features in the beginning and perfect them before adding more."],
            risk_level: "Low",
            sources_used: []
          }
        ]
      },
      {
        parameter_name: "Execution",
        description: "Focuses on the practical aspects of bringing the idea to life, including technical feasibility, operational viability, and scalability.",
        sub_parameters: [
          {
            parameter_name: "3.1. Technical Feasibility",
            description: "Assesses whether the technology required to build the product is achievable and realistic.",
            score: 7.5,
            inference: "The core machine learning technology is feasible, but implementing features like real-time task automation and intelligent team allocation poses significant technical challenges. It requires a sophisticated and scalable infrastructure to handle complex data and computations efficiently.",
            recommendations: ["Start with a single, highly effective AI feature in the MVP, such as 'AI-powered deadline prediction'.", "Utilize cloud-native, scalable architecture from the outset to avoid future performance bottlenecks."],
            risk_level: "High",
            sources_used: []
          },
          {
            parameter_name: "3.2. Operational Viability",
            description: "Examines the ease and efficiency of managing the day-to-day operations of the business.",
            score: 8.0,
            inference: "The freemium model and SaaS nature of the product make it operationally viable. Most operations can be automated, allowing a small team to manage a large user base.",
            recommendations: ["According to a report by NASSCOM, the Indian SaaS industry's success is rooted in its ability to build highly automated platforms, allowing for scalability without a proportional increase in operational costs. We recommend using AI to automate customer support responses for common queries, freeing up the team to handle more complex issues. This lean operational model is essential for profitability at a low price point.", "Develop a comprehensive knowledge base and use an AI-powered chatbot for first-line customer support."],
            risk_level: "Medium",
            sources_used: [{ description: "NASSCOM Report: Indian SaaS Industry Landscape", url: "https://nasscom.in/knowledge-center/publications/indian-saas-industry-landscape-2023" }]
          },
          {
            parameter_name: "3.3. Scalability & Performance",
            description: "Evaluates the product's ability to handle growth in users and data without performance issues.",
            score: 8.0,
            inference: "The underlying SaaS architecture must be built for rapid scalability to support a large number of users without performance degradation, especially as AI features become more resource-intensive. This is a major engineering hurdle.",
            recommendations: ["Plan for a phased rollout to manage infrastructure load.", "Prioritize scalability from day one by using a microservices architecture and serverless computing."],
            risk_level: "Medium",
            sources_used: []
          }
        ]
      },
      {
        parameter_name: "Business Model",
        description: "Analyzes the revenue model, financial viability, and strategies for making the business defensible.",
        sub_parameters: [
          {
            parameter_name: "4.1. Financial Viability",
            description: "Assesses the potential for the business to be profitable and sustainable.",
            score: 8.5,
            inference: "The subscription-based (SaaS) business model is highly viable. The low price point is a key differentiator and can be offset by a high volume of users, with potential for tiered pricing to attract both small and growing startups.",
            recommendations: ["Test different pricing models early to find the optimal balance between user acquisition and revenue generation.", "Carefully analyze customer acquisition cost (CAC) and lifetime value (LTV) to ensure the business model is profitable at scale."],
            risk_level: "Low",
            sources_used: []
          },
          {
            parameter_name: "4.2. Defensibility",
            description: "Evaluates the factors that would prevent competitors from easily replicating the product and business.",
            score: 8.0,
            inference: "Defensibility comes from the proprietary AI models and the network effects of user data improving the tool's intelligence over time. A strong brand and community will also be a moat.",
            recommendations: ["Focus on building a strong community around the product to increase user loyalty and create a barrier to entry for new competitors.", "File for a patent for the unique AI algorithms or a specific feature to protect the intellectual property."],
            risk_level: "Low",
            sources_used: []
          }
        ]
      },
      {
        parameter_name: "Team",
        description: "Evaluates the founding team's capabilities, expertise, and the company culture required for success.",
        sub_parameters: [
          {
            parameter_name: "5.1. Founder-Fit",
            description: "Assesses the team's background and expertise in relation to the needs of the idea.",
            score: 8.5,
            inference: "An ideal founding team would possess a blend of expertise in AI/ML, software engineering, and product management, with a deep understanding of the startup ecosystem.",
            recommendations: ["If the core team lacks a key skill, bring on a co-founder or strategic advisor to fill that gap.", "Ensure the founding team has a clear understanding of the target audience's pain points and a strong vision for the product."],
            risk_level: "Low",
            sources_used: []
          },
          {
            parameter_name: "5.2. Culture/Values",
            description: "Evaluates whether the company's culture and values align with the needs of the product and its target market.",
            score: 9.0,
            inference: "A company culture focused on efficiency, innovation, and customer-centricity is essential to build a product that is both powerful and user-friendly for startups.",
            recommendations: ["Prioritize a culture of lean development and rapid iteration to stay agile in a competitive market.", "Establish clear company values from day one and integrate them into all hiring and operational decisions."],
            risk_level: "Low",
            sources_used: []
          }
        ]
      },
      {
        parameter_name: "Compliance",
        description: "Examines the legal, ethical, and regulatory aspects of the business idea.",
        sub_parameters: [
          {
            parameter_name: "6.1. Regulatory (India)",
            description: "Assesses the legal and regulatory requirements for operating in the specified geography.",
            score: 7.0,
            inference: "Handling of proprietary business data requires strict compliance with data protection laws. Any data breaches could severely damage the brand's reputation and lead to legal repercussions.",
            recommendations: ["Implement robust data security measures and consult with legal experts on data privacy compliance in India.", "Clearly communicate the privacy policy and data handling procedures to users."],
            risk_level: "High",
            sources_used: []
          },
          {
            parameter_name: "6.2. Sustainability (ESG)",
            description: "Evaluates the environmental, social, and governance impact of the idea.",
            score: 8.5,
            inference: "The product's social impact is high, as it empowers small businesses to be more productive and competitive. The environmental impact is minimal, which is a positive attribute.",
            recommendations: ["Consider adding features that help teams optimize workflows and reduce digital waste.", "Highlight the positive social impact in marketing and communications."],
            risk_level: "Low",
            sources_used: []
          },
          {
            parameter_name: "6.3. Ecosystem Support (India)",
            description: "Assesses how well the idea aligns with national and local startup ecosystems and support initiatives.",
            score: 9.0,
            inference: "The idea aligns perfectly with India's national push for 'Startup India' and 'Digital India.' This provides access to a strong support network of government initiatives, incubators, and investors.",
            recommendations: ["Leverage government schemes and partnerships to gain visibility and credibility within the startup ecosystem.", "Actively participate in startup incubators to network with potential partners and investors."],
            risk_level: "Low",
            sources_used: []
          }
        ]
      },
      {
        parameter_name: "Risk & Strategy",
        description: "Provides a holistic view of potential risks, investment attractiveness, and strategic alignment.",
        sub_parameters: [
          {
            parameter_name: "7.1. Risk Assessment",
            description: "Identifies and evaluates the primary internal and external risks to the business.",
            score: 7.0,
            inference: "Key risks include intense competition from established players with massive funding, the technical challenge of building a reliable AI, and the operational risk of a low-margin business model requiring high user volume.",
            recommendations: ["Develop a clear strategy to differentiate from competitors beyond just price, focusing on unique AI features and a superior user experience.", "Prioritize technical and legal risk mitigation in the initial phases of development."],
            risk_level: "High",
            sources_used: []
          },
          {
            parameter_name: "7.2. Investor Attractiveness",
            description: "Assesses the appeal of the idea to potential investors based on market size, defensibility, and growth potential.",
            score: 9.0,
            inference: "The idea is highly attractive to investors due to the large market size, a clear pain point, and a strong defensible technology proposition. The low price point, while a risk, can be a major selling point for high user acquisition.",
            recommendations: ["Prepare a detailed financial model and pitch deck that clearly demonstrates the path to profitability and scalability.", "Network with investors specializing in the SaaS and B2B tech space."],
            risk_level: "Low",
            sources_used: []
          },
          {
            parameter_name: "7.3. Academic/National Alignment",
            description: "Evaluates the synergy between the idea and broader academic or national strategic goals.",
            score: 9.0,
            inference: "The idea's alignment with national policies for digital entrepreneurship and innovation is very strong, which can open doors for government grants and strategic partnerships.",
            recommendations: ["Explore partnerships with academic institutions for AI research to gain a competitive advantage and enhance the app's scientific backing.", "Highlight national policy alignment in all communications and grant applications."],
            risk_level: "Low",
            sources_used: []
          }
        ]
      }
    ],
    keyStrengthsWeaknesses: {
      strengths: [
        {
          title: "Disruptive Value Proposition",
          description: "The dual focus on AI-powered features and an economical price point carves out a new market segment. It targets startups that are currently underserved by either expensive enterprise tools or free, basic solutions.",
          data_source: "AI analysis of current market landscape."
        },
        {
          title: "Massive & Growing Market",
          description: "The global project management software market is projected to reach $13.2 billion by 2030 (Source: Statista). The target segment of startups, particularly in India, is one of the fastest-growing sectors globally.",
          data_source: "Statista, NASSCOM"
        },
        {
          title: "Strong National Alignment",
          description: "The idea aligns perfectly with key government initiatives like 'Startup India' and 'Digital India.' This provides opportunities for strategic partnerships, government grants, and a favorable regulatory environment.",
          data_source: "Startup India, Digital India initiatives."
        },
      ],
      weaknesses: [
        {
          title: "Intense Competitive Pressure",
          description: "The market is dominated by well-funded giants like Jira, Asana, and Trello. While the product is economical, it must offer a significantly superior user experience and feature set to convince users to switch from established, often free, alternatives.",
          data_source: "Competitive analysis of existing project management tools."
        },
        {
          title: "High Operational Costs",
          description: "Offering a powerful AI tool at an economical price point is a major challenge. The operational costs for maintaining a scalable, high-performance AI infrastructure can be substantial, impacting profitability.",
          data_source: "AI analysis of SaaS infrastructure and operational costs."
        },
        {
          title: "Feature Parity Expectations",
          description: "Users often expect a wide range of features found in established tools (e.g., Gantt charts, complex reporting) even in a new product. Balancing an economical price with a comprehensive feature set is a difficult trade-off.",
          data_source: "User feedback analysis from similar products."
        },
      ],
    },
    criticalRisksMitigation: {
      risks: [
        {
          risk: "Low Price Point & Profitability",
          how_why: "The core value proposition of being 'economical' is also a major risk. A low price could lead to a low Average Revenue Per User (ARPU), making it difficult to cover operational costs, fund future R&D, and achieve a sustainable profit margin. Without a massive user base, the business model could fail.",
          mitigation_strategies: [
            "Implement a freemium model with a clear path to monetization through high-value, AI-driven features.",
            "Introduce a tiered pricing structure that offers more advanced features and higher usage limits for growing startups.",
            "Focus on automation to keep operational costs to a minimum."
          ]
        },
        {
          risk: "Product Durability & Reliability Failure",
          how_why: "For an AI tool, any instance of the AI providing an inaccurate or unhelpful suggestion could lead to a loss of trust and user churn. A major bug or data loss could be catastrophic for a new brand, especially since it deals with critical business data.",
          mitigation_strategies: [
            "Invest in rigorous Quality Assurance (QA) and testing protocols for all AI and core functionalities.",
            "Offer a clear Service Level Agreement (SLA) for enterprise clients to build confidence.",
            "Implement a robust backup and data recovery system to protect user data."
          ]
        },
      ]
    },
    competitiveAnalysis: {
      competitors: [
        {
          name: "Jira",
          products: "Jira Software",
          features: "Advanced issue tracking, scrum/kanban boards, extensive integrations.",
          price_range: "₹650 - ₹1,800+ per user/month",
          strengths: "Market leader, extensive features, strong ecosystem.",
          weaknesses: "Complex, steep learning curve, expensive for startups.",
        },
        {
          name: "Asana",
          products: "Asana platform",
          features: "Task management, project timelines, workflow automation.",
          price_range: "₹850 - ₹2,000+ per user/month",
          strengths: "Intuitive UI, good for collaboration, strong brand.",
          weaknesses: "Can be expensive, limited AI features in free tier.",
        },
        {
          name: "Trello",
          products: "Trello boards",
          features: "Kanban boards, simple task cards, integrations.",
          price_range: "Free - ₹1,000+ per user/month",
          strengths: "Extremely easy to use, visual, strong free tier.",
          weaknesses: "Lacks advanced features and AI, not for complex projects.",
        },
      ],
      inference: "The AI Project Management Tool's primary opportunity is to occupy the space between the feature-rich, expensive tools (Jira, Asana) and the simple, feature-lacking free tools (Trello). Its dual value proposition of powerful AI and an economical price point gives it a distinct advantage over all of them. It needs to offer Trello's simplicity with some of Jira's power, all at an Asana-like price for its premium tier."
    },
    detailedPricingFinancials: {
      cogs_margin: {
        estimated_costs: "This is a bottom-up derivation based on an estimated operational cost per user per month. The primary costs are server compute for AI models and data storage.",
        cost_breakdown: [
          { item: "AI Compute & GPU usage", cost: "₹150" },
          { item: "Cloud Hosting & Storage", cost: "₹75" },
          { item: "Third-party APIs & Licenses", cost: "₹50" },
        ],
        estimated_cogs_per_user: "₹275",
        retail_pricing_strategy: "A freemium model is recommended to acquire users, with a premium tier that offers advanced AI features. To be profitable, a gross margin of at least 60% is required on the premium tier.",
        pricing_calculation: "Target Gross Margin: 60%. Premium Price = COGS / (1 - Gross Margin) -> ₹275 / (1 - 0.60) = ₹687.5",
        final_recommendation: "Target a monthly premium price of ₹699 per user. This price point allows for a healthy gross margin and is significantly more affordable than competitors like Jira and Asana."
      },
    },
    actionPlan: {
      urgent: [
        "Finalize the core AI feature set for the MVP: Identify the single most impactful AI feature (e.g., 'AI-powered task summarization') to build first.",
        "Develop a clickable prototype and gather early feedback from a target group of 10-20 startups.",
        "Select a cloud provider and set up a scalable, microservices-based architecture."
      ],
      highPriority: [
        "Launch a beta version of the MVP to a wider audience to validate product-market fit.",
        "Develop a cohesive brand story, create professional marketing assets, and launch a landing page to begin collecting email sign-ups.",
        "Begin filing for key IP protections for the unique AI algorithms."
      ],
      midPriority: [
        "Develop and launch a tiered pricing model based on user feedback from the beta program.",
        "Establish a robust customer support infrastructure, including an AI-powered chatbot.",
        "Launch the first full-scale version of the product with a marketing campaign targeting the Indian startup ecosystem."
      ]
    },
    researchPaperAnalysis: {
      title: "AI and Project Management: IP and Research Landscape",
      analysis: "A search of academic and patent databases reveals that 'AI in project management' is a rapidly evolving field. Key research areas include 'AI-driven resource allocation', 'predictive analytics for project timelines', and 'automated risk assessment'. While general concepts are well-documented, specific implementations and algorithms, especially for lightweight, economical tools, are still ripe for patenting. A patent search on keywords like 'AI project management for startups' did not reveal any direct competitors with a similar value proposition, which presents a significant IP opportunity.",
      links: [
        { text: "Predictive Analytics for Project Management: A Literature Review", url: "https://example.com/predictive-analytics-paper" },
        { text: "Patent search results for 'AI project management'", url: "https://example.com/patent-search-results" }
      ]
    },
    problemsAnalysis: {
      title: "Current Problems in the Startup Project Management Space",
      analysis: "Research on startup forums and product review sites reveals several recurring problems with current project management tools:",
      problems: [
        {
          problem: "Existing tools are either too expensive or lack essential features.",
          source: "User reviews on Capterra, G2, and various Reddit threads. Startups often feel forced to choose between a costly subscription for a feature-rich tool they can't fully utilize, or a free tool that lacks the power they need as they grow."
        },
        {
          problem: "Steep learning curves and complex setup processes.",
          source: "Feedback on tools like Jira frequently mentions the complexity of setup and the time it takes for a new team member to become proficient."
        },
        {
          problem: "Lack of a unified view and actionable insights.",
          source: "Many teams report spending too much time manually tracking progress and creating reports. They are looking for tools that can provide intelligent, data-driven insights to help them make better decisions automatically."
        }
      ],
    },
    sources: [
      { text: "Statista Report: Project Management Software Market Size", url: "https://www.statista.com/outlook/dmo/enterprise-software/project-management-software/worldwide" },
      { text: "Startup India: Official Government of India Initiative", url: "https://www.startupindia.gov.in/" },
      { text: "NASSCOM Report: Indian SaaS Industry Landscape", url: "https://nasscom.in/knowledge-center/publications/indian-saas-industry-landscape-2023" },
      { text: "Gartner Research: AI in Project Management", url: "https://www.gartner.com/en/articles/ai-in-project-management" },
      { text: "Capterra/G2 reviews of popular project management software", url: "" },
    ],
    disclaimer: `This report is an automated assessment and does not constitute professional business, legal, or financial advice. The analysis is based on information available at the time of generation and is intended for informational and illustrative purposes only. All scores and recommendations are indicative and should be independently validated.`,
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
        let randomScore: number;
        let outcome: string;

        switch (idea.status) {
            case 'Approved':
                randomScore = Math.floor(Math.random() * (10 - 8.5 + 1) + 8.5)
                outcome = "High Potential"
                break;
            case 'Moderate':
                randomScore = Math.floor(Math.random() * (8.4 - 7) + 7)
                outcome = "Moderate Potential"
                break;
            case 'Rejected':
                randomScore = Math.floor(Math.random() * 6.9);
                outcome = "Needs significant rework"
                break;
            default:
                randomScore = 5
                outcome = "N/A"
        }

        const newReport = JSON.parse(JSON.stringify(MOCK_SAMPLE_REPORT));

        idea.report = {
            ...newReport,
            ideaName: idea.title,
            preparedFor: idea.innovatorName,
            date: idea.dateSubmitted,
            overallScore: randomScore,
            outcome: outcome,
            input: {
                user_idea: idea.description,
                ai_understanding: `The user's core idea is to develop a tool for ${idea.domain}. The key value proposition is ${idea.title.toLowerCase()}.`
            }
        };
    }
});
