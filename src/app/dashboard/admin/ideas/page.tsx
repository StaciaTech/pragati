'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_IDEAS, STATUS_COLORS, MOCK_COLLEGES } from '@/lib/mock-data';
import Link from 'next/link';

export default function IdeaOversightPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterCollege, setFilterCollege] = React.useState('');
  const [filterDomain, setFilterDomain] = React.useState('');

  const uniqueDomains = [...new Set(MOCK_IDEAS.map(idea => idea.domain))];
  
  const filteredIdeas = MOCK_IDEAS.filter(idea => {
    const matchesSearch = idea.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege = filterCollege === '' || idea.collegeName === filterCollege;
    const matchesDomain = filterDomain === '' || idea.domain === filterDomain;
    return matchesSearch && matchesCollege && matchesDomain;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Idea Oversight</CardTitle>
        <CardDescription>Search, filter, and manage all ideas across the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input 
            placeholder="Search by ID or Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={filterCollege} onValueChange={setFilterCollege}>
            <SelectTrigger><SelectValue placeholder="Filter by College..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Colleges</SelectItem>
              {MOCK_COLLEGES.map(college => <SelectItem key={college.id} value={college.name}>{college.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterDomain} onValueChange={setFilterDomain}>
            <SelectTrigger><SelectValue placeholder="Filter by Domain..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Domains</SelectItem>
              {uniqueDomains.map(domain => <SelectItem key={domain} value={domain}>{domain}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Innovator</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIdeas.map((idea) => (
              <TableRow key={idea.id}>
                <TableCell className="font-medium">{idea.id}</TableCell>
                <TableCell>{idea.title}</TableCell>
                <TableCell>{idea.collegeName}</TableCell>
                <TableCell>{idea.innovatorName}</TableCell>
                <TableCell>
                  <Badge className={STATUS_COLORS[idea.status]}>{idea.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="link" asChild size="sm">
                    <Link href={`/dashboard/ideas/${idea.id}?role=Super Admin`}>View Report</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}