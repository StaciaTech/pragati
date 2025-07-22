
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
import { Logo } from '@/components/icons';
import { ROLES, type Role } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme-toggle';
import { MOCK_INNOVATOR_USER, MOCK_TTCS, MOCK_PRINCIPAL_USERS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';


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
  const [email, setEmail] = React.useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    let userRole: Role | null = null;

    if (email === 'admin@pragati.ai') {
      userRole = ROLES.SUPER_ADMIN;
    } else if (MOCK_PRINCIPAL_USERS.some(p => p.email === email)) {
      userRole = ROLES.PRINCIPAL;
    } else if (MOCK_TTCS.some(t => t.email === email)) {
        userRole = ROLES.COORDINATOR;
    } else if (email === MOCK_INNOVATOR_USER.email) {
        userRole = ROLES.INNOVATOR;
    }

    if (userRole) {
      router.push(getDashboardLink(userRole));
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
      });
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
            <CardDescription>Enter your credentials to access your portal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="user@pragati.ai" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
