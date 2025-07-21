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
          "Originality": "Is the idea truly distinct from existing solutions?",
          "Differentiation": "What sets this idea apart from competitors?",
        }
      },
      "Problem-Solution Fit": {
        description: "Customer Needs, Existence, Pain Points, Value Proposition, Market Demand",
        subParameters: {
          "Problem Severity": "Does the idea effectively solve a clearly defined problem?",
          "Solution Effectiveness": "How well does the solution address the problem?",
        }
      },
      "UX/Usability Potential": {
        description: "User Interface, Ease of Use, Accessibility, Human-Computer Interaction",
        subParameters: {
          "Intuitive Design": "Is the design easy to understand and navigate?",
          "Accessibility Compliance": "Does it meet accessibility standards?",
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
          "Market Size (TAM,SAM,SOM)": "Total, Serviceable, and Obtainable Market.",
          "Competitive Intensity": "How strong is the competition?",
        }
      },
      "Geographic Specificity (India)": {
        description: "Local Market, Regional Factors, India Market, Regulatory Environment (Local)",
        subParameters: {
          "Regulatory Landscape": "Understanding local regulations.",
          "Infrastructure Readiness": "Availability of necessary infrastructure.",
        }
      },
      "Product-Market Fit": {
        description: "User Adoption, Customer Satisfaction, Retention, Engagement Metrics",
        subParameters: {
          "User Engagement": "How engaged are potential users?",
          "Retention Potential": "Ability to retain users over time.",
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
          "Technology Maturity": "How mature is the technology required?",
          "Scalability & Performance": "Can the system handle growth and perform well?",
        }
      },
      "Operational Viability": {
        description: "Resource Management, Workflow Optimization, Supply Chain, Talent Acquisition",
        subParameters: {
          "Resource Availability": "Are necessary resources readily available?",
          "Process Efficiency": "How efficient are the operational processes?",
        }
      },
      "Scalability Potential": {
        description: "Growth Capacity, Expansion Strategy, Business Model Scaling",
        subParameters: {
          "Business Model Scalability": "Can the business model scale effectively?",
          "Market Expansion Potential": "Ease of expanding into new markets.",
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
          "Revenue Stream Diversity": "Multiple ways to generate income.",
          "Profitability & Margins": "Potential for profit and healthy margins.",
        }
      },
      "Defensibility": {
        description: "Moats, Barriers to Entry, Sustainable Advantage, Competitive Edge",
        subParameters: {
          "Intellectual Property (IP)": "Protection of intellectual assets.",
          "Network Effects": "Does the product benefit from more users?",
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
          "Relevant Experience": "Experience relevant to the idea/industry.",
          "Complementary Skills": "Do team members have diverse and complementary skills?",
        }
      },
      "Culture/Values": {
        description: "Organizational Values, DEI, Mission-Driven, Work Environment",
        subParameters: {
          "Mission Alignment": "Are team values aligned with the mission?",
          "Diversity & Inclusion": "Commitment to diversity and inclusion.",
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
          "Data Privacy Compliance": "Adherence to data protection laws.",
          "Sector-Specific Compliance": "Compliance with industry-specific regulations.",
        }
      },
      "Sustainability (ESG)": {
        description: "Environmental Impact, Social Responsibility, Governance Practices, Ethical Business",
        subParameters: {
          "Environmental Impact": "Positive or negative environmental effects.",
          "Social Impact (SDGs)": "Contribution to Sustainable Development Goals.",
        }
      },
      "Ecosystem Support (India)": {
        description: "Government Support, Investor Relations, Partnerships, Industry Associations",
        subParameters: {
          "Government & Institutional Support": "Support from government bodies and institutions.",
          "Investor & Partner Landscape": "Potential for attracting investors and partners.",
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
          "Technical Risks": "Potential technical hurdles or failures.",
          "Market Risks": "Risks related to market changes or competition.",
        }
      },
      "Investor Attractiveness": {
        description: "Funding Potential, Valuation, Exit Strategy, Investor Relations",
        subParameters: {
          "Valuation Potential": "Potential valuation for investors.",
          "Exit Strategy Viability": "Feasibility of investor exit.",
        }
      },
      "Academic/National Alignment": {
        description: "Policy Alignment, Research Contribution, National Development Goals",
        subParameters: {
          "National Policy Alignment (India)": "Alignment with national policies and initiatives.",
          "Academic/Research Contribution": "Contribution to academic research or knowledge.",
        }
      },
    }
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
  },
  {
    id: 'IDEA-002',
    title: 'Decentralized Education Platform',
    description: 'A blockchain-based platform for peer-to-peer learning with verified credentials.',
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
  },
  {
    id: 'IDEA-003',
    title: 'Eco-Friendly Waste Sorting Robot',
    description: 'A robotic system for automated and precise sorting of recyclable materials.',
    status: 'Validating',
    dateSubmitted: '2024-07-10',
    version: 'V1.0',
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: null,
  },
  {
    id: 'IDEA-004',
    title: 'Personalized Mental Wellness App',
    description: 'An app providing tailored mental health exercises and support based on user input.',
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

export const STATUS_COLORS: { [key: string]: string } = {
    Validating: 'bg-gray-500 text-white',
    Approved: 'bg-green-500 text-white',
    Moderate: 'bg-yellow-500 text-white',
    Rejected: 'bg-red-500 text-white',
    Pending: 'bg-blue-500 text-white',
    Scheduled: 'bg-indigo-500 text-white',
    Completed: 'bg-green-600 text-white',
  };
