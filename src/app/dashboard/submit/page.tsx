
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FileUp, BrainCircuit } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

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
import { INITIAL_CLUSTER_WEIGHTS } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { ROLES } from '@/lib/constants';

const clusterKeys = Object.keys(INITIAL_CLUSTER_WEIGHTS);
const weightageSchema = clusterKeys.reduce((acc, key) => {
    acc[key] = z.number().min(0).max(100);
    return acc;
}, {} as Record<string, z.ZodNumber>);


const submitIdeaSchema = z.object({
  ...weightageSchema,
  preset: z.string().default('Balanced'),

  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  pptFile: z.any().optional(),
  domain: z.string().min(1, 'Project domain is required.'),
  otherDomain: z.string().optional(),
}).refine(data => {
    if (data.domain === 'Other') {
        return !!data.otherDomain && data.otherDomain.length > 0;
    }
    return true;
}, {
    message: 'Please specify your domain',
    path: ['otherDomain'],
});

type SubmitIdeaForm = z.infer<typeof submitIdeaSchema>;

const defaultValues: Partial<SubmitIdeaForm> = {
  ...INITIAL_CLUSTER_WEIGHTS,
  preset: 'Balanced',
  title: '',
  description: '',
  domain: '',
  otherDomain: '',
};

const presets = {
  Balanced: INITIAL_CLUSTER_WEIGHTS,
  "Research-Focused": {
    "Core Idea & Innovation": 30,
    "Market & Commercial Opportunity": 10,
    "Execution & Operations": 20,
    "Business Model & Strategy": 10,
    "Team & Organizational Health": 10,
    "External Environment & Compliance": 10,
    "Risk & Future Outlook": 10
  },
  "Commercialization-Focused": {
    "Core Idea & Innovation": 10,
    "Market & Commercial Opportunity": 30,
    "Execution & Operations": 15,
    "Business Model & Strategy": 20,
    "Team & Organizational Health": 10,
    "External Environment & Compliance": 5,
    "Risk & Future Outlook": 10
  },
};

const clusters = Object.keys(INITIAL_CLUSTER_WEIGHTS);

function Step1({ form }: { form: any }) {
  const { setActiveStep } = useStepper();
  const { toast } = useToast();
  const preset = form.watch('preset');
  const watchedWeights = form.watch(clusters);
  const totalWeight = clusters.reduce((acc, cluster, i) => acc + (form.getValues(cluster) || 0), 0);

  const handlePresetChange = (presetKey: keyof typeof presets | 'Manual') => {
      form.setValue('preset', presetKey);
      if (presetKey !== 'Manual') {
        const presetValues = presets[presetKey as keyof typeof presets];
        Object.entries(presetValues).forEach(([key, value]) => {
            form.setValue(key, value);
        });
      }
  };

  const handleNext = () => {
    const totalWeight = clusters.reduce((acc, cluster) => acc + (form.getValues(cluster) || 0), 0);
    if (preset === 'Manual' && totalWeight !== 100) {
        toast({
            variant: "destructive",
            title: "Weightage Error",
            description: "In Manual mode, the total weightage must sum to 100%.",
        });
        return;
    }
    setActiveStep(1);
  }

  return (
    <StepperItem index={0}>
      <StepperTrigger>
        <CardTitle>Idea Settings - Cluster Weightage</CardTitle>
        <CardDescription>Adjust weights to match your idea's focus.</CardDescription>
      </StepperTrigger>
      <StepperContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
           <div className="w-full space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
                <Button size="sm" variant={preset === 'Balanced' ? 'default' : 'outline'} onClick={() => handlePresetChange('Balanced')}>Balanced</Button>
                <Button size="sm" variant={preset === 'Research-Focused' ? 'default' : 'outline'} onClick={() => handlePresetChange('Research-Focused')}>Research-Focused</Button>
                <Button size="sm" variant={preset === 'Commercialization-Focused' ? 'default' : 'outline'} onClick={() => handlePresetChange('Commercialization-Focused')}>Commercialization-Focused</Button>
                <Button size="sm" variant={preset === 'Manual' ? 'default' : 'outline'} onClick={() => handlePresetChange('Manual')}>Manual</Button>
            </div>
            <div className="space-y-4">
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
          <div className="w-full h-96 bg-background rounded-lg flex items-center justify-center p-4">
              <SpiderChart data={form.getValues()} size={400} />
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
    const domain = form.watch('domain');

    return (
        <StepperItem index={1}>
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
                {domain === 'Other' && (
                    <FormField control={form.control} name="otherDomain" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Please Specify Domain</FormLabel>
                            <FormControl><Input placeholder="e.g., Sustainable Fashion" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                )}
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

function Step3({ form, isSubmitting }: { form: any, isSubmitting: boolean }) {
    const allValues = form.getValues();
    const weights = clusters.reduce((acc, key) => ({...acc, [key]: allValues[key]}), {});

    return (
         <StepperItem index={2}>
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
                        <p><span className="font-medium text-muted-foreground">Domain:</span> {allValues.domain === 'Other' ? allValues.otherDomain : allValues.domain}</p>
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
                            <SpiderChart data={weights} size={300} />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-between">
              <StepperPrevious variant="outline" />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <BrainCircuit className="mr-2 h-4 w-4 animate-spin" />
                        Validating with AI...
                    </>
                ) : (
                    "Submit Idea (1 Credit)"
                )}
              </Button>
          </div>
        </StepperContent>
      </StepperItem>
    )
}

export default function SubmitIdeaPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const getInitialValues = () => {
      const ideaParam = searchParams.get('idea');
      if (ideaParam) {
          try {
              const ideaData = JSON.parse(ideaParam);
              const weights = ideaData.weights || INITIAL_CLUSTER_WEIGHTS;
              return {
                  ...defaultValues,
                  title: ideaData.title || '',
                  description: ideaData.description || '',
                  domain: ideaData.domain || '',
                  ...weights,
              };
          } catch (e) {
              console.error("Failed to parse idea data from URL", e);
              return defaultValues;
          }
      }
      return defaultValues;
  };

  const form = useForm<SubmitIdeaForm>({
    resolver: zodResolver(submitIdeaSchema),
    defaultValues: getInitialValues(),
  });
  
  React.useEffect(() => {
    // This effect runs once on mount to set initial form values
    const initialValues = getInitialValues();
    for (const [key, value] of Object.entries(initialValues)) {
      form.setValue(key as keyof SubmitIdeaForm, value);
    }
  }, [searchParams, form.setValue]);

  const onSubmit = async (data: SubmitIdeaForm) => {
    setIsSubmitting(true);
    toast({
      title: "Submitting Idea...",
      description: "The AI is validating your idea. This may take a moment.",
    });

    const finalDomain = data.domain === 'Other' ? data.otherDomain : data.domain;

    try {
      const response = await fetch('/api/ideas/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          domain: finalDomain,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to validate idea');
      }

      const result = await response.json();
      const newIdeaId = result.idea.id;
      const validationOutcome = result.idea.report.validationOutcome;

      toast({
        title: "Validation Complete!",
        description: `Your idea "${data.title}" has been evaluated with a status of: ${validationOutcome}`,
      });
      
      router.push(`/dashboard/ideas/${newIdeaId}?role=${ROLES.INNOVATOR}`);

    } catch (error) {
      console.error("Validation failed:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: `There was an error validating your idea: ${errorMessage}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Submit New Idea</CardTitle>
        <CardDescription>
          Follow the steps to validate and launch your innovation journey.
        </CardDescription>
        {searchParams.get('idea') && (
            <p className="text-sm font-medium text-blue-600 bg-blue-100 p-3 rounded-md mt-2">
                You are editing a previous submission. Please review and make any necessary changes. Resubmitting will cost 1 credit.
            </p>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stepper initialStep={0} orientation="vertical">
              <Step1 form={form} />
              <Step2 form={form} />
              <Step3 form={form} isSubmitting={isSubmitting} />
            </Stepper>
          </form>
        </Form>
      </CardContent>
       {isSubmitting && (
        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10 rounded-lg">
            <div className="flex items-center space-x-2">
                <BrainCircuit className="h-8 w-8 animate-pulse text-primary" />
            </div>
             <p className="text-muted-foreground mt-2 font-medium">AI is validating your idea...</p>
             <p className="text-muted-foreground text-sm">Please wait, this may take a moment.</p>
        </div>
      )}
    </Card>
  );
}
