"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_IDEAS, STATUS_COLORS, MOCK_TTCS } from "@/lib/mock-data";
import Link from "next/link";
import { useUserIdeas } from "@/hooks/useUserIdeas";

export default function IdeaFeedbackPage() {
  const userTTC = MOCK_TTCS[0];
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all");

  const { data: ideas, isLoading, error } = useUserIdeas();

  // const filteredIdeas = assignedIdeasWithFeedback.filter((idea) => {
  //   const matchesSearch =
  //     idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     idea.innovatorName.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus =
  //     filterStatus === "all" || idea.status === filterStatus;
  //   return matchesSearch && matchesStatus;
  // });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Idea Management</CardTitle>
        <CardDescription>
          Review and manage ideas submitted by your innovators.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="Search by Title or Innovator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Innovator</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideas.map((idea) => (
              <TableRow key={idea?._id}>
                <TableCell className="font-medium">{idea?._id}</TableCell>
                <TableCell>{idea?.useUserIdeas}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>
                  {/* <Badge className={STATUS_COLORS[idea.status]}>
                    {idea.status}
                  </Badge> */}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="link" size="sm" asChild>
                    <Link
                      href={`/dashboard/ideas/${idea._id}?role=TTC Coordinator`}
                    >
                      View Report
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {ideas?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No ideas with feedback found.
                </TableCell>
              </TableRow>
            )}
            {ideas?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No ideas found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
