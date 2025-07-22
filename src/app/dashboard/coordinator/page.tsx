
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MOCK_TTCS, MOCK_IDEAS, MOCK_INNOVATORS, MOCK_COLLEGES, STATUS_COLORS } from "@/lib/mock-data";
import { Lightbulb, ListChecks, Users, MessageSquare } from "lucide-react";

export default function CoordinatorDashboardPage() {
    // This is a mock implementation. In a real app, you'd get the logged-in user's ID.
    const userTTC = MOCK_TTCS[0]; 
    const college = MOCK_COLLEGES.find(c => c.id === userTTC.collegeId);

    const assignedIdeas = MOCK_IDEAS.filter(idea => idea.ttcAssigned === userTTC.id);
    const pendingEvaluations = assignedIdeas.filter(idea => idea.status === 'Pending' || !idea.report);
    const scheduledConsultations = assignedIdeas.filter(idea => idea.consultationStatus === 'Scheduled');
    const collegeInnovators = MOCK_INNOVATORS.filter(inv => inv.collegeId === userTTC.collegeId);

    return (
        <div className="flex flex-col gap-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Innovators</CardTitle>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{collegeInnovators.length}</p>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Assigned Ideas</CardTitle>
                        <Lightbulb className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{assignedIdeas.length}</p>
                    </CardContent>
                </Card>
                 <Card>
                     <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
                        <ListChecks className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{pendingEvaluations.length}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Consultations</CardTitle>
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{scheduledConsultations.length}</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Consultations</CardTitle>
                    <CardDescription>Your scheduled consultations with innovators.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Idea Title</TableHead>
                                <TableHead>Innovator</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scheduledConsultations.length > 0 ? scheduledConsultations.map(idea => (
                                <TableRow key={idea.id}>
                                    <TableCell>{idea.title}</TableCell>
                                    <TableCell>{idea.innovatorName}</TableCell>
                                    <TableCell>{idea.consultationDate} at {idea.consultationTime}</TableCell>
                                    <TableCell><Badge className={STATUS_COLORS[idea.consultationStatus || '']}>{idea.consultationStatus}</Badge></TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No upcoming consultations.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
