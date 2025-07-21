'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function IdeasPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Ideas</CardTitle>
        <CardDescription>A place to manage your submitted ideas.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is where the list of your ideas will be displayed.</p>
      </CardContent>
    </Card>
  );
}
