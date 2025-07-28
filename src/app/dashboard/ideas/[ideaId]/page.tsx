

'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MOCK_IDEAS, STATUS_COLORS } from '@/lib/mock-data';
import type { ValidationReport } from '@/ai/schemas';
import { ROLES } from '@/lib/constants';
import { ArrowLeft, Download, ThumbsUp, Lightbulb } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';

const SectionCard = ({ title, description, children, className }: { title: string, description?: string, children: React.ReactNode, className?: string }) => (
    <Card className={className}>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
);

const getBackLink = (role: string | null) => {
    switch (role) {
        case ROLES.SUPER_ADMIN:
            return `/dashboard/admin/ideas?role=${role}`;
        case ROLES.COORDINATOR:
            return `/dashboard/coordinator/feedback?role=${role}`;
        default:
            return `/dashboard/ideas?role=${ROLES.INNOVATOR}`;
    }
}


export default function IdeaReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const ideaId = params.ideaId as string;
  const role = searchParams.get('role');
  const reportRef = useRef<HTMLDivElement>(null);

  const idea = MOCK_IDEAS.find((i) => i.id === ideaId);
  const report = idea?.report as ValidationReport | null;

  const handleDownload = () => {
    const input = reportRef.current;
    if (!input) {
      console.error("Report element not found for PDF generation.");
      return;
    }

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = pdfWidth / canvasWidth;
      const height = canvasHeight * ratio;
      
      let position = 0;
      let heightLeft = height;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, height);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = -heightLeft;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, height);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`${ideaId}-report.pdf`);
    });
  };

  if (!idea) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Idea Not Found</h2>
        <p className="text-muted-foreground">The idea you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link href={`/dashboard/ideas?role=${role || ROLES.INNOVATOR}`}>Go to My Ideas</Link>
        </Button>
      </div>
    );
  }
  
  const status = report?.validationOutcome || idea.status;
  
  const getVerdictStyle = (outcome: string) => {
    switch(outcome) {
        case 'Approved': return { icon: '✅', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30 border-green-500' };
        case 'Moderate': return { icon: '⚠️', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500' };
        case 'Rejected':
        default: return { icon: '❌', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30 border-red-500' };
    }
  }

  const { icon: verdictIcon, color: verdictColor, bg: verdictBg } = getVerdictStyle(status);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  }


  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
             <Button variant="outline" asChild>
                <Link href={getBackLink(role)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
             <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
        </div>

        <div ref={reportRef} className="p-4 bg-background">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Idea Report: {idea.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <span>ID: {idea.id}</span>
                <span>Version: {idea.version}</span>
                <span>Submitted: {idea.dateSubmitted}</span>
                <span>Status: <Badge className={STATUS_COLORS[status]}>{status}</Badge></span>
              </div>
            </CardHeader>
            <CardContent>
              {report ? (
                <div className="space-y-8">
                  <SectionCard title="Executive Summary" description={report.sections.executiveSummary.concept}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg bg-muted/50 border-l-4 ${verdictBg.split(' ')[2]}`}>
                           <p className="text-sm font-medium">Overall Score</p>
                           <p className={`text-3xl font-bold ${verdictColor}`}>{report.overallScore.toFixed(1)}/100</p>
                        </div>
                        <div className={`p-4 rounded-lg bg-muted/50 border-l-4 ${verdictBg.split(' ')[2]}`}>
                           <p className="text-sm font-medium">Validation Outcome</p>
                           <p className={`text-2xl font-bold ${verdictColor}`}>{verdictIcon} {report.validationOutcome}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">Recommendation:</p>
                        <p className="text-muted-foreground">{report.recommendationText}</p>
                      </div>
                  </SectionCard>

                  <SectionCard title={report.sections.detailedEvaluation.title} description={report.sections.detailedEvaluation.description}>
                    <Accordion type="multiple" className="w-full space-y-4">
                        {Object.entries(report.sections.detailedEvaluation.clusters).map(([clusterName, clusterData]) => (
                            <AccordionItem value={clusterName} key={clusterName} className="border rounded-lg">
                                <AccordionTrigger className="p-4 text-lg font-semibold text-primary hover:no-underline">
                                    {clusterName}
                                </AccordionTrigger>
                                <AccordionContent className="p-4 pt-0">
                                    <Accordion type="multiple" className="w-full space-y-2">
                                    {Object.entries(clusterData).map(([paramName, paramData]) => {
                                        if (typeof paramData !== 'object' || paramData === null) return null;
                                        return (
                                            <AccordionItem value={paramName} key={paramName} className="border rounded-md">
                                                <AccordionTrigger className="px-4 py-2 font-medium hover:no-underline">
                                                    {paramName}
                                                </AccordionTrigger>
                                                <AccordionContent className="px-4 pb-4">
                                                    <div className="space-y-3">
                                                    {Object.entries(paramData).map(([subParamName, subParamData]) => {
                                                        if (typeof subParamData !== 'object' || subParamData === null || !('assignedScore' in subParamData)) return null;
                                                        
                                                        const score = subParamData.assignedScore;
                                                        const whatWentWell = subParamData.whatWentWell;
                                                        const whatCanBeImproved = subParamData.whatCanBeImproved;

                                                        return (
                                                            <div key={subParamName} className="p-3 bg-muted/50 rounded-lg">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <h6 className="font-semibold">{subParamName}</h6>
                                                                    <p className={`font-bold text-lg ${getScoreColor(score)}`}>{score}/100</p>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                                    <div className="text-green-700 dark:text-green-400">
                                                                        <div className="flex items-center gap-2 font-semibold mb-1">
                                                                            <ThumbsUp className="h-4 w-4" />
                                                                            <span>What Went Well</span>
                                                                        </div>
                                                                        <p className="pl-6 text-muted-foreground">{whatWentWell}</p>
                                                                    </div>
                                                                    <div className="text-orange-700 dark:text-orange-400">
                                                                        <div className="flex items-center gap-2 font-semibold mb-1">
                                                                            <Lightbulb className="h-4 w-4" />
                                                                            <span>What Can Be Improved</span>
                                                                        </div>
                                                                        <p className="pl-6 text-muted-foreground">{whatCanBeImproved}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )
                                    })}
                                    </Accordion>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                  </SectionCard>

                   <SectionCard title={report.sections.conclusion.title}>
                        <p className="text-sm text-muted-foreground">{report.sections.conclusion.content}</p>
                   </SectionCard>

                   <SectionCard title={report.sections.recommendations.title} description={report.sections.recommendations.description}>
                        <ul className="list-disc list-inside space-y-2">
                            {report.sections.recommendations.items.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground">{item}</li>
                            ))}
                        </ul>
                   </SectionCard>
                </div>
              ) : (
                 <div className="text-center py-20">
                    <p className="text-muted-foreground">Report is being generated or is not available. Status: {idea.status}</p>
                 </div>
              )}
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
