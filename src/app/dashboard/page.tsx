
'use client';

import * as React from 'react';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Award, Clock, MoreHorizontal, Loader2, PlusCircle, Lightbulb, CreditCard } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROLES, type Role } from '@/lib/constants';
import { MOCK_INNOVATOR_USER, MOCK_IDEAS, STATUS_COLORS } from '@/lib/mock-data';
import type { ValidationReport } from '@/ai/schemas';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Sector, XAxis, YAxis } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


type Idea = (typeof MOCK_IDEAS)[0];

const chartConfig = {
  ideas: {
    label: 'Ideas',
    color: 'hsl(var(--chart-1))',
  },
  approved: {
    label: 'Approved',
    color: 'hsl(var(--color-approved))',
  },
  moderate: {
    label: 'Moderate',
    color: 'hsl(var(--color-moderate))',
  },
  rejected: {
    label: 'Rejected',
    color: 'hsl(var(--color-rejected))',
  },
};

const mockHistory = [
    { version: "V1.0", date: "2024-01-15", status: "Approved", score: 88 },
    { version: "V0.9", date: "2024-01-10", status: "Moderate", score: 72 },
    { version: "V0.8", date: "2024-01-05", status: "Rejected", score: 45 },
];

const ActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-4} textAnchor="middle" fill={fill} className="text-2xl font-bold">
        {value}
      </text>
       <text x={cx} y={cy} dy={16} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-sm">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

function getDashboardPath(role: Role) {
    switch (role) {
        case ROLES.INNOVATOR: return '/dashboard';
        case ROLES.COORDINATOR: return '/dashboard/coordinator';
        case ROLES.PRINCIPAL: return '/dashboard/principal';
        case ROLES.SUPER_ADMIN: return '/dashboard/admin';
        default: return '/dashboard';
    }
}

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;
  
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [selectedIdeaForHistory, setSelectedIdeaForHistory] = useState<Idea | null>(null);
  const [selectedAction, setSelectedAction] = useState<{ action?: () => void, title?: string, description?: string }>({});
  
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    // Simulate fetching data for the logged-in innovator
    const userIdeas = MOCK_IDEAS.filter(idea => idea.innovatorEmail === MOCK_INNOVATOR_USER.email);
    setIdeas(userIdeas);
    setIsLoading(false);
  }, []);

  const totalIdeas = ideas.length;
  const validatedIdeas = ideas.filter(idea => idea.report?.overallScore);
  const averageScore = validatedIdeas.length > 0 ? (validatedIdeas.reduce((acc, item) => acc + item.report!.overallScore, 0) / validatedIdeas.length) : 0;
  const approvedCount = ideas.filter(idea => (idea.report?.validationOutcome || idea.status) === 'Approved').length;
  const approvalRate = totalIdeas > 0 ? (approvedCount / totalIdeas * 100) : 0;
  
  const ideaStatusData = React.useMemo(() => {
    const statuses: Record<string, number> = { Approved: 0, Moderate: 0, Rejected: 0 };
    ideas.forEach((idea) => {
      const status = idea.report?.validationOutcome || idea.status;
      if (status in statuses) {
        statuses[status as keyof typeof statuses]++;
      }
    });
    return [
      { name: 'Approved', value: statuses.Approved, fill: 'hsl(var(--color-approved))' },
      { name: 'Moderate', value: statuses.Moderate, fill: 'hsl(var(--color-moderate))' },
      { name: 'Rejected', value: statuses.Rejected, fill: 'hsl(var(--color-rejected))' },
    ];
  }, [ideas]);

  const submissionTrendData = React.useMemo(() => {
    const trends: { [key: string]: number } = {};
    const sortedIdeas = [...ideas].sort((a,b) => new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime());
    
    sortedIdeas.forEach((idea) => {
      const month = new Date(idea.dateSubmitted).toLocaleString('default', { month: 'short', year: '2-digit' });
      trends[month] = (trends[month] || 0) + 1;
    });
    return Object.entries(trends).map(([name, ideas]) => ({ name, ideas }));
  }, [ideas]);

  const handleActionConfirm = useCallback(() => {
    if (selectedAction.action) {
      selectedAction.action();
    }
    setDialogOpen(false);
  }, [selectedAction]);

  const openConfirmationDialog = useCallback((action: () => void, title: string, description: string) => {
    setSelectedAction({ action, title, description });
    setDialogOpen(true);
  }, []);

  const handleDownload = useCallback((ideaId: string) => {
    openConfirmationDialog(
      () => toast({ title: "Feature In Development", description: `Downloading for idea ${ideaId} is not yet implemented.` }),
      "Confirm Download",
      "Are you sure you want to download the report for this idea?"
    );
  }, [openConfirmationDialog, toast]);

  const handleTrackHistory = useCallback((idea: Idea) => {
    setSelectedIdeaForHistory(idea);
    setHistoryDialogOpen(true);
  }, []);
  
  const handleResubmit = useCallback((idea: Idea) => {
    const ideaData = {
      title: idea.title,
      description: idea.description,
      domain: idea.domain,
      weights: idea.clusterWeights,
    };
    const query = new URLSearchParams({ idea: JSON.stringify(ideaData) }).toString();
    router.push(`/dashboard/submit?${query}`);
  }, [router]);

  if (role !== ROLES.INNOVATOR) {
    const roleDashboardPath = getDashboardPath(role);
    useEffect(() => {
        if (roleDashboardPath !== '/dashboard') {
            router.push(`${roleDashboardPath}?role=${role}`);
        }
    }, [router, roleDashboardPath, role]);
    
    return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
  }

  const user = MOCK_INNOVATOR_USER;
  
  const getOverallScore = (idea: Idea) => {
     if (idea.report) {
      return idea.report.overallScore.toFixed(1);
    }
    return 'N/A';
  };
  
  const getStatus = (idea: Idea) => {
    return idea.report?.validationOutcome || idea.status;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col gap-6">
       <Card className="w-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg border-0 relative overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-br from-[#FF00CC] to-[#333399] opacity-30 blur-3xl filter" />
        <div className="absolute -bottom-1/4 -right-1/2 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-tl from-[#F472B6] to-[#06B6D4] opacity-20 blur-3xl filter" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Welcome back, {user.name}!</CardTitle>
            <CardDescription className="text-primary-foreground/80">Ready to change the world? Let's get your next great idea validated.</CardDescription>
          </CardHeader>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIdeas}</div>
            <p className="text-xs text-muted-foreground">ideas submitted all time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">across all validated ideas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalRate.toFixed(1)}%</div>
             <p className="text-xs text-muted-foreground">of ideas have been approved</p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button asChild>
                <Link href={`/dashboard/submit?role=${ROLES.INNOVATOR}`}><PlusCircle /> Submit New Idea</Link>
            </Button>
             <Button asChild variant="outline">
                <Link href={`/dashboard/ideas?role=${ROLES.INNOVATOR}`}><Lightbulb /> View All Ideas</Link>
            </Button>
             <Button asChild variant="outline">
                <Link href={`/dashboard/request-credits?role=${ROLES.INNOVATOR}`}><CreditCard /> Request Credits</Link>
            </Button>
        </CardContent>
       </Card>

      <Carousel 
        opts={{ loop: true }} 
        plugins={[ Autoplay({ delay: 5000, stopOnInteraction: true }) ]}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardHeader>
                    <CardTitle>Analytics Overview</CardTitle>
                    <CardDescription>A summary of your submission trends and outcomes.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                   <div className="lg:col-span-2">
                      <CardTitle className="text-base mb-4 text-center">Idea Status Distribution</CardTitle>
                      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <ResponsiveContainer width="100%" height={250}>
                           <PieChart>
                            <Pie
                              activeIndex={activeIndex}
                              activeShape={ActiveShape}
                              data={ideaStatusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              dataKey="value"
                              onMouseEnter={onPieEnter}
                            >
                               {ideaStatusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                   </div>
                    <div className="lg:col-span-3">
                        <CardTitle className="text-base mb-4 text-center">Submission Trend</CardTitle>
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={submissionTrendData}>
                              <CartesianGrid vertical={false} />
                              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                               <YAxis />
                              <Tooltip
                                cursor={true}
                                content={<ChartTooltipContent 
                                    contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                                    labelClassName="font-bold"
                                />}
                              />
                              <Bar dataKey="ideas" fill="hsl(var(--chart-1))" radius={8} />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
             <div className="p-1">
                <Card>
                    <CardHeader>
                        <CardTitle>My Recent Ideas</CardTitle>
                        <CardDescription>A quick look at your most recently submitted ideas.</CardDescription>
                    </CardHeader>
                  <CardContent>
                    {ideas.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">You haven't submitted any ideas yet. Go to "Submit Idea" to get started!</p>
                      </div>
                    ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {ideas.slice(0, 5).map((idea) => {
                              const status = getStatus(idea);
                              return (
                              <TableRow key={idea.id}>
                                <TableCell className="font-medium">{idea.title}</TableCell>
                                <TableCell>{idea.dateSubmitted}</TableCell>
                                <TableCell>
                                  <Badge className={STATUS_COLORS[status]}>{status}</Badge>
                                </TableCell>
                                <TableCell className="font-semibold">{getOverallScore(idea)}</TableCell>
                                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                  {idea.report ? (
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">More actions</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onSelect={() => router.push(`/dashboard/ideas/${idea.id}?role=${ROLES.INNOVATOR}`)}>
                                          View Report
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleResubmit(idea)}>
                                          Resubmit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleDownload(idea.id)}>
                                          Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => handleTrackHistory(idea)}>
                                          Track History
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  ) : (
                                    <span className="text-muted-foreground italic text-xs">Validating...</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            )})}
                          </TableBody>
                        </Table>
                    )}
                  </CardContent>
                </Card>
             </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    
     <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedAction.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedAction.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActionConfirm}>Yes, continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>History for: {selectedIdeaForHistory?.title}</DialogTitle>
                  <DialogDescription>
                      Showing the version history and outcomes for this idea.
                  </DialogDescription>
              </DialogHeader>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Version</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockHistory.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.version}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell><Badge className={STATUS_COLORS[item.status]}>{item.status}</Badge></TableCell>
                            <TableCell>{item.score.toFixed(1)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
              <DialogFooter>
                  <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                  </DialogClose>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  );
}


export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
            <DashboardPageContent />
        </Suspense>
    );
}

