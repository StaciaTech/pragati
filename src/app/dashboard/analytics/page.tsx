"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Sector,
} from "recharts";
import { MOCK_IDEAS } from "@/lib/mock-data";
import { TrendingUp, Award, Clock } from "lucide-react";
import { useUserIdeas } from "@/hooks/useUserIdeas";
import axios from "axios";

const chartConfig = {
  ideas: { label: "Ideas", color: "hsl(var(--chart-1))" },
  score: { label: "Score", color: "hsl(var(--chart-1))" },
  approved: { label: "Approved", color: "hsl(var(--color-approved))" },
  moderate: { label: "Moderate", color: "hsl(var(--color-moderate))" },
  rejected: { label: "Rejected", color: "hsl(var(--color-rejected))" },
};

const ActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-4}
        textAnchor="middle"
        fill={fill}
        className="text-2xl font-bold"
      >
        {value}
      </text>
      <text
        x={cx}
        y={cy}
        dy={16}
        textAnchor="middle"
        fill="hsl(var(--muted-foreground))"
        className="text-sm"
      >
        {payload.name}
      </text>
      <Sector
        {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }}
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
  const { data: ideasFromApi } = useUserIdeas();

  const [submissionTrendData, setSubmissionTrendData] = useState();

  const ideas = ideasFromApi?.length ? ideasFromApi : MOCK_IDEAS;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("token");

  const fetchSumissionTrend = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/analytics/domain-trend`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissionTrendData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSumissionTrend();
  }, []);

  // --- Metrics ---
  const totalIdeas = ideas.length;
  const approvedCount = ideas.filter(
    (i) => i.status?.toLowerCase() === "approved"
  ).length;
  const approvalRate = totalIdeas > 0 ? (approvedCount / totalIdeas) * 100 : 0;

  // const validatedIdeas = ideas.filter((i) => i.report?.overallScore);
  const totalScoreSum = ideas.reduce(
    (sum, i) => sum + (i?.overallScore || 0),
    0
  );
  const averageScore = ideas?.length > 0 ? totalScoreSum / totalIdeas : 0;

  const ideaStatusData = [
    {
      name: "Approved",
      value: approvedCount,
      fill: "hsl(var(--color-approved))",
    },
    {
      name: "Moderate",
      value: ideas.filter((i) => i.status?.toLowerCase() === "moderate").length,
      fill: "hsl(var(--color-moderate))",
    },
    {
      name: "Rejected",
      value: ideas.filter((i) => i.status?.toLowerCase() === "rejected").length,
      fill: "hsl(var(--color-rejected))",
    },
  ];

  const scoreTrendData = ideas?.map((idea) => ({
    name:
      idea?.ideaName?.length > 15
        ? `${idea?.ideaName?.slice(0, 15)}...`
        : idea?.ideaName,
    score: idea?.overallScore,
  }));
  // const scoreTrendData = [];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Total Submissions</CardTitle>
            <TrendingUp />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIdeas}</div>
            <p className="text-xs text-muted-foreground">
              ideas submitted all time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Average Score</CardTitle>
            <Award />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              across all validated ideas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Approval Rate</CardTitle>
            <Clock />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              of ideas have been approved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Idea Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
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
                    onMouseEnter={(_, i) => setActiveIndex(i)}
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

        {/* Submission Trend */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Submission Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={submissionTrendData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="ideas" fill="hsl(var(--chart-1))" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Score Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Score Trend</CardTitle>
          <CardDescription>
            Shows the evaluation score for each idea you've submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={scoreTrendData}
                margin={{ top: 5, right: 20, left: -10, bottom: 60 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
