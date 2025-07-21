'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { FileUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperNext,
  StepperPrevious,
  StepperTrigger,
  useStepper,
} from '@/components/ui/stepper';
import { SpiderChart } from '@/components/spider-chart';
import { MOCK_CLUSTER_DEFINITIONS, INITIAL_CLUSTER_WEIGHTS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

// New: Import the AI flow
import { generateValidationReport } from '@/ai/flows/generate-validation-report';

const clusterKeys = Object.keys(INITIAL_CLUSTER_WEIGHTS);
const weightageSchema = clusterKeys.reduce((acc, key) => {
    acc[key] = z.number().min(0).max(100);
    return acc;
}, {} as Record<string, z.ZodNumber>);


const submitIdeaSchema = z.object({
  // Step 1
  ...weightageSchema,
  preset: z.string().default('Balanced'),

  // Step 2
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  pptFile: z.any().optional(), // Making PPT optional for now
  validationPurpose: z.string().min(1, 'Validation purpose is required.'),
  domain: z.string().min(1, 'Project domain is required.'),
});

type SubmitIdeaForm = z.infer<typeof submitIdeaSchema>;

const defaultValues: Partial<SubmitIdeaForm> = {
  ...INITIAL_CLUSTER_WEIGHTS,
  preset: 'Balanced',
  title: '',
  description: '',
};

const presets = {
  Balanced: INITIAL_CLUSTER_WEIGHTS,
  Research: {
    "Core Idea": 30,
    "Market Opportunity": 10,
    "Execution": 15,
    "Business Model": 15,
    "Team": 10,
    "Compliance": 10,
    "Risk & Strategy": 10,
  },
  Commercialization: {
    "Core Idea": 10,
    "Market Opportunity": 30,
    "Execution": 15,
    "Business Model": 15,
    "Team": 10,
    "Compliance": 10,
    "Risk & Strategy": 10,
  },
};

const clusters = Object.keys(INITIAL_CLUSTER_WEIGHTS);

function Step1({ form }: { form: any }) {
  const { activeStep, setActiveStep, ...stepperProps } = useStepper();
  const { toast } = useToast();
  const preset = form.watch('preset');
  const watchedWeights = form.watch(clusters);
  const totalWeight = clusters.reduce((acc, cluster, i) => acc + (watchedWeights[i] || 0), 0);

  const handlePresetChange = (presetKey: 'Balanced' | 'Research' | 'Commercialization' | 'Manual') => {
      form.setValue('preset', presetKey);
      if (presetKey !== 'Manual') {
        const presetValues = presets[presetKey as keyof typeof presets];
        Object.entries(presetValues).forEach(([key, value]) => {
            form.setValue(key, value);
        });
      }
  };

  const handleNext = () => {
    if (preset === 'Manual' && totalWeight !== 100) {
        toast({
            variant: "destructive",
            title: "Weightage Error",
            description: "In Manual mode, the total weightage must sum to 100%.",
        });
        return;
    }
    setActiveStep(activeStep + 1);
  }

  return (
    <StepperItem index={0} {...stepperProps}>
      <StepperTrigger>
        <CardTitle>Idea Settings - Cluster Weightage</CardTitle>
        <CardDescription>Adjust weights to match your idea's focus.</CardDescription>
      </StepperTrigger>
      <StepperContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
          <div className="md:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2">
                <Button size="sm" variant={preset === 'Balanced' ? 'default' : 'outline'} onClick={() => handlePresetChange('Balanced')}>Balanced</Button>
                <Button size="sm" variant={preset === 'Research' ? 'default' : 'outline'} onClick={() => handlePresetChange('Research')}>Research</Button>
                <Button size="sm" variant={preset === 'Commercialization' ? 'default' : 'outline'} onClick={() => handlePresetChange('Commercialization')}>Commercialization</Button>
                <Button size="sm" variant={preset === 'Manual' ? 'default' : 'outline'} onClick={() => handlePresetChange('Manual')}>Manual</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              {clusters.map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        <span>{key}</span>
                        <span className="text-primary font-bold">{field.value}%</span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          max={100}
                          step={1}
                          disabled={preset !== 'Manual'}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className={`text-sm font-medium p-3 border rounded-lg flex justify-between items-center ${ totalWeight === 100 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-500' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-500'}`}>
                <span>Total Weight:</span>
                <span className="font-bold text-xl">{totalWeight}%</span>
            </div>
          </div>
          <div className="md:col-span-1 flex items-center justify-center">
             <div className="w-full h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                 <SpiderChart data={form.getValues()} size={250} />
             </div>
          </div>
        </div>
        <div className="flex justify-end">
            <Button onClick={handleNext}>Save & Next</Button>
        </div>
      </StepperContent>
    </StepperItem>
  );
}

function Step2({ form }: { form: any }) {
    const { stepper, ...stepperProps } = useStepper();
    return (
        <StepperItem index={1} {...stepperProps}>
        <StepperTrigger>
          <CardTitle>Upload Idea Details</CardTitle>
          <CardDescription>Provide your idea description and supporting documents.</CardDescription>
        </StepperTrigger>
        <StepperContent>
          <div className="space-y-6 py-6">
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                    <FormLabel>Idea Title</FormLabel>
                    <FormControl><Input placeholder="e.g., AI-Powered Crop Disease Detection" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Idea Description</FormLabel>
                  <FormControl><Textarea placeholder="Briefly describe the core concept of your idea..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="pptFile" render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload PPT</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileUp className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input type="file" className="pl-10" accept=".ppt, .pptx" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
                    </div>
                  </FormControl>
                  <FormDescription>Please adhere to the provided PPT format guidelines.</FormDescription>
                  <FormMessage />
                </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField control={form.control} name="validationPurpose" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validation Purpose</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a purpose" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Market Fit Analysis">Market Fit Analysis</SelectItem>
                        <SelectItem value="Technical Feasibility Study">Technical Feasibility Study</SelectItem>
                        <SelectItem value="Innovation Assessment">Innovation Assessment</SelectItem>
                        <SelectItem value="Scalability Potential">Scalability Potential</SelectItem>
                        <SelectItem value="Social Impact Evaluation">Social Impact Evaluation</SelectItem>
                        <SelectItem value="Comprehensive Review">Comprehensive Review</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
               <FormField control={form.control} name="domain" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Domain/Category</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a domain" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                        <SelectItem value="EdTech">EdTech</SelectItem>
                        <SelectItem value="FinTech">FinTech</SelectItem>
                        <SelectItem value="Agriculture">Agriculture</SelectItem>
                        <SelectItem value="Smart Cities">Smart Cities</SelectItem>
                        <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                        <SelectItem value="SpaceTech">SpaceTech</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
          </div>
          <div className="flex justify-between">
              <StepperPrevious variant="outline" />
              <StepperNext>Review & Submit</StepperNext>
          </div>
        </StepperContent>
      </StepperItem>
    );
}

function Step3({ form }: { form: any }) {
    const { stepper, ...stepperProps } = useStepper();
    const allValues = form.getValues();
    const weights = clusters.reduce((acc, key) => ({...acc, [key]: allValues[key]}), {});

    return (
         <StepperItem index={2} {...stepperProps}>
         <StepperTrigger>
          <CardTitle>Review and Submit</CardTitle>
          <CardDescription>Review your details before final submission.</CardDescription>
        </StepperTrigger>
         <StepperContent>
            <div className="space-y-6 py-6">
                <Card>
                    <CardHeader><CardTitle className="text-lg">Idea Details</CardTitle></CardHeader>
                    <CardContent className="text-sm space-y-2">
                        <p><span className="font-medium text-muted-foreground">Title:</span> {allValues.title}</p>
                        <p><span className="font-medium text-muted-foreground">Description:</span> {allValues.description}</p>
                        <p><span className="font-medium text-muted-foreground">PPT File:</span> {allValues.pptFile?.name || 'Not provided'}</p>
                        <p><span className="font-medium text-muted-foreground">Purpose:</span> {allValues.validationPurpose}</p>
                        <p><span className="font-medium text-muted-foreground">Domain:</span> {allValues.domain}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-lg">Cluster Weightage</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4"><span className="font-medium">Preset:</span> {allValues.preset}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(weights).map(([key, value]) => (
                                <p key={key}><span className="font-medium text-muted-foreground">{key}:</span> {value as number}%</p>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <SpiderChart data={weights} size={200} />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-between">
              <StepperPrevious variant="outline" />
              <Button type="submit">Submit Idea (1 Credit)</Button>
          </div>
        </StepperContent>
      </StepperItem>
    )
}

export default function SubmitIdeaPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SubmitIdeaForm>({
    resolver: zodResolver(submitIdeaSchema),
    defaultValues,
  });

  const onSubmit = async (data: SubmitIdeaForm) => {
    setIsSubmitting(true);
    toast({
      title: "Submitting Idea...",
      description: "The AI is validating your idea. This may take a moment.",
    });

    try {
      const clusterWeights = clusters.reduce((acc, key) => {
        acc[key] = data[key as keyof typeof data] as number;
        return acc;
      }, {} as Record<string, number>);

      const result = await generateValidationReport({
        ideaTitle: data.title,
        ideaDescription: data.description,
        clusterWeights,
      });

      console.log('Validation Result:', result);

      toast({
        title: "Validation Complete!",
        description: `Your idea has been evaluated with a status of: ${result.status}`,
      });
      // Here you would typically redirect the user or update a list of ideas
      // For now, we'll just log and show a success message.

    } catch (error) {
      console.error("Validation failed:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error validating your idea. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit New Idea</CardTitle>
        <CardDescription>
          Follow the steps to validate and launch your innovation journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stepper initialStep={0} orientation="vertical">
              <Step1 form={form} />
              <Step2 form={form} />
              <Step3 form={form} />
            </Stepper>
             {isSubmitting && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="text-muted-foreground">AI is thinking...</p>
                    </div>
                </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
