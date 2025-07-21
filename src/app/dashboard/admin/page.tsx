'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Super Admin Dashboard</CardTitle>
        <CardDescription>Welcome to the Super Admin Portal.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This page is under construction. Global statistics and system health will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
