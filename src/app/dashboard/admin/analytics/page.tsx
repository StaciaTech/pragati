
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_IDEAS } from '@/lib/mock-data';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell } from "recharts";

export default function AdminAnalyticsPage() {
  
  const approvalRatesByDomain = MOCK_IDEAS.reduce((acc, idea) => {
    if (!acc[idea.domain]) {
      acc[idea.domain] = { total: 0, approved: 0 };
    }
    acc[idea.domain].total++;
    if (idea.status === 'Approved') {
      acc[idea.domain].approved++;
    }
    return acc;
  }, {} as Record<string, { total: number; approved: number }>);

  const domainTrends = Object.entries(approvalRatesByDomain).map(([domain, data]) => ({
    domain,
    approvalRate: data.total > 0 ? ((data.approved / data.total) * 100) : 0,
    totalIdeas: data.total,
  }));
  
  const submissionsByCollege = MOCK_IDEAS.reduce((acc, idea) => {
    acc[idea.collegeName] = (acc[idea.collegeName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const collegeSubmissionData = Object.entries(submissionsByCollege)
    .map(([name, submissions], index) => ({ 
        name, 
        submissions,
        fill: `hsl(var(--chart-${index + 1}))`
    }))
    .sort((a, b) => b.submissions - a.submissions);


  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Advanced Analytics</CardTitle>
          <CardDescription>View system-wide analytics, trends, and export data.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end gap-2">
            <Button variant="outline">Export CSV</Button>
            <Button variant="outline">Export PDF</Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Approval Rates by Domain</CardTitle>
        </CardHeader>
        <CardContent>
           <ChartContainer config={{}} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domainTrends} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" dataKey="approvalRate" unit="%" />
                  <YAxis type="category" dataKey="domain" tickLine={false} axisLine={false} width={120} />
                  <ChartTooltip 
                    cursor={false}
                    content={<ChartTooltipContent
                        contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                        labelClassName="font-bold"
                        formatter={(value, name) => {
                            if (name === 'approvalRate') return [`${(value as number).toFixed(2)}%`, 'Approval Rate'];
                            if (name === 'totalIdeas') return [value, 'Total Ideas'];
                            return [value, name];
                        }}
                    />} 
                  />
                  <Bar dataKey="approvalRate" fill="hsl(var(--chart-2))" radius={5} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Global Submission Distribution</CardTitle>
          <CardDescription>Total idea submissions from each institution.</CardDescription>
        </CardHeader>
        <CardContent>
           <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <ChartTooltip 
                        cursor={false}
                        content={<ChartTooltipContent
                            contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                            labelClassName="font-bold"
                            formatter={(value, name) => [value, "Submissions"]}
                            indicator="dot"
                        />} 
                    />
                    <Pie 
                        data={collegeSubmissionData} 
                        dataKey="submissions" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={100} 
                        label
                    >
                        {collegeSubmissionData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                        ))}
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Time-to-Decision Metrics</CardTitle>
          <CardDescription>(Mock Data)</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Average Validation Time</p>
                <p className="text-2xl font-bold">7 Days</p>
            </div>
             <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Longest Validation Time</p>
                <p className="text-2xl font-bold">12 Days</p>
            </div>
             <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Shortest Validation Time</p>
                <p className="text-2xl font-bold">3 Days</p>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
