'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MOCK_IDEAS } from '@/lib/mock-data';

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
    approvalRate: data.total > 0 ? ((data.approved / data.total) * 100).toFixed(2) : '0.00',
    totalIdeas: data.total,
  }));

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Total Ideas</TableHead>
                <TableHead>Approval Rate (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domainTrends.map((data) => (
                <TableRow key={data.domain}>
                  <TableCell className="font-medium">{data.domain}</TableCell>
                  <TableCell>{data.totalIdeas}</TableCell>
                  <TableCell>{data.approvalRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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