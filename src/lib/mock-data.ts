
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
  ideaName: "Economical AI Project Management Tool",
  preparedFor: "Innovator Name",
  date: "August 4, 2025",
  overallScore: 8.7,
  outcome: "High Potential",
  executiveSummary: "The 'Economical AI Project Management Tool' addresses a critical gap in the market for startups and small businesses. By leveraging AI for automation and insights at an accessible price point, it creates a differentiated offering that moves beyond basic task management. The overall viability score of 8.7/10 indicates high potential. Key opportunities lie in a massive, underserved target market, while the primary challenges involve competing with established players and maintaining profitability with a low-cost model. A key risk is the operational cost of providing powerful AI features at a low price. The path to success requires a clear focus on a stellar user experience and a highly scalable, automated operational model.",
  keyStrengths: [
    "Strong Value Proposition: The combination of affordability and AI features fills a clear market gap.",
    "Scalable SaaS Model: The business model allows for rapid growth with controlled costs.",
    "Target Market Growth: The global and Indian startup ecosystems are expanding rapidly, providing a large customer base."
  ],
  keyWeaknesses: [
    "High Competition: The market is crowded with well-funded and established players like Jira and Asana.",
    "Operational Costs: Maintaining powerful AI features at a low price point poses a significant challenge to profitability.",
    "Brand Recognition: As a new entrant, building trust and brand loyalty will be a key hurdle."
  ],
  criticalRisks: [
    {
      title: "Intense Competition",
      description: "The project management software market is mature and saturated with well-established players.",
      mitigation: "Focus on a niche (e.g., startups), differentiate with a unique 'economical + AI' value proposition, and build a strong community to create brand loyalty."
    },
    {
      title: "Operational Costs of AI",
      description: "Providing powerful AI features at a low price point can lead to high operational costs (e.g., GPU usage, API licenses) that erode profitability.",
      mitigation: "Optimize AI models for efficiency, use cost-effective cloud solutions, and carefully manage usage-based costs. Consider a tiered AI feature model where advanced features are exclusive to higher-priced plans."
    },
    {
      title: "User Experience Debt",
      description: "The pressure to ship quickly to compete can lead to a subpar user experience and technical debt.",
      mitigation: "Adopt an MVP-first strategy with a clear focus on core, high-value features. Implement continuous user feedback loops and allocate dedicated time for refactoring and bug fixes in every sprint."
    }
  ],
  competitiveAnalysis: [
    {
      competitor: "Jira",
      products: "Jira Software",
      features: "Advanced issue tracking, scrum/kanban boards, extensive integrations.",
      priceRange: "₹650 - ₹1,800+ per user/month",
      strengths: "Market leader, extensive features, strong ecosystem.",
      weaknesses: "Complex, steep learning curve, expensive for startups."
    },
    {
      competitor: "Asana",
      products: "Asana platform",
      features: "Task management, project timelines, workflow automation.",
      priceRange: "₹850 - ₹2,000+ per user/month",
      strengths: "Intuitive UI, good for collaboration, strong brand.",
      weaknesses: "Can be expensive, limited AI features in free tier."
    },
    {
      competitor: "Trello",
      products: "Trello boards",
      features: "Kanban boards, simple task cards, integrations.",
      priceRange: "Free - ₹1,000+ per user/month",
      strengths: "Extremely easy to use, visual, strong free tier.",
      weaknesses: "Lacks advanced features and AI, not for complex projects."
    }
  ],
  detailedPricing: {
    cogsBreakdown: [
      { item: "AI Compute & GPU usage", cost: "₹150" },
      { item: "Cloud Hosting & Storage", cost: "₹75" },
      { item: "Third-party APIs & Licenses", cost: "₹50" },
    ],
    manufacturingAndAssembly: "N/A for SaaS",
    estimatedCogs: "₹275 per user/month",
    retailPricingStrategy: "A freemium model is recommended to acquire users, with a premium tier that offers advanced AI features. To be profitable, a gross margin of at least 60% is required on the premium tier. Target a monthly premium price of ₹699 per user."
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
  detailedValidationAndScoring: {
    "Core Idea & Product": [
        { parameter: 'Originality', description: 'Test', inference: 'The core idea is not entirely new, but the combination of \'economical\' pricing and \'AI-powered\' features is a strong, original value proposition that sets it apart.', score: '8.5', justification: 'Justification here', suggestions: 'Focus marketing on this unique combination.' },
    ],
    "Market & Customers": [],
    "Execution": [],
    "Business Model": [],
    "Team": [],
    "Compliance": [],
    "Risk & Strategy": [],
  },
  aiAgentAnalysis: {
    introduction: "Our AI research agent conducted a broad analysis of the project management and AI-in-SaaS markets. Key findings include a growing demand for intelligent automation features and a significant price sensitivity among startups. The research confirms that the 'affordable AI' niche is viable and shows high growth potential in emerging markets.",
    findings: [
      { title: "Demand for Automation", details: "75% of startups surveyed express a need for project management tools that offer more than basic task lists, citing a desire for predictive analytics and automated reporting.", type: "Market Trend" },
      { title: "Price Sensitivity", details: "The average 'willingness to pay' for premium SaaS tools among Indian startups is 30-40% lower than their counterparts in the US and Europe.", type: "Market Insight" },
      { title: "Feature Request", details: "AI features most requested by project managers include automated timeline adjustments, risk prediction, and smart allocation of tasks based on team member capacity.", type: "User Need" }
    ]
  },
  sources: [
    { text: "Statista Report: Project Management Software Market Size", url: "https://www.statista.com/outlook/dmo/enterprise-software/project-management-software/worldwide" },
    { text: "Research on SaaS pricing in India.", url: "https://example.com/saas-pricing-india" },
  ],
  disclaimer: "This report is an automated assessment and does not constitute professional business, legal, or financial advice. The analysis is based on information available at the time of generation and is intended for informational and illustrative purposes only. All scores and recommendations are indicative and should be independently validated."
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
    report: { ...MOCK_SAMPLE_REPORT, ideaName: 'Blockchain-Based Voting System', overallScore: 7.2, outcome: 'Developing' },
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
    report: { ...MOCK_SAMPLE_REPORT, ideaName: 'Gamified Language Learning App', overallScore: 4.5, outcome: 'Needs Refinement' },
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
    report: { ...MOCK_SAMPLE_REPORT, ideaName: 'AR Furniture Placement App', overallScore: 6.8, outcome: 'Developing' },
    clusterWeights: { "Core Idea & Innovation": 20, "Market & Commercial Opportunity": 30, "Execution & Operations": 20, "Business Model & Strategy": 15, "Team & Organizational Health": 5, "External Environment & Compliance": 5, "Risk & Future Outlook": 5 },
    feedback: null,
    consultationStatus: 'Completed',
    consultationDate: '2024-06-25',
    consultationTime: '03:00 PM',
    ttcAssigned: 'TTC001',
  },
];
