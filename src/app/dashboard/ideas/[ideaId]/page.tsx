// app/ideas/[ideaId]/report/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  ArrowLeft,
  Download,
  FileText,
  Lightbulb,
  AlignJustify,
  Search,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROLES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";

/* ----------  SECTION COMPONENT  ---------- */
const Section = ({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-6 bg-white rounded-xl shadow-lg border border-gray-100"
  >
    <h2 className="flex items-center text-2xl font-bold mb-4 text-gray-800">
      {Icon && <Icon className="mr-3 text-indigo-600" size={24} />}
      {title}
    </h2>
    <div className="border-b-2 border-gray-100 mb-4"></div>
    {children}
  </motion.div>
);

/* ----------  REPORT PAGE  ---------- */
const ReportPage = ({ idea }: { idea: any }) => {
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scoreColor =
    idea.overallScore > 8
      ? "text-green-500"
      : idea.overallScore > 6
      ? "text-yellow-500"
      : "text-red-500";

  /* ----------  PDF EXPORT  ---------- */
  const handleDownloadPdf = () => {
    const input = reportRef.current;
    if (!input) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not find the report content to download.",
      });
      return;
    }

    toast({
      title: "Generating PDF...",
      description: "This may take a moment. Please wait.",
    });

    const cleanHtml = idea.htmlReport
      .replace(/<!DOCTYPE[^>]*>/gi, "")
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "");

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
    tempDiv.style.width = "800px";
    document.body.appendChild(tempDiv);

    html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        let imgHeight = pdfWidth / ratio;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save(`${idea.ideaName.replace(/\s+/g, "_")}_Report.pdf`);
        toast({
          title: "Download Complete",
          description: "Your PDF report has been downloaded.",
        });
        document.body.removeChild(tempDiv);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "PDF Generation Failed",
          description: "An error occurred while generating the PDF.",
        });
        console.error(err);
        document.body.removeChild(tempDiv);
      });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans antialiased text-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/*  ---  HEADER BUTTONS  --- */}
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleDownloadPdf}>
            <Download className="mr-2 h-4 w-4" />
            Export as PDF
          </Button>
        </div>

        {/*  ---  REPORT CONTENT  --- */}
        <div ref={reportRef} className="bg-gray-50 p-4 md:p-8 space-y-12">
          {/* Executive Header */}
          <motion.header
            className="text-center py-8 bg-white rounded-xl shadow-md border border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
              AI-Powered Idea Validation Report
            </h1>
            <p className="text-xl text-gray-600 font-medium">{idea.ideaName}</p>
            <p className="text-sm text-gray-400 mt-2">
              Generated on {new Date(idea.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-6">
              <span
                className={`text-5xl md:text-6xl font-extrabold ${scoreColor}`}
              >
                {idea.overallScore.toFixed(1)}
              </span>
              <span className="text-2xl text-gray-500">/5</span>
            </div>
          </motion.header>

          {/* Snapshot */}
          <Section title="1. Idea Snapshot" icon={Lightbulb}>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800 mb-2">Concept:</p>
              <p className="text-gray-700 whitespace-pre-wrap">
                {idea.ideaConcept}
              </p>
            </div>
          </Section>

          {/* Executive Summary */}
          <Section title="2. Executive Summary" icon={AlignJustify}>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/3 text-center p-6 bg-blue-50 rounded-xl">
                <p className="text-6xl font-extrabold text-blue-600">
                  {idea.overallScore.toFixed(1)}
                </p>
                <p className="mt-2 text-lg font-semibold text-blue-800">
                  Overall Score
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Outcome:
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  {idea.validationOutcome}
                </p>
              </div>
            </div>
          </Section>

          {/* Detailed Evaluation */}
          <Section title="3. Detailed Evaluation" icon={Search}>
            <div className="space-y-10">
              {idea.evaluatedData ? (
                Object.entries(idea.evaluatedData).map(
                  ([cluster, parameters]) => (
                    <div key={cluster}>
                      <h3 className="text-xl font-bold mb-4">{cluster}</h3>
                      {parameters &&
                        Object.entries(parameters).map(([param, subParams]) => (
                          <div key={param} className="mb-6">
                            <h4 className="text-lg font-semibold mb-2">
                              {param}
                            </h4>
                            <div className="pl-4 border-l border-gray-300 space-y-4">
                              {subParams &&
                                Object.entries(subParams).map(([sub, data]) => (
                                  <div
                                    key={sub}
                                    className="p-4 bg-white rounded-lg border border-gray-200"
                                  >
                                    <h5 className="font-bold">{sub}</h5>
                                    <p className="text-sm text-gray-600">
                                      Score:{" "}
                                      <span
                                        className={
                                          (data?.assigned_score ?? 0) >= 4
                                            ? "text-green-600 font-bold"
                                            : (data?.assigned_score ?? 0) >= 3
                                            ? "text-yellow-600 font-bold"
                                            : "text-red-600 font-bold"
                                        }
                                      >
                                        {data?.assigned_score ?? "N/A"} / 5
                                      </span>
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                      {data?.explanation ??
                                        "No explanation provided."}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )
                )
              ) : (
                <p className="text-sm text-gray-600">
                  Detailed scoring is not available for this idea yet.
                </p>
              )}
            </div>
          </Section>

          {/* HTML Report */}
          <Section title="4. AI-Generated Report" icon={FileText}>
            <iframe
              srcDoc={idea.htmlReport}
              className="w-full h-[800px] border border-gray-300 rounded-md bg-white"
              title="Full HTML Report"
            />
          </Section>
        </div>
      </div>
    </div>
  );
};

/* ----------  WRAPPER  ---------- */
export default function IdeaReportPageWrapper() {
  const { ideaId } = useParams() as { ideaId: string };
  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        // If evaluatedData came back as string, parse it once here
        if (typeof data.evaluatedData === "string") {
          data.evaluatedData = JSON.parse(data.evaluatedData);
        }
        setIdea(data);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || err.message);
      })
      .finally(() => setLoading(false));
  }, [ideaId]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Loading Report…</h2>
        <p className="text-muted-foreground">
          Please wait while we fetch the latest evaluation.
        </p>
      </div>
    );

  if (error || !idea)
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
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

  return <ReportPage idea={idea} />;
}
