
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MOCK_INNOVATOR_USER, MOCK_TTCS, MOCK_PRINCIPAL_USERS } from '@/lib/mock-data';
import { ROLES, type Role } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';


export default function ProfilePage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;

  let user: any = {};

  // Mock fetching user data based on role
  switch (role) {
    case ROLES.INNOVATOR:
      user = MOCK_INNOVATOR_USER;
      break;
    case ROLES.COORDINATOR:
      user = MOCK_TTCS[0];
      break;
    case ROLES.PRINCIPAL:
      user = MOCK_PRINCIPAL_USERS[0];
      break;
    case ROLES.SUPER_ADMIN:
      user = { name: 'Super Admin', email: 'admin@pragati.ai', role: 'Super Admin' };
      break;
    default:
      user = { name: 'Guest', email: 'guest@pragati.ai', role: 'Guest' };
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
    });
    setIsModalOpen(false);
  }


  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
              <div>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your profile settings.</CardDescription>
              </div>
              <Button variant="outline" size="icon" onClick={() => setIsModalOpen(true)}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit Profile</span>
              </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p>{user.name}</p>
          </div>
          <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{user.email}</p>
          </div>
           <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <p>{user.role || role}</p>
          </div>
          {user.college && (
              <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">College</p>
                  <p>{user.college}</p>
              </div>
          )}
          {user.credits !== undefined && (
              <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Credits</p>
                  <p>{user.credits}</p>
              </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" defaultValue={user.email} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
