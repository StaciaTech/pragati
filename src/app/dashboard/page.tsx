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
  const recentIdeas = ideas.slice(0, 3);
  const getOverallScore = (idea: (typeof ideas)[0]) => {
    if (!idea.feedback) return "N/A";
    const total = idea.feedback.details.reduce((sum, d) => sum + d.score, 0);
    return (total / idea.feedback.details.length).toFixed(1);
  };


  return (
    <div className="flex flex-col gap-6">
       <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
                <p><span className="font-medium text-muted-foreground">Name:</span> {user.name}</p>
                <p><span className="font-medium text-muted-foreground">Role:</span> {user.role}</p>
                <p><span className="font-medium text-muted-foreground">Email:</span> {user.email}</p>
                <p><span className="font-medium text-muted-foreground">College:</span> {user.college}</p>
            </CardContent>
          </Card>

          {/* Credits Card */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg">Credits Available</CardTitle>
              <CardDescription>Credits are used for submitting new ideas.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-5xl font-bold text-primary">{user.credits}</p>
            </CardContent>
          </Card>

          {/* Ideas Submitted Card */}
          <Card className="flex flex-col justify-between">
             <CardHeader>
              <CardTitle className="text-lg">Ideas Submitted</CardTitle>
              <CardDescription>Total ideas you've submitted so far.</CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-5xl font-bold text-primary">{ideas.length}</p>
            </CardContent>
          </Card>

          {/* Consultation Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consultation Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-muted-foreground">Next Consultation:</span> July 20, 2024 (IDEA-001)
              </p>
              <p className="text-sm">
                <span className="font-medium text-muted-foreground">Assigned Mentor:</span> Dr. Emily White
              </p>
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href={`/dashboard/consultations?role=${ROLES.INNOVATOR}`}>View All Consultations</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Ideas List on Dashboard */}
        <Card>
            <CardHeader>
                <CardTitle>My Recent Ideas</CardTitle>
            </CardHeader>
          <CardContent>
            {ideas.length === 0 ? (
              <p className="text-muted-foreground">You haven't submitted any ideas yet. Go to "Submit Idea" to get started!</p>
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
                          {idea.feedback ? (
                            <Button variant="link" asChild className="p-0 h-auto">
                                <Link href={`/dashboard/ideas/${idea.id}?role=${ROLES.INNOVATOR}`}>View Report</Link>
                            </Button>
                          ) : (
                            <span className="text-muted-foreground italic text-xs">No feedback yet</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )}
            {ideas.length > 3 && (
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
