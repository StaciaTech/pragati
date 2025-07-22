
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Logo } from '@/components/icons';
import { ROLES, type Role } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme-toggle';


const getDashboardLink = (role: Role) => {
    switch (role) {
        case ROLES.INNOVATOR:
            return `/dashboard?role=${role}`;
        case ROLES.PRINCIPAL:
            return `/dashboard/principal?role=${role}`;
        case ROLES.COORDINATOR:
            return `/dashboard/coordinator?role=${role}`;
        case ROLES.SUPER_ADMIN:
            return `/dashboard/admin?role=${role}`;
        default:
            return `/dashboard?role=${ROLES.INNOVATOR}`;
    }
}


export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = React.useState<Role | ''>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      router.push(getDashboardLink(role));
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="flex flex-col items-center justify-center text-center">
        <Logo className="mb-4 h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
          Welcome to PragatiAI
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Fostering Innovation in Education
        </p>
      </div>

      <Card className="mt-12 w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Select your role and enter your credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select required value={role} onValueChange={(value) => setRole(value as Role)}>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role..." />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(ROLES).map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="user@pragati.ai" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!role}>Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
