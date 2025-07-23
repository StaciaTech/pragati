
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { BrainCircuit } from 'lucide-react';

const LoginForm = dynamic(() => import('@/components/login-form').then(mod => mod.LoginForm), {
  ssr: false,
  loading: () => <p>Loading...</p>
});


export default function LoginPage() {
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
             <LoginForm />
             <p className="text-xs text-muted-foreground text-center">© 2024 PragatiAI by Stacia Corp</p>
          </div>
      </div>
      <div className="relative hidden h-full flex-col bg-primary p-10 text-primary-foreground dark:border-r lg:flex overflow-hidden dot-bg">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary-foreground/10 blur-2xl animate-wavy-bounce-1"></div>
            <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-primary-foreground/10 blur-2xl animate-wavy-bounce-2 animation-delay-4000"></div>
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center items-center text-center">
             <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-center gap-2 text-xl font-medium text-primary-foreground p-4 bg-primary/50 rounded-lg backdrop-blur-sm">
                    <BrainCircuit className="h-8 w-8" />
                    <span>AI-Powered Validation</span>
                </div>
                <p className="text-primary-foreground/80 text-balance">
                    Leverage advanced AI to get instant, data-driven feedback on your innovative ideas. Our platform analyzes your concept against multiple viability parameters to give you a clear path forward.
                </p>
            </div>
        </div>
       </div>
    </main>
  );
}
