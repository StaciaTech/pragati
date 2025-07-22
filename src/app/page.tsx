
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
    <main className="flex min-h-screen w-full">
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative">
          <div className="absolute top-4 right-4 z-10">
            <ThemeToggle />
          </div>
          <div className="max-w-md w-full">
            <div className="flex flex-col items-center text-center mb-8">
              <Logo className="mb-4 h-16 w-16 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Welcome to PragatiAI
              </h1>
              <p className="mt-3 text-lg text-muted-foreground text-balance">
                Fostering the next generation of innovation in education.
              </p>
            </div>
             <Card className="w-full shadow-lg">
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
          </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5 p-8 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background/50 dark:bg-background/80 bg-[radial-gradient(hsla(220,73%,63%,0.1)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          <div className="relative w-full max-w-md">
            <Card className="bg-background/80 backdrop-blur-lg shadow-2xl">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-lg text-primary-foreground">
                            <Zap className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl">Innovation at Lightspeed</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                       Our platform uses an advanced AI engine to provide comprehensive, data-driven feedback on your innovative ideas, helping you refine your concepts and accelerate your journey from idea to impact.
                    </p>
                </CardContent>
                 <CardFooter>
                    <p className="text-xs text-muted-foreground">© 2024 PragatiAI by Stacia Corp</p>
                 </CardFooter>
            </Card>
          </div>
      </div>
    </main>
  );
}
