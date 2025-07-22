'use client';

import * as React from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_CONSULTATIONS, STATUS_COLORS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function ConsultationsPage() {
  const [consultations, setConsultations] = React.useState(MOCK_CONSULTATIONS);
  const { toast } = useToast();

  const handleViewDetails = (consultationId: string) => {
    toast({
        title: "Feature In Development",
        description: `Viewing details for consultation ${consultationId} is not yet implemented.`,
    });
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold">Consultations</h2>
            <p className="text-muted-foreground">Manage your consultations with mentors.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Consultations</CardTitle>
          <CardDescription>A list of your scheduled and past consultations.</CardDescription>
        </CardHeader>
        <CardContent>
          {consultations.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">You have no scheduled consultations.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Idea</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell className="font-medium">
                      {consultation.title}
                    </TableCell>
                    <TableCell>{consultation.date} at {consultation.time}</TableCell>
                    <TableCell>{consultation.mentor}</TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[consultation.status]}>{consultation.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="link" size="sm" onClick={() => handleViewDetails(consultation.id)}>View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
