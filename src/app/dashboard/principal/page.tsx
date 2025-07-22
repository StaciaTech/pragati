
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MOCK_COLLEGES, MOCK_IDEAS, MOCK_TTCS } from '@/lib/mock-data';

export default function PrincipalDashboardPage() {
    const college = MOCK_COLLEGES[0];
    const ttcs = MOCK_TTCS.filter(t => t.collegeId === college.id);
    const ideas = MOCK_IDEAS.filter(i => i.collegeId === college.id);
    const totalCredits = 150; // Assuming this is the total allocated
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>Your active subscription</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{MOCK_COLLEGES[0].currentPlanId.replace('PLAN', 'Plan ')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Credits</CardTitle>
                         <CardDescription>Used / Remaining</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{totalCredits - college.creditsAvailable} / {college.creditsAvailable}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>TTC Slots</CardTitle>
                        <CardDescription>Used / Total</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{ttcs.length} / {college.ttcLimit}</p>
                    </CardContent>
                </Card>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Ideas Submitted</CardTitle>
                         <CardDescription>By innovators in your college</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{ideas.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>College Approval Rate</CardTitle>
                        <CardDescription>For all validated ideas</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">
                            {ideas.length > 0 ? 
                            `${((ideas.filter(i => i.status === 'Approved').length / ideas.length) * 100).toFixed(1)}%`
                            : '0%'}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
