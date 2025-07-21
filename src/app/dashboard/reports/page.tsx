'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MOCK_IDEAS } from '@/lib/mock-data';

export default function ReportsPage() {
    const { toast } = useToast();

    const handleGenerateReport = (type: string) => {
        toast({
            title: "Generating Report",
            description: `A ${type} report is being generated and will be available for download shortly.`,
        });
    };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>Generate and view custom reports based on your role and data.</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Standard Reports</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="font-medium">All Ideas Summary</p>
                    <p className="text-sm text-muted-foreground">A CSV export of all submitted ideas.</p>
                </div>
                <Button onClick={() => handleGenerateReport('All Ideas')}>Generate</Button>
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="font-medium">Consultation History</p>
                    <p className="text-sm text-muted-foreground">A PDF report of all consultations.</p>
                </div>
                <Button onClick={() => handleGenerateReport('Consultation History')}>Generate</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}