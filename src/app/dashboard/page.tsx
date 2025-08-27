"use client";
import React from "react";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  Award,
  Clock,
  MoreVertical,
  Loader2,
  PlusCircle,
  Lightbulb,
  CreditCard,
  BarChart3,
  Star,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROLES, type Role } from "@/lib/constants";
import {
  MOCK_INNOVATOR_USER,
  MOCK_IDEAS,
  STATUS_COLORS,
  MOCK_CONSULTATIONS,
} from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer } from "@/components/ui/chart";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserIdeas } from "@/hooks/useUserIdeas";

/* ----------  TYPES  ---------- */
type Idea = (typeof MOCK_IDEAS)[0];

/* ----------  CONSTANTS  ---------- */
const chartConfig = {
  ideas: {
    label: "Ideas",
    color: "hsl(var(--chart-1))",
  },
  approved: {
    label: "Slay",
    color: "hsl(var(--color-approved))",
  },
  moderate: {
    label: "Mid",
    color: "hsl(var(--color-moderate))",
  },
  rejected: {
    label: "Flop",
    color: "hsl(var(--color-rejected))",
  },
};

const mockHistory = [
  { version: "V1.0", date: "2024-01-15", status: "Slay", score: 88 },
  { version: "V0.9", date: "2024-01-10", status: "Mid", score: 72 },
  { version: "V0.8", date: "2024-01-05", status: "Flop", score: 45 },
];

const quotes = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
  },
];

/* ----------  HELPERS  ---------- */
function getDashboardPath(role: Role) {
  switch (role) {
    case ROLES.INNOVATOR:
      return "/dashboard";
    case ROLES.COORDINATOR:
      return "/dashboard/coordinator";
    case ROLES.PRINCIPAL:
      return "/dashboard/principal";
    case ROLES.SUPER_ADMIN:
      return "/dashboard/admin";
    default:
      return "/dashboard";
  }
}

/* ----------  MAIN CONTENT  ---------- */
function DashboardPageContent() {
  const searchParams = useSearchParams();
  const role = (searchParams.get("role") as Role) || ROLES.INNOVATOR;
  const router = useRouter();
  const { toast } = useToast();
  const { data: ideas, isLoading: ideasLoading, error } = useUserIdeas();
  const { data: user } = useUserProfile();

  /* state */
  // const [ideas, setIdeas] = useState<Idea[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("Welcome back");
  const [quote, setQuote] = useState(quotes[0]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [selectedIdeaForHistory, setSelectedIdeaForHistory] =
    useState<Idea | null>(null);
  const [selectedAction, setSelectedAction] = useState<{
    action?: () => void;
    title?: string;
    description?: string;
  }>({});
  console.log(ideas);

  /* data init */
  useEffect(() => {
    // setIdeas(
    //   MOCK_IDEAS.filter((i) => i.innovatorEmail === MOCK_INNOVATOR_USER.email)
    // );
    // setIsLoading(false);

    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    setQuote(quotes[Math.floor(Math.random() * quotes?.length)]);
  }, []);

  const totalIdeas = ideas?.length;
  const validatedIdeas = ideas?.filter((idea) => idea.report?.overallScore);
  const averageScore =
    ideas?.length > 0
      ? ideas.reduce((acc, item) => acc + item.overallScore, 0) / ideas?.length
      : 0;
  const approvedCount = ideas?.filter(
    (item) => item.status?.toLowerCase() === "approved"
  ).length;

  const approvalRate = totalIdeas > 0 ? (approvedCount / totalIdeas) * 100 : 0;

  // const submissionTrendData = React.useMemo(() => {
  //   const trends: { [key: string]: number } = {};
  //   const sortedIdeas = [...ideas].sort(
  //     (a, b) =>
  //       new Date(a.dateSubmitted).getTime() -
  //       new Date(b.dateSubmitted).getTime()
  //   );

  //   sortedIdeas.forEach((idea) => {
  //     const month = new Date(idea.dateSubmitted).toLocaleString("default", {
  //       month: "short",
  //       year: "2-digit",
  //     });
  //     trends[month] = (trends[month] || 0) + 1;
  //   });
  //   return Object.entries(trends).map(([name, ideas]) => ({ name, ideas }));
  // }, [ideas]);
  const submissionTrendData = React.useMemo(() => {
    if (!Array.isArray(ideas)) return []; // prevent runtime crash

    const trends: { [key: string]: number } = {};
    const sortedIdeas = [...ideas].sort(
      (a, b) =>
        new Date(a.dateSubmitted).getTime() -
        new Date(b.dateSubmitted).getTime()
    );

    sortedIdeas.forEach((idea) => {
      const month = new Date(idea.dateSubmitted).toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
      trends[month] = (trends[month] || 0) + 1;
    });

    return Object.entries(trends).map(([name, ideas]) => ({ name, ideas }));
  }, [ideas]);

  /* handlers */
  const handleActionConfirm = useCallback(() => {
    selectedAction.action?.();
    setDialogOpen(false);
  }, [selectedAction]);

  const openConfirmationDialog = useCallback(
    (action: () => void, title: string, description: string) => {
      setSelectedAction({ action, title, description });
      setDialogOpen(true);
    },
    []
  );

  const handleDownload = useCallback(
    (id: string) => {
      openConfirmationDialog(
        () =>
          toast({
            title: "Feature In Development",
            description: `Downloading for idea ${id} not yet implemented.`,
          }),
        "Confirm Download",
        "Download the report for this idea?"
      );
    },
    [openConfirmationDialog, toast]
  );

  const handleTrackHistory = useCallback((idea: Idea) => {
    setSelectedIdeaForHistory(idea);
    setHistoryDialogOpen(true);
  }, []);

  const handleResubmit = useCallback(
    (idea: Idea) => {
      router.push(
        `/dashboard/submit?idea=${encodeURIComponent(JSON.stringify(idea))}`
      );
    },
    [router]
  );

  /* role guard */
  if (role !== ROLES.INNOVATOR) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Please use your role-specific dashboard via the sidebar.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  /* loading */
  if (ideasLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );

  /* render */
  const recentIdeas = ideasLoading ? [] : ideas.slice(0, 3);

  const getOverallScore = (i: Idea) =>
    i.report?.overallScore?.toFixed(1) ?? "N/A";
  const getStatus = (i: Idea) => i.report?.validationOutcome || i.status;
  const getScoreColor = (s: number | string) => {
    const n = Number(s);
    if (isNaN(n)) return "text-muted-foreground";
    if (n >= 85) return "text-green-600";
    if (n >= 50) return "text-orange-600";
    return "text-red-600";
  };

  console.log(ideas);

  return (
    <>
      <div className="flex flex-col gap-6">
        <Card className="w-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg border-0 relative overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 h-full w-full animate-wavy-bounce-1 rounded-full bg-gradient-to-br from-[#FF00CC] to-[#333399] opacity-30 blur-3xl filter" />
          <div className="absolute -bottom-1/4 -right-1/2 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-tl from-[#F472B6] to-[#06B6D4] opacity-20 blur-3xl filter" />
          <div className="relative z-10">
            <CardHeader>
              <CardTitle className="text-3xl text-white">
                {greeting}, {user?.name}!
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 italic">
                "{quote.text}" - {quote.author}
              </CardDescription>
            </CardHeader>
          </div>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            {
              label: "Total Submissions",
              value: totalIdeas,
              icon: TrendingUp,
            },
            {
              label: "Average Score",
              value: averageScore.toFixed(2),
              icon: Star,
            },
            {
              label: "Approval Rate",
              value: `${approvalRate.toFixed(1)}%`,
              icon: Clock,
            },
          ].map((k) => (
            <Card
              key={k.label}
              className="border-purple-500 border-indigo-500 bg-[length:200%_auto] animate-background-pan cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/analytics?role=${ROLES.INNOVATOR}`)
              }
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{k.label}</CardTitle>
                <k.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{k.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Submit New Idea",
              icon: PlusCircle,
              href: `/dashboard/submit?role=${ROLES.INNOVATOR}`,
            },
            {
              label: "View All Ideas",
              icon: Lightbulb,
              href: `/dashboard/ideas?role=${ROLES.INNOVATOR}`,
            },
            {
              label: "Request Credits",
              icon: CreditCard,
              href: `/dashboard/request-credits?role=${ROLES.INNOVATOR}`,
            },
            {
              label: "Consultation",
              icon: MessageSquare,
              href: `/dashboard/consultations?role=${ROLES.INNOVATOR}`,
            },
          ].map((a) => (
            <Button key={a.label} asChild className="w-full">
              <Link href={a.href}>
                <a.icon className="mr-2 h-4 w-4" />
                {a.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Recent Ideas */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Recent Ideas</CardTitle>
              {ideas?.length > 3 && (
                <Button variant="link" asChild>
                  <Link href={`/dashboard/ideas?role=${ROLES.INNOVATOR}`}>
                    View All
                  </Link>
                </Button>
              )}
            </div>
            <CardDescription>
              A quick look at your most recent ideas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ideas?.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No ideas yet. Submit your first!
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentIdeas.map((idea) => (
                    <TableRow key={idea._id}>
                      <TableCell className="font-medium">
                        {idea.ideaName}
                      </TableCell>
                      <TableCell>
                        {new Date(idea.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={STATUS_COLORS[getStatus(idea)]}>
                          {getStatus(idea)}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "font-semibold",
                          getScoreColor(getOverallScore(idea))
                        )}
                      >
                        {idea.overallScore.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onSelect={() =>
                                router.push(
                                  `/dashboard/ideas/${idea.id}?role=${ROLES.INNOVATOR}`
                                )
                              }
                            >
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => handleResubmit(idea)}
                            >
                              Resubmit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => handleDownload(idea.id)}
                            >
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => handleTrackHistory(idea)}
                            >
                              Track History
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedAction.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedAction.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActionConfirm}>
              Yes, continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              History for: {selectedIdeaForHistory?.title}
            </DialogTitle>
            <DialogDescription>Version history and outcomes.</DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Version</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((h, i) => (
                <TableRow key={i}>
                  <TableCell>{h.version}</TableCell>
                  <TableCell>{h.date}</TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[h.status]}>
                      {h.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{h.score.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ----------  PAGE WRAPPER  ---------- */
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <DashboardPageContent />
      </Suspense>
    </ProtectedRoute>
  );
}
