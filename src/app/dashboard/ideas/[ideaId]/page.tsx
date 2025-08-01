
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { MOCK_IDEAS } from '@/lib/mock-data';
import { Check, X, Shield, Users, Clock, Leaf, DollarSign, Target, Briefcase, TrendingUp, Search, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROLES } from '@/lib/constants';

// Reusable component for a score card
const ScoreCard = ({ title, score, confidence, inference, suggestions, icon }: { title: string, score: number, confidence: string, inference: string, suggestions: string, icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <h4 className="text-xl font-semibold text-gray-800 flex-1">{title}</h4>
      <div className="flex items-center space-x-2">
        <span className={`text-2xl font-bold ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {score}/100
        </span>
        <span className="text-sm px-2 py-1 bg-gray-100 rounded-full font-medium text-gray-600 border border-gray-300">
          {confidence}
        </span>
      </div>
    </div>
    <div className="space-y-4 text-gray-700">
      <div>
        <p className="font-semibold text-gray-800">Inference:</p>
        <p className="text-sm mt-1">{inference}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-800">Suggestions:</p>
        <p className="text-sm mt-1">{suggestions}</p>
      </div>
    </div>
  </div>
);

// Simple Section component for a clean layout
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-green-500 pb-2 mb-6">{title}</h2>
    <div>{children}</div>
  </section>
);


// Main report component
const ReportPage = ({ report }: { report: any }) => {
  // Helper to choose the right icon for each cluster
  const getClusterIcon = (clusterTitle: string) => {
    switch (clusterTitle) {
      case 'Cluster 1: Core Idea & Product':
        return <Leaf size={28} className="text-green-500" />;
      case 'Cluster 2: Market Opportunity':
        return <TrendingUp size={28} className="text-blue-500" />;
      case 'Cluster 3: Execution':
        return <Briefcase size={28} className="text-orange-500" />;
      case 'Cluster 4: Business Model':
        return <DollarSign size={28} className="text-teal-500" />;
      case 'Cluster 5: Team':
        return <Users size={28} className="text-purple-500" />;
      case 'Cluster 6: Compliance':
        return <Shield size={28} className="text-cyan-500" />;
      case 'Cluster 7: Risk & Strategy':
        return <Target size={28} className="text-red-500" />;
      default:
        return <Info size={28} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 sm:p-8">
      <main className="container mx-auto max-w-6xl py-8">
        <header className="bg-white p-8 rounded-3xl shadow-xl text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2">{report.ideaName}</h1>
          <p className="text-lg text-gray-600">Advanced Business Validation Report</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="text-center">
              <span className="text-5xl font-extrabold text-green-600">{report.overallScore}/100</span>
              <p className="text-sm text-gray-500 mt-1">Overall Viability Score</p>
            </div>
            <div className="h-16 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">{report.outcome}</p>
              <p className="text-sm text-gray-500 mt-1">Outcome</p>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <Section title="Executive Summary">
          <p className="text-lg leading-relaxed text-gray-700">{report.executiveSummary}</p>
        </Section>
        
        {/* Strengths & Weaknesses */}
        <Section title="Key Strengths & Weaknesses">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="flex items-center text-2xl font-semibold text-green-600 mb-4">
                <Check className="mr-2" size={24} /> Strengths
              </h3>
              <ul className="list-none space-y-3">
                {report.keyStrengths.map((item: string, index: number) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <Check size={18} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="flex items-center text-2xl font-semibold text-red-600 mb-4">
                <X className="mr-2" size={24} /> Weaknesses
              </h3>
              <ul className="list-none space-y-3">
                {report.keyWeaknesses.map((item: string, index: number) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <X size={18} className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Critical Risks */}
        <Section title="Critical Risks & Mitigation Strategies">
          <div className="space-y-6">
            {report.criticalRisks.map((risk: {title: string, howWhy: string, mitigation: string}, index: number) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{risk.title}</h4>
                <p className="text-sm text-gray-700 mb-2">**How and Why:** {risk.howWhy}</p>
                <p className="text-sm text-gray-700">**Mitigation Strategy:** {risk.mitigation}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Competitive Analysis */}
        <Section title="Competitive Analysis">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Competitor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key Products
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price Range
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Strengths
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weaknesses
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report.competitiveAnalysis.map((competitor: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{competitor.competitor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{competitor.keyProducts}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{competitor.priceRange}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{competitor.strengths}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{competitor.weaknesses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Detailed Cluster Analysis */}
        <Section title="Detailed Idea Validation & Scoring">
          <div className="space-y-12">
            {report.clusterData.map((cluster: any, clusterIndex: number) => (
              <div key={clusterIndex} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                <h3 className="flex items-center text-3xl font-bold text-gray-900 mb-6">
                  {getClusterIcon(cluster.title)}
                  <span className="ml-3">{cluster.title}</span>
                </h3>
                <div className="space-y-8">
                  {cluster.parameters.map((param: any, paramIndex: number) => (
                    <div key={paramIndex} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{param.title}</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        {param.subParameters.map((subParam: any, subParamIndex: number) => (
                          <ScoreCard
                            key={subParamIndex}
                            title={subParam.title}
                            score={subParam.score}
                            confidence={subParam.confidence}
                            inference={subParam.inference}
                            suggestions={subParam.suggestions}
                            icon={<Search size={20} className="text-gray-500" />}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Consolidated Sources */}
        <Section title="Consolidated Sources of Information">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {report.sources.map((source: string, index: number) => (
              <li key={index} className="text-base">{source}</li>
            ))}
          </ul>
        </Section>

        {/* Professional Disclaimer */}
        <Section title="Professional Disclaimer">
          <p className="text-sm leading-relaxed text-gray-600">{report.disclaimer}</p>
        </Section>
        
      </main>
    </div>
  );
};

export default function IdeaReportPageWrapper() {
  const { ideaId } = useParams() as { ideaId: string };
  const idea = MOCK_IDEAS.find((i) => i.id === ideaId);

  if (!idea || !idea.report) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Generating Report</h2>
        <p className="text-muted-foreground">
            {idea ? "The report for this idea is not yet available." : "Idea not found."}
        </p>
         <Button asChild className="mt-6">
          <Link href={`/dashboard/ideas?role=${ROLES.INNOVATOR}`}>Go to My Ideas</Link>
        </Button>
      </div>
    );
  }

  return <ReportPage report={idea.report} />;
}
