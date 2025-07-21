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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MOCK_CONSULTATIONS, MOCK_IDEAS, STATUS_COLORS } from '@/lib/mock-data';
import { PlusCircle } from 'lucide-react';

export default function ConsultationsPage() {
  const [consultations, setConsultations] = React.useState(MOCK_CONSULTATIONS);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = React.useState(false);

  const handleBookingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newConsultation = {
        id: `CONS-${String(consultations.length + 1).padStart(3, '0')}`,
        ideaId: formData.get('ideaId') as string,
        title: MOCK_IDEAS.find(i => i.id === formData.get('ideaId'))?.title || 'New Consultation',
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        mentor: 'Assigned Soon',
        status: 'Pending',
        milestones: [],
        files: [],
    };
    setConsultations(prev => [...prev, newConsultation]);
    setIsBookingDialogOpen(false);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold">Consultations</h2>
            <p className="text-muted-foreground">Book and manage your consultations with mentors.</p>
        </div>
        <Button onClick={() => setIsBookingDialogOpen(true)}>
            <PlusCircle className="mr-2" />
            Book New Consultation
        </Button>
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
                      {MOCK_IDEAS.find(i => i.id === consultation.ideaId)?.title || 'N/A'}
                    </TableCell>
                    <TableCell>{consultation.date} at {consultation.time}</TableCell>
                    <TableCell>{consultation.mentor}</TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[consultation.status]}>{consultation.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="link" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book New Consultation</DialogTitle>
            <DialogDescription>
              Select an idea and a suitable time to book a new consultation.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="ideaId">Select Idea</label>
                <Select name="ideaId" required>
                  <SelectTrigger><SelectValue placeholder="Select an idea..." /></SelectTrigger>
                  <SelectContent>
                    {MOCK_IDEAS.map(idea => (
                        <SelectItem key={idea.id} value={idea.id}>{idea.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="date">Date</label>
                    <Input id="date" name="date" type="date" required/>
                </div>
                <div className="space-y-2">
                    <label htmlFor="time">Time</label>
                    <Input id="time" name="time" type="time" required/>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="purpose">Purpose</label>
                <Textarea id="purpose" name="purpose" placeholder="Briefly describe the purpose of the consultation." required />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Book Consultation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
