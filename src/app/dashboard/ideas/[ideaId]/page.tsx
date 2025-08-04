
'use client';

import React, { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MOCK_IDEAS } from '@/lib/mock-data';
import { 
  Check, X, Shield, Users, Clock, Leaf, DollarSign, Target, Briefcase, TrendingUp, Search, Info, Loader2, Download, ArrowLeft,
  FileText, Lightbulb, TrendingDown, Layers, Rocket, Factory, AlignJustify, Handshake, Sun, Globe, Zap, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROLES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { ValidationReport } from '@/ai/schemas';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


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
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            let width = pdfWidth;
            let height = width / ratio;

            if (height > pdfHeight) {
                height = pdfHeight;
                width = height * ratio;
            }

            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
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

  const Section = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: React.ElementType }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="flex items-center text-2xl font-bold mb-4 text-gray-800">
        {Icon && <Icon className="mr-3 text-indigo-600" size={24} />}
        {title}
      </h2>
      <div className="border-b-2 border-gray-100 mb-4"></div>
      {children}
    </motion.div>
  );

  const SubParameterCard = ({ subParam }: { subParam: any }) => (
    <div className="relative p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h4 className="flex items-center text-lg font-semibold text-gray-900">
          {subParam.parameter_name}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="ml-2 text-gray-400 hover:text-indigo-600 cursor-help">
                            <Info size={16} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                        <p>{subParam.description}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </h4>
        <div className="flex-shrink-0">
          {typeof subParam.score === 'number' ? (
            <div className={`p-2 rounded-lg text-white font-bold text-lg text-center ${subParam.score >= 9 ? 'bg-green-500' : subParam.score >= 7 ? 'bg-yellow-500' : 'bg-red-500'}`}>
              {subParam.score}/10
            </div>
          ) : (
            <div className="p-2 rounded-lg text-white bg-gray-500 font-bold text-sm text-center">N/A</div>
          )}
        </div>
      </div>
      <div className="space-y-4 text-gray-700 text-sm">
        {subParam.inference && (
          <div>
            <p className="font-bold mb-1">Inference:</p>
            <p className="text-gray-600">{subParam.inference}</p>
          </div>
        )}
        {subParam.recommendations && subParam.recommendations.length > 0 && (
          <div>
            <p className="font-bold mb-1">Recommendations:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {subParam.recommendations.map((rec: string, i: number) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
        {subParam.sources_used && subParam.sources_used.length > 0 && (
          <div className="mt-4">
            <p className="font-bold mb-1">Sources Used:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {subParam.sources_used.map((source: any, i: number) => (
                <li key={i}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {source.description}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {subParam.risk_level && (
        <div className="mt-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            subParam.risk_level === 'High' ? 'bg-red-100 text-red-800' :
            subParam.risk_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            Risk: {subParam.risk_level}
          </span>
        </div>
      )}
    </div>
  );

    const iconMap: { [key: string]: React.ElementType } = {
        "Core Idea": FileText,
        "Market Opportunity": Briefcase,
        "Execution": Check,
        "Business Model": DollarSign,
        "Team": Users,
        "Compliance": Shield,
        "Risk & Strategy": TrendingUp,
    };

    const CategorySection = ({ title, sub_parameters }: { title: string; sub_parameters: any[], description: string }) => {
        const Icon = iconMap[title] || FileText;
        return (
            <div className="mb-8">
                <h3 className="flex items-center text-xl font-bold mb-4 text-gray-700">
                    <span className="mr-2"><Icon /></span>
                    {title}
                </h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sub_parameters.map((subParam, index) => (
                        <SubParameterCard key={index} subParam={subParam} />
                    ))}
                </div>
            </div>
        )
    };
    
    const CompetitiveAnalysisTable = ({ competitors }: { competitors: any[] }) => (
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
            <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Features</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range (INR)</th>
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
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-4 sm:p-8">
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

        <div ref={reportRef} className="bg-gray-50 p-4 md:p-8 space-y-12">
            <div className="text-center">
            <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-extrabold text-blue-900"
            >
                Idea Validation Report
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-2 text-xl text-gray-600"
            >
                {report.ideaName}
            </motion.p>
            </div>
            
            <Section title="1. Input & AI Understanding" icon={Lightbulb}>
                <div className="space-y-4">
                    <div>
                    <p className="font-bold mb-1 text-gray-800">User's Idea:</p>
                    <p className="text-gray-600 italic">"{report.input.user_idea}"</p>
                    </div>
                    <div>
                    <p className="font-bold mb-1 text-gray-800">AI's Understanding:</p>
                    <p className="text-gray-600">{report.input.ai_understanding}</p>
                    </div>
                </div>
            </Section>
            
            <Section title="2. Executive Summary" icon={AlignJustify}>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-1/3 text-center p-6 bg-blue-50 rounded-xl">
                    <p className="text-6xl font-extrabold text-blue-600">{report.overallScore}</p>
                    <p className="mt-2 text-lg font-semibold text-blue-800">Overall Score</p>
                    </div>
                    <div className="w-full md:w-2/3">
                    <p className="text-lg font-semibold text-gray-800 mb-2">Outcome:</p>
                    <p className="text-base leading-relaxed text-gray-600">{report.outcome}</p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{report.executiveSummary}</p>
                    </div>
                </div>
            </Section>

            <Section title="3. Key Strengths & Weaknesses" icon={Award}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                    <h3 className="flex items-center text-xl font-bold mb-4 text-green-700"><Check className="mr-2" /> Key Strengths</h3>
                    <div className="space-y-6">
                        {report.keyStrengthsWeaknesses.strengths.map((s: any, i: number) => (
                        <div key={i} className="p-4 rounded-lg bg-green-50 shadow-sm">
                            <p className="font-semibold text-green-800">{s.title}</p>
                            <p className="text-sm text-green-700 mt-1">{s.description}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                    <div>
                    <h3 className="flex items-center text-xl font-bold mb-4 text-red-700"><X className="mr-2" /> Key Weaknesses</h3>
                    <div className="space-y-6">
                        {report.keyStrengthsWeaknesses.weaknesses.map((w: any, i: number) => (
                        <div key={i} className="p-4 rounded-lg bg-red-50 shadow-sm">
                            <p className="font-semibold text-red-800">{w.title}</p>
                            <p className="text-sm text-red-700 mt-1">{w.description}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            </Section>

            <Section title="4. Critical Risks & Mitigation Strategies" icon={TrendingDown}>
                <div className="space-y-8">
                    {report.criticalRisksMitigation.risks.map((r: any, i: number) => (
                    <div key={i} className="p-6 rounded-xl bg-gray-50 shadow-md">
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Risk: {r.risk}</h3>
                        <p className="text-gray-600 mb-4">{r.how_why}</p>
                        <p className="font-semibold text-gray-700 mb-2">Mitigation Strategies:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {r.mitigation_strategies.map((m: string, j: number) => <li key={j}>{m}</li>)}
                        </ul>
                    </div>
                    ))}
                </div>
            </Section>

            <Section title="5. Competitive Analysis" icon={Layers}>
                <p className="text-gray-700 mb-6">{report.competitiveAnalysis.inference}</p>
                <CompetitiveAnalysisTable competitors={report.competitiveAnalysis.competitors} />
            </Section>
            
            <Section title="6. Detailed Pricing & Financials" icon={DollarSign}>
                <div className="space-y-6 text-gray-700">
                <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Cost of Goods Sold (COGS) & Margin Analysis</h3>
                    <p className="text-sm mb-2">{report.detailedPricingFinancials.cogs_margin.estimated_costs}</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                    {report.detailedPricingFinancials.cogs_margin.cost_breakdown.map((item: any, i: number) => (
                        <li key={i}>{item.item}: {item.cost}</li>
                    ))}
                    </ul>
                    <p className="font-bold mt-2">Estimated COGS per User/Month: {report.detailedPricingFinancials.cogs_margin.estimated_cogs_per_user}</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">Retail Pricing Strategy</h3>
                    <p className="text-sm mb-2">{report.detailedPricingFinancials.cogs_margin.retail_pricing_strategy}</p>
                    <p className="text-sm mb-2 font-mono">{report.detailedPricingFinancials.cogs_margin.pricing_calculation}</p>
                    <p className="font-bold text-md mt-2 text-blue-800">{report.detailedPricingFinancials.cogs_margin.final_recommendation}</p>
                </div>
                </div>
            </Section>
            
            <Section title="7. Prioritized Next Steps / Action Plan" icon={Rocket}>
                <div className="space-y-6">
                    <ActionPlanCategory title="Urgent (Next 1-3 Months)" items={report.actionPlan.urgent} />
                    <ActionPlanCategory title="High Priority (Next 3-6 Months)" items={report.actionPlan.highPriority} />
                    <ActionPlanCategory title="Mid Priority (Next 6-12 Months)" items={report.actionPlan.midPriority} />
                </div>
            </Section>
            
            <Section title="8. Detailed Idea Validation & Scoring" icon={Search}>
                <div className="space-y-10">
                    {report.detailedValidationAndScoring.map((category, index) => (
                    <CategorySection 
                        key={index} 
                        title={category.parameter_name} 
                        sub_parameters={category.sub_parameters} 
                        description={category.description}
                    />
                    ))}
                </div>
            </Section>
            
            <Section title="9. AI Research Agent Findings" icon={Zap}>
                <div className="space-y-8">
                    <div className="p-6 rounded-xl bg-gray-50 shadow-md">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Problem Analysis</h3>
                    <p className="text-sm mb-4">{report.problemsAnalysis.analysis}</p>
                    <ul className="list-disc list-inside space-y-3 text-sm text-gray-600">
                        {report.problemsAnalysis.problems.map((p: any, i: number) => (
                        <li key={i}>
                            <span className="font-bold">{p.problem}</span> - <span className="text-xs italic">{p.source}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <div className="p-6 rounded-xl bg-gray-50 shadow-md">
                    <h3 className="text-lg font-bold mb-2 text-gray-800">IP & Research Paper Analysis</h3>
                    <p className="text-sm mb-4">{report.researchPaperAnalysis.analysis}</p>
                    <p className="font-semibold text-sm text-gray-700">Relevant Links:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {report.researchPaperAnalysis.links.map((link: any, i: number) => (
                        <li key={i}><a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.text}</a></li>
                        ))}
                    </ul>
                    </div>
                </div>
            </Section>
            
            <Section title="10. Consolidated Sources of Information" icon={Globe}>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {report.sources.map((source: any, index: number) => (
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
            
            <Section title="11. Professional Disclaimer" icon={Info}>
                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{report.disclaimer}</p>
            </Section>
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
