"use client";

import * as React from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Download,
  ThumbsUp,
  Lightbulb,
  RefreshCw,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Star,
  Share2,
  Copy,
  CalendarIcon,
  ChevronRight,
  CheckCircle2,
  UserCheck,
  Shield,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SpiderChart } from "@/components/spider-chart";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  FacebookIcon,
  LinkedInIcon,
  TwitterIcon,
  WhatsAppIcon,
  MailIcon,
} from "@/components/social-icons";
import { ScoreDisplay } from "@/components/score-display";
import { ROLES } from "@/lib/constants";
import axios from "axios";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Custom hooks for data fetching                                       */
/* ------------------------------------------------------------------ */
function useIdea(ideaId: string) {
  const [idea, setIdea] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token");
      setLoading(false);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    axios
      .get(`${apiUrl}/api/ideas/${ideaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        // flatten backend payload into the shape the UI expects
        data.report = {
          overallScore: Math.round((data.overallScore * 100) / 5), // 2.9 → 58
          validationOutcome: data.validationOutcome,
          recommendationText: data.validationOutcome,
          sections: {
            executiveSummary: {
              concept: data.ideaConcept,
            },
            detailedEvaluation: {
              description: "AI-powered detailed assessment",
              clusters: data.evaluatedData,
            },
          },
        };
        setIdea(data);
        console.log(data);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || err.message);
      })
      .finally(() => setLoading(false));
  }, [ideaId]);

  return { idea, loading, error };
}

// function useConsultations(ideaId: string) {
//   const [consultations, setConsultations] = React.useState<any[]>([]);
//   React.useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     axios
//       .get(`${apiUrl}/api/ideas/${ideaId}/consultations`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(({ data }) => setConsultations(data))
//       .catch(() => setConsultations([]));
//   }, [ideaId]);
//   return consultations;
// }

// function usePsychometricProfile(innovatorId: string | undefined) {
//   const [profile, setProfile] = React.useState<any>(null);
//   React.useEffect(() => {
//     if (!innovatorId) return;
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     axios
//       .get(`${apiUrl}/api/users/${innovatorId}/psychometric`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(({ data }) => setProfile(data))
//       .catch(() => setProfile(null));
//   }, [innovatorId]);
//   return profile;
// }

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const getBackLink = (role: string | null) => {
  switch (role) {
    case ROLES.SUPER_ADMIN:
      return `/dashboard/admin/ideas?role=${role}`;
    case ROLES.COORDINATOR:
      return `/dashboard/coordinator/feedback?role=${role}`;
    default:
      return `/dashboard/ideas?role=${ROLES.INNOVATOR}`;
  }
};

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function IdeaReportPage() {
  /* ---------------- 1. Always-run hooks ---------------------------- */
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { ideaId } = params as { ideaId: string };
  const { toast } = useToast();
  const reportRef = React.useRef<HTMLDivElement>(null);
  const spiderChartRef = React.useRef<HTMLDivElement>(null);

  const { idea, loading, error } = useIdea(ideaId);
  const consultations = [];
  // const consultations = useConsultations(ideaId);
  // const innovatorProfile = usePsychometricProfile(idea?.innovatorId);

  /* state */
  const [isRequestConsultationOpen, setIsRequestConsultationOpen] =
    React.useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>(
    []
  );
  const [activeActionPoint, setActiveActionPoint] = React.useState(0);

  /* derived memos (always executed) */
  const role = searchParams.get("role");
  const report = idea?.report;
  const status = report?.validationOutcome || idea?.status;
  const score = report?.overallScore ?? null;

  const getScoreColor = (s: number | null) => {
    if (s === null) return "text-muted-foreground";
    if (s >= 85) return "text-green-600";
    if (s >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const {
    topPerformers,
    bottomPerformers,
    avgClusterScores,
    parameterSummaries,
  } = React.useMemo(() => {
    if (!report)
      return {
        topPerformers: [],
        bottomPerformers: [],
        avgClusterScores: {},
        parameterSummaries: {},
      };
    const allSubParams: any[] = [];
    const clusterScores: Record<string, number[]> = {};
    const parameterSummaries: Record<string, Record<string, any>> = {};

    Object.entries(report.sections.detailedEvaluation.clusters).forEach(
      ([clusterName, clusterData]: [string, any]) => {
        clusterScores[clusterName] = [];
        parameterSummaries[clusterName] = {};

        Object.entries(clusterData).forEach(
          ([paramName, paramData]: [string, any]) => {
            const subParams = Object.entries(paramData);
            if (!subParams.length) return;

            let totalScore = 0;
            let validCount = 0;
            let best = { score: -1, text: "No specific strengths noted." };
            let worst = {
              score: 101,
              text: "No specific improvement areas noted.",
            };

            subParams.forEach(([subName, sub]: [string, any]) => {
              const sc = sub?.assigned_score; // ← backend key
              if (typeof sc === "number") {
                totalScore += sc * 20; // 0-5 → 0-100
                validCount++;
                allSubParams.push({
                  name: subName,
                  score: sc * 20,
                  clusterName,
                  paramName,
                });
                clusterScores[clusterName].push(sc * 20);

                if (sc * 20 > best.score)
                  best = { score: sc * 20, text: sub.whatWentWell };
                if (sc * 20 < worst.score)
                  worst = { score: sc * 20, text: sub.whatCanBeImproved };
              }
            });

            const avg = validCount ? totalScore / validCount : 0;
            parameterSummaries[clusterName][paramName] = {
              avgScore: Math.round(avg),
              strongestPoint: best.text,
              improvementPoint: worst.text,
            };
          }
        );
      }
    );
    const sorted = allSubParams.sort((a, b) => b.score - a.score);

    const avgClusterScores = Object.entries(clusterScores).reduce(
      (acc, [k, v]) => {
        acc[k] = v.reduce((a, b) => a + b, 0) / (v.length || 1);
        return acc;
      },
      {} as Record<string, number>
    );
    return {
      topPerformers: sorted.slice(0, 3),
      bottomPerformers: sorted.slice(-3).reverse(),
      avgClusterScores,
      parameterSummaries,
    };
  }, [report]);
  // const dummyavgClusterScores = {
  //   "Core Idea & Innovation": 72,
  //   "Market & Commercial Opportunity": 58,
  //   "Business Model & Strategy": 65,
  //   "Execution & Operations": 48,
  //   "External Environment & Compliance": 60,
  //   "Team & Resources": 70,
  // };

  const dummyavgClusterScores = React.useMemo(() => {
    if (!idea?.evaluatedData) return {};

    const map = {
      "Core Idea": "Core Idea & Innovation",
      "Market Opportunity": "Market & Commercial Opportunity",
      "Business Model": "Business Model & Strategy",
      Execution: "Execution & Operations",
      Compliance: "External Environment & Compliance",
      "Financial Viability": "Team & Resources",
    };

    const out: Record<string, number> = {};
    Object.entries(map).forEach(([backend, ui]) => {
      const scores: number[] = [];
      const collect = (obj: any) => {
        if (obj && typeof obj === "object") {
          if (typeof obj.assigned_score === "number")
            scores.push(obj.assigned_score);
          Object.values(obj).forEach(collect);
        }
      };
      collect(idea.evaluatedData[backend] ?? {});
      const avg = scores.length
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 0;
      out[ui] = Math.round(avg * 20);
    });
    return out;
  }, [idea?.evaluatedData]);

  console.log(dummyavgClusterScores);

  const actionPoints = React.useMemo(() => {
    if (!report) return [];
    const points: any[] = [];
    const hasIPRisk = bottomPerformers.some((p) =>
      p.name.includes("Intellectual Property")
    );
    const hasMarketRisk = bottomPerformers.some((p) =>
      p.name.includes("Market Risk")
    );
    const hasOperationalRisk = bottomPerformers.some((p) =>
      p.name.includes("Operational Risk")
    );
    if (hasIPRisk) {
      points.push({
        title: "Strengthen Defensibility Strategy",
        todos: [
          "Consult with a legal expert on patentability of core algorithms.",
          "Research alternative 'moats' like proprietary data sets or network effects.",
          "Document trade secrets and internal know-how securely.",
        ],
      });
    }
    if (hasMarketRisk) {
      points.push({
        title: "Refine Market Entry Plan",
        todos: [
          "Conduct surveys with at least 50 potential customers to validate willingness-to-pay.",
          "Develop a detailed competitor analysis matrix.",
          "Create a phased go-to-market strategy, starting with a niche segment.",
        ],
      });
    }
    if (hasOperationalRisk) {
      points.push({
        title: "Develop Operational Mitigation Plan",
        todos: [
          "Identify potential data pipeline bottlenecks and solutions.",
          "Outline a farmer support system (e.g., chatbot, FAQ, local reps).",
          "Create a budget for initial operational costs for the first year.",
        ],
      });
    }
    if (!points.length && bottomPerformers.length) {
      points.push({
        title: `Address Lowest Score: ${bottomPerformers[0].name}`,
        todos: [
          `Review the feedback for '${bottomPerformers[0].name}' in the detailed assessment.`,
          `Brainstorm 3-5 ways to directly improve this aspect.`,
          `Update your pitch deck to reflect these improvements.`,
        ],
      });
    }
    return points;
  }, [report, bottomPerformers]);

  const allClusterNames = report
    ? Object.keys(report.sections.detailedEvaluation.clusters)
    : [];
  const allClustersExpanded =
    openAccordionItems.length > 0 &&
    openAccordionItems.length === allClusterNames.length;
  const handleToggleExpandAll = () =>
    allClustersExpanded
      ? setOpenAccordionItems([])
      : setOpenAccordionItems(allClusterNames);

  const handleHighlightClick = (
    _cluster: string,
    _param: string,
    subParamName: string
  ) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(
        `sub-param-${subParamName.replace(/[^a-zA-Z0-9]/g, "-")}`
      );
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  /* ---------------- 2. Guard clauses ------------------------------- */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Download className="h-12 w-12 animate-spin text-primary mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Loading Report…</h2>
        <p className="text-muted-foreground">
          Please wait while we fetch the latest evaluation.
        </p>
      </div>
    );
  }
  if (error || !idea)
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">
          {error ? "Error loading report" : "Report not found"}
        </h2>
        <p className="text-muted-foreground">
          {error || "The requested idea could not be located."}
        </p>
        <Button asChild className="mt-6">
          <Link href={`/dashboard/ideas?role=${ROLES.INNOVATOR}`}>
            Go to My Ideas
          </Link>
        </Button>
      </div>
    );

  /* ---------------- 3. Render -------------------------------------- */
  // const pastConsultations = consultations.filter(
  //   (c) => c.status === "Completed"
  // );
  const shareUrl = encodeURIComponent(
    `${window.location.origin}/dashboard/ideas/${idea.id}?role=${ROLES.INNOVATOR}`
  );
  const shareText = encodeURIComponent(
    `Check out my idea report for "${idea.title}" on PragatiAI!`
  );

  /* handlers */
  const handleDownload = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    const width = pdfWidth;
    const height = width / ratio;

    let position = 0;
    let heightLeft = height;
    pdf.addImage(imgData, "PNG", 0, position, width, height);
    heightLeft -= pdfHeight;
    while (heightLeft > 0) {
      position = heightLeft - height;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, width, height);
      heightLeft -= pdfHeight;
    }
    pdf.save(`${ideaId}-PragatiAI-Report.pdf`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "The report link has been copied to your clipboard.",
    });
  };

  const handleResubmit = () => {
    const ideaData = {
      title: idea.title,
      description: idea.description,
      domain: idea.domain,
      weights: idea.clusterWeights,
    };
    const sp = new URLSearchParams();
    sp.set("idea", JSON.stringify(ideaData));
    if (role) sp.set("role", role);
    router.push(`/dashboard/submit?${sp.toString()}`);
  };

  const handleRequestConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description:
        "Your consultation request has been sent to the TTC Coordinator.",
    });
    setIsRequestConsultationOpen(false);
  };

  /* ------------------------------------------------------------------ */
  /* JSX (unchanged)                                                    */
  /* ------------------------------------------------------------------ */
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href={getBackLink(role)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="flex gap-2">
            {(status === "Moderate" || status === "Rejected") && (
              <Button onClick={handleResubmit}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Resubmit Idea
              </Button>
            )}
            {status === "Approved" && (
              <Button onClick={() => setIsRequestConsultationOpen(true)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Request Consultation
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setIsShareDialogOpen(true)}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>

        <div ref={reportRef} className="p-4 bg-background">
          <Card>
            <CardHeader className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div>
                <CardTitle className="text-2xl">{idea.title}</CardTitle>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground pt-2">
                  <span>ID: {idea.id}</span>
                  <span>Version: {idea.version}</span>
                  <span>
                    Submitted: {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Status:{" "}
                    <Badge className={cn(getScoreColor(score))}>{status}</Badge>
                  </span>
                </div>
              </div>
              {report && <ScoreDisplay score={score} status={status} />}
            </CardHeader>

            {report ? (
              <CardContent className="space-y-8 pt-2">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    Executive Summary & Recommendation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {report.sections.executiveSummary.concept}
                  </p>
                  <p className="font-semibold">Recommendation:</p>
                  <p className="text-muted-foreground text-sm">
                    {report.recommendationText}
                  </p>
                </div>

                <Separator />

                {/* {role === ROLES.SUPER_ADMIN && innovatorProfile && (
                  <>
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Shield className="h-5 w-5 text-primary" />
                          Confidential: Founder Psychometric Analysis
                        </CardTitle>
                        <CardDescription>
                          This section is only visible to Super Admins.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold">
                              Profile: {innovatorProfile.profileType}
                            </h4>
                            <p className="text-sm text-muted-foreground italic mt-1">
                              "{innovatorProfile.generalAnalysis}"
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <strong className="font-medium text-foreground">
                                Domain Fit:
                              </strong>{" "}
                              {innovatorProfile.domainFit}
                            </p>
                            <p className="text-sm">
                              <strong className="font-medium text-foreground">
                                Expertise Fit:
                              </strong>{" "}
                              {innovatorProfile.expertiseFit}
                            </p>
                            <p className="text-sm">
                              <strong className="font-medium text-foreground">
                                Key Success Factors:
                              </strong>{" "}
                              {innovatorProfile.successFactors}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Separator />
                  </>
                )} */}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Cluster Performance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Average scores across the main evaluation clusters.
                    </p>
                    <div
                      ref={spiderChartRef}
                      className="h-[350px] flex items-center justify-center"
                    >
                      <SpiderChart
                        data={dummyavgClusterScores}
                        maxScore={100}
                        size={400}
                      />
                    </div>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="hidden lg:block"
                  />
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Highlights & Lowlights
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Top and bottom performing sub-parameters.
                    </p>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 flex items-center gap-2">
                          <TrendingUp /> Top Performers
                        </h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {topPerformers.map((item, i) => (
                            <li key={i}>
                              <button
                                onClick={() =>
                                  handleHighlightClick(
                                    item.clusterName,
                                    item.paramName,
                                    item.name
                                  )
                                }
                                className="flex justify-between w-full hover:bg-muted p-1 rounded-md transition-colors text-left"
                              >
                                <span className="text-muted-foreground">
                                  {item.name}
                                </span>
                                <span className="font-bold text-green-600">
                                  {item.score}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-red-600 flex items-center gap-2">
                          <TrendingDown /> Areas for Improvement
                        </h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {bottomPerformers.map((item, i) => (
                            <li key={i}>
                              <button
                                onClick={() =>
                                  handleHighlightClick(
                                    item.clusterName,
                                    item.paramName,
                                    item.name
                                  )
                                }
                                className="flex justify-between w-full hover:bg-muted p-1 rounded-md transition-colors text-left"
                              >
                                <span className="text-muted-foreground">
                                  {item.name}
                                </span>
                                <span className="font-bold text-red-600">
                                  {item.score}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {actionPoints.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Next Steps</h3>
                    <p className="text-sm text-muted-foreground">
                      Actionable steps to improve your idea based on the
                      evaluation. Select an action point to see the to-do list.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="flex flex-col gap-2">
                        {actionPoints.map((point, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveActionPoint(i)}
                            className={cn(
                              "p-3 rounded-md text-left transition-colors border-l-4",
                              i === activeActionPoint
                                ? "bg-muted border-primary"
                                : "bg-transparent hover:bg-muted/50 border-transparent"
                            )}
                          >
                            <p className="font-semibold">{point.title}</p>
                          </button>
                        ))}
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">To-Do List:</h4>
                        <ul className="space-y-3">
                          {actionPoints[activeActionPoint]?.todos.map(
                            (todo, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>{todo}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">
                        Detailed Viability Assessment
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {report.sections.detailedEvaluation.description}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleToggleExpandAll}
                    >
                      {allClustersExpanded ? "Collapse All" : "Expand All"}
                    </Button>
                  </div>
                  <Accordion
                    type="multiple"
                    value={openAccordionItems}
                    onValueChange={setOpenAccordionItems}
                    className="w-full pt-4"
                  >
                    {Object.entries(
                      report.sections.detailedEvaluation.clusters
                    ).map(([clusterName, clusterData]: [string, any]) => (
                      <AccordionItem value={clusterName} key={clusterName}>
                        <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                          {clusterName}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0 space-y-4">
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            {Object.entries(clusterData).map(
                              ([paramName, paramData]: [string, any]) => {
                                if (
                                  typeof paramData !== "object" ||
                                  paramData === null
                                )
                                  return null;
                                const summary =
                                  parameterSummaries[clusterName]?.[paramName];
                                return (
                                  <AccordionItem
                                    value={paramName}
                                    key={paramName}
                                  >
                                    <AccordionTrigger className="font-semibold mb-2 hover:no-underline">
                                      <div className="flex justify-between items-center w-full pr-2">
                                        <span>{paramName}</span>
                                        {summary && (
                                          <Badge
                                            className={cn(
                                              getScoreColor(summary.avgScore),
                                              "bg-opacity-10 border-opacity-20"
                                            )}
                                            variant="outline"
                                          >
                                            {summary.avgScore.toFixed(0)}
                                          </Badge>
                                        )}
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="divide-y">
                                        {Object.entries(paramData).map(
                                          ([subParamName, subParamData]: [
                                            string,
                                            any
                                          ]) => {
                                            if (
                                              typeof subParamData !==
                                                "object" ||
                                              subParamData === null ||
                                              subParamData.assignedScore ===
                                                undefined
                                            )
                                              return null;
                                            const score =
                                              subParamData.assignedScore;
                                            const id = `sub-param-${subParamName.replace(
                                              /[^a-zA-Z0-9]/g,
                                              "-"
                                            )}`;
                                            const circumference =
                                              2 * Math.PI * 18;
                                            const strokeDashoffset =
                                              circumference -
                                              (score / 100) * circumference;
                                            return (
                                              <div
                                                key={subParamName}
                                                id={id}
                                                className="p-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-center scroll-mt-20"
                                              >
                                                <div className="md:col-span-3">
                                                  <h6 className="font-medium text-sm">
                                                    {subParamName}
                                                  </h6>
                                                </div>
                                                <div className="md:col-span-1 flex items-center justify-start md:justify-center">
                                                  <div className="relative h-16 w-16">
                                                    <svg
                                                      className="h-full w-full"
                                                      viewBox="0 0 40 40"
                                                    >
                                                      <circle
                                                        cx="20"
                                                        cy="20"
                                                        r="18"
                                                        className="stroke-muted"
                                                        strokeWidth="3"
                                                        fill="transparent"
                                                      />
                                                      <circle
                                                        cx="20"
                                                        cy="20"
                                                        r="18"
                                                        className={cn(
                                                          "stroke-current transition-all duration-500 ease-in-out",
                                                          getScoreColor(score)
                                                        )}
                                                        strokeWidth="3"
                                                        fill="transparent"
                                                        strokeLinecap="round"
                                                        strokeDasharray={
                                                          circumference
                                                        }
                                                        strokeDashoffset={
                                                          strokeDashoffset
                                                        }
                                                        transform="rotate(-90 20 20)"
                                                      />
                                                    </svg>
                                                    <span
                                                      className={cn(
                                                        "absolute inset-0 flex items-center justify-center text-base font-bold",
                                                        getScoreColor(score)
                                                      )}
                                                    >
                                                      {score}
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="md:col-span-4 space-y-1">
                                                  <div className="flex items-start gap-2 text-sm">
                                                    <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                                    <p className="text-muted-foreground flex-1 break-words">
                                                      {
                                                        subParamData.whatWentWell
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="md:col-span-4 space-y-1">
                                                  <div className="flex items-start gap-2 text-sm">
                                                    <Lightbulb className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                                                    <p className="text-muted-foreground flex-1 break-words">
                                                      {
                                                        subParamData.whatCanBeImproved
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                );
                              }
                            )}
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="text-center py-20">
                  <p className="text-muted-foreground">
                    Report is being generated or is not available. Status:{" "}
                    {idea.status}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* {pastConsultations.length > 0 ? (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Consultation History</CardTitle>
                <CardDescription>
                  Review of past consultations for this idea.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Attachments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastConsultations.map((c) => (
                      <TableRow
                        key={c.id}
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`/dashboard/consultations?role=${role}`)
                        }
                      >
                        <TableCell>
                          {new Date(c.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{c.mentor}</TableCell>
                        <TableCell>{c.milestones.join(", ")}</TableCell>
                        <TableCell>
                          {c.files.map((f: string, i: number) => (
                            <Button
                              key={i}
                              variant="link"
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {f}
                            </Button>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : ( */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Consultation History</CardTitle>
              <CardDescription>
                No consultations recorded yet. They will appear here once
                scheduled.
              </CardDescription>
            </CardHeader>
          </Card>
          {/* )} */}
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Report: {idea.title}</DialogTitle>
            <DialogDescription>
              Share your idea report with others via link or PDF.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Input
                value={`${window.location.origin}/dashboard/ideas/${idea.id}?role=${ROLES.INNOVATOR}`}
                readOnly
              />
              <Button size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium text-center text-muted-foreground">
                Quick Share
              </p>
              <div className="flex justify-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" size="icon">
                        <a
                          href={`https://api.whatsapp.com/send?text= ${shareText} ${shareUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsAppIcon className="h-5 w-5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>WhatsApp</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" size="icon">
                        <a
                          href={`https://twitter.com/intent/tweet?text= ${shareText}&url=${shareUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <TwitterIcon className="h-5 w-5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>X / Twitter</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" size="icon">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u= ${shareUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FacebookIcon className="h-5 w-5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Facebook</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" size="icon">
                        <a
                          href={`https://www.linkedin.com/shareArticle?mini=true&url= ${shareUrl}&title=${encodeURIComponent(
                            idea.title
                          )}&summary=${shareText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkedInIcon className="h-5 w-5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>LinkedIn</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" size="icon">
                        <a
                          href={`mailto:?subject=${encodeURIComponent(
                            idea.title
                          )}&body=${shareText} ${shareUrl}`}
                        >
                          <MailIcon className="h-5 w-5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Email</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between flex-col sm:flex-row gap-2">
            <Button variant="secondary" onClick={handleDownload}>
              <Download className="mr-2" />
              Export as PDF
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Consultation */}
      <Dialog
        open={isRequestConsultationOpen}
        onOpenChange={setIsRequestConsultationOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request a New Consultation</DialogTitle>
            <DialogDescription>
              Fill out the details below to request a meeting with a mentor for
              your idea: "{idea.title}".
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRequestConsultationSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Preferred Mentor</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Replace with real mentors from API if available */}
                    <SelectItem value="mentor1">Dr. Anjali Mehta</SelectItem>
                    <SelectItem value="mentor2">Ravi Shankar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Questions / Topics</Label>
                <Textarea
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
