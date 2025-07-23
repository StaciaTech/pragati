
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { BrainCircuit, Lightbulb, Users, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';

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
      <div className="relative hidden h-full flex-col bg-primary p-10 text-primary-foreground dark:border-r lg:flex overflow-hidden">
        <Carousel
            plugins={[
                Autoplay({
                  delay: 4000,
                }),
            ]}
            opts={{
                loop: true,
            }}
            className="w-full max-w-md mx-auto h-full flex flex-col justify-center"
        >
          <CarouselContent>
            <CarouselItem>
                <div className="text-center space-y-4">
                    <Image src="https://placehold.co/600x400.png" alt="AI Validation" width={600} height={400} className="rounded-lg object-cover mx-auto" data-ai-hint="innovation abstract" />
                    <div className="flex items-center justify-center gap-2 text-lg font-medium text-primary-foreground">
                        <BrainCircuit className="h-7 w-7" />
                        <span>AI-Powered Validation</span>
                    </div>
                    <p className="text-primary-foreground/80">
                        Leverage advanced AI to get instant, data-driven feedback on your innovative ideas.
                    </p>
                </div>
            </CarouselItem>
             <CarouselItem>
                <div className="text-center space-y-4">
                    <Image src="https://placehold.co/600x400.png" alt="Data Analytics" width={600} height={400} className="rounded-lg object-cover mx-auto" data-ai-hint="data abstract" />
                     <div className="flex items-center justify-center gap-2 text-lg font-medium text-primary-foreground">
                        <BarChart className="h-7 w-7" />
                        <span>Insightful Analytics</span>
                    </div>
                    <p className="text-primary-foreground/80">
                        Track your progress and understand your strengths with our comprehensive analytics dashboards.
                    </p>
                </div>
            </CarouselItem>
             <CarouselItem>
                <div className="text-center space-y-4">
                    <Image src="https://placehold.co/600x400.png" alt="Collaboration" width={600} height={400} className="rounded-lg object-cover mx-auto" data-ai-hint="collaboration abstract" />
                     <div className="flex items-center justify-center gap-2 text-lg font-medium text-primary-foreground">
                        <Users className="h-7 w-7" />
                        <span>Expert Collaboration</span>
                    </div>
                    <p className="text-primary-foreground/80">
                        Connect with mentors and coordinators to refine your ideas and guide them to success.
                    </p>
                </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
       </div>
    </main>
  );
}
