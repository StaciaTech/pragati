
'use client';

import React, { useRef } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MOCK_IDEAS } from '@/lib/mock-data';
import { Check, X, Shield, Users, Clock, Leaf, DollarSign, Target, Briefcase, TrendingUp, Search, Info, Loader2, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


// Reusable Section component for a clean layout
const Section = ({ title, children, hasBorder = true }: { title: string, children: React.ReactNode, hasBorder?: boolean }) => (
  <section className="mb-10">
    <h2 className={cn(
        "text-3xl font-bold text-foreground pb-2 mb-6",
        hasBorder && "border-b-2 border-primary"
    )}>
        {title}
    </h2>
    <div>{children}</div>
  </section>
);

// A dedicated component for displaying action plan categories
const ActionPlanCategory = ({ title, items }: { title: string, items: string[] }) => (
  <div className="bg-card p-6 rounded-2xl shadow-lg border">
    <h4 className="text-xl font-semibold text-card-foreground mb-4">{title}</h4>
    <ul className="list-none space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start text-muted-foreground">
          <Clock size={18} className="text-primary mt-1 mr-2 flex-shrink-0" />
          <span className="text-base">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// New component for the Competitive Analysis Table
const CompetitiveAnalysisTable = ({ competitors }: { competitors: any[] }) => (
  <div className="overflow-x-auto bg-card p-6 rounded-2xl shadow-lg border">
    <table className="min-w-full divide-y divide-border">
      <thead className="bg-muted/50">
        <tr>
          {Object.keys(competitors[0]).map((key) => (
            <th key={key} className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-card divide-y divide-border">
        {competitors.map((competitor, index) => (
          <tr key={index}>
            {Object.values(competitor).map((value: any, idx) => (
              <td key={idx} className="px-6 py-4 whitespace-normal text-sm text-foreground">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Updated component for the Detailed Validation and Scoring section with a grid layout
const DetailedScoring = ({ clusters }: { clusters: any }) => (
  <div className="space-y-12">
    {Object.entries(clusters).map(([clusterTitle, parameters]: [string, any]) => (
      <div key={clusterTitle}>
        <h3 className="text-2xl font-bold text-foreground border-b-2 border-border pb-2 mb-6">{clusterTitle}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {parameters.map((param: any, index: number) => {
            const scoreValue = parseInt(param.score.split('/')[0], 10);
            const scoreColor = scoreValue >= 80 ? 'text-green-600' : scoreValue >= 60 ? 'text-yellow-600' : 'text-red-600';
            const isHigh = scoreValue >= 80;

            return (
              <div key={index} className="bg-card p-6 rounded-2xl shadow-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="flex items-center text-xl font-semibold text-card-foreground">
                    <Search size={18} className="text-muted-foreground mr-2" />
                    {param.parameter}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xl font-bold ${scoreColor}`}>{param.score}</span>
                    {isHigh && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">High</span>
                    )}
                  </div>
                </div>
                {param.description && <p className="text-sm text-muted-foreground mb-2"><span className="font-semibold text-foreground">Description:</span> {param.description}</p>}
                {param.inference && <p className="text-sm text-muted-foreground mb-2"><span className="font-semibold text-foreground">Inference:</span> {param.inference}</p>}
                {param.justification && <p className="text-sm text-muted-foreground mb-2"><span className="font-semibold text-foreground">Justification:</span> {param.justification}</p>}
                {param.suggestions && <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Suggestions:</span> {param.suggestions}</p>}
              </div>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

// New component for AI Agent Analysis
const AIAgentAnalysis = ({ data }: { data: any }) => (
  <div className="bg-card p-6 rounded-2xl shadow-lg border">
    <p className="text-base text-muted-foreground mb-4">{data.introduction}</p>
    <div className="space-y-4">
      {data.findings.map((finding: any, index: number) => (
        <div key={index} className="p-4 bg-background rounded-lg border">
          <div className="flex items-center mb-1">
            <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">{finding.type}</span>
            <h5 className="text-lg font-semibold text-card-foreground">{finding.title}</h5>
          </div>
          <p className="text-sm text-muted-foreground">{finding.details}</p>
        </div>
      ))}
    </div>
  </div>
);

// Main report component
const ReportPage = ({ report }: { report: any }) => {
    const { toast } = useToast();
    const reportRef = useRef<HTMLDivElement>(null);

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
            scale: 2, // Higher scale for better resolution
            useCORS: true,
            backgroundColor: null, // Use element's background
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

    const scoreColor = report.overallScore >= 80 ? 'text-green-600' : report.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-background font-sans text-foreground p-4 sm:p-8">
       <div className="flex justify-end mb-4">
        <Button onClick={handleDownloadPdf}>
            <Download className="mr-2 h-4 w-4" />
            Export as PDF
        </Button>
      </div>
      <main ref={reportRef} className="container mx-auto max-w-6xl py-8 bg-background">
        <header className="bg-card p-8 rounded-3xl shadow-xl text-center mb-10 border relative">
          <h1 className="text-4xl font-bold text-foreground leading-tight mb-2">Advanced Business Validation Report</h1>
          <p className="text-lg font-semibold text-muted-foreground mb-1">{report.ideaName}</p>
          <p className="text-sm text-muted-foreground/80">Prepared for: {report.preparedFor} | Date: {report.date}</p>
        </header>

        <Section title="1. Executive Summary">
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">{report.executiveSummary}</p>
        </Section>

        <Section title="2. Overall Viability Snapshot" hasBorder={false}>
          <div className="bg-card p-8 rounded-3xl shadow-lg border text-center flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="text-center">
              <span className={`text-5xl font-extrabold ${scoreColor}`}>{report.overallScore}/100</span>
              <p className="text-sm text-muted-foreground mt-1">Overall Viability Score</p>
            </div>
            <div className="h-16 w-px bg-border hidden sm:block"></div>
            <div className="text-center max-w-sm">
              <p className="text-lg font-semibold text-foreground">{report.outcome}</p>
              <p className="text-sm text-muted-foreground mt-1">Outcome</p>
            </div>
          </div>
        </Section>

        <Section title="3. Key Strengths & Weaknesses">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-lg border">
              <h3 className="flex items-center text-2xl font-semibold text-green-600 mb-4">
                <Check size={24} className="mr-2" /> Key Strengths
              </h3>
              <ul className="list-none space-y-3">
                {report.keyStrengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start text-muted-foreground">
                    <Check size={18} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-base">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-lg border">
              <h3 className="flex items-center text-2xl font-semibold text-red-600 mb-4">
                <X size={24} className="mr-2" /> Key Weaknesses
              </h3>
              <ul className="list-none space-y-3">
                {report.keyWeaknesses.map((weakness: string, index: number) => (
                  <li key={index} className="flex items-start text-muted-foreground">
                    <X size={18} className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-base">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section title="4. Critical Risks & Mitigation Strategies">
          <div className="space-y-6">
            {report.criticalRisks.map((risk: any, index: number) => (
              <div key={index} className="bg-card p-6 rounded-2xl shadow-lg border">
                <h4 className="text-xl font-semibold text-card-foreground mb-2">{risk.title}</h4>
                <p className="text-sm text-muted-foreground mb-2"><span className="font-semibold text-foreground">How and Why:</span> {risk.description}</p>
                <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Mitigation Strategy:</span> {risk.mitigation}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="5. AI Agent: Intellectual Property & Research Analysis">
          <AIAgentAnalysis data={report.aiAgentAnalysis} />
        </Section>
        
        <Section title="6. Competitive Analysis">
          <CompetitiveAnalysisTable competitors={report.competitiveAnalysis} />
          <p className="text-lg leading-relaxed text-muted-foreground mt-6">
            <span className="font-semibold text-foreground">Inference:</span> Hydrogen's primary opportunity is to occupy the space between the passive insulation giants (Yeti/Hydro Flask) and the active heating niche player (Ember). Its dual functionality and portability give it a distinct advantage over all of them.
          </p>
        </Section>

        <Section title="7. Detailed Pricing & Financials">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Cost of Goods Sold (COGS) & Margin Analysis</h3>
          <p className="text-base leading-relaxed text-muted-foreground mb-4">
            This is a bottom-up derivation based on estimated component costs and industry-standard manufacturing margins.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
            {report.detailedPricing.cogsBreakdown.map((item: any, index: number) => (
              <li key={index}>{item.item}: {item.cost}</li>
            ))}
            <li>{report.detailedPricing.manufacturingAndAssembly}</li>
          </ul>
          <p className="text-base leading-relaxed text-foreground font-bold mb-4">Estimated COGS (per unit): {report.detailedPricing.estimatedCogs}</p>
          <h3 className="text-2xl font-semibold text-foreground mb-4">Retail Pricing Strategy</h3>
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">{report.detailedPricing.retailPricingStrategy}</p>
        </Section>
        
        <Section title="8. Prioritized Next Steps / Action Plan">
          <div className="space-y-6">
            <ActionPlanCategory title="Urgent (Next 1-3 Months)" items={report.actionPlan.urgent} />
            <ActionPlanCategory title="High Priority (Next 3-6 Months)" items={report.actionPlan.highPriority} />
            <ActionPlanCategory title="Mid Priority (Next 6-12 Months)" items={report.actionPlan.midPriority} />
          </div>
        </Section>
        
        <Section title="9. Detailed Idea Validation & Scoring">
          <DetailedScoring clusters={report.detailedValidationAndScoring} />
        </Section>

        <Section title="10. Consolidated Sources of Information">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {report.sources.map((source: any, index: number) => (
              <li key={index}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {source.text}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="11. Professional Disclaimer">
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{report.disclaimer}</p>
        </Section>
      </main>
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

  return <