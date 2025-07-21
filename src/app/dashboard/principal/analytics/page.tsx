'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MOCK_IDEAS, MOCK_TTCS } from '@/lib/mock-data';

export default function CollegeAnalyticsPage() {
    const totalIdeas = MOCK_IDEAS.length;
    const approvedIdeas = MOCK_IDEAS.filter(i => i.status === 'Approved').length;
    const approvalRate = totalIdeas > 0 ? ((approvedIdeas / totalIdeas) * 100).toFixed(1) : 0;

    const domainSubmissions = MOCK_IDEAS.reduce((acc, idea) => {
        acc[idea.domain] = (acc[idea.domain] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

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
          <ul className="space-y-2">
            {Object.entries(domainSubmissions).map(([domain, count]) => (
              <li key={domain} className="flex justify-between items-center bg-muted p-3 rounded-lg">
                <span className="text-muted-foreground">{domain}</span>
                <span className="font-bold">{count} Ideas</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}