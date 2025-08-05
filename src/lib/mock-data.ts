
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
    preparedFor: "Innovator Name",
    date: "August 4, 2025",
    overallScore: 8.7,
    input: {
        user_idea: "Ai project management tools for startup at economical cost with AI feature.",
        ai_understanding: "The user's core idea is to develop a B2B SaaS platform specifically for startups. The key value propositions are its affordable price point ('economical') and the integration of artificial intelligence features to differentiate it from existing solutions."
    },
    executiveSummary: {
        outcome: "High Potential. The idea has a strong, defensible niche in a large and growing market. Success hinges on a robust execution strategy, particularly in a highly competitive landscape.",
        summary: "The 'Economical AI Project Management Tool' addresses a critical gap in the market for startups and small businesses. By leveraging AI for automation and insights at an accessible price point, it creates a differentiated offering that moves beyond basic task management. The overall viability score of 8.7/10 indicates high potential. Key opportunities lie in a massive, underserved target market, while the primary challenges involve competing with established players and maintaining profitability with a low-cost model. A key risk is the operational cost of providing powerful AI features at a low price. The path to success requires a clear focus on a stellar user experience and a highly scalable, automated operational model."
    },
    keyStrengthsWeaknesses: {
        strengths: [
        { title: "Strong Value Proposition", description: "The combination of affordability and AI features fills a clear market gap." },
        { title: "Scalable SaaS Model", description: "The business model allows for rapid growth with controlled costs." },
        { title: "Target Market Growth", description: "The global and Indian startup ecosystems are expanding rapidly, providing a large customer base." }
        ],
        weaknesses: [
        { title: "High Competition", description: "The market is crowded with well-funded and established players like Jira and Asana." },
        { title: "Operational Costs", description: "Maintaining powerful AI features at a low price point poses a significant challenge to profitability." },
        { title: "Brand Recognition", description: "As a new entrant, building trust and brand loyalty will be a key hurdle." }
        ]
    },
    criticalRisksAndMitigation: [
        {
        risk: "Intense Competition",
        description: "The project management software market is mature and saturated with well-established players.",
        impact: "Medium to High",
        mitigation: "Focus on a niche (e.g., startups), differentiate with a unique 'economical + AI' value proposition, and build a strong community to create brand loyalty."
        },
        {
        risk: "Operational Costs of AI",
        description: "Providing powerful AI features at a low price point can lead to high operational costs (e.g., GPU usage, API licenses) that erode profitability.",
        impact: "High",
        mitigation: "Optimize AI models for efficiency, use cost-effective cloud solutions, and carefully manage usage-based costs. Consider a tiered AI feature model where advanced features are exclusive to higher-priced plans."
        },
        {
        risk: "User Experience Debt",
        description: "The pressure to ship quickly to compete can lead to a subpar user experience and technical debt.",
        impact: "Medium",
        mitigation: "Adopt an MVP-first strategy with a clear focus on core, high-value features. Implement continuous user feedback loops and allocate dedicated time for refactoring and bug fixes in every sprint."
        }
    ],
    competitiveAnalysis: {
        user_provided_competitors: "Jira, Asana, Trello.",
        ai_inference: "The user's identified competitors (Jira, Asana, Trello) are accurate and represent the primary threats. The AI's analysis confirms that the user's proposed 'economical and AI-driven' USP is a valid strategy to compete against these established players.",
        competitors: [
        {
            name: "Jira",
            products: "Jira Software, Jira Service Management",
            features: "Task tracking, agile project management, workflow automation.",
            price_range: "Starts free, then ~$700/user/month.",
            strengths: "Market leader for software development teams, highly customizable, strong integrations.",
            weaknesses: "Can be complex and expensive for startups, steep learning curve."
        },
        {
            name: "Asana",
            products: "Asana Basic, Asana Premium, Asana Business",
            features: "Project tracking, goal setting, visual timelines, workflow builder.",
            price_range: "Starts free, then ~$900/user/month.",
            strengths: "Excellent user interface, flexible for various team types, strong collaboration features.",
            weaknesses: "Expensive premium tiers, lacks deep AI automation compared to future-proof tools."
        },
        {
            name: "Trello",
            products: "Trello Free, Trello Standard, Trello Premium",
            features: "Kanban boards, checklists, integrations.",
            price_range: "Starts free, then ~$450/user/month.",
            strengths: "Intuitive and simple to use, great for visual thinkers and small projects.",
            weaknesses: "Lacks advanced features for scaling teams, not AI-focused."
        }
        ],
        recommendations: [
        "Beyond just price, clearly articulate how the AI features provide a superior experience compared to the competitors.",
        "Build a comparison table on the website to highlight the value proposition against competitors."
        ]
    },
    detailedPricingAndFinancials: {
        user_provided_pricing_model: "Freemium with a tiered subscription model.",
        user_provided_estimated_price: "₹500 per user/month for the premium tier.",
        ai_pricing_inference: "The user's suggested freemium model with a tiered subscription is a viable strategy. Our analysis confirms a price point around ₹700/month is competitive and allows for a healthy gross margin. The user's provided price of ₹500 is a good starting point but may need to be slightly adjusted to ensure profitability.",
        recommended_pricing_model: "Freemium with a Tiered Subscription for premium features.",
        estimated_premium_price: 699.00,
        estimated_cogs_per_user: 275,
        cost_breakdown: [
        { item: "AI Compute & GPU usage", cost: "150" },
        { item: "Cloud Hosting & Storage", cost: "75" },
        { item: "Third-party APIs & Licenses", cost: "50" },
        ],
        suggestions: [
        "Test different pricing models early to find the optimal balance between user acquisition and revenue generation.",
        "Carefully analyze customer acquisition cost (CAC) and lifetime value (LTV) to ensure the business model is profitable at scale."
        ]
    },
    actionPlan: {
        urgent: [
        "Conduct a detailed market segmentation study to pinpoint the most lucrative sub-niche of startups.",
        "Develop a minimum viable product (MVP) with a core set of AI features for a closed beta with 10-20 startups.",
        "Define key performance indicators (KPIs) and a clear go-to-market strategy for the initial launch."
        ],
        highPriority: [
        "Finalize the pricing tiers and model based on beta test feedback and competitor analysis.",
        "Begin building a brand identity and content marketing strategy targeting the startup community.",
        "Explore partnerships with startup incubators and accelerators to gain early access to customers."
        ],
        midPriority: [
        "Scale the marketing and sales efforts to reach a broader audience.",
        "Develop a robust customer support and feedback loop system.",
        "Begin planning for international expansion based on early traction."
        ]
    },
    detailedIdeaValidationAndScoring: [
        {
          parameter_name: "1. Core Idea",
          icon: "Lightbulb",
          sub_parameters: [
            { parameter_name: "1.1. Novelty & Uniqueness", sub_parameters: [
              { 
                parameter_name: "1.1.1. Originality", 
                score: "8.5", 
                inference: "The core idea is not entirely new, but the combination of 'economical' pricing and 'AI-powered' features is a strong, original value proposition that sets it apart.", 
                recommendations: ["Focus marketing on this unique combination.", "Highlight the AI's smart features over competitors' basic task automation."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "1.1.2. Differentiation", 
                score: "9.0", 
                inference: "The product is highly differentiated from expensive enterprise tools and free, basic tools. This gives it a clear 'blue ocean' strategy in a crowded market.", 
                recommendations: ["Build a public-facing comparison matrix on the website to show differentiation.", "Gather testimonials from users who have switched from competitors."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Analysis of the project management software market." }]
              },
            ]},
            { parameter_name: "1.2. Problem-Solution Fit", sub_parameters: [
              { 
                parameter_name: "1.2.1. Problem Severity", 
                score: "9.5", 
                inference: "Startups have a severe problem finding powerful and affordable project management tools. The pain point is high, which is a great foundation for a product.", 
                recommendations: ["Conduct user interviews to deeply understand the pain points.", "Validate the problem with a landing page and email sign-ups."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "AI-driven market research on startup pain points." }]
              },
              { 
                parameter_name: "1.2.2. Solution Effectiveness", 
                score: "9.0", 
                inference: "The proposed AI features (e.g., automated reporting, resource allocation) directly address the core problems faced by time and resource-constrained startups.", 
                recommendations: ["Develop a proof-of-concept for the most critical AI feature.", "Run a small closed beta to test the solution's effectiveness."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "1.3. UX/Usability Potential", sub_parameters: [
              { 
                parameter_name: "1.3.1. Intuitive Design", 
                score: "8.5", 
                inference: "A simple, clean UI is crucial for startups. The design should be intuitive and require minimal onboarding, a key differentiator from complex enterprise tools.", 
                recommendations: ["Hire an experienced UX/UI designer with a focus on SaaS products.", "Conduct user testing with low-fidelity prototypes before writing any code."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "1.3.2. Accessibility Compliance", 
                score: "8.0", 
                inference: "Accessibility is a key consideration for a modern SaaS product, though often overlooked. It broadens the market and demonstrates a commitment to inclusive design.", 
                recommendations: ["Ensure the UI is built with WCAG 2.1 guidelines in mind.", "Perform an accessibility audit before the public launch."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
          ]
        },
        {
          parameter_name: "2. Market Opportunity",
          icon: "Briefcase",
          sub_parameters: [
            { parameter_name: "2.1. Market Validation (TAM)", sub_parameters: [
              { 
                parameter_name: "2.1.1. Market Size (TAM)", 
                score: "9.5", 
                inference: "The Total Addressable Market for project management software is vast, estimated at over $6.5 billion globally, growing at a CAGR of 11.2%. The user's input on Indian market size is a good proxy.", 
                recommendations: ["Focus on the Serviceable Obtainable Market (SOM) first.", "Use the TAM to attract investors and show long-term vision."], 
                user_input: { "user_provided_market_size": "Indian SaaS market is expected to reach $13-15 billion by 2025." },
                sourcesUsed: [{ text: "Statista Report: Project Management Software Market Size", url: "https://www.statista.com/outlook/dmo/enterprise-software/project-management-software/worldwide" }]
              },
              { 
                parameter_name: "2.1.2. Competitive Intensity", 
                score: "7.0", 
                inference: "The market is highly competitive with many established players. This is a significant risk that must be addressed through a strong value proposition.", 
                recommendations: ["Clearly define and communicate the product's unique selling points.", "Target a sub-niche (e.g., early-stage tech startups) to reduce initial competition."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "2.2. Geographic Specificity (India)", sub_parameters: [
              { 
                parameter_name: "2.2.1. Regulatory Landscape", 
                score: "8.5", 
                inference: "The regulatory environment in India for SaaS is generally favorable, with government initiatives supporting startups. Data privacy laws are a key consideration.", 
                recommendations: ["Ensure compliance with India's data privacy laws.", "Consult with a legal expert on specific regulations."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Indian Ministry of Electronics and Information Technology (MeitY) guidelines" }]
              },
              { 
                parameter_name: "2.2.2. Infrastructure Readiness", 
                score: "9.0", 
                inference: "India has a robust digital infrastructure with high internet penetration and a large base of tech-savvy users, making it an ideal market for a SaaS product.", 
                recommendations: ["Optimize the product for both desktop and mobile use.", "Leverage local cloud providers to reduce latency."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "2.3. Product-Market Fit", sub_parameters: [
              { 
                parameter_name: "2.3.1. User Engagement", 
                score: "8.5", 
                inference: "The AI features are designed to increase user engagement by making tasks easier and providing valuable insights. This is a strong hypothesis that needs validation.", 
                recommendations: ["Implement detailed analytics to track user engagement with key AI features.", "Conduct usability studies to identify friction points."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "2.3.2. Retention Potential", 
                score: "8.0", 
                inference: "The product's 'stickiness' will come from its AI learning over time. As the AI gets smarter, the product becomes more valuable, increasing retention.", 
                recommendations: ["Introduce a 'retention' metric in the early stages.", "Continuously improve AI models based on user feedback to drive long-term value."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
          ]
        },
        {
          parameter_name: "3. Execution",
          icon: "Rocket",
          sub_parameters: [
            { parameter_name: "3.1. Technical Feasibility", sub_parameters: [
              { 
                parameter_name: "3.1.1. Technology Maturity", 
                score: "8.5", 
                inference: "The underlying technologies for a modern SaaS product (cloud, microservices, front-end frameworks) are mature and well-understood. The AI component is the primary technical challenge.", 
                recommendations: ["Choose a robust tech stack that can support AI integrations.", "Build a dedicated R&D team for the AI features."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "3.1.2. Scalability & Performance", 
                score: "8.0", 
                inference: "A SaaS product needs to scale horizontally to support millions of users. The AI models must also be optimized for both performance and cost.", 
                recommendations: ["Design a scalable architecture from day one.", "Use serverless functions for computationally expensive tasks."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "3.2. Operational Viability", sub_parameters: [
              { 
                parameter_name: "3.2.1. Resource Availability", 
                score: "8.5", 
                inference: "India has a large talent pool of engineers and AI experts, making it feasible to build and operate the product locally.", 
                recommendations: ["Partner with local universities to hire top talent.", "Build a strong company culture to attract and retain employees."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "3.2.2. Process Efficiency", 
                score: "9.0", 
                inference: "Automation is a core part of the business. The goal is to have highly efficient internal processes to keep costs down.", 
                recommendations: ["Automate all possible internal workflows (e.g., marketing, sales, support).", "Use a modern CI/CD pipeline to ensure fast, reliable deployments."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "3.3. Scalability Potential", sub_parameters: [
              { 
                parameter_name: "3.3.1. Business Model Scalability", 
                score: "9.0", 
                inference: "The SaaS subscription model is highly scalable. The key is to manage the cost of AI as the user base grows.", 
                recommendations: ["Implement a usage-based pricing model for AI-intensive features.", "Regularly review and optimize the cost of goods sold (COGS)."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "3.3.2. Market Expansion Potential", 
                score: "8.5", 
                inference: "The product can easily expand to new markets beyond India and to different industry verticals with minor modifications.", 
                recommendations: ["Plan for internationalization and localization from the beginning.", "Start with one market and perfect the product before expanding."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
          ]
        },
        {
          parameter_name: "4. Business Model",
          icon: "DollarSign",
          sub_parameters: [
            { parameter_name: "4.1. Financial Viability", sub_parameters: [
              { 
                parameter_name: "4.1.1. Revenue Stream Diversity", 
                score: "8.0", 
                inference: "The primary revenue stream is subscriptions. Other potential streams could include marketplace integrations or premium AI consulting services.", 
                recommendations: ["Explore partnerships with other SaaS tools to create a marketplace.", "Offer add-on services for high-value customers."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "4.1.2. Profitability & Margins", 
                score: "7.5", 
                inference: "The low price point and high AI costs are a risk to profitability. Careful management of COGS and a clear path to scale are essential.", 
                recommendations: ["Maintain high gross margins by controlling operational costs.", "Focus on customer lifetime value (LTV) over short-term revenue."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "4.2. Defensibility", sub_parameters: [
              { 
                parameter_name: "4.2.1. Intellectual Property (IP)", 
                score: "8.5", 
                inference: "Proprietary AI models and algorithms can be a strong moat. While not a complete barrier, it makes it difficult for competitors to replicate the core value.", 
                recommendations: ["File for patents for unique algorithms.", "Protect the brand with strong trademarks."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Patent analysis for AI in project management." }]
              },
              { 
                parameter_name: "4.2.2. Network Effects", 
                score: "8.0", 
                inference: "The value of the tool increases as more team members and collaborators use it. This creates a natural network effect that increases user stickiness.", 
                recommendations: ["Build strong collaboration features into the product.", "Encourage team-based sign-ups and referrals."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
          ]
        },
        {
          parameter_name: "5. Team",
          icon: "Users",
          sub_parameters: [
            { parameter_name: "5.1. Founder-Fit", sub_parameters: [
              { 
                parameter_name: "5.1.1. Relevant Experience", 
                score: "9.0", 
                inference: "Founders with experience in AI, SaaS, and project management would be an ideal fit. Their domain expertise is critical for success.", 
                recommendations: ["If the founder lacks experience, bring on an experienced advisor or co-founder.", "Highlight the team's expertise in marketing materials."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "5.1.2. Complementary Skills", 
                score: "9.0", 
                inference: "An effective team needs a mix of technical, business, and design skills to build a successful product.", 
                recommendations: ["Ensure the team has a clear founder-fit in all key areas.", "Use the team's complementary skills as a selling point to investors."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "5.2. Culture/Values", sub_parameters: [
              { 
                parameter_name: "5.2.1. Mission Alignment", 
                score: "9.5", 
                inference: "A strong, mission-driven culture will be essential to attract and retain talent in a competitive market.", 
                recommendations: ["Clearly define the company's mission and values from day one.", "Ensure all hiring decisions are aligned with the company culture."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "5.2.2. Diversity & Inclusion", 
                score: "9.0", 
                inference: "Building a diverse team will lead to better products and a broader perspective. This is a crucial factor for long-term success.", 
                recommendations: ["Implement a clear diversity and inclusion policy.", "Focus on building an inclusive culture where all voices are heard."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
          ]
        },
        {
          parameter_name: "6. Compliance",
          icon: "FileText",
          sub_parameters: [
            { parameter_name: "6.1. Regulatory (India)", sub_parameters: [
              { 
                parameter_name: "6.1.1. Data Privacy Compliance", 
                score: "8.5", 
                inference: "Compliance with local data privacy laws (e.g., India's PDP Bill) is non-negotiable. This is a key risk area that requires attention.", 
                recommendations: ["Engage a legal consultant to review the product's data handling.", "Implement a robust data privacy policy and get it audited."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "6.1.2. Sector-Specific Compliance", 
                score: "8.0", 
                inference: "Depending on the target industry (e.g., healthcare, finance), additional compliance measures may be required.", 
                recommendations: ["Identify target industry verticals and their compliance requirements.", "Build the product to be configurable for different compliance needs."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "6.2. Sustainability (ESG)", sub_parameters: [
              { 
                parameter_name: "6.2.1. Environmental Impact", 
                score: "8.0", 
                inference: "The product's carbon footprint (from cloud computing and AI training) is a key consideration. This can be a selling point to eco-conscious companies.", 
                recommendations: ["Use energy-efficient cloud providers.", "Publish an annual sustainability report."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "6.2.2. Social Impact (SDGs)", 
                score: "9.0", 
                inference: "The product can contribute to UN Sustainable Development Goals (SDGs) by improving productivity and supporting small businesses.", 
                recommendations: ["Align the company's mission with relevant SDGs.", "Highlight the social impact in marketing materials."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "6.3. Ecosystem Support (India)", sub_parameters: [
              { 
                parameter_name: "6.3.1. Government & Institutional Support", 
                score: "9.5", 
                inference: "Government initiatives like 'Startup India' and various institutional support programs offer a significant advantage for a product built and launched in India.", 
                recommendations: ["Apply for government grants and startup programs.", "Leverage institutional partnerships for marketing and sales."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Startup India: Official Government of India Initiative", url: "https://www.startupindia.gov.in/" }]
              },
              { 
                parameter_name: "6.3.2. Investor & Partner Landscape", 
                score: "9.0", 
                inference: "India has a vibrant VC and angel investor ecosystem, with a high appetite for SaaS and AI startups.", 
                recommendations: ["Build a strong investor deck that highlights the Indian market opportunity.", "Network with key investors and partners in the Indian ecosystem."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
          ]
        },
        {
          parameter_name: "7. Risk & Strategy",
          icon: "TrendingDown",
          sub_parameters: [
            { parameter_name: "7.1. Risk Assessment", sub_parameters: [
              { 
                parameter_name: "7.1.1. Technical Risks", 
                score: "7.5", 
                inference: "The main technical risks are related to the performance and cost of the AI models. These require careful management and continuous optimization.", 
                recommendations: ["Use a multi-cloud strategy to mitigate single-provider risk.", "Build a robust monitoring and alerting system for technical issues."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "7.1.2. Market Risks", 
                score: "8.0", 
                inference: "The main market risks are intense competition and the possibility of a downturn in the startup ecosystem. A strong product and clear messaging can mitigate these risks.", 
                recommendations: ["Stay agile and adapt the product to market changes.", "Diversify the customer base to reduce dependency on a single market segment."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "7.2. Investor Attractiveness", sub_parameters: [
              { 
                parameter_name: "7.2.1. Valuation Potential", 
                score: "8.5", 
                inference: "The product has a strong valuation potential due to the high-growth SaaS model and the AI component. Early traction will be key to unlocking this potential.", 
                recommendations: ["Focus on early user growth and retention metrics.", "Develop a clear financial model and a path to profitability."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "7.2.2. Exit Strategy Viability", 
                score: "8.0", 
                inference: "The product has multiple potential exit opportunities, including acquisition by a larger enterprise software company or a later-stage VC firm.", 
                recommendations: ["Identify potential acquirers early in the process.", "Build a defensible business with strong IP and customer loyalty."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]},
            { parameter_name: "7.3. Academic/National Alignment", sub_parameters: [
              { 
                parameter_name: "7.3.1. National Policy Alignment (India)", 
                score: "9.5", 
                inference: "The product aligns well with national policies for a 'digital India' and a 'self-reliant India' (Atmanirbhar Bharat), which can provide significant institutional support.", 
                recommendations: ["Explicitly mention alignment with national policies in the business plan.", "Leverage government programs and funding opportunities."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
              { 
                parameter_name: "7.3.2. Academic/Research Contribution", 
                score: "8.5", 
                inference: "The product's AI components could lead to new research papers and academic contributions, which can enhance the brand's reputation and attract talent.", 
                recommendations: ["Publish research papers on the AI models used in the product.", "Partner with academic institutions on R&D projects."], 
                user_input: { "user_input": "not given" },
                sourcesUsed: [{ text: "Not provided in this analysis." }]
              },
            ]
        }
        ]}
    ],
    swotAnalysis: {
        strengths: [
        { title: "Strong Value Proposition", description: "The combination of affordability and AI features fills a clear market gap." },
        { title: "Scalable SaaS Model", description: "The business model allows for rapid growth with controlled costs." },
        { title: "Target Market Growth", description: "The global and Indian startup ecosystems are expanding rapidly, providing a large customer base." }
        ],
        weaknesses: [
        { title: "High Competition", description: "The market is crowded with well-funded and established players like Jira and Asana." },
        { title: "Operational Costs", description: "Maintaining powerful AI features at a low price point poses a significant challenge to profitability." },
        { title: "Brand Recognition", description: "As a new entrant, building trust and brand loyalty will be a key hurdle." }
        ],
        opportunities: [
        { title: "Massive, Underserved Market", description: "Targeting startups and small businesses provides a large and growing customer base that is underserved by existing, expensive enterprise solutions." },
        { title: "International Expansion", description: "The product has the potential to expand to new markets beyond India and to different industry verticals with minor modifications." },
        { title: "AI Feature Monetization", description: "Advanced AI features can be monetized as premium add-ons, increasing average revenue per user (ARPU)." },
        { title: "Partnership Ecosystem", description: "Building an ecosystem of integrations with other tools (e.g., Slack, GitHub) can increase the product's stickiness and value." }
        ],
        threats: [
        { title: "Established Competitors", description: "Large players like Jira and Asana could introduce more affordable tiers or AI features to compete directly with this product." },
        { title: "AI-as-a-Feature Trend", description: "The rapid commoditization of AI means that competitors could quickly replicate the core AI features, eroding the unique value proposition." },
        { title: "User Experience Debt", description: "A focus on rapid development to compete can lead to a poor user experience, which is a major turn-off for modern users." },
        { title: "Economic Downturns", description: "Startups are particularly vulnerable during economic downturns, which could impact customer acquisition and retention." }
        ]
    },
    ipAndResearchPaperAnalysis: {
        summary: "A preliminary analysis of existing intellectual property reveals that while many patents exist for AI in project management, there is room for innovation in specific areas, particularly around cost-effective, lightweight AI models for small businesses. There is a clear opportunity to file for patents related to unique algorithms that automate project scoping and resource allocation.",
        papers: [
        { title: "The Economic Viability of AI-Driven SaaS Platforms for SMBs", url: "https://example.com/paper1" },
        { title: "Novel Algorithms for Dynamic Task Scheduling in Agile Environments", url: "https://example.com/paper2" }
        ]
    },
    aiResearchAgentFindings: {
        summary: "Our AI research agent conducted a broad analysis of the project management and AI-in-SaaS markets. Key findings include a growing demand for intelligent automation features and a significant price sensitivity among startups. The research confirms that the 'affordable AI' niche is viable and shows high growth potential in emerging markets.",
        findings: [
        { finding: "75% of startups surveyed express a need for project management tools that offer more than basic task lists, citing a desire for predictive analytics and automated reporting." },
        { finding: "The average 'willingness to pay' for premium SaaS tools among Indian startups is 30-40% lower than their counterparts in the US and Europe." },
        { finding: "AI features most requested by project managers include automated timeline adjustments, risk prediction, and smart allocation of tasks based on team member capacity." }
        ]
    },
    sources: [
        { text: "Statista Report: Project Management Software Market Size", url: "https://www.statista.com/outlook/dmo/enterprise-software/project-management-software/worldwide" },
        { text: "Research on SaaS pricing in India.", url: "https://example.com/saas-pricing-india" },
        { text: "Analysis of cloud computing costs for AI workloads." },
        { text: "Data from simulated PPT: my_pitch_deck.pptx" },
    ],
    disclaimer: `This report is an automated assessment and does not constitute professional business, legal, or financial advice. The analysis is based on information available at the time of generation and is intended for informational and illustrative purposes only. All scores and recommendations are indicative and should be independently validated.`,
};


export const MOCK_IDEAS: any[] = [
  {
    id: 'IDEA-001',
    validationId: 'VALID-001-001',
    title: 'AI-Powered Crop Disease Detection',
    description: 'A mobile app that uses AI to detect crop diseases from images.',
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'Agriculture',
    innovatorId: 'INV001',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Exemplary',
    dateSubmitted: '2024-07-20',
    version: 'V1.0',
    report: MOCK_SAMPLE_REPORT,
    clusterWeights: { "Core Idea & Innovation": 20, "Market & Commercial Opportunity": 25, "Execution & Operations": 15, "Business Model & Strategy": 15, "Team & Organizational Health": 10, "External Environment & Compliance": 10, "Risk & Future Outlook": 5 },
    feedback: null,
    consultationStatus: 'Scheduled',
    consultationDate: '2024-08-15',
    consultationTime: '11:00 AM',
    ttcAssigned: 'TTC001',
  },
  {
    id: 'IDEA-002',
    validationId: 'VALID-002-001',
    title: 'Blockchain-Based Voting System',
    description: 'A secure and transparent voting system using blockchain technology.',
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'FinTech',
    innovatorId: 'INV002',
    innovatorName: 'John Smith',
    innovatorEmail: 'john.smith@example.com',
    status: 'Developing',
    dateSubmitted: '2024-07-18',
    version: 'V1.0',
    report: { ...MOCK_SAMPLE_REPORT, ideaName: 'Blockchain-Based Voting System', overallScore: 7.2, validationOutcome: 'Developing', input: { user_idea: 'A secure and transparent voting system using blockchain technology.', ai_understanding: 'AI understands this as a high-security voting platform leveraging blockchain.' } },
    clusterWeights: { "Core Idea & Innovation": 25, "Market & Commercial Opportunity": 15, "Execution & Operations": 25, "Business Model & Strategy": 10, "Team & Organizational Health": 10, "External Environment & Compliance": 10, "Risk & Future Outlook": 5 },
    feedback: null,
    consultationStatus: 'Pending',
    consultationDate: '2024-08-20',
    consultationTime: '02:00 PM',
    ttcAssigned: 'TTC002',
  },
  {
    id: 'IDEA-003',
    validationId: 'VALID-003-001',
    title: 'Gamified Language Learning App',
    description: 'An app that makes learning new languages fun through gamification.',
    collegeId: 'COL002',
    collegeName: 'Vanguard College of Engineering',
    domain: 'EdTech',
    innovatorId: 'INV003',
    innovatorName: 'Alisha Khan',
    innovatorEmail: 'alisha.khan@example.com',
    status: 'Needs Refinement',
    dateSubmitted: '2024-07-15',
    version: 'V1.0',
    report: { ...MOCK_SAMPLE_REPORT, ideaName: 'Gamified Language Learning App', overallScore: 4.5, validationOutcome: 'Needs Refinement', input: { user_idea: 'An app that makes learning new languages fun through gamification.', ai_understanding: 'AI understands this as a mobile education app using game mechanics.' } },
    clusterWeights: { "Core Idea & Innovation": 30, "Market & Commercial Opportunity": 20, "Execution & Operations": 20, "Business Model & Strategy": 10, "Team & Organizational Health": 10, "External Environment & Compliance": 5, "Risk & Future Outlook": 5 },
    feedback: null,
    consultationStatus: 'Not Requested',
    consultationDate: null,
    consultationTime: null,
    ttcAssigned: 'TTC003',
  },
   {
    id: 'IDEA-004',
    validationId: 'VALID-004-001',
    title: 'AR Furniture Placement App',
    description: 'An augmented reality app to visualize furniture in your home before buying.',
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'Smart Cities',
    innovatorId: 'INV001',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Developing',
    dateSubmitted: '2024-06-10',
    version: 'V1.0',
    report: { ...MOCK_SAMPLE_REPORT, ideaName: 'AR Furniture Placement App', overallScore: 6.8, validationOutcome: 'Developing', input: { user_idea: 'An augmented reality app to visualize furniture in your home before buying.', ai_understanding: 'AI understands this as an e-commerce tool using AR for product visualization.' } },
    clusterWeights: { "Core Idea & Innovation": 20, "Market & Commercial Opportunity": 30, "Execution & Operations": 20, "Business Model & Strategy": 15, "Team & Organizational Health": 5, "External Environment & Compliance": 5, "Risk & Future Outlook": 5 },
    feedback: null,
    consultationStatus: 'Completed',
    consultationDate: '2024-06-25',
    consultationTime: '03:00 PM',
    ttcAssigned: 'TTC001',
  },
];
