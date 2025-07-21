'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_IDEAS, STATUS_COLORS, MOCK_TTCS } from '@/lib/mock-data';

export default function CoordinatorConsultationsPage() {
  const userTTC = MOCK_TTCS[0];
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const assignedConsultations = MOCK_IDEAS.filter(idea => idea.ttcAssigned === userTTC.id);
  
  const filteredConsultations = assignedConsultations.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          idea.innovatorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || idea.consultationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultation Management</CardTitle>
        <CardDescription>Manage your assigned consultations with innovators.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input 
            placeholder="Search by Idea Title or Innovator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger><SelectValue placeholder="Filter by Status..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Not Requested">Not Requested</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Idea Title</TableHead>
              <TableHead>Innovator</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConsultations.map((idea) => (
              <TableRow key={idea.id}>
                <TableCell className="font-medium">{idea.title}</TableCell>
                <TableCell>{idea.innovatorName}</TableCell>
                <TableCell>{idea.consultationDate || 'N/A'}</TableCell>
                <TableCell>{idea.consultationTime || 'N/A'}</TableCell>
                <TableCell>
                  <Badge className={STATUS_COLORS[idea.consultationStatus || '']}>
                    {idea.consultationStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="link" size="sm">Manage</Button>
                </TableCell>
              </TableRow>
            ))}
             {filteredConsultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center">No consultations found.</TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
