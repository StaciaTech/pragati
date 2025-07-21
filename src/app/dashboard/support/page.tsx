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


export default function SupportPage() {
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
            <p className="text-muted-foreground text-sm mb-4">
              Still have questions? Launch our chatbot for instant help or contact our support team directly.
            </p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline">Launch Chatbot</Button>
                <Button>Contact Support</Button>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}