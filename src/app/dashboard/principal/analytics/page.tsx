'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MOCK_IDEAS, MOCK_TTCS } from '@/lib/mock-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function CollegeAnalyticsPage() {
    const totalIdeas = MOCK_IDEAS.length;
    const approvedIdeas = MOCK_IDEAS.filter(i => i.status === 'Approved').length;
    const approvalRate = totalIdeas > 0 ? ((approvedIdeas / totalIdeas) * 100).toFixed(1) : 0;

    const domainSubmissions = MOCK_IDEAS.reduce((acc, idea) => {
        acc[idea.domain] = (acc[idea.domain] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const domainChartData = Object.entries(domainSubmissions).map(([name, ideas]) => ({ name, ideas }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>College Analytics</CardTitle>
          <CardDescription>View analytics and performance metrics for your college.</CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader><CardTitle>Approval Rate</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{approvalRate}%</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Total Ideas</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{totalIdeas}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Total TTCs</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{MOCK_TTCS.length}</p></CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Domain-wise Submission Trends</CardTitle>
        </CardHeader>
        <CardContent>
           <ChartContainer config={{}} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={domainChartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                   <YAxis />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="ideas" fill="hsl(var(--chart-1))" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
