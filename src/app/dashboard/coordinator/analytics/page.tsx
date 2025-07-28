
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Sector, Legend, Line, LineChart, LabelList } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { Badge } from '@/components/ui/badge';

const invitedVsActiveData = [
  { name: 'Active Innovators', value: 8, fill: 'hsl(var(--chart-1))' },
  { name: 'Invited Innovators', value: 2, fill: 'hsl(var(--chart-5))' }
];

const ideaQualityData = [
  { month: 'Jan', quality: 3.2 },
  { month: 'Feb', quality: 3.5 },
  { month: 'Mar', quality: 3.4 },
  { month: 'Apr', quality: 4.1 },
  { month: 'May', quality: 4.3 },
  { month: 'Jun', quality: 4.0 },
];

const rejectionReasonsData = [
    { name: 'Low Market Need', value: 40, fill: 'hsl(var(--color-rejected))' },
    { name: 'Technical Feasibility', value: 30, fill: 'hsl(var(--chart-3))' },
    { name: 'Weak Business Model', value: 20, fill: 'hsl(var(--chart-5))' },
    { name: 'Poor Team Fit', value: 10, fill: 'hsl(var(--muted))' },
];

const categorySuccessData = [
  { category: 'HealthTech', approved: 5, moderate: 8, rejected: 3 },
  { category: 'EdTech', approved: 8, moderate: 12, rejected: 5 },
  { category: 'FinTech', approved: 12, moderate: 7, rejected: 2 },
  { category: 'Agriculture', approved: 6, moderate: 10, rejected: 8 },
];

const ActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill={fill} className="text-xl font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-xs">
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


export default function CoordinatorAnalyticsPage() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const onPieEnter = React.useCallback(
        (_: any, index: number) => {
          setActiveIndex(index);
        },
        [setActiveIndex]
    );

  return (
    <div className="space-y-6">
      <Card className="w-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg border-0 relative overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-br from-[#FF00CC] to-[#333399] opacity-30 blur-3xl filter" />
        <div className="absolute -bottom-1/4 -right-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-tl from-[#F472B6] to-[#06B6D4] opacity-20 blur-3xl filter" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-3xl text-white">TTC Analytics</CardTitle>
            <CardDescription className="text-primary-foreground/80">View performance and idea analytics for your college.</CardDescription>
          </CardHeader>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Innovator Engagement</CardTitle>
                <CardDescription>Invited vs. Active Innovators</CardDescription>
              </CardHeader>
              <CardContent>
                  <ChartContainer config={{}} className="min-h-[200px] w-full">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            activeIndex={activeIndex}
                            activeShape={ActiveShape}
                            data={invitedVsActiveData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                          />
                        </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
              </CardContent>
          </Card>
           <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Idea Quality Over Time</CardTitle>
                <CardDescription>Average validation score per month.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[250px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ideaQualityData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                       <defs>
                            <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[1, 5]} />
                        <Tooltip 
                            content={<ChartTooltipContent 
                                contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                                labelClassName="font-bold"
                            />}
                        />
                        <Line type="monotone" dataKey="quality" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#colorQuality)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
          </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
           <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Category-wise Success Rate</CardTitle>
                <CardDescription>Breakdown of idea outcomes by domain.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={categorySuccessData} stackOffset="expand">
                          <CartesianGrid horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={80} />
                          <Tooltip
                            content={<ChartTooltipContent 
                                contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                                labelClassName="font-bold"
                            />}
                           />
                          <Bar dataKey="approved" fill="hsl(var(--color-approved))" stackId="a" radius={[5, 0, 0, 5]}><LabelList position="center" className="fill-white font-bold" valueAccessor={(props: any) => props.value > 0 ? props.value : ''} /></Bar>
                          <Bar dataKey="moderate" fill="hsl(var(--color-moderate))" stackId="a"><LabelList position="center" className="fill-white font-bold" valueAccessor={(props: any) => props.value > 0 ? props.value : ''} /></Bar>
                          <Bar dataKey="rejected" fill="hsl(var(--color-rejected))" stackId="a" radius={[0, 5, 5, 0]}><LabelList position="center" className="fill-white font-bold" valueAccessor={(props: any) => props.value > 0 ? props.value : ''} /></Bar>
                        </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
          </Card>
          <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Rejected Idea Reasons</CardTitle>
                <CardDescription>Common reasons for idea rejection.</CardDescription>
              </CardHeader>
              <CardContent>
                  <ChartContainer config={{}} className="min-h-[200px] w-full">
                    <ResponsiveContainer width="100%" height={300}>
                       <PieChart>
                          <Tooltip
                            cursor={true}
                            content={<ChartTooltipContent 
                                contentStyle={{background: "hsl(var(--background))", border: "1px solid hsl(var(--border))"}}
                                labelClassName="font-bold"
                            />}
                           />
                           <Pie data={rejectionReasonsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label>
                             {rejectionReasonsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                           </Pie>
                       </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
              </CardContent>
          </Card>
      </div>

    </div>
  );
}

