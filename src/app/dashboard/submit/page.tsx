
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FileUp,
  Flame,
  Lightbulb,
  Mountain,
  Package,
  Target,
  Users,
} from 'lucide-react';

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
} from '@/components/ui/stepper';

const submitIdeaSchema = z.object({
  // Step 1
  innovation: z.number().min(0).max(100).default(20),
  marketFit: z.number().min(0).max(100).default(20),
  technicalFeasibility: z.number().min(0).max(100).default(20),
  teamStrength: z.number().min(0).max(100).default(15),
  scalability: z.number().min(0).max(100).default(15),
  socialImpact: z.number().min(0).max(100).default(10),

  // Step 2
  ideaDescription: z.string().min(1, 'Description is required.'),
  pptFile: z.any().refine((file) => file, 'PPT file is required.'),
  validationPurpose: z.string().min(1, 'Validation purpose is required.'),
  projectDomain: z.string().min(1, 'Project domain is required.'),
});

type SubmitIdeaForm = z.infer<typeof submitIdeaSchema>;

const defaultValues: Partial<SubmitIdeaForm> = {
  innovation: 20,
  marketFit: 20,
  technicalFeasibility: 20,
  teamStrength: 15,
  scalability: 15,
  socialImpact: 10,
  ideaDescription: '',
};

const presets = {
  balanced: {
    innovation: 20,
    marketFit: 20,
    technicalFeasibility: 20,
    teamStrength: 15,
    scalability: 15,
    socialImpact: 10,
  },
  'r&d': {
    innovation: 30,
    marketFit: 10,
    technicalFeasibility: 30,
    teamStrength: 15,
    scalability: 5,
    socialImpact: 10,
  },
  marketReady: {
    innovation: 10,
    marketFit: 30,
    technicalFeasibility: 15,
    teamStrength: 15,
    scalability: 25,
    socialImpact: 5,
  },
  impact: {
    innovation: 15,
    marketFit: 15,
    technicalFeasibility: 15,
    teamStrength: 15,
    scalability: 10,
    socialImpact: 30,
  },
};

const clusters = [
  { id: 'innovation', label: 'Innovation', icon: Lightbulb },
  { id: 'marketFit', label: 'Market Fit', icon: Target },
  {
    id: 'technicalFeasibility',
    label: 'Technical Feasibility',
    icon: Flame,
  },
  { id: 'teamStrength', label: 'Team Strength', icon: Users },
  { id: 'scalability', label: 'Scalability', icon: Mountain },
  { id: 'socialImpact', label: 'Social Impact', icon: Package },
] as const;

export default function SubmitIdeaPage() {
  const form = useForm<SubmitIdeaForm>({
    resolver: zodResolver(submitIdeaSchema),
    defaultValues,
  });

  const [totalWeight, setTotalWeight] = React.useState(100);

  const watchFields = form.watch(clusters.map((c) => c.id));

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      const currentTotal = clusters.reduce(
        (acc, cluster) => acc + (values[cluster.id] || 0),
        0
      );
      setTotalWeight(currentTotal);
    });
    return () => subscription.unsubscribe();
  }, [form]);
  
  const handlePresetChange = (
    presetKey: 'balanced' | 'r&d' | 'marketReady' | 'impact'
  ) => {
    const presetValues = presets[presetKey];
    Object.entries(presetValues).forEach(([key, value]) => {
      form.setValue(key as keyof SubmitIdeaForm, value);
    });
  };

  const onSubmit = (data: SubmitIdeaForm) => {
    console.log(data);
    // Handle form submission logic here
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
            <Stepper>
              <StepperItem>
                <StepperTrigger>
                  <CardTitle>Idea Settings - Cluster Weightage</CardTitle>
                  <CardDescription>
                    Adjust weights for each cluster to match your idea's focus.
                  </CardDescription>
                </StepperTrigger>
                <StepperContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
                    <div className="md:col-span-2 space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePresetChange('balanced')}
                          >
                            Balanced
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePresetChange('r&d')}
                          >
                            R&D Focused
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePresetChange('marketReady')}
                          >
                            Market Ready
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePresetChange('impact')}
                          >
                            Impact
                          </Button>
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            totalWeight !== 100
                              ? 'text-destructive'
                              : 'text-muted-foreground'
                          }`}
                        >
                          Total Weight: {totalWeight}%
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                        {clusters.map(({ id, label, icon: Icon }) => (
                          <FormField
                            key={id}
                            control={form.control}
                            name={id}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Icon className="size-4" />
                                  <span>{label}</span>
                                  <span className="text-primary font-bold ml-auto">
                                    {field.value}%
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Slider
                                    value={[field.value]}
                                    onValueChange={(value) =>
                                      field.onChange(value[0])
                                    }
                                    max={100}
                                    step={1}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                       {totalWeight !== 100 && (
                        <p className="text-sm text-destructive text-center">
                          Total weightage must be equal to 100%.
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-1 flex items-center justify-center">
                       <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Spider chart placeholder</p>
                       </div>
                    </div>
                  </div>
                </StepperContent>
              </StepperItem>

              <StepperItem>
                <StepperTrigger>
                  <CardTitle>Upload Idea Details</CardTitle>
                  <CardDescription>
                    Provide your idea description and supporting documents.
                  </CardDescription>
                </StepperTrigger>
                <StepperContent>
                  <div className="space-y-6 py-6">
                    <FormField
                      control={form.control}
                      name="ideaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Idea Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe the core concept of your idea..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pptFile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload PPT</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FileUp className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                              <Input
                                type="file"
                                className="pl-10"
                                accept=".ppt, .pptx"
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.files ? e.target.files[0] : null
                                  )
                                }
                              />
                            </div>
                          </FormControl>
                           <FormDescription>
                            Please adhere to the provided PPT format guidelines.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormField
                        control={form.control}
                        name="validationPurpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Validation Purpose</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a purpose" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="market-fit">
                                  Market Fit
                                </SelectItem>
                                <SelectItem value="novelty-check">
                                  Novelty Check
                                </SelectItem>
                                <SelectItem value="mvp-readiness">
                                  MVP Readiness
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="projectDomain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Domain/Category</FormLabel>
                             <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a domain" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="health-tech">
                                  HealthTech
                                </SelectItem>
                                <SelectItem value="ed-tech">
                                  EdTech
                                </SelectItem>
                                <SelectItem value="fin-tech">
                                  FinTech
                                </SelectItem>
                                <SelectItem value="agri-tech">
                                  AgriTech
                                </SelectItem>
                                 <SelectItem value="saas">
                                  SaaS
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                  </div>
                </StepperContent>
              </StepperItem>
              <StepperItem>
                 <StepperTrigger>
                  <CardTitle>Submit</CardTitle>
                  <CardDescription>
                    Review and submit your idea for validation.
                  </CardDescription>
                </StepperTrigger>
                 <StepperContent>
                    <div className="flex h-48 items-center justify-center">
                        <p className="text-muted-foreground">Ready to submit?</p>
                    </div>
                </StepperContent>
              </StepperItem>
              <CardFooter className="flex justify-end gap-2 pt-6">
                <StepperPrevious variant="outline" />
                <StepperNext />
                {/* Submit button will be active on the last step */}
                 <Button type="submit" className="hidden">Submit Idea</Button>
              </CardFooter>
            </Stepper>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
