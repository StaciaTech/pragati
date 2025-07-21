'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart, LineChart, TrendingUp, Users, Lightbulb, CheckCircle } from 'lucide-react';
import {
  Bar,
  CartesianGrid,
  Cell,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ROLES, type Role } from '@/lib/constants';

const kpiData = {
  [ROLES.INNOVATOR]: [
    { title: 'My Ideas', value: '12', icon: Lightbulb, change: '+2 this month' },
    { title: 'Approved', value: '3', icon: CheckCircle, change: '+1 this month' },
    { title: 'Avg. Score', value: '8.2', icon: TrendingUp, change: '+0.5' },
    { title: 'Pending Review', value: '4', icon: Users, change: '' },
  ],
  [ROLES.PRINCIPAL]: [
    { title: 'Total Ideas', value: '152', icon: Lightbulb, change: '+20 this month' },
    { title: 'Pending Validation', value: '34', icon: Users, change: '-5 from last week' },
    { title: 'Approved Ideas', value: '48', icon: CheckCircle, change: '+10 this month' },
    { title: 'Top Innovation Score', value: '9.8', icon: TrendingUp, change: 'New high' },
  ],
  [ROLES.COORDINATOR]: [
    { title: 'Ideas to Validate', value: '25', icon: Lightbulb, change: '+5 new this week' },
    { title: 'Validators Available', value: '15', icon: Users, change: '+2 new' },
    { title: 'Avg. Validation Time', value: '7 days', icon: TrendingUp, change: '-1 day' },
    { title: 'Completed Validations', value: '88', icon: CheckCircle, change: '+12 this week' },
  ],
  [ROLES.SUPER_ADMIN]: [
    { title: 'Total Users', value: '2,350', icon: Users, change: '+120 this month' },
    { title: 'Total Ideas', value: '5,820', icon: Lightbulb, change: '+500 this month' },
    { title: 'Active Institutions', value: '45', icon: CheckCircle, change: '+3' },
    { title: 'Platform Health', value: '99.9%', icon: TrendingUp, change: 'Stable' },
  ],
};

const chartData = [
  { name: 'Jan', total: 120 },
  { name: 'Feb', total: 210 },
  { name: 'Mar', total: 150 },
  { name: 'Apr', total: 280 },
  { name: 'May', total: 180 },
  { name: 'Jun', total: 230 },
  { name: 'Jul', total: 340 },
  { name: 'Aug', total: 290 },
  { name: 'Sep', total: 310 },
  { name: 'Oct', total: 250 },
  { name: 'Nov', total: 380 },
  { name: 'Dec', total: 410 },
];

const recentIdeas = [
  { id: 1, title: 'AI-Powered Personalized Learning Paths', status: 'Approved', score: 9.2 },
  { id: 2, title: 'VR Campus Tours for Prospective Students', status: 'Pending', score: 8.5 },
  { id: 3, title: 'Gamified Coding Challenges Platform', status: 'Rejected', score: 6.8 },
  { id: 4, title: 'Blockchain for Secure Academic Records', status: 'Validating', score: 9.5 },
  { id: 5, title: 'Student Mental Health Support Chatbot', status: 'Approved', score: 8.9 },
];

const statusColors: { [key: string]: string } = {
  Approved: 'bg-green-500/20 text-green-700 border-green-500/30 dark:text-green-400',
  Pending: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30 dark:text-yellow-400',
  Rejected: 'bg-red-500/20 text-red-700 border-red-500/30 dark:text-red-400',
  Validating: 'bg-blue-500/20 text-blue-700 border-blue-500/30 dark:text-blue-400',
};


function DashboardPageContent() {
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;
  const kpis = kpiData[role] || kpiData[ROLES.INNOVATOR];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="transform-gpu transition-all duration-300 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Idea Submission Trends</CardTitle>
            <CardDescription>A look at the number of ideas submitted over the past year.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Idea Submissions</CardTitle>
            <CardDescription>The latest ideas submitted for review.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentIdeas.map((idea) => (
                  <TableRow key={idea.id}>
                    <TableCell className="font-medium truncate max-w-40">{idea.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[idea.status]}>
                        {idea.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{idea.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardPageContent />
        </Suspense>
    );
}

