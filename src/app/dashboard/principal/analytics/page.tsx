"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MOCK_IDEAS, MOCK_TTCS } from "@/lib/mock-data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserIdeas } from "@/hooks/useUserIdeas";

type DomainTrend = { name: string; ideas: number };

export default function CollegeAnalyticsPage() {
  // const totalIdeas = MOCK_IDEAS.length;
  const approvedIdeas = MOCK_IDEAS.filter(
    (i) => i.status === "Approved"
  ).length;
  // const approvalRate = totalIdeas > 0 ? (approvedIdeas / totalIdeas) * 100 : 0;
  const [domainChartData, setDomainChartData] = useState<DomainTrend[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    data: ideas,
    isLoading: ideaLoading,
    error: ideaErrors,
  } = useUserIdeas();
  console.log(ideas, "-------------------");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const UserId = localStorage.getItem("UserId");
    if (!token) return; // optional: handle no-token case

    (async () => {
      try {
        const { data } = await axios.get(
          `${apiUrl}/api/analytics/college/domain-trend/${UserId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDomainChartData(data.data); // ← data.data because the API wraps with {success:true,data:[...]}
      } catch (error) {
        console.error(error);
        setDomainChartData([]);
      }
    })();
  }, [apiUrl]);

  const domainSubmissions = MOCK_IDEAS.reduce((acc, idea) => {
    acc[idea.domain] = (acc[idea.domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // const domainChartData = Object.entries(domainSubmissions).map(([name, ideas]) => ({ name, ideas }));

  const statusCounts = MOCK_IDEAS.reduce((acc, idea) => {
    const status = idea.report?.validationOutcome || idea.status || "N/A";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = [
    {
      name: "Approved",
      value: statusCounts.Approved || 0,
      fill: "hsl(var(--color-approved))",
    },
    {
      name: "Moderate",
      value: statusCounts.Moderate || 0,
      fill: "hsl(var(--color-moderate))",
    },
    {
      name: "Rejected",
      value: statusCounts.Rejected || 0,
      fill: "hsl(var(--color-rejected))",
    },
  ];
  const totalIdeas = ideas?.length;

  const approvedCount = ideas?.filter(
    (item) => item.status.toLowerCase() === "approved"
  ).length;

  const approvalRate = totalIdeas > 0 ? (approvedCount / totalIdeas) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              {approvalRate.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalIdeas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total TTCs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{MOCK_TTCS.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    cursor
                    content={
                      <ChartTooltipContent
                        contentStyle={{
                          background: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                        }}
                        labelClassName="font-bold"
                      />
                    }
                  />
                  <Bar dataKey="ideas" fill="hsl(var(--chart-1))" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Idea Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="min-h-[200px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip
                    cursor={true}
                    content={
                      <ChartTooltipContent
                        contentStyle={{
                          background: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                        }}
                        labelClassName="font-bold"
                        formatter={(value, name, props) => {
                          return [`${value} Ideas`, name];
                        }}
                      />
                    }
                  />
                  <Pie
                    data={statusChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {statusChartData.map((entry, index) => (
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
