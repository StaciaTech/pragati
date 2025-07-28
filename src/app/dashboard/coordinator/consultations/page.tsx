
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_IDEAS, STATUS_COLORS, MOCK_TTCS } from '@/lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';

type Idea = (typeof MOCK_IDEAS)[0];

export default function CoordinatorConsultationsPage() {
  const userTTC = MOCK_TTCS[0];
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = React.useState(false);
  const [selectedIdea, setSelectedIdea] = React.useState<Idea | null>(null);
  const [rescheduleDate, setRescheduleDate] = React.useState<Date | undefined>(undefined);
  const [rescheduleTime, setRescheduleTime] = React.useState('');

  const assignedConsultations = MOCK_IDEAS.filter(idea => idea.ttcAssigned === userTTC.id && idea.consultationStatus !== 'Not Requested');
  
  const filteredConsultations = assignedConsultations.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.innovatorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || idea.consultationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRsvp = (ideaId: string, action: 'Accepted' | 'Declined') => {
    toast({
        title: `Consultation ${action}`,
        description: `The consultation request for idea ${ideaId} has been ${action.toLowerCase()}.`
    });
    // Here you would update the backend.
  }

  const openRescheduleModal = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsRescheduleModalOpen(true);
  }

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: 'Reschedule Suggested',
        description: `A new time has been suggested for the consultation on idea ${selectedIdea?.title}.`
    });
    setIsRescheduleModalOpen(false);
    setRescheduleDate(undefined);
    setRescheduleTime('');
  }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Consultation Management</CardTitle>
        <CardDescription>Manage your assigned consultations with innovators.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input 
            placeholder="Search by Idea Title or Innovator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger><SelectValue placeholder="Filter by Status..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Idea Title</TableHead>
              <TableHead>Innovator</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConsultations.map((idea) => (
              <TableRow key={idea.id}>
                <TableCell className="font-medium">{idea.title}</TableCell>
                <TableCell>{idea.innovatorName}</TableCell>
                <TableCell>{idea.consultationDate ? `${idea.consultationDate} at ${idea.consultationTime}` : 'Pending'}</TableCell>
                <TableCell>
                  <Badge className={STATUS_COLORS[idea.consultationStatus || '']}>
                    {idea.consultationStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {idea.consultationStatus === 'Pending' ? (
                     <div className="flex justify-end gap-2">
                         <AlertDialog>
                            <AlertDialogTrigger asChild><Button size="sm">Accept</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Accept Consultation?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will confirm the consultation time with the innovator.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleRsvp(idea.id, 'Accepted')}>Accept</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                         </AlertDialog>
                         <AlertDialog>
                             <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Decline</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Decline Consultation?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will cancel the consultation request. Are you sure?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleRsvp(idea.id, 'Declined')}>Decline</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                         </AlertDialog>
                        <Button variant="outline" size="sm" onClick={() => openRescheduleModal(idea)}>Reschedule</Button>
                     </div>
                  ) : (
                    <Button variant="link" size="sm">View Details</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
             {filteredConsultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center">No consultations found.</TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <Dialog open={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Reschedule Consultation</DialogTitle>
                <DialogDescription>
                    Propose a new date and time for the consultation on "{selectedIdea?.title}".
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRescheduleSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">New Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !rescheduleDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {rescheduleDate ? format(rescheduleDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={rescheduleDate}
                                    onSelect={setRescheduleDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="time">New Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="time"
                            type="time"
                            value={rescheduleTime}
                            onChange={e => setRescheduleTime(e.target.value)}
                            className="pl-10"
                            required 
                          />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="comment">Comment (Optional)</Label>
                        <Textarea id="comment" placeholder="Add a comment to explain the reason for rescheduling..." />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                    <Button type="submit">Suggest New Time</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    </>
  );
}

    