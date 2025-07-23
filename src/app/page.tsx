
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import Lottie from 'lottie-react';

const LoginForm = dynamic(() => import('@/components/login-form').then(mod => mod.LoginForm), {
  ssr: false,
  loading: () => <p>Loading...</p>
});


export default function LoginPage() {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    fetch('https://lottie.host/81a3f6f3-4638-4221-8782-3d7729f286b2/Y3AImrM1As.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error fetching Lottie animation:', error));
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
             <p className="text-xs text-muted-foreground text-center">© 2024 PragatiAI by Stacia Corp</p>
          </div>
      </div>
      <div className="relative hidden h-full flex-col bg-primary text-primary-foreground dark:border-r lg:flex overflow-hidden">
        {animationData ? (
            <Lottie animationData={animationData} loop={true} autoplay={true} style={{ height: '100%', width: '100%' }} />
        ) : (
            <div className="flex h-full w-full items-center justify-center">
                <p>Loading animation...</p>
            </div>
        )}
       </div>
    </main>
  );
}
