
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Loader2, PieChart as PieChartIcon, Target, CheckCircle, Percent } from 'lucide-react';
import { STATUS_COLORS } from '@/lib/mock-data';
import { ROLES } from '@/lib/constants';
import type { ValidationReport } from '@/ai/schemas';
import { useToast } from '@/hooks/use-toast';
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


type Idea = {
  id: string;
  title: string;
  description: string;
  collegeId: string;
  collegeName:string;
  domain: string;
  innovatorName: string;
  innovatorEmail: string;
  status: string;
  dateSubmitted: string;
  version: string;
  report?: ValidationReport | null;
  clusterWeights?: Record<string, number>;
  feedback?: { overall: string; details: { aspect: string; score: number; comment: string }[] } | null;
  consultationStatus: string;
  consultationDate: string | null;
  consultationTime: string | null;
  ttcAssigned: string | null;
  overallScore?: number;
};

const mockHistory = [
    { version: "V1.0", date: "2024-01-15", status: "Approved", score: 84 },
    { version: "V0.9", date: "2024-01-10", status: "Moderate", score: 76 },
    { version: "V0.8", date: "2024-01-05", status: "Rejected", score: 42 },
];

const ActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props as PieSectorDataItem & { cx: number, cy: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, fill: string, value: number, payload: any };

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


export default function IdeasPage() {
  const [allIdeas, setAllIdeas] = React.useState<Idea[]>([]);
  const [filteredIdeas, setFilteredIdeas] = React.useState<Idea[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [domainFilter, setDomainFilter] = React.useState('all');
  
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = React.useState(false);
  const [selectedIdeaForHistory, setSelectedIdeaForHistory] = React.useState<Idea | null>(null);
  const [selectedAction, setSelectedAction] = React.useState<{ action?: () => void, title?: string, description?: string }>({});
  const { toast } = useToast();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  React.useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch('/api/ideas');
        if (!response.ok) {
          throw new Error('Failed to fetch ideas');
        }
        const data = await response.json();
        setAllIdeas(data);
        setFilteredIdeas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdeas();
  }, []);
  
  React.useEffect(() => {
    let ideas = allIdeas;
    if (searchTerm) {
        ideas = ideas.filter(idea => idea.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter !== 'all') {
        ideas = ideas.filter(idea => (idea.report?.validationOutcome || idea.status) === statusFilter);
    }
     if (domainFilter !== 'all') {
        ideas = ideas.filter(idea => idea.domain === domainFilter);
    }
    setFilteredIdeas(ideas);
  }, [searchTerm, statusFilter, domainFilter, allIdeas]);
  
  const handleActionConfirm = () => {
    if (selectedAction.action) {
      selectedAction.action();
    }
    setDialogOpen(false);
  };
  
  const openConfirmationDialog = (action: () => void, title: string, description: string) => {
    setSelectedAction({ action, title, description });
    setDialogOpen(true);
  };

  const handleDownload = (ideaId: string) => {
    openConfirmationDialog(
      () => toast({ title: "Feature In Development", description: `Downloading for idea ${ideaId} is not yet implemented.` }),
      "Confirm Download",
      "Are you sure you want to download the report for this idea?"
    );
  };

  const handleTrackHistory = (idea: Idea) => {
    setSelectedIdeaForHistory(idea);
    setHistoryDialogOpen(true);
  };
  
  const handleResubmit = (idea: Idea) => {
    const ideaData = {
      title: idea.title,
      description: idea.description,
      domain: idea.domain,
      weights: idea.clusterWeights,
    };
    const query = new URLSearchParams({ idea: JSON.stringify(ideaData) }).toString();
    router.push(`/dashboard/submit?${query}`);
  }

  const getOverallScore = (idea: Idea) => {
    if (idea.report) {
      return idea.report.overallScore.toFixed(1);
    }
    return 'N/A';
  };
  
  const getStatus = (idea: Idea) => {
    return idea.report?.validationOutcome || idea.status;
  }

  const uniqueDomains = [...new Set(allIdeas.map(idea => idea.domain))];
  const uniqueStatuses = [...new Set(allIdeas.map(idea => getStatus(idea)))];

  const totalIdeas = allIdeas.length;
  const approvedIdeas = allIdeas.filter(i => getStatus(i) === 'Approved').length;
  const approvalRate = totalIdeas > 0 ? (approvedIdeas / totalIdeas) * 100 : 0;
  const validatedIdeas = allIdeas.filter(i => i.report?.overallScore);
  const averageScore = validatedIdeas.length > 0 ? (validatedIdeas.reduce((acc, item) => acc + item.report!.overallScore, 0) / validatedIdeas.length) : 0;

  const statusCounts = allIdeas.reduce((acc, idea) => {
    const status = getStatus(idea);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = [
    { name: 'Approved', value: statusCounts.Approved || 0, fill: 'hsl(var(--color-approved))' },
    { name: 'Moderate', value: statusCounts.Moderate || 0, fill: 'hsl(var(--color-moderate))' },
    { name: 'Rejected', value: statusCounts.Rejected || 0, fill: 'hsl(var(--color-rejected))' },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 text-red-500">
          <p>Error: {error}</p>
        </div>
      );
    }

    if (allIdeas.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">You haven't submitted any ideas yet.</p>
          <Button asChild className="mt-4">
            <Link href={`/dashboard/submit?role=${ROLES.INNOVATOR}`}>Submit Your First Idea</Link>
          </Button>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Idea ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIdeas.map((idea) => {
            const status = getStatus(idea);
            return (
              <TableRow
                key={idea.id}
                className="cursor-pointer"
                onClick={() => router.push(`/dashboard/ideas/${idea.id}?role=${ROLES.INNOVATOR}`)}
              >
                <TableCell className="font-medium">{idea.id}</TableCell>
                <TableCell>{idea.title}</TableCell>
                <TableCell>{idea.dateSubmitted}</TableCell>
                <TableCell>
                  <Badge className={STATUS_COLORS[status]}>{status}</Badge>
                </TableCell>
                <TableCell>{getOverallScore(idea)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
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
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Ideas Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Ideas</CardTitle><PieChartIcon className="w-4 h-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">{totalIdeas}</div></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Approval Rate</CardTitle><Percent className="w-4 h-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">{approvalRate.toFixed(1)}%</div></CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Average Score</CardTitle><Target className="w-4 h-4 text-muted-foreground" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">{averageScore.toFixed(1)}</div></CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                <CardTitle>All Submitted Ideas</CardTitle>
                <CardDescription>Search, filter, and manage all your ideas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Input 
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                         <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger><SelectValue placeholder="Filter by status..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                {uniqueStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                            </SelectContent>
                        </Select>
                         <Select value={domainFilter} onValueChange={setDomainFilter}>
                            <SelectTrigger><SelectValue placeholder="Filter by domain..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Domains</SelectItem>
                                {uniqueDomains.map(domain => <SelectItem key={domain} value={domain}>{domain}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    {renderContent()}
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Idea Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="min-h-[250px] w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={ActiveShape}
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
        </div>
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
