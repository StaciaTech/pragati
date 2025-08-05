
'use client';

import React, { useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MOCK_IDEAS } from '@/lib/mock-data';
import { 
  Check, X, Shield, Users, Clock, Leaf, DollarSign, Target, Briefcase, TrendingUp, Search, Info, Loader2, Download, ArrowLeft,
  FileText, Lightbulb, TrendingDown, Layers, Rocket, Factory, AlignJustify, Handshake, Sun, Globe, Zap, Award, Star, Activity, HardHat, GitFork, Link2, Sprout, Building, PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROLES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// A generic section component for better structure and styling
const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="flex items-center text-2xl font-bold mb-4 text-gray-800">
        {icon}
        <span className="ml-3">{title}</span>
      </h2>
      <div className="border-b-2 border-gray-100 mb-4"></div>
      {children}
    </motion.div>
  );

// Component to render the detailed scoring hierarchy
const DetailedScoringBlock = ({ parameter }: { parameter: any }) => {
    // Check if the current parameter has sub_parameters (nested structure)
    if (parameter.sub_parameters && parameter.sub_parameters.length > 0) {
      return (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm mb-6">
          <h4 className="flex items-center text-lg font-bold text-gray-800 mb-4">
            {/* The icon is now part of the parameter data */}
            {parameter.icon && <span className="mr-2">{parameter.icon}</span>}
            {parameter.parameter_name}
          </h4>
          <div className="pl-4 border-l border-gray-300 space-y-4">
            {parameter.sub_parameters.map((subParam: any, index: number) => (
              <DetailedScoringBlock key={index} parameter={subParam} />
            ))}
          </div>
        </div>
      );
    } else {
      // This is the final leaf node with a score and analysis
      const userInput = parameter.user_input;
      const isNotGiven = userInput && userInput.user_input === "not given";
      
      return (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h5 className="text-md font-bold text-gray-800 mb-2">{parameter.parameter_name}</h5>
          
          <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <h6 className="font-semibold text-yellow-800 mb-1">User Provided Data:</h6>
            {isNotGiven ? (
              <p className="text-sm text-yellow-700">Not given</p>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                {userInput && Object.entries(userInput).map(([key, value], i) => (
                  <li key={i}>
                    <span className="font-medium">{key.replace(/_/g, ' ').replace('user provided', '')}:</span> {value as string}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <p className="text-sm font-semibold text-gray-600">Score:</p>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-sm">
                {parameter.score}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-gray-600">Inference:</p>
              <p className="text-sm text-gray-700 mt-1">{parameter.inference}</p>
            </div>
            
            {parameter.recommendations && parameter.recommendations.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-600">AI's Suggestions:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mt-1">
                  {parameter.recommendations.map((rec: string, i: number) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* New Sources Used Section */}
            {parameter.sourcesUsed && parameter.sourcesUsed.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-600">Sources Used:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mt-1">
                  {parameter.sourcesUsed.map((source: any, i: number) => (
                    <li key={i}>
                      {source.url ? (
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {source.text}
                        </a>
                      ) : (
                        source.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

const CompetitiveAnalysisTable = ({ competitors }: { competitors: any[] }) => (
<div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
    <thead>
        <tr className="bg-gray-50">
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Features</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strengths</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weaknesses</th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {competitors.map((comp, index) => (
        <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{comp.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{comp.features}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comp.price_range}</td>
            <td className="px-6 py-4 text-sm text-green-600">{comp.strengths}</td>
            <td className="px-6 py-4 text-sm text-red-600">{comp.weaknesses}</td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);

const ActionPlanCategory = ({ title, items }: { title: string, items: string[] }) => (
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{title}</h4>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

const ReportPage = ({ idea }: { idea: (typeof MOCK_IDEAS)[0] }) => {
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const report = idea.report;

  if (!report) {
    return <div>Report not available</div>
  }
  
  const scoreColor = report.overallScore > 8 ? 'text-green-500' : report.overallScore > 6 ? 'text-yellow-500' : 'text-red-500';

  const handleDownloadPdf = () => {
    const input = reportRef.current;
    if (!input) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not find the report content to download.',
        });
        return;
    }

    toast({
        title: 'Generating PDF...',
        description: 'This may take a moment. Please wait.',
    });

    html2canvas(input, {
        scale: 2, 
        useCORS: true,
        backgroundColor: window.getComputedStyle(document.body).backgroundColor,
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        let imgHeight = pdfWidth / ratio;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        
        pdf.save(`${report.ideaName.replace(/\s+/g, '_')}_Report.pdf`);
        toast({
            title: 'Download Complete',
            description: 'Your PDF report has been downloaded.',
        });
    }).catch(err => {
        toast({
            variant: 'destructive',
            title: 'PDF Generation Failed',
            description: 'An error occurred while generating the PDF.',
        });
        console.error(err);
    });
};


  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans antialiased text-gray-900">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-4">
            <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <Button onClick={handleDownloadPdf}>
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
            </Button>
        </div>
        <div ref={reportRef} className="bg-gray-50 p-4 md:p-8 space-y-8">
            <motion.header
                className="text-center py-8 bg-white rounded-xl shadow-md border border-gray-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
                    AI-Powered Idea Validation Report
                </h1>
                <p className="text-xl text-gray-600 font-medium">{report.ideaName}</p>
                <p className="text-sm text-gray-400 mt-2">Prepared for {report.preparedFor} on {report.date}</p>
                <div className="mt-6">
                    <span className={`text-5xl md:text-6xl font-extrabold ${scoreColor}`}>
                    {report.overallScore.toFixed(1)}
                    </span>
                    <span className="text-2xl text-gray-500">/10</span>
                </div>
            </motion.header>

            {/* 1. Input & AI Understanding */}
            {report.input && (
                <Section title="1. Input & AI Understanding" icon={<Lightbulb className="text-yellow-500" />}>
                     <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold text-blue-800 mb-2">User's Idea:</p>
                        <p className="text-gray-700 mb-4 whitespace-pre-wrap">"{report.input.user_idea}"</p>
                        <p className="font-semibold text-blue-800 mb-2">AI's Understanding:</p>
                        <p className="text-gray-700 whitespace-pre-wrap">{report.input.ai_understanding}</p>
                    </div>
                </Section>
            )}

            {/* 2. Executive Summary */}
            {report.executiveSummary && (
                <Section title="2. Executive Summary" icon={<AlignJustify className="text-blue-500" />}>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-1/3 text-center p-6 bg-blue-50 rounded-xl">
                    <p className="text-6xl font-extrabold text-blue-600">{report.overallScore.toFixed(1)}</p>
                    <p className="mt-2 text-lg font-semibold text-blue-800">Overall Score</p>
                    </div>
                    <div className="w-full md:w-2/3">
                    <p className="text-lg font-semibold text-gray-800 mb-2">Outcome: <span className="font-bold text-green-600">{report.executiveSummary.outcome}</span></p>
                    <p className="text-gray-600 leading-relaxed">{report.executiveSummary.summary}</p>
                    </div>
                </div>
                </Section>
            )}
            
            {/* 3. Key Strengths & Weaknesses */}
            {report.keyStrengthsWeaknesses && (
                <Section title="3. Key Strengths & Weaknesses" icon={<Layers className="text-indigo-500" />}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <p className="font-bold text-lg text-green-700 mb-2 flex items-center"><Check className="mr-2" />Strengths</p>
                    <ul className="space-y-2 text-green-700">
                        {report.keyStrengthsWeaknesses.strengths.map((item, index) => (
                        <li key={index}>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                    <p className="font-bold text-lg text-red-700 mb-2 flex items-center"><X className="mr-2" />Weaknesses</p>
                    <ul className="space-y-2 text-red-700">
                        {report.keyStrengthsWeaknesses.weaknesses.map((item, index) => (
                        <li key={index}>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
                </Section>
            )}

            {/* 4. Critical Risks & Mitigation Strategies */}
            {report.criticalRisksAndMitigation && Array.isArray(report.criticalRisksAndMitigation) && (
              <Section title="4. Critical Risks & Mitigation Strategies" icon={<Shield className="text-red-500" />}>
                <div className="space-y-4">
                  {report.criticalRisksAndMitigation.map((risk, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg">
                      <p className="font-bold text-lg text-gray-800 mb-1">{risk.risk}</p>
                      <p className="text-gray-600 text-sm mb-2">{risk.description}</p>
                      <div className="flex flex-col md:flex-row md:space-x-4">
                        <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700">Impact:</span> {risk.impact}</p>
                        <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700">Mitigation:</span> {risk.mitigation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}
            
            {/* 5. Competitive Analysis */}
            {report.competitiveAnalysis && (
                <Section title="5. Competitive Analysis" icon={<TrendingUp className="text-green-500" />}>
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg mb-6">
                        <h5 className="font-semibold text-yellow-800 mb-2">User Provided Competitors:</h5>
                        <p className="text-gray-700 whitespace-pre-wrap">{report.competitiveAnalysis.user_provided_competitors}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">AI's Inference:</p>
                    <p className="text-gray-700 mb-4">{report.competitiveAnalysis.ai_inference}</p>
                    <CompetitiveAnalysisTable competitors={report.competitiveAnalysis.competitors} />
                    {report.competitiveAnalysis.recommendations.length > 0 && (
                        <div className="mt-4">
                        <p className="font-semibold text-gray-700">AI Recommendations:</p>
                        <ul className="list-disc list-inside text-gray-600">
                            {report.competitiveAnalysis.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                        </ul>
                        </div>
                    )}
                </Section>
            )}
            
            {/* 6. Detailed Pricing & Financials */}
            {report.detailedPricingAndFinancials && (
                <Section title="6. Detailed Pricing & Financials" icon={<DollarSign className="text-green-500" />}>
                     <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg mb-6">
                        <h5 className="font-semibold text-yellow-800 mb-2">User Provided Financials:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                        <li><span className="font-medium">Pricing Model:</span> {report.detailedPricingAndFinancials.user_provided_pricing_model}</li>
                        <li><span className="font-medium">Estimated Price:</span> {report.detailedPricingAndFinancials.user_provided_estimated_price}</li>
                        </ul>
                    </div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">AI's Analysis:</p>
                    <p className="text-gray-700 mb-4">{report.detailedPricingAndFinancials.ai_pricing_inference}</p>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-700 mb-6">
                        <div>
                        <p><span className="font-semibold">Recommended Pricing Model:</span> {report.detailedPricingAndFinancials.recommended_pricing_model}</p>
                        <p><span className="font-semibold">Estimated Premium Price:</span> ₹{report.detailedPricingAndFinancials.estimated_premium_price}</p>
                        <p><span className="font-semibold">Estimated COGS/User:</span> ₹{report.detailedPricingAndFinancials.estimated_cogs_per_user}</p>
                        </div>
                        <div>
                        <p className="font-semibold">Cost Breakdown:</p>
                        <ul className="list-disc list-inside">
                            {report.detailedPricingAndFinancials.cost_breakdown.map((item, i) => (
                            <li key={i}>{item.item}: ₹{item.cost}</li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    <p className="font-semibold text-gray-700">AI's Suggestions:</p>
                    <ul className="list-disc list-inside text-gray-600">
                        {report.detailedPricingAndFinancials.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </Section>
            )}
            
            {/* 7. Prioritized Next Steps / Action Plan */}
            {report.actionPlan && (
                <Section title="7. Prioritized Next Steps / Action Plan" icon={<Rocket className="text-purple-500" />}>
                <div className="space-y-6">
                    <ActionPlanCategory title="Urgent (Next 1-3 Months)" items={report.actionPlan.urgent} />
                    <ActionPlanCategory title="High Priority (Next 3-6 Months)" items={report.actionPlan.highPriority} />
                    <ActionPlanCategory title="Mid Priority (Next 6-12 Months)" items={report.actionPlan.midPriority} />
                </div>
                </Section>
            )}

            {/* 8. Detailed Idea Validation & Scoring */}
            {report.detailedIdeaValidationAndScoring && (
              <Section title="8. Detailed Idea Validation & Scoring" icon={<Star className="text-yellow-500" />}>
              <div className="space-y-10">
                  {report.detailedIdeaValidationAndScoring.map((param, index) => (
                    <DetailedScoringBlock key={index} parameter={param} />
                  ))}
              </div>
              </Section>
            )}
            
            {/* 9. AI Research Agent Findings */}
            {report.aiResearchAgentFindings && (
                <Section title="9. AI Research Agent Findings" icon={<Zap className="text-cyan-500" />}>
                    <p className="text-gray-700 mb-4">{report.aiResearchAgentFindings.summary}</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {report.aiResearchAgentFindings.findings.map((item, index) => (
                        <li key={index}>{item.finding}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {/* 10. IP & Research Paper Analysis */}
            {report.ipAndResearchPaperAnalysis && (
                <Section title="10. IP & Research Paper Analysis" icon={<Award className="text-orange-500" />}>
                <p className="text-gray-600 mb-4">{report.ipAndResearchPaperAnalysis.summary}</p>
                <p className="font-semibold text-gray-700">Relevant Research Papers:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {report.ipAndResearchPaperAnalysis.papers.map((paper, index) => (
                    <li key={index}>
                        <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {paper.title}
                        </a>
                    </li>
                    ))}
                </ul>
                </Section>
            )}

            {/* 11. Consolidated Sources of Information */}
            {report.sources && (
                <Section title="11. Consolidated Sources of Information" icon={<Globe className="text-cyan-500" />}>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {report.sources.map((source, index) => (
                    <li key={index}>
                        {source.url ? (
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {source.text}
                        </a>
                        ) : (
                        <p>{source.text}</p>
                        )}
                    </li>
                    ))}
                </ul>
                </Section>
            )}

            {/* 12. Professional Disclaimer Section */}
            {report.disclaimer && (
                <Section title="12. Professional Disclaimer" icon={<Info className="text-gray-500" />}>
                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{report.disclaimer}</p>
                </Section>
            )}
        </div>
      </div>
    </div>
  );
};


export default function IdeaReportPageWrapper() {
  const { ideaId } = useParams() as { ideaId: string };
  const idea = MOCK_IDEAS.find((i) => i.id === ideaId);

  if (!idea || !idea.report) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Generating Report</h2>
        <p className="text-muted-foreground">
            {idea ? "The report for this idea is not yet available." : "Idea not found."}
        </p>
         <Button asChild className="mt-6">
            <Link href={`/dashboard/ideas?role=${ROLES.INNOVATOR}`}>Go to My Ideas</Link>
        </Button>
      </div>
    );
  }

  return <ReportPage idea={idea} />;
}
