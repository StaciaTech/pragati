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
import { MOCK_IDEAS, MOCK_CLUSTER_DEFINITIONS, STATUS_COLORS } from '@/lib/mock-data';
import { ROLES } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react';

export default function IdeaReportPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const ideaId = params.ideaId as string;
  const role = searchParams.get('role');

  const idea = MOCK_IDEAS.find((i) => i.id === ideaId);

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
  
  const overallScore = idea.feedback ? (idea.feedback.details.reduce((sum, d) => sum + d.score, 0) / idea.feedback.details.length).toFixed(1) : 'N/A';

  let verdictIcon = '';
  let verdictColor = '';
  if (idea.status === 'Approved') {
    verdictIcon = '✅';
    verdictColor = 'text-green-600';
  } else if (idea.status === 'Moderate') {
    verdictIcon = '⚠️';
    verdictColor = 'text-yellow-600';
  } else if (idea.status === 'Rejected') {
    verdictIcon = '❌';
    verdictColor = 'text-red-600';
  }


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
            <span>Status: <Badge className={STATUS_COLORS[idea.status]}>{idea.status}</Badge></span>
          </div>
        </CardHeader>
        <CardContent>
          {idea.feedback ? (
            <div className="space-y-8">
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className={`text-xl ${verdictColor}`}>
                    {verdictIcon} Verdict: {idea.status}
                  </CardTitle>
                  <CardDescription>Overall Score: {overallScore}/5.0</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Overall Feedback:</p>
                  <p className="text-muted-foreground">{idea.feedback.overall}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Cluster Weights (Your Settings)</CardTitle>
                    <CardDescription>This chart shows the weightage you assigned for this idea's validation.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    {idea.clusterWeights && <SpiderChart data={idea.clusterWeights} maxScore={100} size={300} />}
                </CardContent>
              </Card>

              <div>
                <h3 className="text-xl font-semibold mb-4">Detailed Score Breakdown</h3>
                <div className="space-y-6">
                    {Object.entries(MOCK_CLUSTER_DEFINITIONS).map(([clusterName, clusterDef]) => {
                        const feedbackDetail = idea.feedback?.details.find(d => d.aspect === clusterName);
                        if (!feedbackDetail) return null;

                        return (
                            <div key={clusterName}>
                                <div className="flex justify-between items-baseline">
                                    <h4 className="text-lg font-semibold">{clusterName}</h4>
                                    <p className="text-lg font-bold text-primary">{feedbackDetail.score.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">/ 5.0</span></p>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">{feedbackDetail.comment}</p>
                                
                                <div className="space-y-3 ml-4">
                                    {Object.entries(clusterDef.parameters).map(([paramName, paramDef]) => (
                                        <div key={paramName}>
                                            <h5 className="font-medium">{paramName}</h5>
                                            <div className="ml-4 mt-2 space-y-2 text-sm">
                                                {Object.entries(paramDef.subParameters).map(([subParamName, subParamDesc]) => (
                                                    <div key={subParamName}>
                                                        <p className="font-medium text-muted-foreground">{subParamName}</p>
                                                        <p className="text-xs">{subParamDesc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="my-6" />
                            </div>
                        )
                    })}
                </div>
              </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline">Track History</Button>
                    <Button>Download PDF Report</Button>
                </div>
            </div>
          ) : (
             <div className="text-center py-20">
                <p className="text-muted-foreground">Feedback is not yet available for this idea. Please check back later.</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
