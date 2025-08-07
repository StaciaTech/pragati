"use client";

import * as React from "react";
import { Logo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "@/components/login-form";

// console.log(process.env.NEXT_PUBLIC_API_URL);

export default function LoginPage() {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    fetch(
      "https://lottie.host/e2d44934-22b6-4a4b-9721-255269781378/Hhxk83DViI.json"
    )
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

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
      <div className="relative hidden h-full flex-col bg-primary/10 p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        {animationData && (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className="absolute inset-0 w-full h-full"
          />
        )}
        <div className="relative z-10 m-auto flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold">Catalyze Innovation</h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-md text-balance">
            Transform your groundbreaking ideas into viable solutions with our
            AI-powered validation engine.
          </p>
        </div>
      </div>
    </main>
  );
}
