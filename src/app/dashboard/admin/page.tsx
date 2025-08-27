"use client";

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";

import {
  MOCK_COLLEGES,
  MOCK_IDEAS,
  MOCK_PLANS,
  MOCK_TTCS,
  MOCK_INNOVATORS,
} from "@/lib/mock-data";
import { useUserIdeas } from "@/hooks/useUserIdeas";
import { useAllInnovators } from "@/hooks/useAllInnovators";
import { useColleges } from "@/hooks/useColleges";

/* ---------- TYPE DEFINITIONS ---------- */
interface Idea {
  id: string;
  collegeId: string;
  status: string;
  report?: { validationOutcome: string };
}

interface Plan {
  id: string;
  name: string;
  enabled: boolean;
  totalAmount: number;
}

interface College {
  id: string;
  name: string;
  currentPlanId: string;
}

/* ---------- MAIN COMPONENT ---------- */
export default function AdminDashboardPage() {
  /* --- counts --- */

  const {
    data: ideas,
    isLoading: ideaLoading,
    error: ideaErrors,
  } = useUserIdeas();

  const {
    data: innovators,
    isLoading: innovatorsLoading,
    error: innovatorsErrors,
  } = useAllInnovators();

  const {
    data: collegeData,
    isLoading: collegeLoading,
    error: collegeErroe,
  } = useColleges();

  const totalColleges = collegeData?.length;
  const totalIdeas = ideas?.length;
  const totalTTCs = MOCK_TTCS.length;
  const totalInnovators = innovators?.length;

  /* --- revenue by plan --- */
  const revenueByPlan = MOCK_COLLEGES.reduce<Record<string, number>>(
    (acc, college) => {
      const plan = (MOCK_PLANS as Plan[]).find(
        (p) => p.id === college.currentPlanId
      );
      if (plan?.enabled) {
        const planName = plan.name.replace(/ Monthly| Yearly/, "");
        acc[planName] = (acc[planName] || 0) + plan.totalAmount;
      }
      return acc;
    },
    {}
  );
  const revenueChartData = Object.entries(revenueByPlan).map(
    ([name, revenue]) => ({
      name,
      revenue,
    })
  );

  /* --- idea status counts --- */
  const ideaStatusCounts = (MOCK_IDEAS as Idea[]).reduce<
    Record<string, number>
  >((acc, idea) => {
    const status = idea.report?.validationOutcome || idea.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const ideaStatusData = [
    {
      name: "Approved",
      value: ideaStatusCounts.Approved || 0,
      fill: "hsl(var(--color-approved))",
    },
    {
      name: "Moderate",
      value: ideaStatusCounts.Moderate || 0,
      fill: "hsl(var(--color-moderate))",
    },
    {
      name: "Rejected",
      value: ideaStatusCounts.Rejected || 0,
      fill: "hsl(var(--color-rejected))",
    },
    {
      name: "Slay",
      value: ideaStatusCounts["Slay"] || 0,
      fill: "hsl(var(--color-approved))",
    },
    {
      name: "Mid",
      value: ideaStatusCounts["Mid"] || 0,
      fill: "hsl(var(--color-moderate))",
    },
    {
      name: "Flop",
      value: ideaStatusCounts["Flop"] || 0,
      fill: "hsl(var(--color-rejected))",
    },
  ];

  /* --- college performance --- */
  const collegePerformance = (MOCK_COLLEGES as College[])
    .map((college) => {
      const collegeIdeas = (MOCK_IDEAS as Idea[]).filter(
        (idea) => idea.collegeId === college.id
      );
      const approved = collegeIdeas.filter(
        (i) => (i.report?.validationOutcome || i.status) === "Approved"
      ).length;
      const approvalRate =
        collegeIdeas.length > 0
          ? ((approved / collegeIdeas.length) * 100).toFixed(1) + "%"
          : "0.0%";
      return {
        name: college.name,
        ideas: collegeIdeas.length,
        approvalRate: approvalRate,
      };
    })
    .sort((a, b) => b.ideas - a.ideas);

  /* ---------- RENDER ---------- */
  return (
    <div className="flex flex-col gap-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Colleges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalColleges}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total TTCs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTTCs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Innovators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalInnovators}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalIdeas}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Platform-wide Idea Status</CardTitle>
            <CardDescription>
              Distribution of all ideas submitted across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ideaStatusData}
                  layout="vertical"
                  margin={{ left: 10, right: 10 }}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="value" radius={5}>
                    {ideaStatusData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
            <CardDescription>
              Estimated revenue from active plans.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={revenueChartData}
                    dataKey="revenue"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    label
                  >
                    {revenueChartData.map((_, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={`hsl(var(--chart-${idx + 1}))`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top performing institutions table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Institutions</CardTitle>
          <CardDescription>
            Ranked by total number of ideas submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Institution Name</TableHead>
                <TableHead>Ideas Submitted</TableHead>
                <TableHead>Approval Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collegePerformance.map((college, index) => (
                <TableRow key={college.name}>
                  <TableCell className="font-bold">{index + 1}</TableCell>
                  <TableCell>{college.name}</TableCell>
                  <TableCell>{college.ideas}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {/* {college?.approvalRate?.toFixed(1)}% */}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
