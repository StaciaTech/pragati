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
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_LINKS, ROLES, type Role } from "@/lib/constants";
import { MOCK_INNOVATOR_USER, MOCK_TTCS, MOCK_COLLEGES } from "@/lib/mock-data";
import { CreditCard, LogOut } from "lucide-react";
import { Notifications } from "@/components/notifications";
import { Suspense, useEffect } from "react";
import { HydrationSafeContent } from "@/components/hydration-safe-content";
import ProtectedRoute from "@/components/ProtectedRoute";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const urlRole = searchParams.get("role");

      // Allow only if the role in the URL matches the one in the JWT
      if (urlRole && payload.role !== urlRole) {
        router.replace("/"); // or /403
      }
    } catch {
      localStorage.removeItem("token");
      router.replace("/");
    }
  }, [searchParams, router]);
  const role = (searchParams.get("role") as Role) || ROLES.INNOVATOR;

  const navLinks = NAV_LINKS[role] || [];

  const getCredits = () => {
    if (role === ROLES.INNOVATOR) {
      return MOCK_INNOVATOR_USER.credits;
    }
    if (role === ROLES.COORDINATOR) {
      const userTTC = MOCK_TTCS[0];
      const college = MOCK_COLLEGES.find((c) => c.id === userTTC.collegeId);
      return college?.creditsAvailable || 0;
    }
    return null;
  };

  const credits = getCredits();

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon" className="group/sidebar">
        <SidebarHeader>
          <Link
            href={`/dashboard?role=${role}`}
            className="flex h-8 items-center gap-2 rounded-md p-2 group-data-[state=collapsed]/sidebar:justify-center"
          >
            <Logo className="h-8 w-8 shrink-0" />
            <span className="truncate text-lg font-semibold text-sidebar-foreground transition-opacity duration-200 group-data-[state=collapsed]/sidebar:opacity-0">
              PragatiAI
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    pathname === new URL(link.href, "http://a").pathname
                  }
                  // No additional className here for the Link, let sidebarMenuButtonVariants handle it
                >
                  {/* Remove the className from Link and let sidebarMenuButtonVariants manage it */}
                  <Link href={link.href}>
                    {/* Keep icon wrapper with fixed width for collapsed state, but add transition */}
                    <div className="w-10 flex justify-center items-center shrink-0 transition-all duration-300 ease-in-out">
                      <link.icon className="w-5 h-5" />
                    </div>
                    {/* Text span: key is to control its width/overflow and transition */}
                    <span
                      className="
                        flex-1 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out
                        group-data-[state=collapsed]/sidebar:w-0
                        group-data-[state=collapsed]/sidebar:ml-0
                        group-data-[state=collapsed]/sidebar:opacity-0
                        group-data-[state=collapsed]/sidebar:invisible
                        group-data-[state=expanded]/sidebar:w-auto
                        group-data-[state=expanded]/sidebar:ml-2
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
                  {" "}
                  {/* Re-evaluate `gap-3` */}
                  <div className="w-5 shrink-0 flex items-center justify-center transition-all duration-200 ease-in-out">
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
                        group-data-[state=expanded]/sidebar:ml-2 /* Adjust as needed */
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
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{role} Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            {(role === ROLES.INNOVATOR || role === ROLES.COORDINATOR) &&
              credits !== null && (
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
