
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

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;

  if (role !== ROLES.INNOVATOR) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{role} Dashboard</CardTitle>
          <CardDescription>This dashboard is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please check back later!</p>
        </CardContent>
      </Card>
    )
  }

  const user = MOCK_INNOVATOR_USER;
  const ideas = MOCK_IDEAS;
  const recentIdeas = ideas.slice(0, 5);
  const getOverallScore = (idea: (typeof ideas)[0]) => {
    if (!idea.feedback || !idea.feedback.details) return "N/A";
    const total = idea.feedback.details.reduce((sum, d) => sum + d.score, 0);
    return (total / idea.feedback.details.length).toFixed(1);
  };


  return (
    <div className="flex flex-col gap-6">
       <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>My Recent Ideas</CardTitle>
                    <Button asChild variant="outline">
                        <Link href={`/dashboard/submit?role=${ROLES.INNOVATOR}`}>Submit New Idea</Link>
                    </Button>
                </div>
                <CardDescription>
                    A quick look at your most recently submitted ideas.
                </CardDescription>
            </CardHeader>
          <CardContent>
            {ideas.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">You haven't submitted any ideas yet. Go to "Submit Idea" to get started!</p>
                <Button asChild className="mt-4">
                    <Link href={`/dashboard/submit?role=${ROLES.INNOVATOR}`}>Submit Your First Idea</Link>
                </Button>
              </div>
            ) : (
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
                    {recentIdeas.map((idea) => (
                      <TableRow key={idea.id}>
                        <TableCell className="font-medium">{idea.id}</TableCell>
                        <TableCell>{idea.title}</TableCell>
                        <TableCell>{idea.dateSubmitted}</TableCell>
                        <TableCell>
                          <Badge className={STATUS_COLORS[idea.status]}>{idea.status}</Badge>
                        </TableCell>
                        <TableCell>{getOverallScore(idea)}</TableCell>
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
                    ))}
                  </TableBody>
                </Table>
            )}
            {ideas.length > 5 && (
              <div className="text-center mt-4">
                 <Button variant="link" asChild>
                    <Link href={`/dashboard/ideas?role=${ROLES.INNOVATOR}`}>View All My Ideas</Link>
                </Button>
              </div>
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
