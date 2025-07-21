'use client';

import Link from 'next/link';
import { Building, Lightbulb, Shield, Users, Briefcase } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/icons';
import { ROLES } from '@/lib/constants';

const roleIcons = {
  [ROLES.INNOVATOR]: Lightbulb,
  [ROLES.PRINCIPAL]: Building,
  [ROLES.COORDINATOR]: Users,
  [ROLES.SUPER_ADMIN]: Shield,
};

const roleDescriptions = {
  [ROLES.INNOVATOR]: 'Submit and track your innovative ideas.',
  [ROLES.PRINCIPAL]: 'Oversee and manage ideas from your institution.',
  [ROLES.COORDINATOR]: 'Coordinate validation and support for new ideas.',
  [ROLES.SUPER_ADMIN]: 'Manage the platform, users, and system settings.',
};

const getDashboardLink = (role: string) => {
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
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
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

      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-center text-xl font-semibold text-foreground">
          Choose Your Role
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(ROLES).map((role) => {
            const Icon = roleIcons[role];
            return (
              <Link href={getDashboardLink(role)} key={role} passHref>
                <Card className="h-full transform-gpu cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:bg-card/95">
                  <CardHeader className="items-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-lg font-semibold">{role}</CardTitle>
                    <CardDescription className="mt-1">
                      {roleDescriptions[role]}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
