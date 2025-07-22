
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MOCK_IDEAS } from '@/lib/mock-data';

const chartConfig = {
  ideas: {
    label: 'Ideas',
    color: 'hsl(var(--chart-1))',
  },
  score: {
    label: 'Score',
    color: 'hsl(var(--chart-1))',
  },
  approved: {
    label: 'Approved',
    color: 'hsl(var(--chart-2))',
  },
  moderate: {
    label: 'Moderate',
    color: 'hsl(var(--chart-3))',
  },
  rejected: {
    label: 'Rejected',
    color: 'hsl(var(--chart-5))',
  },
};

export default function AnalyticsPage() {
  const ideaStatusData = React.useMemo(() => {
    const statuses: Record<string, number> = { Approved: 0, Moderate: 0, Rejected: 0 };
    MOCK_IDEAS.forEach((idea) => {
      const status = idea.report?.validationOutcome || idea.status;
      if (status in statuses) {
        statuses[status as keyof typeof statuses]++;
      }
    });
    return [
      { name: 'Approved', value: statuses.Approved, fill: 'var(--color-approved)' },
      { name: 'Moderate', value: statuses.Moderate, fill: 'var(--color-moderate)' },
      { name: 'Rejected', value: statuses.Rejected, fill: 'var(--color-rejected)' },
    ];
  }, []);

  const submissionTrendData = React.useMemo(() => {
    const trends: { [key: string]: number } = {};
    const sortedIdeas = [...MOCK_IDEAS].sort((a,b) => new Date(a.dateSubmitted).getTime() - new Date(b.dateSubmitted).getTime());
    
    sortedIdeas.forEach((idea) => {
      const month = new Date(idea.dateSubmitted).toLocaleString('default', { month: 'short', year: '2-digit' });
      trends[month] = (trends[month] || 0) + 1;
    });
    return Object.entries(trends).map(([name, ideas]) => ({ name, ideas }));
  }, []);

  const scoreTrendData = React.useMemo(() => {
     return MOCK_IDEAS.filter(idea => idea.report?.overallScore)
      .map(idea => ({
        name: idea.title.length > 15 ? `${idea.title.substring(0, 15)}...` : idea.title,
        score: idea.report!.overallScore,
      }))
      .sort((a,b) => MOCK_IDEAS.findIndex(idea => idea.title === a.name) - MOCK_IDEAS.findIndex(idea => idea.title === b.name));
  }, []);


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Analytics</CardTitle>
          <CardDescription>
            An overview of your idea submission trends and outcomes.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Idea Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={ideaStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submission Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={submissionTrendData}>
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

       <Card>
          <CardHeader>
            <CardTitle>Overall Score Trend</CardTitle>
             <CardDescription>Shows the evaluation score for each idea you've submitted.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={scoreTrendData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" height={60} />
                    <YAxis domain={[1, 5]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

    </div>
  );
}
