
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MOCK_TTCS, MOCK_IDEAS, MOCK_INNOVATORS, MOCK_COLLEGES, STATUS_COLORS } from "@/lib/mock-data";

export default function CoordinatorDashboardPage() {
    // This is a mock implementation. In a real app, you'd get the logged-in user's ID.
    const userTTC = MOCK_TTCS[0]; 
    const college = MOCK_COLLEGES.find(c => c.id === userTTC.collegeId);

    const assignedConsultations = MOCK_IDEAS.filter(idea => idea.ttcAssigned === userTTC.id);
    const scheduledConsultations = assignedConsultations.filter(idea => idea.consultationStatus === 'Scheduled');
    const collegeInnovators = MOCK_INNOVATORS.filter(inv => inv.collegeId === userTTC.collegeId);
    const collegeIdeas = MOCK_IDEAS.filter(idea => idea.collegeId === userTTC.collegeId);

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Innovators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{collegeInnovators.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Ideas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{collegeIdeas.length}</p>
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
