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

        <Card>
          <CardHeader>
            <CardTitle>Video Tutorials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Watch our video tutorials to get started.
            </p>
            <div className="space-y-2">
                <Button variant="link" className="p-0 h-auto">How to Submit an Idea (5 min)</Button><br/>
                <Button variant="link" className="p-0 h-auto">Understanding Your Idea Report (7 min)</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQs & Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Have more questions? Check our comprehensive FAQ section or contact us directly.
            </p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline">View FAQs</Button>
                <Button variant="outline">Launch Chatbot</Button>
                <Button>Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
