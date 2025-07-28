
'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Award, Clock, MoreHorizontal } from 'lucide-react';
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


type Idea = (typeof MOCK_IDEAS)[0];

const mockHistory = [
    { version: "V1.0", date: "2024-01-15", status: "Approved", score: 88 },
    { version: "V0.9", date: "2024-01-10", status: "Moderate", score: 72 },
    { version: "V0.8", date: "2024-01-05", status: "Rejected", score: 45 },
];


function DashboardPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [selectedIdeaForHistory, setSelectedIdeaForHistory] = useState<Idea | null>(null);
  const [selectedAction, setSelectedAction] = useState<{ action?: () => void, title?: string, description?: string }>({});


  if (role !== ROLES.INNOVATOR) {
    // Fallback for other roles if they land here, though navigation should prevent this.
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome to your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your role-specific dashboard is available via the sidebar navigation.</p>
        </CardContent>
      </Card>
    )
  }

  const user = MOCK_INNOVATOR_USER;
  const ideas = MOCK_IDEAS.filter(idea => idea.innovatorEmail === user.email);
  const recentIdeas = ideas.slice(0, 5);

  const totalIdeas = ideas.length;
  const validatedIdeas = ideas.filter(idea => idea.report?.overallScore);
  const averageScore = validatedIdeas.length > 0 ? (validatedIdeas.reduce((acc, item) => acc + item.report!.overallScore, 0) / validatedIdeas.length) : 0;
  const approvedCount = ideas.filter(idea => (idea.report?.validationOutcome || idea.status) === 'Approved').length;
  const approvalRate = totalIdeas > 0 ? (approvedCount / totalIdeas * 100) : 0;
  
  const getOverallScore = (idea: (typeof ideas)[0]) => {
     if (idea.report) {
      return idea.report.overallScore.toFixed(1);
    }
    return 'N/A';
  };
  
  const getStatus = (idea: (typeof ideas)[0]) => {
    return idea.report?.validationOutcome || idea.status;
  }

  const handleRowClick = (ideaId: string) => {
    router.push(`/dashboard/ideas/${ideaId}?role=${ROLES.INNOVATOR}`);
  };

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
           <CardContent>
              <Button asChild variant="secondary" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground">
                  <Link href={`/dashboard/submit?role=${ROLES.INNOVATOR}`}>Submit a New Idea</Link>
              </Button>
          </CardContent>
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
                <div className="flex justify-between items-center">
                    <CardTitle>My Recent Ideas</CardTitle>
                     {ideas.length > 5 && (
                        <Button variant="link" asChild>
                            <Link href={`/dashboard/ideas?role=${ROLES.INNOVATOR}`}>View All</Link>
                        </Button>
                    )}
                </div>
                <CardDescription>
                    A quick look at your most recently submitted ideas.
                </CardDescription>
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
                    {recentIdeas.map((idea) => {
                      const status = getStatus(idea);
                      return (
                      <TableRow key={idea.id} >
                        <TableCell className="font-medium">{idea.title}</TableCell>
                        <TableCell>{idea.dateSubmitted}</TableCell>
                        <TableCell>
                          <Badge className={STATUS_COLORS[status]}>{status}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{getOverallScore(idea)}</TableCell>
                        <TableCell className="text-right">
                          {idea.report ? (
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
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardPageContent />
        </Suspense>
    );
}
