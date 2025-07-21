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
import { MOCK_INNOVATOR_USER } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function RequestCreditsPage() {
    const { toast } = useToast();
    const user = MOCK_INNOVATOR_USER;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount of Credits Needed</Label>
                    <Input id="amount" name="amount" type="number" min="1" placeholder="e.g., 5" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Request</Label>
                    <Textarea
                        id="purpose"
                        name="purpose"
                        placeholder="Briefly explain why you need more credits (e.g., for new project, resubmission)."
                        required
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit">Submit Request</Button>
            </CardFooter>
      </form>
    </Card>
  );
}
