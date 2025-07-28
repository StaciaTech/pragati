
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_CONSULTATIONS, STATUS_COLORS, MOCK_IDEAS, MOCK_TTCS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, MessageSquare, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';


type Consultation = (typeof MOCK_CONSULTATIONS)[0];

export default function ConsultationsPage() {
  const [consultations, setConsultations] = React.useState(MOCK_CONSULTATIONS);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = React.useState(false);
  const [selectedConsultation, setSelectedConsultation] = React.useState<Consultation | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const { toast } = useToast();
  
  const myIdeas = MOCK_IDEAS.filter(idea => idea.innovatorName === 'Jane Doe');

  const handleViewDetails = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  }
  
  const handleRequestSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
        title: "Request Submitted",
        description: "Your consultation request has been sent to the TTC Coordinator.",
    });
    setIsRequestModalOpen(false);
  };

  const totalConsultations = consultations.length;
  const completedConsultations = consultations.filter(c => c.status === 'Completed').length;
  const scheduledConsultations = consultations.filter(c => c.status === 'Scheduled').length;


  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Consultations</h2>
                <p className="text-muted-foreground">Manage and request consultations with mentors.</p>
            </div>
             <Button onClick={() => setIsRequestModalOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Request Consultation
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalConsultations}</div>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completedConsultations}</div>
                </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{scheduledConsultations}</div>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>My Consultations</CardTitle>
            <CardDescription>A list of your scheduled and past consultations.</CardDescription>
            </CardHeader>
            <CardContent>
            {consultations.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">You have no scheduled consultations.</p>
                     <Button className="mt-4" onClick={() => setIsRequestModalOpen(true)}>Request Your First Consultation</Button>
                </div>
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
                    <TableRow key={consultation.id} className="cursor-pointer" onClick={() => handleViewDetails(consultation)}>
                        <TableCell className="font-medium">
                        {consultation.title}
                        </TableCell>
                        <TableCell>{consultation.date} at {consultation.time}</TableCell>
                        <TableCell>{consultation.mentor}</TableCell>
                        <TableCell>
                        <Badge className={STATUS_COLORS[consultation.status]}>{consultation.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="link" size="sm" onClick={(e) => { e.stopPropagation(); handleViewDetails(consultation); }}>View Details</Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            )}
            </CardContent>
        </Card>
      </div>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{selectedConsultation?.title}</DialogTitle>
                <DialogDescription>
                    Scheduled for {selectedConsultation?.date} at {selectedConsultation?.time} with {selectedConsultation?.mentor}.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="space-y-4 py-4">
                <div>
                    <h4 className="font-semibold text-sm">Milestones</h4>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mt-2">
                        {selectedConsultation?.milestones.map((milestone, i) => (
                            <li key={i}>{milestone}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-sm">Shared Files</h4>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mt-2">
                        {selectedConsultation?.files.map((file, i) => (
                             <li key={i}><a href="#" className="text-primary hover:underline">{file}</a></li>
                        ))}
                    </ul>
                </div>
                 {selectedConsultation?.status === 'Scheduled' && (
                    <div className="pt-4">
                       <Button className="w-full">Join Meeting</Button>
                    </div>
                 )}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>

       <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Request a New Consultation</DialogTitle>
                <DialogDescription>
                    Fill out the details below to request a meeting with a mentor.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRequestSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="idea">Idea to Discuss</Label>
                         <Select required>
                            <SelectTrigger id="idea"><SelectValue placeholder="Select an idea" /></SelectTrigger>
                            <SelectContent>
                                {myIdeas.map(idea => (
                                    <SelectItem key={idea.id} value={idea.id}>{idea.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="mentor">Preferred Mentor</Label>
                         <Select required>
                            <SelectTrigger id="mentor"><SelectValue placeholder="Select a mentor" /></SelectTrigger>
                            <SelectContent>
                                {MOCK_TTCS.map(ttc => (
                                    <SelectItem key={ttc.id} value={ttc.id}>{ttc.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !selectedDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="questions">Questions / Topics</Label>
                        <Textarea id="questions" placeholder="What would you like to discuss? e.g., 'Market entry strategy', 'Technical feasibility concerns'." required />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                    <Button type="submit">Submit Request</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
