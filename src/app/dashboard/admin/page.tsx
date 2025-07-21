'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_COLLEGES, MOCK_IDEAS, MOCK_PLANS, MOCK_TTCS, MOCK_INNOVATORS } from '@/lib/mock-data';

export default function AdminDashboardPage() {
  const totalColleges = MOCK_COLLEGES.length;
  const totalIdeas = MOCK_IDEAS.length;
  const totalTTCs = MOCK_TTCS.length;
  const totalInnovators = MOCK_INNOVATORS.length;

  const approvedIdeas = MOCK_IDEAS.filter(idea => idea.status === 'Approved').length;
  const ideasValidated = MOCK_IDEAS.filter(idea => idea.status !== 'Validating').length;
  const approvalRate = ideasValidated > 0 ? ((approvedIdeas / ideasValidated) * 100).toFixed(1) : '0';
  
  const revenueByPlan = MOCK_COLLEGES.reduce((acc, college) => {
      const plan = MOCK_PLANS.find(p => p.id === college.currentPlanId);
      if (plan && plan.enabled) {
          acc[plan.name] = (acc[plan.name] || 0) + plan.totalAmount;
      }
      return acc;
  }, {} as Record<string, number>);

  const totalRevenue = Object.values(revenueByPlan).reduce((sum, rev) => sum + rev, 0);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Super Admin Dashboard</CardTitle>
          <CardDescription>Welcome to the Super Admin Portal. Global statistics and system health are displayed here.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader><CardTitle>Total Colleges</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{totalColleges}</p></CardContent>
        </Card>
         <Card>
            <CardHeader><CardTitle>Total TTCs</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{totalTTCs}</p></CardContent>
        </Card>
         <Card>
            <CardHeader><CardTitle>Total Innovators</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{totalInnovators}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Total Ideas Validated</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{ideasValidated}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>System Approval Rate</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{approvalRate}%</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Total Estimated Revenue</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">₹{totalRevenue.toLocaleString()}</p></CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Revenue by Plan</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Plan Name</TableHead>
                        <TableHead className="text-right">Estimated Revenue</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(revenueByPlan).map(([planName, revenue]) => (
                        <TableRow key={planName}>
                            <TableCell>{planName}</TableCell>
                            <TableCell className="text-right">₹{revenue.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
