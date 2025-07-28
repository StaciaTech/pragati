
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
import { Input } from '@/components/ui/input';
import { LifeBuoy, Search } from 'lucide-react';
import { ChatbotWidget } from '@/components/chatbot-widget';


export default function SupportPage() {

  const faqs = [
    {
      question: "How long does validation take?",
      answer: "The AI validation process is typically completed within a few minutes. You will receive an email notification once your report is ready.",
    },
    {
      question: "What does the 'Moderate' verdict mean?",
      answer: "A 'Moderate' verdict indicates that your idea has potential but also has some weaknesses that need to be addressed. The detailed report will provide specific recommendations for improvement.",
    },
    {
      question: "Can I get more credits?",
      answer: "Yes, innovators can request more credits from the 'Request Credits' page, which will be sent to your TTC Coordinator for approval. College Principals can purchase additional credits in the 'Plan & Payment' section.",
    },
     {
      question: "Where can I find my validation report?",
      answer: "Your validation reports are available in the 'My Ideas' section. Click on any idea to view its detailed report.",
    },
  ]

  return (
    <>
    <div className="space-y-6">
       <Card className="w-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg border-0 relative overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-br from-[#FF00CC] to-[#333399] opacity-30 blur-3xl filter" />
        <div className="absolute -bottom-1/4 -right-1/4 h-full w-full animate-wavy-bounce-2 rounded-full bg-gradient-to-tl from-[#F472B6] to-[#06B6D4] opacity-20 blur-3xl filter" />
        <div className="relative z-10 p-6">
          <div className="flex flex-col items-center text-center">
            <LifeBuoy className="w-16 h-16 text-white mb-4" />
            <h1 className="text-3xl font-bold text-white">How can we help you?</h1>
            <p className="mt-2 text-primary-foreground/80 max-w-xl">
              Have a question? Find answers in our FAQs, guides, or chat with our AI assistant.
            </p>
             <div className="relative mt-6 w-full max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for answers..." className="pl-12 h-12 rounded-full bg-primary-foreground/20 border-0 placeholder:text-primary-foreground/60" />
            </div>
          </div>
        </div>
      </Card>

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
                    {faqs.map((faq, i) => (
                         <AccordionItem value={`item-${i}`} key={i}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">Stacia Corp</p>
                  <p>Ground Floor, C-53, Guindy Industrial Estate,</p>
                  <p>Guindy, Chennai - 32, Tamil Nadu</p>
                  <p>support@staciacorp.com</p>
                </div>
            </div>
          </CardContent>
        </Card>
    </div>
    <ChatbotWidget />
    </>
  );
}
