'use client';

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
import { MoreHorizontal } from 'lucide-react';
import { MOCK_IDEAS, STATUS_COLORS } from '@/lib/mock-data';
import { ROLES } from '@/lib/constants';

export default function IdeasPage() {
  const ideas = MOCK_IDEAS;

  const getOverallScore = (idea: (typeof ideas)[0]) => {
    if (idea.report) {
      return idea.report.overallScore.toFixed(1);
    }
    if (!idea.feedback) return 'N/A';
    const total = idea.feedback.details.reduce((sum, d) => sum + d.score, 0);
    return (total / idea.feedback.details.length).toFixed(1);
  };
  
  const getStatus = (idea: (typeof ideas)[0]) => {
    return idea.report?.validationOutcome || idea.status;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Ideas</CardTitle>
        <CardDescription>A list of all your submitted ideas.</CardDescription>
      </CardHeader>
      <CardContent>
        {ideas.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">You haven't submitted any ideas yet.</p>
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
        )}
      </CardContent>
    </Card>
  );
}
