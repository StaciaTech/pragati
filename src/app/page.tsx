
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';

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
      <div className="relative hidden h-full flex-col items-center justify-center p-10 text-white dark:border-r lg:flex overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-br from-[#FF00CC] to-[#333399] opacity-30 blur-3xl filter" />
        <div className="absolute -bottom-1/4 -right-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-tl from-[#F472B6] to-[#06B6D4] opacity-20 blur-3xl filter" />
        
        <div className="relative z-10 m-auto flex flex-col items-center text-center backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-lg">
           <h2 className="text-4xl font-bold">
            Catalyze Innovation
           </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-md text-balance">
                Transform your groundbreaking ideas into viable solutions with our AI-powered validation engine.
            </p>
        </div>
      </div>
    </main>
  );
}
