'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MOCK_INNOVATOR_USER, MOCK_CREDIT_REQUESTS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function RequestCreditsPage() {
    const { toast } = useToast();
    const user = MOCK_INNOVATOR_USER;
    
    // Check if there's already a pending request from this user
    const hasPendingRequest = MOCK_CREDIT_REQUESTS.some(
        req => req.requesterId === user.id && req.status === 'Pending'
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (hasPendingRequest) {
            toast({
                variant: 'destructive',
                title: 'Request Already Pending',
                description: 'You already have a credit request awaiting approval. Please wait for it to be resolved.',
            });
            return;
        }

        const formData = new FormData(event.currentTarget);
        const amount = formData.get('amount');
        const purpose = formData.get('purpose');

        if (!amount || !purpose) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please enter a valid amount and purpose for your credit request.',
            });
            return;
        }

        // Simulate adding to mock data
        const newRequest = {
            id: `CR-INV-${Date.now()}`,
            requesterType: 'Innovator' as const,
            requesterId: user.id,
            requesterName: user.name,
            amount: Number(amount),
            status: 'Pending' as const,
            date: new Date().toISOString().split('T')[0],
            purpose: purpose as string
        };
        MOCK_CREDIT_REQUESTS.push(newRequest);


        console.log('New Credit Request:', { amount, purpose });
        toast({
            title: 'Request Submitted',
            description: `Your request for ${amount} credits has been submitted successfully.`,
        });
        event.currentTarget.reset();
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <CardHeader>
                <CardTitle>Request Credits</CardTitle>
                <CardDescription>
                    You currently have <span className="font-bold text-primary">{user.credits}</span> credits available.
                    Use this form to request additional credits.
                </CardDescription>
                 {hasPendingRequest && (
                    <p className="text-sm font-medium text-yellow-600 bg-yellow-100 p-3 rounded-md mt-2">
                        You have a credit request pending approval. You cannot make a new request until the current one is resolved.
                    </p>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount of Credits Needed</Label>
                    <Input id="amount" name="amount" type="number" min="1" placeholder="e.g., 5" required disabled={hasPendingRequest} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Request</Label>
                    <Textarea
                        id="purpose"
                        name="purpose"
                        placeholder="Briefly explain why you need more credits (e.g., for new project, resubmission)."
                        required
                        disabled={hasPendingRequest}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={hasPendingRequest}>Submit Request</Button>
            </CardFooter>
      </form>
    </Card>
  );
}
