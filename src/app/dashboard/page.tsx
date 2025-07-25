

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROLES, type Role } from '@/lib/constants';
import { MOCK_INNOVATOR_USER, MOCK_IDEAS, STATUS_COLORS } from '@/lib/mock-data';
import type { ValidationReport } from '@/ai/schemas';

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;

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
  const recentIdeas = ideas.slice(0, 3);
  
  const getOverallScore = (idea: (typeof ideas)[0]) => {
     if (idea.report) {
      return idea.report.overallScore.toFixed(1);
    }
    return 'N/A';
  };
  
  const getStatus = (idea: (typeof ideas)[0]) => {
    return idea.report?.validationOutcome || idea.status;
  }

  return (
    <div className="flex flex-col gap-6">
       <Card className="w-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-3xl text-white">Welcome back, {user.name}!</CardTitle>
          <CardDescription className="text-primary-foreground/80">Ready to change the world? Let's get your next great idea validated.</CardDescription>
        </CardHeader>
         <CardContent>
            <Button asChild variant="secondary" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground">
                <Link href={`/dashboard/submit?role=${ROLES.INNOVATOR}`}>Submit a New Idea</Link>
            </Button>
        </CardContent>
      </Card>

        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>My Recent Ideas</CardTitle>
                     {ideas.length > 3 && (
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
                      <TableRow key={idea.id}>
                        <TableCell className="font-medium">{idea.title}</TableCell>
                        <TableCell>{idea.dateSubmitted}</TableCell>
                        <TableCell>
                          <Badge className={STATUS_COLORS[status]}>{status}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{getOverallScore(idea)}</TableCell>
                        <TableCell className="text-right">
                          {idea.report ? (
                            <Button variant="link" asChild className="p-0 h-auto">
                                <Link href={`/dashboard/ideas/${idea.id}?role=${ROLES.INNOVATOR}`}>View Report</Link>
                            </Button>
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
  );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardPageContent />
        </Suspense>
    );
}
