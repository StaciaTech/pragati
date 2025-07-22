
'use client';

import * as React from 'react';
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
import { ArrowRight, BrainCircuit, Zap } from 'lucide-react';


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
  const [password, setPassword] = React.useState('');
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
    } else if (MOCK_INNOVATOR_USER.email.toLowerCase() === email.toLowerCase()) {
        userRole = ROLES.INNOVATOR;
    }

    if (userRole) {
      toast({
        title: "Login Successful",
        description: `Welcome! Redirecting to the ${userRole} dashboard.`,
      });
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
    <main className="flex min-h-screen w-full items-center justify-center bg-background lg:grid lg:grid-cols-2">
       <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
        </div>
      <div className="flex items-center justify-center p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center text-center">
              <Logo className="mb-4 h-12 w-12 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">
                Welcome to PragatiAI
              </h1>
              <p className="mt-2 text-muted-foreground text-balance">
                Fostering the next generation of innovation in education.
              </p>
            </div>
             <Card className="w-full">
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
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    <span>Login</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
             <p className="text-xs text-muted-foreground text-center">© 2024 PragatiAI by Stacia Corp</p>
          </div>
      </div>
      <div className="relative hidden h-full flex-col bg-primary p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-primary" />
          <div className="dot-bg absolute inset-0 animate-move-dots" />
           <div className="relative z-20 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2 text-lg font-medium text-primary-foreground">
                    <BrainCircuit className="h-7 w-7" />
                    <span>Innovation at Lightspeed</span>
                </div>
                <Card className="bg-background/80 text-foreground backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>AI-Powered Validation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            "Our platform leverages advanced AI to provide instant, data-driven feedback on your innovative ideas, helping you refine and succeed faster than ever before."
                        </p>
                    </CardContent>
                </Card>
            </div>
       </div>
    </main>
  );
}
