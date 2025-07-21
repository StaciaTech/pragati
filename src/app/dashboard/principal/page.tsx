'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MOCK_COLLEGES, MOCK_IDEAS, MOCK_TTCS } from '@/lib/mock-data';

export default function PrincipalDashboardPage() {
    const college = MOCK_COLLEGES[0];
    const ttcs = MOCK_TTCS.filter(t => t.collegeId === college.id);
    const ideas = MOCK_IDEAS.filter(i => i.collegeId === college.id);
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Principal Dashboard: {college.name}</CardTitle>
                    <CardDescription>Welcome to the College Principal Admin Portal.</CardDescription>
                </CardHeader>
            </Card>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{MOCK_COLLEGES[0].currentPlanId.replace('PLAN', 'Plan ')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Credits Used / Remaining</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{150 - college.creditsAvailable} / {college.creditsAvailable}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>TTC Slots Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{ttcs.length} / {college.ttcLimit}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Total Ideas Submitted</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{ideas.length}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}