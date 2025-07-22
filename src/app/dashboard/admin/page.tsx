
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_COLLEGES, MOCK_IDEAS, MOCK_PLANS, MOCK_TTCS, MOCK_INNOVATORS } from '@/lib/mock-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

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
          const planName = plan.name.replace(/ Monthly| Yearly/, '');
          acc[planName] = (acc[planName] || 0) + plan.totalAmount;
      }
      return acc;
  }, {} as Record<string, number>);

  const totalRevenue = Object.values(revenueByPlan).reduce((sum, rev) => sum + rev, 0);

  const revenueChartData = Object.entries(revenueByPlan).map(([name, revenue]) => ({ name, revenue }));

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
          <CardDescription>Estimated revenue from active college subscription plans.</CardDescription>
        </CardHeader>
        <CardContent>
           <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={(value) => `₹${Number(value).toLocaleString()}`} />
                  <Tooltip
                    cursor={true}
                    content={<ChartTooltipContent 
                        contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                        labelClassName="font-bold"
                        formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Revenue']}
                    />}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
       </Card>
    </div>
  );
}
