
'use client';

import React, { useRef, useState } from 'react';
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
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up">
    <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center text-gray-800">
      {icon}
      <span className="ml-3">{title}</span>
    </h2>
    {children}
  </div>
);

// A sub-section component for the detailed scoring
const SubSection = ({ title, score, inference, recommendations, sourcesUsed, user_input, icon }: { title: string, score?: number, inference?: string, recommendations?: string[], sourcesUsed?: {text: string, url?: string}[], user_input?: {user_input: string}, icon: React.ReactNode }) => (
  <div className="pl-6 border-l-2 border-gray-200 my-4">
    <div className="flex items-center text-lg font-semibold text-gray-700">
      {icon}
      <h4 className="ml-2">{title}</h4>
    </div>
    {score && (
      <div className="flex items-center mt-2">
        <span className="text-sm font-medium text-gray-500 mr-2">Score:</span>
        <div className="w-24 bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full"
            style={{ 
              width: `${score * 10}%`,
              backgroundColor: score > 8 ? '#10B981' : score > 6 ? '#F59E0B' : '#EF4444' 
            }}
          ></div>
        </div>
        <span 
          className="ml-2 text-sm font-bold"
          style={{ color: score > 8 ? '#10B981' : score > 6 ? '#F59E0B' : '#EF4444' }}
        >
          {score.toFixed(1)}/10
        </span>
      </div>
    )}
    {inference && <p className="mt-2 text-gray-600 italic">" {inference} "</p>}
    {recommendations && recommendations.length > 0 && (
      <div className="mt-4">
        <p className="font-medium text-gray-700">Recommendations:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
        </ul>
      </div>
    )}
    {sourcesUsed && sourcesUsed.length > 0 && (
      <div className="mt-4">
        <p className="font-medium text-gray-700">Sources Used:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {sourcesUsed.map((source, index) => (
            <li key={index}>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {source.text}
                </a>
              ) : (
                <span>{source.text}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
    {user_input && user_input.user_input !== "not given" && (
      <p className="mt-2 text-sm text-gray-500">
        <span className="font-semibold">User Input:</span> {user_input.user_input}
      </p>
    )}
  </div>
);

// Component to handle multi-level nested sub-parameters
const renderSubParameters = (subParameters: any[]) => {
  if (!subParameters) return null;

  return subParameters.map((param, index) => (
    <div key={index} className="pl-4 border-l-2 border-gray-100">
      <div className="flex items-center my-4">
        <span className="text-md font-semibold text-gray-800 flex items-center">
          {param.icon}
          <span className="ml-2">{param.parameter_name}</span>
        </span>
      </div>
      {param.sub_parameters ? renderSubParameters(param.sub_parameters) : (
        <SubSection
          title={param.parameter_name}
          score={param.score}
          inference={param.inference}
          recommendations={param.recommendations}
          sourcesUsed={param.sourcesUsed}
          user_input={param.user_input}
          icon={param.icon}
        />
      )}
    </div>
  ));
};

const ReportPage = ({ idea }: { idea: (typeof MOCK_IDEAS)[0] }) => {
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const report = idea.report;

  if (!report) {
    return <div>Report not available</div>
  }

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
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const ratio = canvasWidth / canvasHeight;
          const height = pdfWidth / ratio;
          let position = 0;
          let remainingHeight = canvasHeight;

          while(remainingHeight > 0) {
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, height, undefined, 'FAST');
            remainingHeight -= (pdf.internal.pageSize.getHeight() * ratio);
            if (remainingHeight > 0) {
                pdf.addPage();
                position = -pdf.internal.pageSize.getHeight()
            }
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

  const scoreColor = report.overallScore > 8 ? 'text-green-500' : report.overallScore > 6 ? 'text-yellow-500' : 'text-red-500';

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
                <Section title="1. Input & AI Understanding" icon={<Zap className="text-yellow-500" />}>
                <div className="space-y-4">
                    <div>
                    <p className="font-semibold text-gray-700">User's Idea:</p>
                    <p className="mt-1 text-gray-600 italic">"{report.input.user_idea}"</p>
                    </div>
                    <div>
                    <p className="font-semibold text-gray-700">AI's Interpretation:</p>
                    <p className="mt-1 text-gray-600">{report.input.ai_understanding}</p>
                    </div>
                </div>
                </Section>
            )}

            {/* 2. Executive Summary */}
            {report.executiveSummary && (
                <Section title="2. Executive Summary" icon={<AlignJustify className="text-blue-500" />}>
                <p className="text-lg font-semibold text-gray-700 mb-2">Outcome: <span className="font-bold text-green-600">{report.executiveSummary.outcome}</span></p>
                <p className="text-gray-600 leading-relaxed">{report.executiveSummary.summary}</p>
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
                <div className="space-y-4">
                    <div>
                    <p className="font-semibold text-gray-700">User Provided Competitors:</p>
                    <p className="mt-1 text-gray-600">{report.competitiveAnalysis.user_provided_competitors}</p>
                    </div>
                    <div>
                    <p className="font-semibold text-gray-700">AI's Inference:</p>
                    <p className="mt-1 text-gray-600">{report.competitiveAnalysis.ai_inference}</p>
                    </div>
                    <div className="mt-4">
                    <p className="font-semibold text-gray-700">Competitors' Breakdown:</p>
                    <div className="grid md:grid-cols-3 gap-4 mt-2">
                        {report.competitiveAnalysis.competitors.map((comp, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-inner">
                            <p className="font-bold text-md text-gray-800 mb-1">{comp.name}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Features:</span> {comp.features}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Price:</span> {comp.price_range}</p>
                            <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">Strengths:</span> {comp.strengths}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Weaknesses:</span> {comp.weaknesses}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                    <div className="mt-4">
                    <p className="font-semibold text-gray-700">Recommendations:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {report.competitiveAnalysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                        ))}
                    </ul>
                    </div>
                </div>
                </Section>
            )}
            
            {/* 6. Detailed Pricing & Financials */}
            {report.detailedPricingAndFinancials && (
                <Section title="6. Detailed Pricing & Financials" icon={<DollarSign className="text-green-500" />}>
                <div className="space-y-4">
                    <div>
                    <p className="font-semibold text-gray-700">User Provided Pricing Model:</p>
                    <p className="mt-1 text-gray-600">{report.detailedPricingAndFinancials.user_provided_pricing_model}</p>
                    </div>
                    <div>
                    <p className="font-semibold text-gray-700">User Provided Estimated Price:</p>
                    <p className="mt-1 text-gray-600">{report.detailedPricingAndFinancials.user_provided_estimated_price}</p>
                    </div>
                    <div>
                    <p className="font-semibold text-gray-700">AI's Pricing Inference:</p>
                    <p className="mt-1 text-gray-600">{report.detailedPricingAndFinancials.ai_pricing_inference}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
                    <div>
                        <p className="font-semibold text-gray-700">Recommended Pricing Model:</p>
                        <p className="mt-1 text-gray-600">{report.detailedPricingAndFinancials.recommended_pricing_model}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Estimated Premium Price:</p>
                        <p className="mt-1 text-gray-600">₹{report.detailedPricingAndFinancials.estimated_premium_price.toFixed(2)} / user / month</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Estimated COGS per User:</p>
                        <p className="mt-1 text-gray-600">₹{report.detailedPricingAndFinancials.estimated_cogs_per_user.toFixed(2)} / user / month</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Cost Breakdown:</p>
                        <ul className="list-disc list-inside text-gray-600">
                        {report.detailedPricingAndFinancials.cost_breakdown.map((cost, index) => (
                            <li key={index}>{cost.item}: ₹{cost.cost.toFixed(2)}</li>
                        ))}
                        </ul>
                    </div>
                    </div>
                    <div className="mt-4">
                    <p className="font-semibold text-gray-700">Suggestions:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {report.detailedPricingAndFinancials.suggestions.map((sug, index) => (
                        <li key={index}>{sug}</li>
                        ))}
                    </ul>
                    </div>
                </div>
                </Section>
            )}
            
            {/* 7. Prioritized Next Steps / Action Plan */}
            {report.actionPlan && (
                <Section title="7. Prioritized Next Steps / Action Plan" icon={<Rocket className="text-purple-500" />}>
                <div className="space-y-6">
                    <div>
                    <p className="font-bold text-gray-700 mb-2">Urgent:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {report.actionPlan.urgent.map((step, index) => <li key={index}>{step}</li>)}
                    </ul>
                    </div>
                    <div>
                    <p className="font-bold text-gray-700 mb-2">High Priority:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {report.actionPlan.highPriority.map((step, index) => <li key={index}>{step}</li>)}
                    </ul>
                    </div>
                    <div>
                    <p className="font-bold text-gray-700 mb-2">Mid Priority:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {report.actionPlan.midPriority.map((step, index) => <li key={index}>{step}</li>)}
                    </ul>
                    </div>
                </div>
                </Section>
            )}

            {/* 8. Detailed Idea Validation & Scoring */}
            {report.detailedIdeaValidationAndScoring && (
              <Section title="8. Detailed Idea Validation & Scoring" icon={<Star className="text-yellow-500" />}>
              {report.detailedIdeaValidationAndScoring.map((param, index) => (
                  <div key={index} className="my-6">
                  <h3 className="text-2xl font-bold flex items-center text-gray-800">
                      {param.icon}
                      <span className="ml-2">{param.parameter_name}</span>
                  </h3>
                  <div className="pl-6 mt-4 space-y-6">
                      {renderSubParameters(param.sub_parameters)}
                  </div>
                  </div>
              ))}
              </Section>
            )}
            
            {/* 9. SWOT Analysis */}
            {report.swotAnalysis && (
              <Section title="9. SWOT Analysis" icon={<Handshake className="text-teal-500" />}>
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-bold text-lg text-green-700 flex items-center mb-2"><Check className="mr-2" />Strengths</h3>
                  <ul className="space-y-2">
                      {report.swotAnalysis.strengths.map((item, index) => (
                      <li key={index} className="text-sm">
                          <p className="font-semibold text-green-800">{item.title}</p>
                          <p className="text-xs text-green-700">{item.description}</p>
                      </li>
                      ))}
                  </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h3 className="font-bold text-lg text-red-700 flex items-center mb-2"><X className="mr-2" />Weaknesses</h3>
                  <ul className="space-y-2">
                      {report.swotAnalysis.weaknesses.map((item, index) => (
                      <li key={index} className="text-sm">
                          <p className="font-semibold text-red-800">{item.title}</p>
                          <p className="text-xs text-red-700">{item.description}</p>
                      </li>
                      ))}
                  </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-bold text-lg text-blue-700 flex items-center mb-2"><TrendingUp className="mr-2" />Opportunities</h3>
                  <ul className="space-y-2">
                      {report.swotAnalysis.opportunities.map((item, index) => (
                      <li key={index} className="text-sm">
                          <p className="font-semibold text-blue-800">{item.title}</p>
                          <p className="text-xs text-blue-700">{item.description}</p>
                      </li>
                      ))}
                  </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <h3 className="font-bold text-lg text-yellow-700 flex items-center mb-2"><TrendingDown className="mr-2" />Threats</h3>
                  <ul className="space-y-2">
                      {report.swotAnalysis.threats.map((item, index) => (
                      <li key={index} className="text-sm">
                          <p className="font-semibold text-yellow-800">{item.title}</p>
                          <p className="text-xs text-yellow-700">{item.description}</p>
                      </li>
                      ))}
                  </ul>
                  </div>
              </div>
              </Section>
            )}

            {/* 10. IP & Research Paper Analysis */}
            {report.ipAndResearchPaperAnalysis && (
                <Section title="10. IP & Research Paper Analysis" icon={<Award className="text-orange-500" />}>
                <p className="text-gray-600 mb-4">{report.ipAndResearchPaperAnalysis.ip_summary}</p>
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
