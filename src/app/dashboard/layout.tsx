

'use client';

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
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { NAV_LINKS, ROLES, type Role } from '@/lib/constants';
import { MOCK_INNOVATOR_USER, MOCK_TTCS, MOCK_COLLEGES } from '@/lib/mock-data';
import { CreditCard, LogOut } from 'lucide-react';
import { Notifications } from '@/components/notifications';
import { Suspense } from 'react';
import { HydrationSafeContent } from '@/components/hydration-safe-content';


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
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon" className="group/sidebar">
          <SidebarHeader>
          <Link
            href={`/dashboard?role=${role}`}
            // 1. Remove fixed gap-2. We'll control gap with ml on span.
            // 2. Adjust justify classes for smooth transition
            className="flex h-23 items-center rounded-md p-2 
                       transition-all duration-300 ease-in-out
                       group-data-[state=collapsed]/sidebar:justify-center
                       group-data-[state=expanded]/sidebar:justify-start" // Ensure left-justified when expanded
          >
            <Logo
            className="h-8 w-8  transition-transform duration-300 ease-in-out
                      group-data-[state=collapsed]/sidebar:scale-125 /* Adjust scale factor as needed */
                      group-data-[state=expanded]/sidebar:scale-150" /* Default scale */
            />
            <span
              className="
                flex-1 overflow-hidden whitespace-nowrap text-lg font-semibold text-sidebar-foreground
                transition-all duration-300 ease-in-out
                group-data-[state=collapsed]/sidebar:w-0
                group-data-[state=collapsed]/sidebar:ml-0
                group-data-[state=collapsed]/sidebar:opacity-0
                group-data-[state=collapsed]/sidebar:invisible
                group-data-[state=expanded]/sidebar:w-auto
                group-data-[state=expanded]/sidebar:ml-4 {/* Adjust this gap as desired for expanded state */}
                group-data-[state=expanded]/sidebar:opacity-100
                group-data-[state=expanded]/sidebar:visible
              "
            >
              PragatiAI
            </span>
          </Link>

          {/* ADD THE SEPARATOR HERE */}
          <div className="flex w-full justify-end pr-32"> {/* Container to push separator right and add right margin */}
            <SidebarSeparator className="w-20" /> {/* Set separator width */}
          </div>
          {/* Add some vertical margin below the separator if needed */}
          <div className="mb-0"></div> {/* Optional: Add space below the separator */}

          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
            {navLinks.map((link) => (
            <SidebarMenuItem key={link.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === new URL(link.href, 'http://a').pathname}
              >
                <Link href={link.href}>
                  {/* Apply scaling classes to the icon's wrapper div */}
                  <div className="w-10 flex justify-center items-center shrink-0 
                                  transition-all duration-300 ease-in-out
                                  group-data-[state=collapsed]/sidebar:scale-100 /* Scale icon when collapsed */
                                  group-data-[state=expanded]/sidebar:scale-110"> {/* Reset scale when expanded */}
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span
                    className="
                      flex-1 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out
                      group-data-[state=collapsed]/sidebar:w-0
                      group-data-[state=collapsed]/sidebar:ml-0
                      group-data-[state=collapsed]/sidebar:opacity-0
                      group-data-[state=collapsed]/sidebar:invisible
                      group-data-[state=expanded]/sidebar:w-auto
                      group-data-[state=expanded]/sidebar:ml-1
                      group-data-[state=expanded]/sidebar:opacity-100
                      group-data-[state=expanded]/sidebar:visible
                    "
                  >
                    {link.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/" className="flex items-center gap-3 min-w-0">
                  {/* Apply scaling classes to the icon's wrapper div */}
                  <div className="w-5 shrink-0 flex items-center justify-center 
                                  transition-all duration-200 ease-in-out
                                  group-data-[state=collapsed]/sidebar:scale-100 /* Scale icon when collapsed */
                                  group-data-[state=expanded]/sidebar:scale-110"> {/* Reset scale when expanded */}
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span
                    className="
                      flex-1 overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out
                      group-data-[state=collapsed]/sidebar:w-0
                      group-data-[state=collapsed]/sidebar:ml-0
                      group-data-[state=collapsed]/sidebar:opacity-0
                      group-data-[state=collapsed]/sidebar:invisible
                      group-data-[state=expanded]/sidebar:w-auto
                      group-data-[state=expanded]/sidebar:ml-1
                      group-data-[state=expanded]/sidebar:opacity-100
                      group-data-[state=expanded]/sidebar:visible
                    "
                  >
                    Log Out
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-40 flex h-4 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
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
          <main className="flex-1 overflow-y-auto px-4 py-6">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  );
}


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HydrationSafeContent>
                <DashboardLayoutContent>{children}</DashboardLayoutContent>
            </HydrationSafeContent>
        </Suspense>
    )
}
