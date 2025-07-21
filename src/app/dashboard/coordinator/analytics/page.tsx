'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MOCK_IDEAS, MOCK_TTCS } from '@/lib/mock-data';

export default function CoordinatorAnalyticsPage() {
  // Mocking analytics for the first TTC in the list
  const userTTC = MOCK_TTCS[0];
  const collegeIdeas = MOCK_IDEAS.filter(idea => idea.collegeId === userTTC.collegeId);

  const ideasValidated = collegeIdeas.filter(idea => idea.status !== 'Validating');
  const approvedIdeas = ideasValidated.filter(idea => idea.status === 'Approved').length;
  const approvalRate = ideasValidated.length > 0 ? ((approvedIdeas / ideasValidated.length) * 100).toFixed(1) : '0';

  const domainSubmissions = collegeIdeas.reduce((acc, idea) => {
    acc[idea.domain] = (acc[idea.domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>TTC Analytics</CardTitle>
          <CardDescription>View performance and idea analytics for your college.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>College Idea Approval Rate</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-5xl font-bold text-green-600">{approvalRate}%</p>
                <p className="text-sm text-muted-foreground mt-2">
                    {approvedIdeas} out of {ideasValidated.length} validated ideas were approved.
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Domain-Wise Submissions</CardTitle>
            </CardHeader>
            <CardContent>
                {Object.keys(domainSubmissions).length > 0 ? (
                    <ul className="space-y-2">
                        {Object.entries(domainSubmissions).map(([domain, count]) => (
                        <li key={domain} className="flex justify-between items-center">
                            <span>{domain}</span>
                            <span className="font-bold">{count} ideas</span>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground">No ideas submitted yet.</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}