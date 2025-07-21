'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_TTCS } from '@/lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function TTCManagementPage() {
    const { toast } = useToast();
    const [ttcs, setTtcs] = React.useState(MOCK_TTCS);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState<'add' | 'edit'>('add');
    const [currentTtc, setCurrentTtc] = React.useState<(typeof ttcs)[0] | null>(null);

    const handleOpenModal = (type: 'add' | 'edit', ttc?: (typeof ttcs)[0]) => {
        setModalType(type);
        setCurrentTtc(ttc || null);
        setIsModalOpen(true);
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        toast({
            title: `TTC ${modalType === 'add' ? 'Added' : 'Updated'}`,
            description: `${name} has been successfully saved.`,
        });
        setIsModalOpen(false);
    }
    
    const handleToggleStatus = (id: string) => {
        setTtcs(prev => prev.map(ttc => ttc.id === id ? {...ttc, status: ttc.status === 'Active' ? 'Inactive' : 'Active'} as any : ttc));
        toast({ title: "Status Updated", description: "TTC status has been toggled."});
    }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>TTC Management</CardTitle>
                <CardDescription>Add, edit, and manage TTCs for your college.</CardDescription>
            </div>
            <Button onClick={() => handleOpenModal('add')}>Add New TTC</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ttcs.map((ttc) => (
                <TableRow key={ttc.id}>
                  <TableCell>{ttc.id}</TableCell>
                  <TableCell className="font-medium">{ttc.name}</TableCell>
                  <TableCell>{ttc.email}</TableCell>
                  <TableCell>{ttc.expertise.join(', ')}</TableCell>
                  <TableCell>
                    <Badge variant={ttc.status === 'Active' ? 'default' : 'destructive'}>
                        {ttc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenModal('edit', ttc)}>Edit</Button>
                     <Button 
                        variant={ttc.status === 'Active' ? 'destructive' : 'default'} 
                        size="sm" 
                        onClick={() => handleToggleStatus(ttc.id)}
                    >
                      {ttc.status === 'Active' ? 'Deactivate' : 'Activate'}
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
                <DialogTitle>{modalType === 'add' ? 'Add New TTC' : 'Edit TTC'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave}>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">TTC Name</Label>
                        <Input id="name" name="name" defaultValue={currentTtc?.name} required/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={currentTtc?.email} required/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                        <Input id="expertise" name="expertise" defaultValue={currentTtc?.expertise.join(', ')} required/>
                    </div>
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