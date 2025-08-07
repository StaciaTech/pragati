"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  MOCK_CREDIT_ASSIGNMENT_HISTORY,
  MOCK_TTC_AUDIT_TRAIL,
  MOCK_TTCS,
  MOCK_COLLEGES,
  MOCK_CREDIT_REQUESTS,
} from "@/lib/mock-data";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCreditRequests } from "@/hooks/useCreditRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTtcRequests } from "@/hooks/useTtcRequests";

export default function CoordinatorLogsPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const userTTC = MOCK_TTCS[0];
  const college = MOCK_COLLEGES.find((c) => c.id === userTTC.collegeId);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  //   const [requests, setRequests] = React.useState(MOCK_CREDIT_REQUESTS);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data: requests = [], isLoading: loadingTtcRequest } =
    useTtcRequests();

  console.log(requests);

  const { data: allCreditRequests = [], isLoading: loadingRequests } =
    useCreditRequests();
  //   console.log(allCreditRequests);

  const myCreditAssignments = allCreditRequests.filter(
    (log) => log.level === "innovator->ttc"
  );
  console.log(myCreditAssignments);
  const myAuditTrail = MOCK_TTC_AUDIT_TRAIL.filter(
    (log) => log.ttc === userTTC.name
  );
  const pendingRequest = requests.find((req) => req.status === "pending");
  //   const pendingRequest = [];

  const requestCreditsMutation = useMutation({
    mutationFn: async ({
      amount,
      reason,
    }: {
      reason: string;
      amount: number;
    }) => {
      const { data } = await axios.post(
        `${apiUrl}/api/credits/ttc/request-from-college`,
        { amount, reason },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(data);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["college_admin-credit-requests"],
      });
    },
  });

  const handleRequestCredits = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const amount = Number(formData.get("amount"));
    const reason = String(formData.get("justification"));
    try {
      await requestCreditsMutation.mutateAsync({ amount, reason });
      toast({
        title: "Request Sent",
        description: `Your request for ${amount} credits has been sent to the College Principal for approval.`,
      });
    } catch (error) {
      toast({
        title: "Request Faild",
        description: `Your request for ${amount} is failed try again later.`,
      });
    }
    // const newRequest = {
    //   id: `CR-TTC-${Date.now()}`,
    //   requesterType: "TTC" as const,
    //   requesterId: userTTC.id,
    //   requesterName: userTTC.name,
    //   amount: Number(amount),
    //   status: "Pending" as const,
    //   date: new Date().toISOString().split("T")[0],
    //   purpose: formData.get("justification") as string,
    // };
    // setRequests((prev) => [...prev, newRequest]);
    // MOCK_CREDIT_REQUESTS.push(newRequest);

    setIsModalOpen(false);
  };

  const handleCancelRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
    const index = MOCK_CREDIT_REQUESTS.findIndex((req) => req.id === requestId);
    if (index > -1) {
      MOCK_CREDIT_REQUESTS.splice(index, 1);
    }
    toast({
      title: "Request Cancelled",
      description: "Your credit request has been successfully cancelled.",
    });
  };

  return (
    <>
      <div className="space-y-6">
        {pendingRequest && (
          <Card className="border-yellow-500">
            <CardHeader>
              <CardTitle>My Pending Request</CardTitle>
              <CardDescription>
                You have a credit request awaiting approval from your Principal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="font-semibold text-muted-foreground">
                  Amount:{" "}
                </span>
                {pendingRequest.amount} credits
              </p>
              <p>
                <span className="font-semibold text-muted-foreground">
                  Date:{" "}
                </span>
                {new Date(pendingRequest.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
              <p>
                <span className="font-semibold text-muted-foreground">
                  Purpose:{" "}
                </span>
                {pendingRequest.reason}
              </p>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancel Request</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently cancel your credit request. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Back</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleCancelRequest(pendingRequest.id)}
                    >
                      Yes, cancel it
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Logs & Requests</CardTitle>
            <CardDescription>
              View your activity logs and request credits from your college
              principal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Current College Credits Available:{" "}
              <span className="font-bold text-primary">
                {college?.creditsAvailable || 0}
              </span>
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              disabled={!!pendingRequest}
            >
              Request Credits from Principal
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Credit Assignment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Innovator ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allCreditRequests.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell>
                      {new Date(log.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{log.from}</TableCell>
                    <TableCell>{log.amount}</TableCell>
                    <TableCell>{log.status}</TableCell>
                  </TableRow>
                ))}
                {allCreditRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No credit assignment history.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Audit Trail</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myAuditTrail.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.action}</TableCell>
                  </TableRow>
                ))}
                {myAuditTrail.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No audit trail entries.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Credits from Principal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRequestCredits}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Request</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="justification">Justification</Label>
                <Textarea
                  id="justification"
                  name="justification"
                  placeholder="Explain why you need these credits."
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Send Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
