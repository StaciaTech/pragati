
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Label, Cell, Sector } from 'recharts';
import { MOCK_IDEAS } from '@/lib/mock-data';
import { TrendingUp, Award, Clock } from 'lucide-react';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';

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
    color: 'hsl(var(--color-approved))',
  },
  moderate: {
    label: 'Moderate',
    color: 'hsl(var(--color-moderate))',
  },
  rejected: {
    label: 'Rejected',
    color: 'hsl(var(--color-rejected))',
  },
};

const ActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-4} textAnchor="middle" fill={fill} className="text-2xl font-bold">
        {value}
      </text>
       <text x={cx} y={cy} dy={16} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-sm">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};


export default function AnalyticsPage() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  
  const ideaStatusData = React.useMemo(() => {
    const statuses: Record<string, number> = { Approved: 0, Moderate: 0, Rejected: 0 };
    MOCK_IDEAS.forEach((idea) => {
      const status = idea.report?.validationOutcome || idea.status;
      if (status in statuses) {
        statuses[status as keyof typeof statuses]++;
      }
    });
    return [
      { name: 'Approved', value: statuses.Approved, fill: 'hsl(var(--color-approved))' },
      { name: 'Moderate', value: statuses.Moderate, fill: 'hsl(var(--color-moderate))' },
      { name: 'Rejected', value: statuses.Rejected, fill: 'hsl(var(--color-rejected))' },
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

  const totalIdeas = MOCK_IDEAS.length;
  const averageScore = scoreTrendData.length > 0 ? (scoreTrendData.reduce((acc, item) => acc + item.score, 0) / scoreTrendData.length) : 0;
  const approvalRate = totalIdeas > 0 ? (ideaStatusData.find(d => d.name === 'Approved')!.value / totalIdeas * 100) : 0;


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

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIdeas}</div>
            <p className="text-xs text-muted-foreground">ideas submitted all time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">across all validated ideas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalRate.toFixed(1)}%</div>
             <p className="text-xs text-muted-foreground">of ideas have been approved</p>
          </CardContent>
        </Card>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Idea Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={250}>
                 <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={ActiveShape}
                    data={ideaStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                     {ideaStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
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
                    cursor={true}
                    content={<ChartTooltipContent 
                        contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                        labelClassName="font-bold"
                    />}
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
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoreTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 60 }}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" interval={0} />
                        <YAxis domain={[1, 5]} />
                        <Tooltip 
                            content={<ChartTooltipContent 
                                contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                                labelClassName="font-bold"
                            />}
                        />
                        <Line type="monotone" dataKey="score" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{r: 4}} activeDot={{r: 8}} fillOpacity={1} fill="url(#colorScore)" />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

    </div>
  );
}
