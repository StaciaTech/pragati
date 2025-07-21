'use client';

import * as React from 'react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { STATUS_COLORS } from '@/lib/mock-data';
import { ROLES } from '@/lib/constants';
import type { ValidationReport } from '@/ai/schemas';

type Idea = {
  id: string;
  title: string;
  description: string;
  collegeId: string;
  collegeName: string;
  domain: string;
  innovatorName: string;
  innovatorEmail: string;
  status: string;
  dateSubmitted: string;
  version: string;
  report?: ValidationReport | null; // Keep report optional on the client
  clusterWeights?: Record<string, number>; 
  feedback?: { overall: string; details: { aspect: string; score: number; comment: string }[] } | null;
  consultationStatus: string;
  consultationDate: string | null;
  consultationTime: string | null;
  ttcAssigned: string | null;
  overallScore?: number; // Add overallScore to the type
};


export default function IdeasPage() {
  const [ideas, setIdeas] = React.useState<Idea[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch('/api/ideas');
        if (!response.ok) {
          throw new Error('Failed to fetch ideas');
        }
        const data = await response.json();
        setIdeas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const getOverallScore = (idea: Idea) => {
    if (idea.report) {
      return idea.report.overallScore.toFixed(1);
    }
    if (idea.overallScore) {
        return idea.overallScore.toFixed(1);
    }
    if (!idea.feedback) return 'N/A';
    const total = idea.feedback.details.reduce((sum, d) => sum + d.score, 0);
    return (total / idea.feedback.details.length).toFixed(1);
  };
  
  const getStatus = (idea: Idea) => {
    return idea.report?.validationOutcome || idea.status;
  }

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

    if (ideas.length === 0) {
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
          {ideas.map((idea) => {
            const status = getStatus(idea);
            return (
              <TableRow key={idea.id}>
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
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                         <Link href={`/dashboard/ideas/${idea.id}?role=${ROLES.INNOVATOR}`}>View Report</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Resubmit</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Track History</DropdownMenuItem>
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
    <Card>
      <CardHeader>
        <CardTitle>My Ideas</CardTitle>
        <CardDescription>A list of all your submitted ideas.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
