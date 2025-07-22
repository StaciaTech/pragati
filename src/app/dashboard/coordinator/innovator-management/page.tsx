'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_INNOVATORS, MOCK_TTCS, MOCK_COLLEGES, STATUS_COLORS } from '@/lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function InnovatorManagementPage() {
    const { toast } = useToast();
    const userTTC = MOCK_TTCS[0]; 
    const college = MOCK_COLLEGES.find(c => c.id === userTTC.collegeId);
    
    const [innovators, setInnovators] = React.useState(MOCK_INNOVATORS);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState<'add' | 'assign'>('add');
    const [currentInnovator, setCurrentInnovator] = React.useState<(typeof innovators)[0] | null>(null);

    const collegeInnovators = innovators.filter(inv => inv.collegeId === userTTC.collegeId);

    const handleOpenModal = (type: 'add' | 'assign', innovator?: (typeof innovators)[0]) => {
        setModalType(type);
        setCurrentInnovator(innovator || null);
        setIsModalOpen(true);
    }
    
    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        if (modalType === 'add') {
             const name = formData.get('name') as string;
             toast({ title: "Innovator Added", description: `${name} has been added.`});
        } else {
             const credits = formData.get('credits') as string;
             toast({ title: "Credits Assigned", description: `${credits} credits assigned to ${currentInnovator?.name}.`});
        }
        setIsModalOpen(false);
    }
    
    const handleToggleStatus = (id: string) => {
        setInnovators(prev => prev.map(inv => inv.id === id ? {...inv, status: inv.status === 'Active' ? 'Inactive' : 'Active'} : inv));
        toast({ title: "Status Updated", description: "Innovator status has been toggled."});
    }

  return (
    <>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Innovator Management</CardTitle>
                    <CardDescription>Add, edit, and manage innovators for {college?.name}.</CardDescription>
                </div>
                <Button onClick={() => handleOpenModal('add')}>Add Innovator</Button>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {collegeInnovators.map((innovator) => (
                    <TableRow key={innovator.id}>
                    <TableCell>{innovator.id}</TableCell>
                    <TableCell className="font-medium">{innovator.name}</TableCell>
                    <TableCell>{innovator.email}</TableCell>
                    <TableCell>{innovator.credits}</TableCell>
                    <TableCell>
                        <Badge className={STATUS_COLORS[innovator.status]}>{innovator.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenModal('assign', innovator)}>Assign Credits</Button>
                         <Button 
                            variant={innovator.status === 'Active' ? 'destructive' : 'default'} 
                            size="sm" 
                            onClick={() => handleToggleStatus(innovator.id)}
                        >
                          {innovator.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
                 <DialogHeader>
                    <DialogTitle>{modalType === 'add' ? 'Add New Innovator' : `Assign Credits to ${currentInnovator?.name}`}</DialogTitle>
                    <DialogDescription>
                        {modalType === 'add' 
                            ? 'Enter the details for the new innovator.' 
                            : `College has ${college?.creditsAvailable} credits available.`}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSave}>
                      <div className="grid gap-4 py-4">
                        {modalType === 'add' ? (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Innovator Name</Label>
                                    <Input id="name" name="name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Innovator Email</Label>
                                    <Input id="email" name="email" type="email" required />
                                </div>
                            </>
                        ) : (
                             <div className="space-y-2">
                                <Label htmlFor="credits">Credits to Assign</Label>
                                <Input id="credits" name="credits" type="number" min="1" max={college?.creditsAvailable} required />
                            </div>
                        )}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">Save</Button>
                      </DialogFooter>
                  </form>
            </DialogContent>
        </Dialog>
    </>
  );
}
