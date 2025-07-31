
'use client';

import * as React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, School, CreditCard } from 'lucide-react';
import { MOCK_INNOVATORS, MOCK_IDEAS, STATUS_COLORS, MOCK_COLLEGES } from '@/lib/mock-data';
import { ROLES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ValidationReport } from '@/ai/schemas';

export default function InnovatorDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const innovatorId = params.innovatorId as string;
    const role = searchParams.get('role') || ROLES.COORDINATOR;

    const innovator = MOCK_INNOVATORS.find(inv => inv.id === innovatorId);
    const innovatorIdeas = MOCK_IDEAS.filter(idea => idea.innovatorEmail === innovator?.email);
    const college = MOCK_COLLEGES.find(c => c.id === innovator?.collegeId);

    if (!innovator) {
        return <p>Innovator not found.</p>;
    }
    
    const getOverallScore = (idea: (typeof MOCK_IDEAS)[0]) => {
     if (idea.report) {
      return idea.report.overallScore.toFixed(1);
    }
    return 'N/A';
    };
  
    const getStatus = (idea: (typeof MOCK_IDEAS)[0]) => {
        return idea.report?.validationOutcome || idea.status;
    }

    return (
        <div className="space-y-6">
            <Button variant="outline" asChild>
                <Link href={`/dashboard/coordinator/innovator-management?role=${role}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Innovator Management
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center justify-between">
                        <span>{innovator.name}</span>
                        <Badge className={cn(STATUS_COLORS[innovator.status])}>{innovator.status}</Badge>
                    </CardTitle>
                    <CardDescription>Innovator Profile</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{innovator.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <School className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{college?.name}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{innovator.credits} Credits</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Submitted Ideas</CardTitle>
                    <CardDescription>A list of all ideas submitted by {innovator.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Date Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {innovatorIdeas.length > 0 ? (
                                innovatorIdeas.map(idea => (
                                    <TableRow key={idea.id}>
                                        <TableCell>{idea.id}</TableCell>
                                        <TableCell>{idea.title}</TableCell>
                                        <TableCell>{idea.dateSubmitted}</TableCell>
                                        <TableCell>
                                            <Badge className={cn(STATUS_COLORS[getStatus(idea)])}>
                                                {getStatus(idea)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{getOverallScore(idea)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="link" size="sm" asChild>
                                                <Link href={`/dashboard/ideas/${idea.id}?role=${role}`}>
                                                    View Report
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">No ideas submitted yet.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
