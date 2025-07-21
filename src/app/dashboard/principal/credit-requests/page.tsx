'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_CREDIT_REQUESTS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function PrincipalCreditRequestsPage() {
    const { toast } = useToast();
    const [requests, setRequests] = React.useState(MOCK_CREDIT_REQUESTS);

    const handleAction = (requestId: string, status: 'Approved' | 'Rejected') => {
        setRequests(prev => prev.map(req => req.id === requestId ? {...req, status} : req));
        toast({
            title: `Request ${status}`,
            description: `The credit request has been ${status.toLowerCase()}.`,
        });
    }

    const pendingRequests = requests.filter(r => r.status === 'Pending');
    const historyRequests = requests.filter(r => r.status !== 'Pending');

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Pending Credit Requests ({pendingRequests.length})</CardTitle>
                <CardDescription>Approve or reject credit requests from your TTCs and Innovators.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Requester</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Purpose</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingRequests.map(req => (
                             <TableRow key={req.id}>
                                <TableCell>{req.requesterName}</TableCell>
                                <TableCell>{req.requesterType}</TableCell>
                                <TableCell>{req.amount}</TableCell>
                                <TableCell>{req.date}</TableCell>
                                <TableCell className="max-w-xs truncate">{req.purpose}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" onClick={() => handleAction(req.id, 'Approved')}>Approve</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleAction(req.id, 'Rejected')}>Reject</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {pendingRequests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">No pending requests.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Request History</CardTitle>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Requester</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {historyRequests.map(req => (
                             <TableRow key={req.id}>
                                <TableCell>{req.requesterName}</TableCell>
                                <TableCell>{req.amount}</TableCell>
                                <TableCell>{req.date}</TableCell>
                                <TableCell>
                                    <Badge variant={req.status === 'Approved' ? 'default' : 'destructive'}>
                                        {req.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}