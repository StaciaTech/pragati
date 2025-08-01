
import type { ValidationReport } from '@/ai/schemas';
import { ROLES, type Role } from './constants';

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

const MOCK_SAMPLE_REPORT: ValidationReport = {
  ideaName: "Eco-Cycle: Smart Urban Composter",
  overallScore: 84,
  outcome: "High Potential with Actionable Opportunities.",
  currency: "Indian Rupees (₹)",
  exchangeRate: "1 USD = 83.5 INR",
  executiveSummary: "The 'Eco-Cycle' smart urban composter is a highly promising venture, targeting the growing segment of environmentally conscious city residents. It addresses a significant pain point—the inconvenience and unpleasantness of traditional composting—with a technologically advanced and consumer-friendly solution. The market for smart home devices and sustainable products is expanding rapidly, providing a favorable environment for a product like Eco-Cycle. Key strengths include its strong problem-solution fit and the potential for a subscription-based revenue model. However, the idea faces challenges related to high initial production costs, the need for extensive user education, and a complex regulatory environment surrounding waste management. Strategic partnerships and a robust supply chain will be crucial for success.",
  keyStrengths: [
    "High Problem-Solution Fit: The product directly solves the primary barriers to urban composting: space, odor, and speed. This strong alignment with user needs gives it a compelling value proposition.",
    "Subscription-Based Revenue Potential: The business model can be enhanced with recurring revenue from compostable waste bags, filters, or even a service to collect finished compost, increasing the customer's lifetime value.",
    "Strong ESG & SDG Alignment: Eco-Cycle aligns perfectly with global sustainability goals, which is a powerful marketing message and can attract mission-driven investors and government support."
  ],
  keyWeaknesses: [
    "High Initial Production Cost: The electronic components, sensors, and the durable, airtight housing required for the composter will result in a high Cost of Goods Sold (COGS), necessitating a premium price point.",
    "User Education Barrier: Composting is a new behavior for many urban residents. The product's success depends on the ability to effectively educate users on what can and cannot be composted and how to use the device correctly.",
    "Waste Management Regulatory Hurdles: The business model may need to navigate local municipal regulations regarding waste collection and processing, which can vary significantly from one city to another."
  ],
  criticalRisks: [
    {
      title: "High Price Point & Market Acceptance",
      howWhy: "The high manufacturing cost of a smart device will translate to a premium retail price. Consumers may be hesitant to pay a significant amount for a product that is, at its core, a waste disposal unit, especially in a price-sensitive market.",
      mitigation: "Position Eco-Cycle as a smart appliance that saves money on garbage disposal fees (where applicable) and provides a valuable resource (compost) for gardening. Focus on the long-term value and environmental benefits to justify the initial cost."
    },
    {
      title: "Negative User Experience Due to Odor or Failure",
      howWhy: "The primary value proposition is the elimination of odors. A single instance of product failure, such as a clogged filter or a faulty sensor, could lead to a foul odor, resulting in negative reviews and severe brand damage.",
      mitigation: "Implement a robust quality assurance program with extensive testing for all components, especially the aeration and filtering systems. Develop a smart alert system within the app that notifies users of maintenance needs before a failure occurs."
    },
    {
      title: "Supply Chain and Manufacturing Dependencies",
      howWhy: "The product relies on a complex supply chain for specialized electronic components. Any disruption in this chain, due to geopolitical events or other factors, could lead to production delays and increased costs.",
      mitigation: "Diversify the supplier base by sourcing components from multiple regions. Establish a clear contingency plan for a sudden change in component availability or cost."
    }
  ],
  competitiveAnalysis: [
    {
      competitor: "Lomi",
      keyProducts: "Smart indoor composter",
      priceRange: "₹35,000 - ₹50,000+",
      strengths: "Well-established brand, strong marketing, effective odor control",
      weaknesses: "Extremely high price point, high power consumption, requires proprietary pods"
    },
    {
      competitor: "VegeBox",
      keyProducts: "Hydroponic indoor garden",
      priceRange: "₹10,000 - ₹20,000+",
      strengths: "Targets the broader 'grow your own food' market, integrates with smart systems",
      weaknesses: "Does not offer composting, focuses on the gardening aspect"
    },
    {
      competitor: "Pela",
      keyProducts: "Eco-friendly phone cases",
      priceRange: "₹2,500 - ₹4,000+",
      strengths: "Strong brand in the sustainability space, uses compostable materials",
      weaknesses: "Not a composting device, but a brand that attracts the target audience"
    }
  ],
  clusterData: [
    {
      title: "Cluster 1: Core Idea & Product",
      parameters: [
        { title: "Novelty & Uniqueness", subParameters: [{ title: "Originality", score: 90, confidence: "High", inference: "While other smart composters exist, a compact, IoT-enabled device tailored for the Indian urban market is a highly original and well-timed concept.", suggestions: "Focus on securing intellectual property for the internal aeration and filtering mechanism, which is a key differentiator." }, { title: "Differentiation", score: 85, confidence: "High", inference: "The product's main differentiator is its combination of a small footprint, smart functionality, and a potential for a lower price point compared to international competitors.", suggestions: "Emphasize the 'Made for India' aspect, highlighting features that are optimized for local waste types and climate." }] },
        { title: "Problem-Solution Fit", subParameters: [{ title: "Problem Severity", score: 95, confidence: "High", inference: "The problem of kitchen waste management in small urban spaces is a universal and highly severe pain point, which the product directly addresses.", suggestions: "Conduct user interviews to identify other related pain points, such as pest control, to further refine the product." }, { title: "Solution Effectiveness", score: 90, confidence: "High", inference: "The active aeration and filtering technology should effectively accelerate the composting process and eliminate odors, providing a highly effective solution.", suggestions: "Develop a prototype and conduct extensive user testing to validate the solution's real-world effectiveness in various climates." }] },
        { title: "UX/Usability Potential", subParameters: [{ title: "Intuitive Design", score: 85, confidence: "High", inference: "The product's success will depend on a simple, intuitive user interface for the device and a clear, educational companion app.", suggestions: "Prioritize a user-friendly app that provides clear instructions and feedback on the composting process." }, { title: "Accessibility Compliance", score: 75, confidence: "Medium", inference: "The product is designed to be accessible to a wide range of users, but specific features for individuals with disabilities will need to be intentionally designed.", suggestions: "Consider features like voice commands for the app and clear, tactile buttons on the device." }] }
      ]
    },
    {
      title: "Cluster 2: Market Opportunity",
      parameters: [
        { title: "Market Validation", subParameters: [{ title: "Market Size (TAM)", score: 88, confidence: "High", inference: "The global smart home and sustainable products markets are experiencing rapid growth, with the potential for a large addressable market in India's major cities.", suggestions: "Perform a detailed market analysis for the specific Indian urban demographic to better estimate the serviceable addressable market." }, { title: "Competitive Intensity", score: 70, confidence: "High", inference: "While direct competitors are few, the market is filled with indirect competitors and DIY solutions. The product needs to stand out with a clear value proposition.", suggestions: "Differentiate the product by highlighting its efficiency, odor control, and smart features." }] },
        { title: "Geographic Specificity (India)", subParameters: [{ title: "Regulatory Landscape", score: 65, confidence: "High", inference: "The product will need to comply with local regulations on waste management and e-waste disposal, which can be complex and require local expertise.", suggestions: "Partner with a legal and regulatory expert to ensure compliance in all target cities." }, { title: "Infrastructure Readiness", score: 85, confidence: "High", inference: "The logistics and digital infrastructure in India's major cities are well-equipped to support a D2C model for a smart device.", suggestions: "Plan for potential logistics challenges in smaller cities and with last-mile delivery." }] },
        { title: "Product-Market Fit", subParameters: [{ title: "User Engagement", score: 90, confidence: "High", inference: "The product provides a satisfying and rewarding experience, as users can see the waste reduction and compost creation in real-time through the app.", suggestions: "Integrate a gamification element into the app, such as a leaderboard for waste diverted from landfills, to boost user engagement." }, { title: "Retention Potential", score: 92, confidence: "High", inference: "The product's core utility is a daily need, which suggests strong long-term retention. A subscription-based model for filters and bags further enhances this potential.", suggestions: "Create a strong brand and community around the product to ensure long-term customer loyalty." }] }
      ]
    },
    {
      title: "Cluster 3: Execution",
      parameters: [
        { title: "Technical Feasibility", subParameters: [{ title: "Technology Maturity", score: 85, confidence: "High", inference: "The core technologies (sensors, microcontrollers, IoT connectivity) are mature. The primary challenge is integrating them into a reliable, compact, and odor-free device.", suggestions: "Conduct extensive R&D and prototyping to test the combined functionality and reliability of the device." }, { title: "Scalability & Performance", score: 88, confidence: "High", inference: "The product's hardware design will be critical for both scalability and performance. A robust design will allow for mass production, while poor design could lead to quality control issues.", suggestions: "Invest in a manufacturing partner with a proven track record in consumer electronics and smart home devices." }] },
        { title: "Operational Viability", subParameters: [{ title: "Resource Availability", score: 80, confidence: "High", inference: "India has a deep talent pool in both hardware and software development. However, securing specialized talent for the composting process itself may require a focused search.", suggestions: "Explore partnerships with agricultural universities or waste management experts." }, { title: "Process Efficiency", score: 82, confidence: "High", inference: "A D2C model allows for tight control over the entire process, from manufacturing to customer support.", suggestions: "Map out the entire value chain and identify potential bottlenecks before scaling production." }] },
        { title: "Scalability Potential", subParameters: [{ title: "Business Model Scalability", score: 95, confidence: "High", inference: "The business model is highly scalable. The core technology can be adapted to other products, such as larger community composters or smart bins for offices and restaurants.", suggestions: "Plan for future product iterations and service offerings from the beginning." }, { title: "Market Expansion Potential", score: 90, confidence: "High", inference: "The product's universal utility makes it highly suitable for international expansion.", suggestions: "Design the product with international standards in mind to facilitate future expansion." }] }
      ]
    },
    {
      title: "Cluster 4: Business Model",
      parameters: [
        { title: "Financial Viability", subParameters: [{ title: "Revenue Stream Diversity", score: 90, confidence: "High", inference: "The business can generate revenue from product sales, accessories, and a potential premium subscription model for the companion app.", suggestions: "Model the financial impact of each revenue stream to prioritize the most profitable ones." }, { title: "Profitability & Margins", score: 85, confidence: "High", inference: "The high cost of hardware may result in low margins initially, but these can improve with scale.", suggestions: "Focus on optimizing the supply chain and manufacturing process to reduce costs." }] },
        { title: "Defensibility", subParameters: [{ title: "Intellectual Property (IP)", score: 90, confidence: "High", inference: "The unique aeration and filtering mechanism, along with the device's design, can be protected by patents and trademarks.", suggestions: "File for provisional patents early in the development cycle." }, { title: "Network Effects", score: 75, confidence: "Medium", inference: "The product itself has limited network effects, but a social element in the companion app could increase its value.", suggestions: "Explore features like leaderboards for waste reduction or a community forum for gardening tips to create a social network effect." }] }
      ]
    },
    {
      title: "Cluster 5: Team",
      parameters: [
        { title: "Founder-Fit", subParameters: [{ title: "Relevant Experience", score: 85, confidence: "High", inference: "The team's experience in smart home devices, IoT, and sustainability is a significant asset.", suggestions: "Leverage this experience to build a strong product and manage the supply chain effectively." }, { title: "Complementary Skills", score: 88, confidence: "High", inference: "The team is likely to have a good mix of technical and business skills, which is crucial for a hardware startup.", suggestions: "Conduct a skills gap analysis and hire for any missing key roles (e.g., marketing, finance) early on." }] },
        { title: "Culture/Values", subParameters: [{ title: "Mission Alignment", score: 95, confidence: "High", inference: "A clear mission to promote sustainability and solve a real-world problem is a strong motivator for the team and a key factor for success.", suggestions: "Reinforce the mission and vision regularly to keep the team aligned and motivated." }, { title: "Diversity & Inclusion", score: 90, confidence: "High", inference: "Building a diverse and inclusive team is critical for innovation and a strong company culture.", suggestions: "Implement diversity and inclusion policies and training from the start." }] }
      ]
    },
    {
      title: "Cluster 6: Compliance",
      parameters: [
        { title: "Regulatory (India)", subParameters: [{ title: "Data Privacy Compliance", score: 85, confidence: "High", inference: "The product's companion app will collect user data, and the company must comply with India's Digital Personal Data Protection Act, 2023.", suggestions: "Engage with a legal expert to ensure compliance and draft a transparent privacy policy." }, { title: "Sector-Specific Compliance", score: 75, confidence: "High", inference: "The product must meet BIS standards for electronics and other sector-specific regulations, which can be a complex and time-consuming process.", suggestions: "Prioritize compliance testing and certification to avoid delays and legal issues." }] },
        { title: "Sustainability (ESG)", subParameters: [{ title: "Environmental Impact", score: 95, confidence: "High", inference: "The product's entire value proposition is centered on reducing environmental impact by diverting waste from landfills. This is a core strength.", suggestions: "Use recycled materials and implement a take-back or recycling program for old composters." }, { title: "Social Impact (SDGs)", score: 95, confidence: "High", inference: "The product aligns with several SDGs, such as Responsible Consumption and Production (SDG 12) and Climate Action (SDG 13).", suggestions: "Actively promote the social and environmental benefits of the product and partner with sustainability organizations." }] },
        { title: "Ecosystem Support (India)", subParameters: [{ title: "Government & Institutional Support", score: 85, confidence: "High", inference: "The Indian government offers various schemes and incubators for startups, which the project can leverage for funding and support.", suggestions: "Research and apply for relevant government grants and join a reputable startup incubator." }, { title: "Investor & Partner Landscape", score: 88, confidence: "High", inference: "The smart home and sustainability sectors are highly attractive to investors, and strategic partnerships can accelerate growth.", suggestions: "Prepare a compelling pitch deck and a detailed business plan to attract investors and partners." }] }
      ]
    },
    {
      title: "Cluster 7: Risk & Strategy",
      parameters: [
        { title: "Risk Assessment", subParameters: [{ title: "Technical Risks", score: 75, confidence: "High", inference: "The primary technical risks are the long-term reliability of the sensors and the effectiveness of the filtering system to prevent odors.", suggestions: "Allocate a significant portion of the budget to R&D and quality control." }, { title: "Market Risks", score: 70, confidence: "High", inference: "Market risks include competition, pricing pressure, and the potential for a new technology to disrupt the market.", suggestions: "Develop a flexible business strategy that can adapt to changing market conditions." }] },
        { title: "Investor Attractiveness", subParameters: [{ title: "Valuation Potential", score: 90, confidence: "High", inference: "The unique product, large market, and defensible IP give the company a high valuation potential.", suggestions: "Focus on achieving key milestones to increase valuation at each funding round." }, { title: "Exit Strategy Viability", score: 85, confidence: "High", inference: "The company could be an attractive acquisition target for larger smart home or sustainability-focused companies.", suggestions: "Build a strong brand and a loyal customer base to increase attractiveness to potential acquirers." }] },
        { title: "Academic/National Alignment", subParameters: [{ title: "National Policy Alignment (India)", score: 92, confidence: "High", inference: "The product aligns with national priorities such as Swachh Bharat Abhiyan (Clean India Mission) and circular economy initiatives.", suggestions: "Highlight this alignment in grant applications and pitches to investors." }, { title: "Academic/Research Contribution", score: 80, confidence: "Medium", inference: "The product can contribute to research on material science, waste management, and consumer behavior.", suggestions: "Collaborate with universities and research institutions to explore new technologies and applications." }] }
      ]
    },
  ],
  sources: [
    "Global Smart Home Devices Market Report (2023-2028): [Source from imaginary research firm]",
    "Competitor Analysis - Smart Composting Solutions: [Source from imaginary research firm]",
    "Swachh Bharat Abhiyan Guidelines: [Source from Indian government]",
    "General AI Knowledge: N/A"
  ],
  disclaimer: "This report is a comprehensive analysis based on current market data, competitor intelligence, and established business frameworks. It is intended to provide a high-level strategic overview and is not a substitute for detailed financial modeling, legal counsel, or engineering consultation. All scores and suggestions are based on a synthesis of available information and expert judgment. Final product success depends on meticulous execution, adaptability, and the ability to respond to dynamic market conditions.",
};


export let MOCK_IDEAS: Array<{
  id: string;
  validationId: string;
  title: string;
  description: string;
  collegeId: string;
  collegeName: string;
  domain: string;
  innovatorId: string;
  innovatorName: string;
  innovatorEmail: string;
  status: string;
  dateSubmitted: string;
  version: string;
  report: ValidationReport | null; 
  clusterWeights?: Record<string, number>; 
  feedback?: { overall: string; details: { aspect: string; score: number; comment: string }[] } | null;
  consultationStatus: string;
  consultationDate: string | null;
  consultationTime: string | null;
  ttcAssigned: string | null;
}> = [
  {
    id: 'IDEA-001',
    validationId: 'VALID-001-001',
    title: 'AI-Powered Smart Farming',
    description: 'An intelligent system using AI to optimize crop yield and detect diseases early.',
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'Agriculture',
    innovatorId: 'INV001',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Approved',
    dateSubmitted: '2024-01-15',
    version: 'V1.0',
    report: {...MOCK_SAMPLE_REPORT, ideaName: 'AI-Powered Smart Farming', overallScore: 88, outcome: 'Approved'},
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: null,
    consultationStatus: 'Scheduled',
    consultationDate: '2024-07-20',
    consultationTime: '10:00',
    ttcAssigned: 'TTC_001',
  },
  {
    id: 'IDEA-002',
    validationId: 'VALID-002-001',
    title: 'Decentralized Education Platform',
    description: 'A blockchain-based platform for peer-to-peer learning with verified credentials.',
    collegeId: 'COL002',
    collegeName: 'Global School of Innovation',
    domain: 'EdTech',
    innovatorId: 'INV002',
    innovatorName: 'John Smith',
    innovatorEmail: 'john.smith@example.com',
    status: 'Moderate',
    dateSubmitted: '2024-02-20',
    version: 'V1.0',
    report: {...MOCK_SAMPLE_REPORT, ideaName: 'Decentralized Education Platform', overallScore: 62, outcome: 'Moderate'},
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: null,
    consultationStatus: 'Pending',
    consultationDate: null,
    consultationTime: null,
    ttcAssigned: null,
  },
   {
    id: 'IDEA-003',
    validationId: 'VALID-003-001',
    title: 'HealthTech Wearable for Seniors',
    description: 'A wearable device that monitors vital signs for elderly individuals and alerts caregivers.',
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'HealthTech',
    innovatorId: 'INV001',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Rejected',
    dateSubmitted: '2024-03-10',
    version: 'V1.0',
    report: {...MOCK_SAMPLE_REPORT, ideaName: 'HealthTech Wearable for Seniors', overallScore: 42, outcome: 'Rejected'},
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: null,
    consultationStatus: 'Not Requested',
    consultationDate: null,
    consultationTime: null,
    ttcAssigned: null,
  },
  {
    id: 'IDEA-004',
    validationId: 'VALID-004-001',
    title: 'Smart City Traffic Management',
    description: 'An IoT and AI-based system to optimize traffic flow in real-time.',
    collegeId: 'COL003',
    collegeName: 'Tech University Chennai',
    domain: 'Smart Cities',
    innovatorId: 'INV004',
    innovatorName: 'Arjun Kumar',
    innovatorEmail: 'arjun.k@example.com',
    status: 'Approved',
    dateSubmitted: '2024-04-05',
    version: 'V1.0',
    report: {...MOCK_SAMPLE_REPORT, ideaName: 'Smart City Traffic Management', overallScore: 90, outcome: 'Approved'},
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: null,
    consultationStatus: 'Completed',
    consultationDate: '2024-04-25',
    consultationTime: '11:00',
    ttcAssigned: 'TTC_002',
  },
   {
    id: 'IDEA-005',
    validationId: 'VALID-005-001',
    title: 'Personalized Financial Advisor Bot',
    description: 'A FinTech chatbot that provides personalized investment advice based on user goals.',
    collegeId: 'COL001',
    collegeName: 'Pragati Institute of Technology',
    domain: 'FinTech',
    innovatorId: 'INV001',
    innovatorName: 'Jane Doe',
    innovatorEmail: 'jane.doe@example.com',
    status: 'Approved',
    dateSubmitted: '2024-05-22',
    version: 'V1.0',
    report: {...MOCK_SAMPLE_REPORT, ideaName: 'Financial Advisor Bot', overallScore: 80, outcome: 'Moderate'},
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: null,
    consultationStatus: 'Pending',
    consultationDate: null,
    consultationTime: null,
    ttcAssigned: 'TTC_001',
  },
   {
    id: 'IDEA-006',
    validationId: 'VALID-006-001',
    title: 'Renewable Energy Grid Optimizer',
    description: 'AI model to predict energy production from solar/wind and optimize grid distribution.',
    collegeId: 'COL002',
    collegeName: 'Global School of Innovation',
    domain: 'Renewable Energy',
    innovatorId: 'INV002',
    innovatorName: 'Priya Singh',
    innovatorEmail: 'priya.s@example.com',
    status: 'Moderate',
    dateSubmitted: '2024-06-30',
    version: 'V1.0',
    report: {...MOCK_SAMPLE_REPORT, ideaName: 'Grid Optimizer', overallScore: 70, outcome: 'Moderate'},
    clusterWeights: INITIAL_CLUSTER_WEIGHTS,
    feedback: null,
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
    innovatorId: 'INV001',
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
    innovatorId: 'INV002',
    title: 'Market Strategy Review for EdTech',
    date: '2024-07-18',
    time: '02:00 PM',
    mentor: 'Prof. Alex Green',
    status: 'Completed',
    milestones: ['Business Model Refined'],
    files: ['Market_Analysis_Feedback.pdf'],
  },
];

export let MOCK_CREDIT_REQUESTS: {
    id: string;
    requesterType: 'College' | 'TTC' | 'Innovator';
    requesterId: string;
    requesterName: string;
    amount: number;
    status: 'Pending' | 'Approved' | 'Rejected';
    date: string;
    purpose: string;
}[] = [
  { id: 'CR-COL-001', requesterType: 'College', requesterId: 'COL001', requesterName: 'Pragati Institute of Technology', amount: 50, status: 'Pending', date: '2024-07-10', purpose: 'Bulk credits for new semester' },
  { id: 'CR-TTC-001', requesterType: 'TTC', requesterId: 'TTC_001', requesterName: 'Dr. Priya Sharma', amount: 20, status: 'Pending', date: '2024-07-14', purpose: 'Credits for upcoming innovator batch' },
  { id: 'CR-INV-001', requesterType: 'Innovator', requesterId: 'innovator-001', requesterName: 'Jane Doe', amount: 1, status: 'Pending', date: '2024-07-15', purpose: 'Need 1 credit for new idea submission' },
  { id: 'CR-INV-002', requesterType: 'Innovator', requesterId: 'INV002', requesterName: 'John Smith', amount: 5, status: 'Approved', date: '2024-07-12', purpose: 'Resubmission of project' },
];

export let MOCK_COLLEGES = [
  { id: 'COL001', name: 'Pragati Institute of Technology', principalEmail: 'principal.pit@pragati.com', ttcLimit: 5, creditsAvailable: 100, currentPlanId: 'PLAN001-M', status: 'Active' },
  { id: 'COL002', name: 'Global School of Innovation', principalEmail: 'principal.gsi@pragati.com', ttcLimit: 3, creditsAvailable: 75, currentPlanId: 'PLAN001-M', status: 'Active' },
  { id: 'COL003', name: 'Tech University Chennai', principalEmail: 'principal.tuc@pragati.com', ttcLimit: 7, creditsAvailable: 120, currentPlanId: 'PLAN002-Y', status: 'Inactive' },
];

export let MOCK_PLANS = [
  // Monthly Plans
  { id: 'PLAN001-M', name: 'Essential Monthly', pricePerCredit: 500, minCredits: 20, totalAmount: 10000, features: ['20 Idea Submissions', 'Basic Feedback', '5 TTCs'], enabled: true, interval: 'monthly' },
  { id: 'PLAN002-M', name: 'Advance Monthly', pricePerCredit: 490, minCredits: 50, totalAmount: 24500, features: ['50 Idea Submissions', 'Detailed Feedback', '10 TTCs', '2 Consultations'], enabled: true, interval: 'monthly' },
  { id: 'PLAN003-M', name: 'Advance Pro Monthly', pricePerCredit: 475, minCredits: 100, totalAmount: 47500, features: ['Unlimited Idea Submissions', 'Premium Feedback', '15 TTCs', 'Unlimited Consultations'], enabled: true, interval: 'monthly' },

  // Yearly Plans (with a discount)
  { id: 'PLAN001-Y', name: 'Essential Yearly', pricePerCredit: 450, minCredits: 240, totalAmount: 108000, features: ['240 Idea Submissions', 'Basic Feedback', '5 TTCs', '10% Discount'], enabled: true, interval: 'yearly' },
  { id: 'PLAN002-Y', name: 'Advance Yearly', pricePerCredit: 440, minCredits: 600, totalAmount: 264000, features: ['600 Idea Submissions', 'Detailed Feedback', '10 TTCs', '24 Consultations', '12% Discount'], enabled: true, interval: 'yearly' },
  { id: 'PLAN003-Y', name: 'Advance Pro Yearly', pricePerCredit: 425, minCredits: 1200, totalAmount: 510000, features: ['Unlimited Idea Submissions', 'Premium Feedback', '15 TTCs', 'Unlimited Consultations', '15% Discount'], enabled: true, interval: 'yearly' },
  
  // Enterprise Plan (same for both intervals)
  { id: 'PLAN004-E', name: 'Enterprises', pricePerCredit: 0, minCredits: 0, totalAmount: 0, features: ['Custom Limits', 'Dedicated Support', 'Tailored Solutions', 'Contact Us for Pricing'], enabled: true, interval: 'monthly' },
  { id: 'PLAN004-E', name: 'Enterprises', pricePerCredit: 0, minCredits: 0, totalAmount: 0, features: ['Custom Limits', 'Dedicated Support', 'Tailored Solutions', 'Contact Us for Pricing'], enabled: true, interval: 'yearly' },
];


export let MOCK_TTCS = [
  { id: 'TTC_001', name: 'Dr. Priya Sharma', email: 'priya.sharma@pragati.com', collegeId: 'COL001', expertise: ['AI', 'Machine Learning'], maxConsultations: 3, currentConsultations: 1, status: 'Active' },
  { id: 'TTC_002', name: 'Mr. Rahul Verma', email: 'rahul.verma@pragati.com', collegeId: 'COL001', expertise: ['Blockchain', 'FinTech'], maxConsultations: 2, currentConsultations: 0, status: 'Active' },
  { id: 'TTC_003', name: 'Ms. Sneha Reddy', email: 'sneha.reddy@pragati.com', collegeId: 'COL002', expertise: ['Robotics', 'IoT'], maxConsultations: 4, currentConsultations: 0, status: 'Inactive' },
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
    Moderate: 'bg-orange-500 text-white',
    MODERATE: 'bg-orange-500 text-white',
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

  export const MOCK_NOTIFICATIONS: Record<Role, { id: number; title: string; description: string; read: boolean; }[]> = {
  [ROLES.INNOVATOR]: [
    { id: 1, title: 'Idea "Smart Farming" Validated', description: 'Your idea has been successfully validated with an "Approved" status.', read: false },
    { id: 2, title: 'Credit Request Approved', description: 'Your request for 5 credits has been approved by your TTC.', read: true },
    { id: 3, title: 'Upcoming Consultation', description: 'Your meeting with Dr. Emily White is scheduled for tomorrow at 10 AM.', read: false },
  ],
  [ROLES.COORDINATOR]: [
    { id: 1, title: 'New Credit Request', description: 'Innovator Jane Doe has requested 2 credits.', read: false },
    { id: 2, title: 'Consultation Scheduled', description: 'Innovator John Smith has scheduled a consultation with you.', read: true },
    { id: 3, title: 'Your Credit Request Approved', description: 'Your request for 20 credits has been approved by the Principal.', read: false },
  ],
  [ROLES.PRINCIPAL]: [
    { id: 1, title: 'New Credit Request from TTC', description: 'TTC Dr. Priya Sharma has requested 20 credits.', read: false },
    { id: 2, title: 'Plan Upgrade Recommended', description: 'Your usage is high. Consider upgrading to the Advance Pro plan.', read: false },
    { id: 3, title: 'Payment Due', description: 'Your monthly subscription payment is due next week.', read: true },
  ],
  [ROLES.SUPER_ADMIN]: [
    { id: 1, title: 'New Support Ticket #12345', description: 'A new high-priority support ticket has been opened.', read: false },
    { id: 2, title: 'System Load Normal', description: 'System performance is stable.', read: true },
  ],
};
