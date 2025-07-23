

'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { NAV_LINKS, ROLES, type Role } from '@/lib/constants';
import { MOCK_INNOVATOR_USER, MOCK_TTCS, MOCK_COLLEGES } from '@/lib/mock-data';
import { CreditCard, LogOut } from 'lucide-react';
import { Notifications } from '@/components/notifications';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') as Role) || ROLES.INNOVATOR;

  const navLinks = NAV_LINKS[role] || [];
  
  const getCredits = () => {
    if (role === ROLES.INNOVATOR) {
        return MOCK_INNOVATOR_USER.credits;
    }
    if (role === ROLES.COORDINATOR) {
        const userTTC = MOCK_TTCS[0]; 
        const college = MOCK_COLLEGES.find(c => c.id === userTTC.collegeId);
        return college?.creditsAvailable || 0;
    }
    return null;
  }

  const credits = getCredits();
  
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-7 text-sidebar-foreground" />
            <span className="text-lg font-semibold text-sidebar-foreground">
              PragatiAI
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === new URL(link.href, 'http://a').pathname}
                    tooltip={{ children: link.title }}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Log Out' }}>
                  <Link href="/">
                    <LogOut />
                    <span>Log Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{role} Portal</h1>
          </div>
          <div className="flex items-center gap-4">
             {(role === ROLES.INNOVATOR || role === ROLES.COORDINATOR) && credits !== null && (
                <div className="flex items-center gap-2 text-sm font-medium">
                    <CreditCard className="size-5 text-primary" />
                    <span>{credits} Credits</span>
                </div>
            )}
            <Notifications role={role} />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </Suspense>
    )
}
