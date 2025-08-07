"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMyPendingRequest } from "@/hooks/useAllCreditRequest";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function RequestCreditsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // live pending request
  const { data: pending, isLoading, error } = useMyPendingRequest();
  const deleteRequest = useMyPendingRequest().deleteRequest;

  // mutation to create request
  const createRequest = useMutation({
    mutationFn: async ({
      amount,
      reason,
    }: {
      amount: number;
      reason: string;
    }) => {
      const { data } = await axios.post(
        `${apiUrl}/api/credits/request-from-ttc`,
        { amount, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPendingRequest"] });
      toast({ title: "Request Submitted" });
    },
    onError: (err: any) =>
      toast({
        variant: "destructive",
        title: "Failed",
        description: err?.response?.data?.error,
      }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const amount = Number(fd.get("amount"));
    const reason = fd.get("purpose") as string;

    if (!amount || amount <= 0 || !reason) {
      toast({ variant: "destructive", title: "Invalid input" });
      return;
    }

    createRequest.mutate({ amount, reason });
    e.currentTarget.reset();
  };

  const handleCancel = () => {
    if (!pending) return;
    deleteRequest.mutate(pending._id);
  };

  const creditFaqs = [
    {
      question: "How are credits used?",
      answer: "One credit per idea submission.",
    },
    {
      question: "How long for approval?",
      answer: "Handled by your TTC Coordinator.",
    },
    {
      question: "What if rejected?",
      answer: "Speak to your TTC and resubmit.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {error && <p className="text-sm text-red-500">Error loading request</p>}
        {pending && (
          <Card>
            <CardHeader>
              <CardTitle>Pending Request</CardTitle>
              <CardDescription>Awaiting TTC approval</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Amount: {pending.amount}</p>
              <p>Reason: {pending.reason}</p>
              <p>Date: {new Date(pending.createdAt).toLocaleDateString()}</p>
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancel</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel request?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Back</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel}>
                      Yes, cancel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        )}

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Request Credits</CardTitle>
              <CardDescription>
                You currently have{" "}
                <span className="font-bold text-primary">0</span> credits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Amount</Label>
                <Input
                  name="amount"
                  type="number"
                  min="1"
                  required
                  disabled={Boolean(pending)}
                />
              </div>
              <div>
                <Label>Reason</Label>
                <Textarea name="purpose" required disabled={Boolean(pending)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                disabled={Boolean(pending) || createRequest.isPending}
              >
                {createRequest.isPending ? "Sending…" : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {creditFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
