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

export const MOCK_CLUSTER_DEFINITIONS = {
  "Core Idea": {
    description: "Evaluates the novelty, originality, and uniqueness of the idea.",
    parameters: {
      "Novelty & Uniqueness": {
        description: "Innovation, Uniqueness, Distinctiveness, USP",
        subParameters: {
          "Originality": {
            weight: 0.60,
            objective: "To determine if the core idea is genuinely new, a significant improvement, or a disruptive concept compared to existing solutions globally."
          },
          "Differentiation": {
             weight: 0.40,
            objective: "To identify how the proposed solution stands out from direct and indirect competitors, highlighting its unique selling propositions (USPs)."
          }
        }
      },
      "Problem-Solution Fit": {
        description: "Customer Needs, Existence, Pain Points, Value Proposition, Market Demand",
        subParameters: {
          "Problem Severity": {
            weight: 0.50,
            objective: "Does the idea effectively solve a clearly defined problem?"
          },
          "Solution Effectiveness": {
            weight: 0.50,
            objective: "How well does the solution address the problem?"
          }
        }
      },
      "UX/Usability Potential": {
        description: "User Interface, Ease of Use, Accessibility, Human-Computer Interaction",
        subParameters: {
          "Intuitive Design": {
            weight: 0.60,
            objective: "Is the design easy to understand and navigate?"
          },
          "Accessibility Compliance": {
            weight: 0.40,
            objective: "Does it meet accessibility standards?"
          },
        }
      },
    }
  },
  "Market Opportunity": {
    description: "Assesses how well the idea addresses a real market need and its potential for adoption.",
    parameters: {
      "Market Validation": {
        description: "Market Sizing, Competitive Analysis, Industry Trends, Demand Analysis, Sunrise / Mature",
        subParameters: {
          "Market Size (TAM,SAM,SOM)": {
            weight: 0.60,
            objective: "Total, Serviceable, and Obtainable Market."
          },
          "Competitive Intensity": {
            weight: 0.40,
            objective: "How strong is the competition?"
          },
        }
      },
      "Geographic Specificity (India)": {
        description: "Local Market, Regional Factors, India Market, Regulatory Environment (Local)",
        subParameters: {
          "Regulatory Landscape": {
            weight: 0.50,
            objective: "Understanding local regulations."
          },
          "Infrastructure Readiness": {
            weight: 0.50,
            objective: "Availability of necessary infrastructure."
          },
        }
      },
      "Product-Market Fit": {
        description: "User Adoption, Customer Satisfaction, Retention, Engagement Metrics",
        subParameters: {
          "User Engagement": {
            weight: 0.50,
            objective: "How engaged are potential users?"
          },
          "Retention Potential": {
            weight: 0.50,
            objective: "Ability to retain users over time."
          },
        }
      },
    }
  },
  "Execution": {
    description: "Implementation, Development, Logistics, Scalability, Efficiency, Operations",
    parameters: {
      "Technical Feasibility": {
        description: "Tech Stack, Development Capabilities, System Architecture, Performance, Engineering",
        subParameters: {
          "Technology Maturity": {
            weight: 0.50,
            objective: "How mature is the technology required?"
          },
          "Scalability & Performance": {
            weight: 0.50,
            objective: "Can the system handle growth and perform well?"
          },
        }
      },
      "Operational Viability": {
        description: "Resource Management, Workflow Optimization, Supply Chain, Talent Acquisition",
        subParameters: {
          "Resource Availability": {
            weight: 0.50,
            objective: "Are necessary resources readily available?"
          },
          "Process Efficiency": {
            weight: 0.50,
            objective: "How efficient are the operational processes?"
          },
        }
      },
      "Scalability Potential": {
        description: "Growth Capacity, Expansion Strategy, Business Model Scaling",
        subParameters: {
          "Business Model Scalability": {
            weight: 0.50,
            objective: "Can the business model scale effectively?"
          },
          "Market Expansion Potential": {
            weight: 0.50,
            objective: "Ease of expanding into new markets."
          },
        }
      },
    }
  },
  "Business Model": {
    description: "Monetization, Financial Planning, Competitive Advantage, Sustainability, Revenue Strategy",
    parameters: {
      "Financial Viability": {
        description: "Revenue Models, Cost Structure, Profitability, Funding Needs",
        subParameters: {
          "Revenue Stream Diversity": {
            weight: 0.50,
            objective: "Multiple ways to generate income."
          },
          "Profitability & Margins": {
            weight: 0.50,
            objective: "Potential for profit and healthy margins."
          },
        }
      },
      "Defensibility": {
        description: "Moats, Barriers to Entry, Sustainable Advantage, Competitive Edge",
        subParameters: {
          "Intellectual Property (IP)": {
            weight: 0.50,
            objective: "Protection of intellectual assets."
          },
          "Network Effects": {
            weight: 0.50,
            objective: "Does the product benefit from more users?"
          },
        }
      },
    }
  },
  "Team": {
    description: "Human Capital, Leadership, Culture, Talent Management, Organizational Structure",
    parameters: {
      "Founder-Fit": {
        description: "Team Capabilities, Leadership Qualities, Entrepreneurial Experience",
        subParameters: {
          "Relevant Experience": {
            weight: 0.50,
            objective: "Experience relevant to the idea/industry."
          },
          "Complementary Skills": {
            weight: 0.50,
            objective: "Do team members have diverse and complementary skills?"
          },
        }
      },
      "Culture/Values": {
        description: "Organizational Values, DEI, Mission-Driven, Work Environment",
        subParameters: {
          "Mission Alignment": {
            weight: 0.50,
            objective: "Are team values aligned with the mission?"
          },
          "Diversity & Inclusion": {
            weight: 0.50,
            objective: "Commitment to diversity and inclusion."
          },
        }
      },
    }
  },
  "Compliance": {
    description: "Regulatory Affairs, Legal Framework, ESG, Ecosystem Support, Governance",
    parameters: {
      "Regulatory (India)": {
        description: "Legal Compliance, Data Protection, Sectoral Laws, Governance",
        subParameters: {
          "Data Privacy Compliance": {
            weight: 0.50,
            objective: "Adherence to data protection laws."
          },
          "Sector-Specific Compliance": {
            weight: 0.50,
            objective: "Compliance with industry-specific regulations."
          },
        }
      },
      "Sustainability (ESG)": {
        description: "Environmental Impact, Social Responsibility, Governance Practices, Ethical Business",
        subParameters: {
          "Environmental Impact": {
            weight: 0.50,
            objective: "Positive or negative environmental effects."
          },
          "Social Impact (SDGs)": {
            weight: 0.50,
            objective: "Contribution to Sustainable Development Goals."
          },
        }
      },
      "Ecosystem Support (India)": {
        description: "Government Support, Investor Relations, Partnerships, Industry Associations",
        subParameters: {
          "Government & Institutional Support": {
            weight: 0.50,
            objective: "Support from government bodies and institutions."
          },
          "Investor & Partner Landscape": {
            weight: 0.50,
            objective: "Potential for attracting investors and partners."
          },
        }
      },
    }
  },
  "Risk & Strategy": {
    description: "Risk Management, Strategic Planning, Investment Appeal, Future Trends, Outlook",
    parameters: {
      "Risk Assessment": {
        description: "Risk Identification, Mitigation Strategy, Vulnerability Analysis",
        subParameters: {
          "Technical Risks": {
            weight: 0.50,
            objective: "Potential technical hurdles or failures."
          },
          "Market Risks": {
            weight: 0.50,
            objective: "Risks related to market changes or competition."
          },
        }
      },
      "Investor Attractiveness": {
        description: "Funding Potential, Valuation, Exit Strategy, Investor Relations",
        subParameters: {
          "Valuation Potential": {
            weight: 0.50,
            objective: "Potential valuation for investors."
          },
          "Exit Strategy Viability": {
            weight: 0.50,
            objective: "Feasibility of investor exit."
          },
        }
      },
      "Academic/National Alignment": {
        description: "Policy Alignment, Research Contribution, National Development Goals",
        subParameters: {
          "National Policy Alignment (India)": {
            weight: 0.50,
            objective: "Alignment with national policies and initiatives."
          },
          "Academic/Research Contribution": {
            weight: 0.50,
            objective: "Contribution to academic research or knowledge."
          },
        }
      },
    }
  },
};

export const PARAMETER_WEIGHTS: Record<string, Record<string, number>> = {
    "Core Idea": {
        "Novelty & Uniqueness": 0.30,
        "Problem-Solution Fit": 0.45,
        "UX/Usability Potential": 0.25,
    },
    "Market Opportunity": {
        "Market Validation": 0.40,
        "Geographic Specificity (India)": 0.30,
        "Product-Market Fit": 0.30,
    },
    "Execution": {
        "Technical Feasibility": 0.40,
        "Operational Viability": 0.30,
        "Scalability Potential": 0.30,
    },
    "Business Model": {
        "Financial Viability": 0.60,
        "Defensibility": 0.40,
    },
    "Team": {
        "Founder-Fit": 0.60,
        "Culture/Values": 0.40,
    },
    "Compliance": {
        "Regulatory (India)": 0.40,
        "Sustainability (ESG)": 0.30,
        "Ecosystem Support (India)": 0.30,
    },
    "Risk & Strategy": {
        "Risk Assessment": 0.40,
        "Investor Attractiveness": 0.30,
        "Academic/National Alignment": 0.30,
    },
};


export const INITIAL_CLUSTER_WEIGHTS = {
  "Core Idea": 15,
  "Market Opportunity": 20,
  "Execution": 20,
  "Business Model": 15,
  "Team": 10,
  "Compliance": 10,
  "Risk & Strategy": 10,
};

export let MOCK_IDEAS = [
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
  {
    id: 'IDEA-003',
    title: 'Eco-Friendly Waste Sorting Robot',
    description: 'A robotic system for automated and precise sorting of recyclable materials.',
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'Smart Cities',
    innovatorName: 'Alice Johnson',
    innovatorEmail: 'alice.j@example.com',
    status: 'Validating',
    dateSubmitted: '2024-07-10',
    version: 'V1.0',
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: null,
    consultationStatus: 'Not Requested',
    consultationDate: null,
    consultationTime: null,
    ttcAssigned: null,
  },
  {
    id: 'IDEA-004',
    title: 'Personalized Mental Wellness App',
    description: 'An app providing tailored mental health exercises and support based on user input.',
    collegeId: 'COL003',
    collegeName: 'Tech University Chennai',
    domain: 'HealthTech',
    innovatorName: 'Chris Lee',
    innovatorEmail: 'chris.lee@example.com',
    status: 'Rejected',
    dateSubmitted: '2024-07-12',
    version: 'V1.0',
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: {
      overall: 'While the problem is relevant, the proposed solution lacks differentiation and clear value proposition compared to existing solutions.',
      details: [
        { aspect: 'Core Idea', score: 2.0, comment: 'Similar apps already exist with established user bases.' },
        { aspect: 'Market Opportunity', score: 2.2, comment: 'Does not offer a unique selling proposition.' },
        { aspect: 'Execution', score: 3.5, comment: 'Technically feasible, but market entry is challenging.' },
        { aspect: 'Business Model', score: 2.5, comment: 'Weak monetization strategy given competition.' },
        { aspect: 'Team', score: 3.0, comment: 'Team lacks specific mental health domain expertise.' },
        { aspect: 'Compliance', score: 3.8, comment: 'General compliance is fine, but ethical AI use needs more thought.' },
        { aspect: 'Risk & Strategy', score: 2.8, comment: 'Market saturation makes rapid scaling difficult.' },
      ],
    },
    consultationStatus: 'Not Requested',
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
    Moderate: 'bg-yellow-500 text-white',
    Rejected: 'bg-red-500 text-white',
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
