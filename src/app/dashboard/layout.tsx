"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
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
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS, ROLES, type Role } from "@/lib/constants";
import {
  MOCK_INNOVATOR_USER,
  MOCK_TTCS,
  MOCK_COLLEGES,
  MOCK_CONSULTATIONS,
} from "@/lib/mock-data";
import { CreditCard, LogOut, CalendarDays, LifeBuoy } from "lucide-react";
import { Notifications } from "@/components/notifications";
import { Suspense, useEffect } from "react";
import { HydrationSafeContent } from "@/components/hydration-safe-content";
import { UniversalSearch } from "@/components/universal-search";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { UserNav } from "@/components/user-nav";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUserProfile } from "@/hooks/useUserProfile";

/* ---------- HELPERS ---------- */
const getCredits = (role: Role) => {
  if (role === ROLES.INNOVATOR) return MOCK_INNOVATOR_USER.credits;
  if (role === ROLES.COORDINATOR) {
    const userTTC = MOCK_TTCS[0];
    const college = MOCK_COLLEGES.find((c) => c.id === userTTC.collegeId);
    return college?.creditsAvailable ?? 0;
  }
  return null;
};

const getCreditRequestLink = (role: Role) => {
  if (role === ROLES.INNOVATOR)
    return `/dashboard/request-credits?role=${role}`;
  if (role === ROLES.COORDINATOR)
    return `/dashboard/coordinator/logs?role=${role}`;
  return "#";
};

/* ---------- CONTENT ---------- */
function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = (searchParams.get("role") as Role) || ROLES.INNOVATOR;
  const { data: userData, isLoading, error: userError } = useUserProfile();

  /* guard */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const urlRole = searchParams.get("role");
      if (urlRole && payload.role !== urlRole) router.replace("/");
    } catch {
      localStorage.removeItem("token");
      router.replace("/");
    }
  }, [searchParams, router]);

  const navLinks = NAV_LINKS[role] || [];
  const credits = getCredits(role);
  const upcomingConsultations = MOCK_CONSULTATIONS.filter(
    (c) => c.status === "Scheduled"
  ).length;

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon" className="group/sidebar">
        {/* Header */}
        <SidebarHeader>
          <Link
            href={`/dashboard?role=${role}`}
            className="flex h-16 items-center rounded-md p-2 transition-all duration-300
                       group-data-[state=collapsed]/sidebar:justify-center
                       group-data-[state=expanded]/sidebar:justify-start"
          >
            <Logo className="h-10 w-8 transition-transform duration-300 group-data-[state=collapsed]/sidebar:scale-125" />
            <span className="ml-4 truncate text-lg font-semibold text-sidebar-foreground transition-all duration-300 group-data-[state=collapsed]/sidebar:w-0 group-data-[state=collapsed]/sidebar:opacity-0">
              PragatiAI
            </span>
          </Link>
          <SidebarSeparator className="w-[calc(100%-1rem)] mx-auto" />
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === new URL(link.href, "http://a").pathname
                  }
                >
                  <Link href={link.href}>
                    <div className="w-10 flex justify-center items-center shrink-0">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="ml-2 truncate transition-all duration-300 group-data-[state=collapsed]/sidebar:w-0 group-data-[state=collapsed]/sidebar:opacity-0">
                      {link.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <SidebarSeparator className="mb-2" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={`/dashboard/support?role=${role}`}
                  className="flex items-center gap-3"
                >
                  <LifeBuoy className="w-5 h-5" />
                  <span
                    className="transition-all duration-300 group-data-[state=collapsed]/sidebar:w-0
                               group-data-[state=collapsed]/sidebar:opacity-0"
                  >
                    Support
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/" className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span
                    className="transition-all duration-300 group-data-[state=collapsed]/sidebar:w-0
                               group-data-[state=collapsed]/sidebar:opacity-0"
                  >
                    Log Out
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main */}
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <div className="hidden md:block text-lg font-semibold">
            {role} Portal
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 sm:gap-4">
            <UniversalSearch role={role} />
            {(role === ROLES.INNOVATOR || role === ROLES.COORDINATOR) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      className="text-white bg-gradient-to-r from-purple-500 to-indigo-500"
                    >
                      <Link href={getCreditRequestLink(role)}>
                        <CreditCard className="w-5 h-5" />
                        {userData?.creditQuota !== null && (
                          <span className="ml-2 hidden sm:inline">
                            {userData?.creditQuota} Credits
                          </span>
                        )}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {role === ROLES.INNOVATOR
                        ? "Request More Credits"
                        : "View Available Credits"}
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/consultations?role=${role}`}>
                        <CalendarDays className="w-5 h-5" />
                        {upcomingConsultations > 0 && (
                          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                          </span>
                        )}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Consultations</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <Notifications role={role} />
            <ThemeToggle />
            <UserNav />
          </div>
        </header>

        <div className="h-[2px] ml-4 w-[calc(100%-2rem)] bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-[length:200%_auto] animate-background-pan" />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <Breadcrumbs />
          <div className="mt-4">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

/* ---------- PAGE WRAPPER ---------- */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">Loading…</div>
      }
    >
      <ReactQueryProvider>
        <ProtectedRoute>
          <HydrationSafeContent>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
          </HydrationSafeContent>
        </ProtectedRoute>
      </ReactQueryProvider>
    </Suspense>
  );
}
