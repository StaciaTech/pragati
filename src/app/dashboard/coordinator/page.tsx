
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MOCK_TTCS, MOCK_IDEAS, MOCK_INNOVATORS, MOCK_COLLEGES, STATUS_COLORS } from "@/lib/mock-data";
import { Lightbulb, ListChecks, Users, MessageSquare } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function CoordinatorDashboardPage() {
    // This is a mock implementation. In a real app, you'd get the logged-in user's ID.
    const userTTC = MOCK_TTCS[0]; 
    const college = MOCK_COLLEGES.find(c => c.id === userTTC.collegeId);

    const assignedIdeas = MOCK_IDEAS.filter(idea => idea.ttcAssigned === userTTC.id);
    const pendingEvaluations = assignedIdeas.filter(idea => idea.status === 'Pending' || !idea.report);
    const scheduledConsultations = assignedIdeas.filter(idea => idea.consultationStatus === 'Scheduled');
    const collegeInnovators = MOCK_INNOVATORS.filter(inv => inv.collegeId === userTTC.collegeId);

    const ideaStatusCounts = assignedIdeas.reduce((acc, idea) => {
        const status = idea.report?.validationOutcome || idea.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const ideaStatusData = [
        { name: 'Approved', value: ideaStatusCounts.Approved || 0, fill: 'hsl(var(--color-approved))' },
        { name: 'Moderate', value: ideaStatusCounts.Moderate || 0, fill: 'hsl(var(--color-moderate))' },
        { name: 'Rejected', value: ideaStatusCounts.Rejected || 0, fill: 'hsl(var(--color-rejected))' },
    ];
    
    const topInnovators = collegeInnovators
        .map(innovator => {
            const innovatorIdeas = assignedIdeas.filter(idea => idea.innovatorEmail === innovator.email && idea.report);
            if (innovatorIdeas.length === 0) return null;
            const avgScore = innovatorIdeas.reduce((sum, idea) => sum + (idea.report?.overallScore || 0), 0) / innovatorIdeas.length;
            return {
                name: innovator.name,
                score: avgScore,
            }
        })
        .filter(Boolean)
        .sort((a, b) => b!.score - a!.score)
        .slice(0, 5) as { name: string, score: number }[];


    return (
        <div className="flex flex-col gap-6">
             <Card className="w-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg border-0 relative overflow-hidden">
                <div className="absolute -top-1/4 -left-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-br from-[#FF00CC] to-[#333399] opacity-30 blur-3xl filter" />
                <div className="absolute -bottom-1/4 -right-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-tl from-[#F472B6] to-[#06B6D4] opacity-20 blur-3xl filter" />
                <div className="relative z-10">
                    <CardHeader>
                        <CardTitle className="text-3xl text-white">Welcome, {userTTC.name}!</CardTitle>
                        <CardDescription className="text-primary-foreground/80">Here's an overview of your college's innovation activity.</CardDescription>
                    </CardHeader>
                </div>
            </Card>

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
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Top Performing Innovators</CardTitle>
                        <CardDescription>Innovators you manage, ranked by average idea score.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ChartContainer config={{}} className="h-[250px] w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topInnovators} layout="vertical" margin={{ left: 10, right: 10 }}>
                                    <CartesianGrid horizontal={false} />
                                    <XAxis type="number" domain={[0,100]} hide />
                                    <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={100} />
                                    <Tooltip
                                        cursor={true}
                                        content={<ChartTooltipContent
                                            contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                                            labelClassName="font-bold"
                                            formatter={(value) => [`${(value as number).toFixed(2)} Avg Score`, '']}
                                        />}
                                    />
                                    <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={5} background={{ fill: 'hsl(var(--muted)/0.5)', radius: 5 }} />
                                </BarChart>
                            </ResponsiveContainer>
                       </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Idea Status Distribution</CardTitle>
                         <CardDescription>Breakdown of outcomes for ideas you've been assigned.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="min-h-[250px] w-full">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Tooltip
                                      cursor={true}
                                      content={<ChartTooltipContent 
                                        contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                                        labelClassName="font-bold"
                                        formatter={(value, name) => [`${value} Ideas`, name]}
                                      />}
                                    />
                                    <Pie data={ideaStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} labelLine={false} label>
                                        {ideaStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
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
