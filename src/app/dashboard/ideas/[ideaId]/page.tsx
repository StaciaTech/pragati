
'use client';

import React, { useRef } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MOCK_IDEAS } from '@/lib/mock-data';
import { Check, X, Shield, Users, Clock, Leaf, DollarSign, Target, Briefcase, TrendingUp, Search, Info, Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';


// Reusable component for a score card
const ScoreCard = ({ title, score, confidence, inference, suggestions, icon }: { title: string, score: number, confidence: string, inference: string, suggestions: string, icon: React.ReactNode }) => (
  <div className="bg-card p-6 rounded-2xl shadow-lg border">
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <h4 className="text-xl font-semibold text-card-foreground flex-1">{title}</h4>
      <div className="flex items-center space-x-2">
        <span className={`text-2xl font-bold ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {score}/100
        </span>
        <span className="text-sm px-2 py-1 bg-muted rounded-full font-medium text-muted-foreground border">
          {confidence}
        </span>
      </div>
    </div>
    <div className="space-y-4 text-muted-foreground">
      <div>
        <p className="font-semibold text-foreground">Inference:</p>
        <p className="text-sm mt-1">{inference}</p>
      </div>
      <div>
        <p className="font-semibold text-foreground">Suggestions:</p>
        <p className="text-sm mt-1">{suggestions}</p>
      </div>
    </div>
  </div>
);

// Simple Section component for a clean layout
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-3xl font-bold text-foreground border-b-2 border-primary pb-2 mb-6">{title}</h2>
    <div>{children}</div>
  </section>
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
            let position = 0;
            let heightLeft = height;

            if (height > pdfHeight) {
                height = pdfHeight;
                width = height * ratio;
            }


            pdf.addImage(imgData, 'PNG', 0, position, width, height);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - height;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, width, height);
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

  // Helper to choose the right icon for each cluster
  const getClusterIcon = (clusterTitle: string) => {
    switch (clusterTitle) {
      case 'Cluster 1: Core Idea & Product':
        return <Leaf size={28} className="text-green-500" />;
      case 'Cluster 2: Market Opportunity':
        return <TrendingUp size={28} className="text-blue-500" />;
      case 'Cluster 3: Execution':
        return <Briefcase size={28} className="text-orange-500" />;
      case 'Cluster 4: Business Model':
        return <DollarSign size={28} className="text-teal-500" />;
      case 'Cluster 5: Team':
        return <Users size={28} className="text-purple-500" />;
      case 'Cluster 6: Compliance':
        return <Shield size={28} className="text-cyan-500" />;
      case 'Cluster 7: Risk & Strategy':
        return <Target size={28} className="text-red-500" />;
      default:
        return <Info size={28} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background font-sans text-foreground p-4 sm:p-8">
      <div className="flex justify-end mb-4">
        <Button onClick={handleDownloadPdf}>
            <Download className="mr-2 h-4 w-4" />
            Export as PDF
        </Button>
      </div>
      <main ref={reportRef} className="container mx-auto max-w-6xl py-8 bg-background">
        <header className="bg-card p-8 rounded-3xl shadow-xl text-center mb-10 border">
          <h1 className="text-4xl font-bold text-foreground leading-tight mb-2">{report.ideaName}</h1>
          <p className="text-lg text-muted-foreground">Advanced Business Validation Report</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="text-center">
              <span className="text-5xl font-extrabold text-primary">{report.overallScore}/100</span>
              <p className="text-sm text-muted-foreground mt-1">Overall Viability Score</p>
            </div>
            <div className="h-16 w-px bg-border hidden sm:block"></div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">{report.outcome}</p>
              <p className="text-sm text-muted-foreground mt-1">Outcome</p>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <Section title="Executive Summary">
          <p className="text-lg leading-relaxed text-muted-foreground">{report.executiveSummary}</p>
        </Section>
        
        {/* Strengths & Weaknesses */}
        <Section title="Key Strengths & Weaknesses">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-lg border">
              <h3 className="flex items-center text-2xl font-semibold text-green-600 mb-4">
                <Check className="mr-2" size={24} /> Strengths
              </h3>
              <ul className="list-none space-y-3">
                {report.keyStrengths.map((item: string, index: number) => (
                  <li key={index} className="flex items-start text-muted-foreground">
                    <Check size={18} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-lg border">
              <h3 className="flex items-center text-2xl font-semibold text-red-600 mb-4">
                <X className="mr-2" size={24} /> Weaknesses
              </h3>
              <ul className="list-none space-y-3">
                {report.keyWeaknesses.map((item: string, index: number) => (
                  <li key={index} className="flex items-start text-muted-foreground">
                    <X size={18} className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Critical Risks */}
        <Section title="Critical Risks & Mitigation Strategies">
          <div className="space-y-6">
            {report.criticalRisks.map((risk: {title: string, howWhy: string, mitigation: string}, index: number) => (
              <div key={index} className="bg-card p-6 rounded-2xl shadow-lg border">
                <h4 className="text-xl font-semibold text-foreground mb-2">{risk.title}</h4>
                <p className="text-sm text-muted-foreground mb-2"><span className="font-bold">How and Why:</span> {risk.howWhy}</p>
                <p className="text-sm text-muted-foreground"><span className="font-bold">Mitigation Strategy:</span> {risk.mitigation}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Competitive Analysis */}
        <Section title="Competitive Analysis">
          <div className="bg-card p-6 rounded-2xl shadow-lg border overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Competitor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Key Products
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Price Range
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Strengths
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Weaknesses
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {report.competitiveAnalysis.map((competitor: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{competitor.competitor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{competitor.keyProducts}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{competitor.priceRange}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{competitor.strengths}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{competitor.weaknesses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Detailed Cluster Analysis */}
        <Section title="Detailed Idea Validation & Scoring">
          <div className="space-y-12">
            {report.clusterData.map((cluster: any, clusterIndex: number) => (
              <div key={clusterIndex} className="bg-card p-8 rounded-3xl shadow-xl border">
                <h3 className="flex items-center text-3xl font-bold text-foreground mb-6">
                  {getClusterIcon(cluster.title)}
                  <span className="ml-3">{cluster.title}</span>
                </h3>
                <div className="space-y-8">
                  {cluster.parameters.map((param: any, paramIndex: number) => (
                    <div key={paramIndex} className="bg-background p-6 rounded-2xl border">
                      <h4 className="text-xl font-semibold text-foreground mb-4">{param.title}</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        {param.subParameters.map((subParam: any, subParamIndex: number) => (
                          <ScoreCard
                            key={subParamIndex}
                            title={subParam.title}
                            score={subParam.score}
                            confidence={subParam.confidence}
                            inference={subParam.inference}
                            suggestions={subParam.suggestions}
                            icon={<Search size={20} className="text-muted-foreground" />}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Consolidated Sources */}
        <Section title="Consolidated Sources of Information">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {report.sources.map((source: string, index: number) => (
              <li key={index} className="text-base">{source}</li>
            ))}
          </ul>
        </Section>

        {/* Professional Disclaimer */}
        <Section title="Professional Disclaimer">
          <p className="text-sm leading-relaxed text-muted-foreground">{report.disclaimer}</p>
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

  return <ReportPage report={idea.report} />;
}
