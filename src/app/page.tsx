
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';

const LoginForm = dynamic(() => import('@/components/login-form').then(mod => mod.LoginForm), {
  ssr: false,
  loading: () => <p>Loading...</p>
});


export default function LoginPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  
  const carouselItems = [
    {
      image: "https://placehold.co/800x600.png",
      hint: "innovation abstract",
      title: "Catalyze Innovation",
      description: "Transform your groundbreaking ideas into viable solutions with our AI-powered validation engine."
    },
    {
      image: "https://placehold.co/800x600.png",
      hint: "data analysis",
      title: "Data-Driven Decisions",
      description: "Receive comprehensive reports and analytics to make informed decisions and refine your strategy."
    },
    {
      image: "https://placehold.co/800x600.png",
      hint: "teamwork collaboration",
      title: "Seamless Collaboration",
      description: "Connect with mentors, coordinators, and stakeholders to guide your innovation journey."
    }
  ]

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
      <div className="relative hidden h-full flex-col bg-primary/10 p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <Carousel
          className="w-full max-w-md mx-auto my-auto"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-transparent border-0 shadow-none text-primary-foreground">
                    <CardHeader>
                      <div className="relative aspect-video w-full">
                         <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill
                            data-ai-hint={item.hint}
                            className="rounded-lg object-cover"
                          />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center text-center space-y-2">
                       <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                       <p className="text-primary-foreground/80 text-balance">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </main>
  );
}
