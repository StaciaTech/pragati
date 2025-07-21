import { Home, LayoutGrid, Lightbulb, Settings, Users, Shield, FileText, PlusCircle } from "lucide-react";

export const ROLES = {
  INNOVATOR: "Innovator",
  PRINCIPAL: "College Principal Admin",
  COORDINATOR: "TTC Coordinator",
  SUPER_ADMIN: "Super Admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const NAV_LINKS: Record<
  Role,
  {
    title: string;
    label?: string;
    icon: React.ElementType;
    href: string;
    subItems?: { title: string; href: string, icon: React.ElementType }[];
  }[]
> = {
  [ROLES.INNOVATOR]: [
    {
      title: "Dashboard",
      icon: Home,
      href: `/dashboard?role=${ROLES.INNOVATOR}`,
    },
    {
      title: "My Ideas",
      icon: Lightbulb,
      href: `/dashboard/ideas?role=${ROLES.INNOVATOR}`,
    },
    {
      title: "Submit Idea",
      icon: PlusCircle,
      href: `/dashboard/submit?role=${ROLES.INNOVATOR}`,
    },
    {
      title: "Profile",
      icon: Settings,
      href: `/dashboard/profile?role=${ROLES.INNOVATOR}`,
    },
  ],
  [ROLES.PRINCIPAL]: [
    {
      title: "Dashboard",
      icon: Home,
      href: `/dashboard?role=${ROLES.PRINCIPAL}`,
    },
    {
      title: "All Ideas",
      icon: LayoutGrid,
      href: `/dashboard/ideas/all?role=${ROLES.PRINCIPAL}`,
    },
    {
      title: "Reports",
      icon: FileText,
      href: `/dashboard/reports?role=${ROLES.PRINCIPAL}`,
    },
    {
      title: "Profile",
      icon: Settings,
      href: `/dashboard/profile?role=${ROLES.PRINCIPAL}`,
    },
  ],
  [ROLES.COORDINATOR]: [
    {
      title: "Dashboard",
      icon: Home,
      href: `/dashboard?role=${ROLES.COORDINATOR}`,
    },
    {
      title: "Idea Validation",
      icon: Lightbulb,
      href: `/dashboard/validation?role=${ROLES.COORDINATOR}`,
    },
    {
      title: "Reports",
      icon: FileText,
      href: `/dashboard/reports?role=${ROLES.COORDINATOR}`,
    },
    {
      title: "Profile",
      icon: Settings,
      href: `/dashboard/profile?role=${ROLES.COORDINATOR}`,
    },
  ],
  [ROLES.SUPER_ADMIN]: [
    {
      title: "Dashboard",
      icon: Home,
      href: `/dashboard?role=${ROLES.SUPER_ADMIN}`,
    },
    {
      title: "User Management",
      icon: Users,
      href: `/dashboard/users?role=${ROLES.SUPER_ADMIN}`,
    },
    {
      title: "System Settings",
      icon: Settings,
      href: `/dashboard/settings?role=${ROLES.SUPER_ADMIN}`,
    },
    {
      title: "Platform Analytics",
      icon: Shield,
      href: `/dashboard/analytics?role=${ROLES.SUPER_ADMIN}`,
    },
  ],
};
