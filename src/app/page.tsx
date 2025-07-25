"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Logo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm = dynamic(
  () => import("@/components/login-form").then((mod) => mod.LoginForm),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

// console.log(process.env.NEXT_PUBLIC_API_URL);

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
          <p className="text-xs text-muted-foreground text-center">
            © 2024 PragatiAI by Stacia Corp
          </p>
        </div>
      </div>
      <div className="relative hidden h-full flex-col bg-primary p-10 text-primary-foreground dark:border-r lg:flex overflow-hidden dot-bg ripple-bg">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-wavy-bounce-1"></div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-wavy-bounce-2"></div>
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
                "Our platform leverages advanced AI to provide instant,
                data-driven feedback on your innovative ideas, helping you
                refine and succeed faster than ever before."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
