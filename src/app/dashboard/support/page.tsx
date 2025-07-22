
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


export default function SupportPage() {
    const { toast } = useToast();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleSubmitSupportRequest = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "Message Sent!",
            description: "Your message has been sent to support@staciacorp.com. We will get back to you shortly.",
        });
        setIsModalOpen(false);
    }

  return (
    <div className="space-y-6">
       <div>
            <h2 className="text-2xl font-bold">Support & Help Center</h2>
            <p className="text-muted-foreground">Find answers to your questions and get help.</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>PPT Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
              <li>Ensure your PPT is in `.pptx` format.</li>
              <li>Keep the file size under 10MB for faster processing.</li>
              <li>Use clear, concise language and visuals.</li>
              <li>Include your Idea ID in the first slide.</li>
              <li>Recommended structure: Problem, Solution, Market, Team, Traction (if any).</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Clusters & Presets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Our validation process evaluates your idea across several key clusters.
              Presets allow you to automatically adjust the weightage of these clusters based on your primary goal.
            </p>
            <ul className="list-disc list-inside text-muted-foreground ml-4">
              <li><b>Balanced:</b> Equal importance to all clusters.</li>
              <li><b>Research:</b> Focuses more on Innovation and Technical Feasibility.</li>
              <li><b>Commercialization:</b> Emphasizes Market Fit and Scalability.</li>
              <li><b>Manual:</b> Gives you full control to set custom weights.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

        <Card>
            <CardHeader><CardTitle>Frequently Asked Questions</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How long does validation take?</AccordionTrigger>
                        <AccordionContent>
                        The AI validation process is typically completed within a few minutes. You will receive an email notification once your report is ready.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What does the "Moderate" verdict mean?</AccordionTrigger>
                        <AccordionContent>
                        A "Moderate" verdict indicates that your idea has potential but also has some weaknesses that need to be addressed. The detailed report will provide specific recommendations for improvement.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I get more credits?</AccordionTrigger>
                        <AccordionContent>
                        Yes, innovators can request more credits from the "Request Credits" page, which will be sent to your TTC Coordinator for approval. College Principals can purchase additional credits in the "Plan & Payment" section.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-4 mb-6">
                <div>
                  <p className="font-semibold text-foreground">Stacia Corp</p>
                  <p>Ground Floor, C-53, Guindy Industrial Estate,</p>
                  <p>Guindy, Chennai - 32, Tamil Nadu</p>
                  <p>support@staciacorp.com</p>
                </div>
                <p>
                  Still have questions? Launch our chatbot for instant help or contact our support team directly.
                </p>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Launch Chatbot</Button>
                    <DialogTrigger asChild>
                        <Button>Contact Support</Button>
                    </DialogTrigger>
                </div>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Contact Support</DialogTitle>
                        <DialogDescription>
                            Fill out the form below and we'll get back to you as soon as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitSupportRequest}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Your Name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" placeholder="e.g., Issue with idea submission" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="message" placeholder="Describe your issue or question here." required />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Send Message</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
    </div>
  );
}
