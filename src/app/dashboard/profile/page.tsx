
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MOCK_INNOVATOR_USER, MOCK_TTCS, MOCK_PRINCIPAL_USERS, MOCK_COLLEGES } from '@/lib/mock-data';
import { ROLES, type Role } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Pencil, Eye, EyeOff, ShieldCheck } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;

  let user: any = {};
  let college: any = {};
  let mockPassword = "password123"; // Mock password for display

  // Mock fetching user data based on role
  switch (role) {
    case ROLES.INNOVATOR:
      user = MOCK_INNOVATOR_USER;
      college = MOCK_COLLEGES.find(c => c.name === user.college);
      break;
    case ROLES.COORDINATOR:
      user = MOCK_TTCS[0];
      college = MOCK_COLLEGES.find(c => c.id === user.collegeId);
      break;
    case ROLES.PRINCIPAL:
      user = MOCK_PRINCIPAL_USERS[0];
      college = MOCK_COLLEGES.find(c => c.id === user.collegeId);
      break;
    case ROLES.SUPER_ADMIN:
      user = { name: 'Super Admin', email: 'admin@pragati.ai', role: 'Super Admin' };
      break;
    default:
      user = { name: 'Guest', email: 'guest@pragati.ai', role: 'Guest' };
  }
  
  const getInitials = (name: string) => {
    return name?.split(' ').map((n) => n[0]).join('') || '';
  };


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
      <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={`https://avatar.vercel.sh/${user.name}.png`} alt={user.name} />
                <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.role || role}</p>
              </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Your personal details.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Full Name</Label>
                                <p className="font-medium">{user.name}</p>
                            </div>
                             <div>
                                <Label>Email Address</Label>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Manage your security settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <Label>Password</Label>
                                <p className="font-mono tracking-wider">************</p>
                            </div>
                            <Button variant="outline" size="sm">Change</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                {college && (
                    <Card>
                        <CardHeader>
                            <CardTitle>College Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             <div>
                                <Label>College Name</Label>
                                <p className="font-medium">{college.name}</p>
                            </div>
                            <div>
                                <Label>Principal Email</Label>
                                <p className="font-medium">{college.principalEmail}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {user.credits !== undefined && (
                     <Card>
                        <CardHeader>
                            <CardTitle>Credits</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-primary">{user.credits}</p>
                                <p className="text-muted-foreground">Credits Available</p>
                            </div>
                            <div>
                               <Label>Usage (This Month)</Label>
                               <Progress value={33} className="mt-2" />
                               <p className="text-xs text-muted-foreground mt-1 text-right">5 / 15 credits used</p>
                            </div>
                           <Button className="w-full">Request More Credits</Button>
                        </CardContent>
                    </Card>
                )}
            </div>
          </div>
      </div>

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
                 <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input id="password" name="password" type={showPassword ? "text" : "password"} defaultValue={mockPassword} />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                        </Button>
                    </div>
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
