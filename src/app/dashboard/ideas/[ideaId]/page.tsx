

'use client';

import * as React from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
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
import { MOCK_IDEAS, STATUS_COLORS, MOCK_CONSULTATIONS } from '@/lib/mock-data';
import type { ValidationReport } from '@/ai/schemas';
import { ROLES } from '@/lib/constants';
import { ArrowLeft, Download, ThumbsUp, Lightbulb, RefreshCw, MessageSquare, TrendingUp, TrendingDown, Star, Share2, Copy } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SpiderChart } from '@/components/spider-chart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';


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
  const router = useRouter();
  const { toast } = useToast();
  const ideaId = params.ideaId as string;
  const role = searchParams.get('role');
  const reportRef = React.useRef<HTMLDivElement>(null);
  const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>([]);

  const idea = MOCK_IDEAS.find((i) => i.id === ideaId);
  const report = idea?.report as ValidationReport | null;

  const pastConsultations = MOCK_CONSULTATIONS.filter(
    (c) => c.ideaId === ideaId && c.status === 'Completed'
  );

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
        title: "Link Copied!",
        description: "The report link has been copied to your clipboard.",
    });
  };

  const handleResubmit = () => {
    const ideaData = {
      title: idea?.title,
      description: idea?.description,
      domain: idea?.domain,
      weights: idea?.clusterWeights,
    };
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('idea', JSON.stringify(ideaData));
    const role = searchParams.get('role');
    if (role) {
      newSearchParams.set('role', role);
    }
    router.push(`/dashboard/submit?${newSearchParams.toString()}`);
  }

  const handleRequestConsultation = () => {
    router.push(`/dashboard/consultations?role=${ROLES.INNOVATOR}&ideaId=${ideaId}`);
  }
  
  const { topPerformers, bottomPerformers, avgClusterScores } = React.useMemo(() => {
    if (!report) return { topPerformers: [], bottomPerformers: [], avgClusterScores: {} };

    const allSubParams: { name: string; score: number; clusterName: string; paramName: string }[] = [];
    let clusterScores: Record<string, number[]> = {};

    Object.entries(report.sections.detailedEvaluation.clusters).forEach(([clusterName, clusterData]) => {
      clusterScores[clusterName] = [];
      Object.entries(clusterData).forEach(([paramName, paramData]) => {
        Object.entries(paramData).forEach(([subParamName, subParamDetails]: [string, any]) => {
          if (subParamDetails.assignedScore) {
            allSubParams.push({ name: subParamName, score: subParamDetails.assignedScore, clusterName, paramName });
            clusterScores[clusterName].push(subParamDetails.assignedScore);
          }
        });
      });
    });
    
    const sortedSubParams = allSubParams.sort((a, b) => b.score - a.score);
    const avgClusterScores = Object.entries(clusterScores).reduce((acc, [key, scores]) => {
        const avg = scores.reduce((sum, s) => sum + s, 0) / (scores.length || 1);
        acc[key] = avg;
        return acc;
    }, {} as Record<string, number>);

    return {
      topPerformers: sortedSubParams.slice(0, 3),
      bottomPerformers: sortedSubParams.slice(-3).reverse(),
      avgClusterScores
    };
  }, [report]);

  const handleHighlightClick = (clusterName: string, paramName: string, subParamName: string) => {
    const newOpenItems = [clusterName, paramName];
    setOpenAccordionItems(newOpenItems);

    requestAnimationFrame(() => {
      const elementId = `sub-param-${subParamName.replace(/[^a-zA-Z0-9]/g, '-')}`;
      const element = document.getElementById(elementId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  const score = report?.overallScore ?? null;
  
  const getVerdictStyle = (outcome: string) => {
    switch(outcome) {
        case 'Approved': return { icon: '✅', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30 border-green-500' };
        case 'Moderate': return { icon: '⚠️', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30 border-orange-500' };
        case 'Rejected':
        default: return { icon: '❌', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30 border-red-500' };
    }
  }

  const { icon: verdictIcon, color: verdictColor, bg: verdictBg } = getVerdictStyle(status);

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-muted-foreground';
    if (score >= 85) return 'text-green-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  }

  const scoreColor = getScoreColor(score);
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = score !== null ? circumference - (score / 100) * circumference : circumference;

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-2">
             <Button variant="outline" asChild>
                <Link href={getBackLink(role)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
             <div className="flex gap-2">
                {score !== null && score >= 50 && score < 85 && (
                    <Button onClick={handleResubmit}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Resubmit Idea
                    </Button>
                )}
                 {score !== null && score >= 85 && (
                    <Button onClick={handleRequestConsultation}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Request Consultation
                    </Button>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={handleDownload}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Export as PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleCopyLink}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy Link</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
             </div>
        </div>

        <div ref={reportRef} className="p-4 bg-background">
          <Card>
            <CardHeader className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div>
                <CardTitle className="text-2xl">{idea.title}</CardTitle>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground pt-2">
                  <span>ID: {idea.id}</span>
                  <span>Version: {idea.version}</span>
                  <span>Submitted: {idea.dateSubmitted}</span>
                  <span>Status: <Badge className={STATUS_COLORS[status]}>{status}</Badge></span>
                </div>
              </div>
              {report && (
                <div className="flex flex-col items-center gap-2 text-center w-32">
                    <div className="relative h-24 w-24">
                        <svg className="h-full w-full" viewBox="0 0 50 50">
                            <circle cx="25" cy="25" r="20" className="stroke-muted" strokeWidth="4" fill="transparent" />
                            <circle
                            cx="25"
                            cy="25"
                            r="20"
                            className={cn("stroke-current transition-all duration-500 ease-in-out", scoreColor)}
                            strokeWidth="4"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 25 25)"
                            />
                        </svg>
                        <span className={cn("absolute inset-0 flex items-center justify-center text-xl font-bold", scoreColor)}>
                            {score !== null ? score.toFixed(0) : 'N/A'}
                        </span>
                    </div>
                    <span className={cn("font-semibold", scoreColor)}>{report.validationOutcome}</span>
                </div>
              )}
            </CardHeader>
             {report ? (
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <SectionCard title="Executive Summary & Recommendation" className="lg:col-span-2">
                      <p className="text-sm text-muted-foreground mb-4">{report.sections.executiveSummary.concept}</p>
                      <p className="font-semibold">Recommendation:</p>
                      <p className="text-muted-foreground text-sm">{report.recommendationText}</p>
                  </SectionCard>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Cluster Performance</CardTitle>
                      <CardDescription>Average scores across the main evaluation clusters.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] flex items-center justify-center">
                       <SpiderChart data={avgClusterScores} maxScore={100} size={400} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Highlights & Lowlights</CardTitle>
                      <CardDescription>Top and bottom performing sub-parameters.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 flex items-center gap-2"><TrendingUp /> Top Performers</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {topPerformers.map((item, i) => (
                            <li key={i}>
                               <button
                                  onClick={() => handleHighlightClick(item.clusterName, item.paramName, item.name)}
                                  className="flex justify-between w-full hover:bg-muted p-1 rounded-md transition-colors text-left"
                               >
                                  <span className="text-muted-foreground">{item.name}</span>
                                  <span className="font-bold text-green-600">{item.score}</span>
                               </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-red-600 flex items-center gap-2"><TrendingDown /> Areas for Improvement</h4>
                         <ul className="mt-2 space-y-1 text-sm">
                          {bottomPerformers.map((item, i) => (
                             <li key={i}>
                               <button
                                   onClick={() => handleHighlightClick(item.clusterName, item.paramName, item.name)}
                                   className="flex justify-between w-full hover:bg-muted p-1 rounded-md transition-colors text-left"
                               >
                                  <span className="text-muted-foreground">{item.name}</span>
                                  <span className="font-bold text-red-600">{item.score}</span>
                                </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <SectionCard title={report.sections.detailedEvaluation.title} description={report.sections.detailedEvaluation.description}>
                  <Accordion type="multiple" className="w-full space-y-4" value={openAccordionItems} onValueChange={setOpenAccordionItems}>
                      {Object.entries(report.sections.detailedEvaluation.clusters).map(([clusterName, clusterData]) => (
                          <AccordionItem value={clusterName} key={clusterName} className="border rounded-lg">
                              <AccordionTrigger className="p-4 text-lg font-semibold text-primary hover:no-underline">
                                  {clusterName}
                              </AccordionTrigger>
                              <AccordionContent className="p-4 pt-0">
                                  <Accordion type="multiple" className="w-full space-y-2" value={openAccordionItems} onValueChange={setOpenAccordionItems}>
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
                                                      const id = `sub-param-${subParamName.replace(/[^a-zA-Z0-9]/g, '-')}`;

                                                      return (
                                                          <div key={subParamName} id={id} className="p-3 bg-muted/50 rounded-lg scroll-mt-20">
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
              </CardContent>
            ) : (
                 <CardContent>
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">Report is being generated or is not available. Status: {idea.status}</p>
                    </div>
                </CardContent>
            )}
          </Card>
          
          {pastConsultations.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Consultation History</CardTitle>
                <CardDescription>
                  Review of past consultations for this idea.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Attachments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastConsultations.map((consultation) => (
                      <TableRow 
                        key={consultation.id} 
                        className="cursor-pointer" 
                        onClick={() => router.push(`/dashboard/consultations?role=${role}`)}
                      >
                        <TableCell>{consultation.date}</TableCell>
                        <TableCell>{consultation.mentor}</TableCell>
                        <TableCell>
                          {consultation.milestones.join(', ')}
                        </TableCell>
                        <TableCell>
                          {consultation.files.map((file, index) => (
                            <Button key={index} variant="link" asChild size="sm" onClick={(e) => e.stopPropagation()}>
                              <a href="#" download>
                                {file}
                              </a>
                            </Button>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

        </div>
    </div>
  );
}
