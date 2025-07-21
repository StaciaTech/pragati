
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
import { ArrowLeft, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const SectionCard = ({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
);


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
      const ratio = canvasWidth / canvasHeight;
      let height = width / ratio;
      
      let position = 0;
      let heightLeft = canvas.height * pdfWidth / canvas.width;


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
  
  let verdictIcon = '';
  let verdictColor = '';
  const status = report?.validationOutcome || idea.status;
  
  if (status === 'Approved' || status === 'GOOD') {
    verdictIcon = '✅';
    verdictColor = 'text-green-600';
  } else if (status === 'Moderate' || status === 'MODERATE') {
    verdictIcon = '⚠️';
    verdictColor = 'text-yellow-600';
  } else if (status === 'Rejected' || status === 'NOT RECOMMENDED') {
    verdictIcon = '❌';
    verdictColor = 'text-red-600';
  }


  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
             <Button variant="outline" asChild>
                <Link href={`/dashboard/ideas?role=${role || ROLES.INNOVATOR}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to My Ideas
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
                        <div className={`p-4 rounded-lg bg-muted/50`}>
                           <p className="text-sm font-medium">Overall Score</p>
                           <p className={`text-2xl font-bold ${verdictColor}`}>{report.overallScore.toFixed(1)}/5.0</p>
                        </div>
                        <div className={`p-4 rounded-lg bg-muted/50`}>
                           <p className="text-sm font-medium">Validation Outcome</p>
                           <p className={`text-2xl font-bold ${verdictColor}`}>{verdictIcon} {report.validationOutcome}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">Recommendation:</p>
                        <p className="text-muted-foreground">{report.recommendationText}</p>
                      </div>
                  </SectionCard>
                  
                  <SectionCard title={report.sections.pragatiAIServiceProcess.title} description={report.sections.pragatiAIServiceProcess.description}>
                      {report.sections.pragatiAIServiceProcess.sections.map((sec, i) => (
                          <div key={i}>
                              <h4 className="font-semibold">{sec.heading}</h4>
                              <p className="text-sm text-muted-foreground">{sec.content}</p>
                          </div>
                      ))}
                  </SectionCard>

                  <SectionCard title={report.sections.competitiveLandscape.title} description={report.sections.competitiveLandscape.description}>
                      {report.sections.competitiveLandscape.sections.map((sec, i) => (
                          <div key={i} className="mb-4">
                              <h4 className="font-semibold">{sec.heading}</h4>
                              <p className="text-sm text-muted-foreground">{sec.content}</p>
                          </div>
                      ))}
                  </SectionCard>

                  <SectionCard title={report.sections.projectEvaluationFramework.title} description={report.sections.projectEvaluationFramework.description}>
                      {report.sections.projectEvaluationFramework.sections.map((sec, i) => (
                          <div key={i} className="mb-4">
                            <h4 className="font-semibold">{sec.heading}</h4>
                            {sec.content && <p className="text-sm text-muted-foreground">{sec.content}</p>}
                            {sec.subsections && sec.subsections.map((subsec, j) => (
                                <div key={j} className="ml-4 mt-2">
                                    <h5 className="font-medium">{subsec.subheading}</h5>
                                    <p className="text-sm text-muted-foreground">{subsec.content}</p>
                                </div>
                            ))}
                          </div>
                      ))}
                  </SectionCard>

                  <SectionCard title={report.sections.detailedEvaluation.title} description={report.sections.detailedEvaluation.description}>
                    {Object.entries(report.sections.detailedEvaluation.clusters).map(([clusterName, clusterData]) => (
                      <div key={clusterName} className="mb-6">
                        <h4 className="text-lg font-semibold text-primary">{clusterName}</h4>
                        <Separator className="my-2" />
                        {Object.entries(clusterData).map(([paramName, paramData]) => {
                          if (paramName === 'purpose' || paramName === 'common_terminologies' || typeof paramData !== 'object' || paramData === null) {
                            return null;
                          }
                          return (
                            <div key={paramName} className="ml-4 mb-4">
                              <h5 className="font-medium text-md">{paramName}</h5>
                               {Object.entries(paramData).map(([subParamName, subParamData]) => {
                                 if (typeof subParamData !== 'object' || subParamData === null || !subParamData.hasOwnProperty('assignedScore')) {
                                   return null;
                                 }
                                 const score = subParamData.assignedScore;
                                 const explanation = subParamData.explanation;
                                 const assumptions = subParamData.assumptions;

                                 return (
                                    <Card key={subParamName} className="my-2 p-4 bg-background">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <p className="font-semibold">{subParamName}</p>
                                          <p className="text-sm text-muted-foreground mt-1"><strong>Explanation: </strong>{explanation}</p>
                                        </div>
                                        <div className="text-right ml-4 flex-shrink-0">
                                            <p className="font-bold text-lg">{score}/5</p>
                                        </div>
                                      </div>

                                    {assumptions && assumptions.length > 0 && (
                                      <div className="mt-2">
                                        <p className="text-xs font-semibold">Assumptions:</p>
                                        <ul className="list-disc list-inside text-xs text-muted-foreground">
                                            {assumptions.map((assumption, i) => <li key={i}>{assumption}</li>)}
                                        </ul>
                                      </div>
                                    )}
                                    </Card>
                                );
                               })}
                            </div>
                          );
                        })}
                      </div>
                    ))}
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

                   <SectionCard title={report.sections.appendix.title}>
                        <ul className="list-disc list-inside space-y-2">
                            {report.sections.appendix.items.map((item, i) => (
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

