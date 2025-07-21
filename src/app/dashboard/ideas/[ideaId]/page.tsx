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
import { SpiderChart } from '@/components/spider-chart';
import { MOCK_IDEAS, STATUS_COLORS } from '@/lib/mock-data';
import { ROLES } from '@/lib/constants';
import { ArrowLeft, Download } from 'lucide-react';
import type { ValidationReport } from '@/ai/flows/generate-validation-report';

export default function IdeaReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const ideaId = params.ideaId as string;
  const role = searchParams.get('role');

  const idea = MOCK_IDEAS.find((i) => i.id === ideaId);
  const report = idea?.report as ValidationReport | null;

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

  const handleDownload = () => {
    if (!report) return;
    // This is a placeholder for a proper PDF generation service
    // For now, we'll open the raw HTML in a new tab.
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idea.id}-report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
        <Button variant="outline" asChild>
            <Link href={`/dashboard/ideas?role=${role || ROLES.INNOVATOR}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Ideas
            </Link>
        </Button>
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
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className={`text-xl ${verdictColor}`}>
                    {verdictIcon} Verdict: {report.validationOutcome}
                  </CardTitle>
                  <CardDescription>Overall Score: {report.overallScore.toFixed(1)}/5.0</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Overall Feedback:</p>
                  <p className="text-muted-foreground">{report.recommendationText}</p>
                </CardContent>
              </Card>

              {/* Spider Chart for Cluster Scores - Note: Need to calculate this from report */}
              {/* This is a placeholder as the new report doesn't directly provide cluster scores */}
              <Card>
                <CardHeader>
                    <CardTitle>AI Evaluation Overview</CardTitle>
                    <CardDescription>This chart represents a visual summary of the AI's scoring across different clusters.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                   <p className="text-muted-foreground">Spider chart placeholder - data structure changed.</p>
                </CardContent>
              </Card>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">{report.sections.detailedEvaluation.title}</h3>
                {Object.entries(report.sections.detailedEvaluation.clusters).map(([clusterName, clusterData]) => (
                  <div key={clusterName} className="mb-6">
                    <h4 className="text-lg font-semibold text-primary">{clusterName}</h4>
                    <Separator className="my-2" />
                    {Object.entries(clusterData).map(([paramName, paramData]) => (
                      <div key={paramName} className="ml-4 mb-4">
                        <h5 className="font-medium text-md">{paramName}</h5>
                        {Object.entries(paramData).map(([subParamName, subParamData]) => (
                          <Card key={subParamName} className="my-2 p-4 bg-background">
                            <p className="font-semibold">{subParamName}</p>
                            <p><strong>Score: </strong> <span className="font-bold">{subParamData.assignedScore}/5</span></p>
                            <p className="text-sm text-muted-foreground mt-1"><strong>Explanation: </strong>{subParamData.explanation}</p>
                            {subParamData.assumptions.length > 0 && (
                               <div className="mt-2">
                                 <p className="text-xs font-semibold">Assumptions:</p>
                                 <ul className="list-disc list-inside text-xs text-muted-foreground">
                                    {subParamData.assumptions.map((assumption, i) => <li key={i}>{assumption}</li>)}
                                 </ul>
                               </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download JSON Report
                  </Button>
              </div>
            </div>
          ) : (
             <div className="text-center py-20">
                <p className="text-muted-foreground">Report is being generated or is not available. Status: {idea.status}</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
