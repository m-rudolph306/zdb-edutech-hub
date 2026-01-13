import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Section 1: Company Information
  companyName: z.string().min(1, "Company name is required"),
  websiteUrl: z.string().url("Must be a valid URL"),
  yearFounded: z.string().optional(),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Must be a valid email"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  
  // Section 2: Your Innovation
  innovationName: z.string().min(1, "Innovation name is required"),
  category: z.string().min(1, "Category is required"),
  targetAudience: z.array(z.string()).min(1, "Select at least one target audience"),
  tagline: z.string().min(1, "Tagline is required").max(100, "Maximum 100 characters"),
  description: z.string().min(1, "Description is required").max(3000, "Maximum 500 words"),
  keyFeatures: z.string().min(1, "Key features are required"),
  currentStage: z.string().min(1, "Current stage is required"),
  traction: z.string().max(1200, "Maximum 200 words").optional(),
  
  // Section 3: Why Innovation Area
  whyParticipate: z.string().min(1, "This field is required").max(1200, "Maximum 200 words"),
  whatToAchieve: z.string().min(1, "This field is required").max(1200, "Maximum 200 words"),
  participatedBefore: z.enum(["yes", "no"]),
  participationDetails: z.string().optional(),
  
  // Section 4: Confirmation
  confirmAccuracy: z.boolean().refine(val => val === true, "You must confirm"),
  understandSelection: z.boolean().refine(val => val === true, "You must confirm"),
  canAttend: z.boolean().refine(val => val === true, "You must confirm"),
});

type FormData = z.infer<typeof formSchema>;

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCounts, setCharCounts] = useState({
    tagline: 0,
    description: 0,
    traction: 0,
    whyParticipate: 0,
    whatToAchieve: 0,
  });

  const eventParam = searchParams.get("event") || "mainz-2026";
  
  const eventData: Record<string, { name: string; round: 1 | 2; events: string[] }> = {
    "mainz-2026": { name: "Mainz 2026", round: 1, events: ["Mainz", "Magdeburg", "Berlin"] },
    "magdeburg-2026": { name: "Magdeburg 2026", round: 1, events: ["Mainz", "Magdeburg", "Berlin"] },
    "berlin-2026": { name: "Berlin 2026", round: 1, events: ["Mainz", "Magdeburg", "Berlin"] },
    "erfurt-2026": { name: "Erfurt 2026", round: 2, events: ["Erfurt", "Essen", "Rostock"] },
    "essen-2026": { name: "Essen 2026", round: 2, events: ["Erfurt", "Essen", "Rostock"] },
    "rostock-2026": { name: "Rostock 2026", round: 2, events: ["Erfurt", "Essen", "Rostock"] },
  };
  
  const currentEventData = eventData[eventParam] || { name: "Mainz 2026", round: 1, events: ["Mainz", "Magdeburg", "Berlin"] };
  const eventName = currentEventData.name;
  const applicationRound = currentEventData.round;
  const roundEvents = currentEventData.events.join(", ");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: user?.companyName || "",
      contactEmail: user?.email || "",
      targetAudience: [],
      participatedBefore: "no",
      confirmAccuracy: false,
      understandSelection: false,
      canAttend: false,
    },
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    const draftKey = `application_draft_${eventParam}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        form.reset(draft);
        toast({
          title: t("applicationForm.toast.draftLoaded"),
          description: t("applicationForm.toast.draftLoadedDescription"),
        });
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, [eventParam, form]);

  // Update character counts
  const watchedFields = form.watch();
  useEffect(() => {
    setCharCounts({
      tagline: watchedFields.tagline?.length || 0,
      description: watchedFields.description?.length || 0,
      traction: watchedFields.traction?.length || 0,
      whyParticipate: watchedFields.whyParticipate?.length || 0,
      whatToAchieve: watchedFields.whatToAchieve?.length || 0,
    });
  }, [watchedFields]);

  const handleSaveDraft = () => {
    const draftKey = `application_draft_${eventParam}`;
    localStorage.setItem(draftKey, JSON.stringify(form.getValues()));
    toast({
      title: t("applicationForm.toast.draftSaved"),
      description: t("applicationForm.toast.draftSavedDescription"),
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate application ID
    const applicationId = `IA-2026-${Math.floor(Math.random() * 900) + 100}`;
    
    // Save to localStorage
    const applicationData = {
      id: applicationId,
      event: eventName,
      submittedAt: new Date().toISOString(),
      ...data,
    };
    localStorage.setItem(`application_${applicationId}`, JSON.stringify(applicationData));
    
    // Clear draft
    const draftKey = `application_draft_${eventParam}`;
    localStorage.removeItem(draftKey);
    
    setIsSubmitting(false);
    navigate(`/apply/confirmation?id=${applicationId}`);
  };

  const targetAudienceOptions = [
    "K-12 Schools",
    "Higher Education",
    "Teachers",
    "School Administrators",
    "Students",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/apply/select-event")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event Selection
          </Button>

          <h1 className="text-h1 font-heading mb-2 text-foreground animate-fade-in">
            Application for Innovation Area {eventName}
          </h1>
          <div className="mb-8">
            <p className="text-body text-muted-foreground mb-4 animate-fade-in animate-delay-100">
              Complete this form to apply for the Innovation Area event. All fields marked with <span className="text-red-500">*</span> are required.
            </p>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-small text-foreground">
                <strong>Application Round {applicationRound}</strong> — This application is for Round {applicationRound} events: {roundEvents}
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Section 1: Company Information */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearFounded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Founded</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2020" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+49..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Section 2: Your Innovation */}
              <Card className="animate-fade-in animate-delay-100">
                <CardHeader>
                  <CardTitle>Your Innovation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="innovationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Innovation Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ai">AI & Machine Learning</SelectItem>
                            <SelectItem value="vr">Virtual/Augmented Reality</SelectItem>
                            <SelectItem value="assessment">Assessment & Analytics</SelectItem>
                            <SelectItem value="teacher-tools">Teacher Tools</SelectItem>
                            <SelectItem value="content-creation">Content Creation</SelectItem>
                            <SelectItem value="lms">Learning Management</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={() => (
                      <FormItem>
                        <FormLabel>Target Audience <span className="text-red-500">*</span></FormLabel>
                        <div className="space-y-2">
                          {targetAudienceOptions.map((option) => (
                            <FormField
                              key={option}
                              control={form.control}
                              name="targetAudience"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== option)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{option}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-line Tagline <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input maxLength={100} {...field} />
                        </FormControl>
                        <div className="text-sm text-muted-foreground text-right">
                          {charCounts.tagline}/100 characters
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your innovation, the problem it solves, and its impact on education"
                            className="min-h-[150px]"
                            maxLength={3000}
                            {...field}
                          />
                        </FormControl>
                        <div className="text-sm text-muted-foreground text-right">
                          {charCounts.description}/3000 characters (approx. 500 words)
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keyFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Features <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List 3-5 main features"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Stage <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select current stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="prototype">Prototype</SelectItem>
                            <SelectItem value="beta">Beta Testing</SelectItem>
                            <SelectItem value="launched">Launched</SelectItem>
                            <SelectItem value="growth">Growth Stage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="traction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Traction/Results</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Number of schools/users, pilot results, customer testimonials"
                            className="min-h-[100px]"
                            maxLength={1200}
                            {...field}
                          />
                        </FormControl>
                        <div className="text-sm text-muted-foreground text-right">
                          {charCounts.traction}/1200 characters (approx. 200 words)
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Section 3: Why Innovation Area */}
              <Card className="animate-fade-in animate-delay-200">
                <CardHeader>
                  <CardTitle>Why Innovation Area?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="whyParticipate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to participate? <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[100px]"
                            maxLength={1200}
                            {...field}
                          />
                        </FormControl>
                        <div className="text-sm text-muted-foreground text-right">
                          {charCounts.whyParticipate}/1200 characters (approx. 200 words)
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatToAchieve"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What do you hope to achieve? <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[100px]"
                            maxLength={1200}
                            {...field}
                          />
                        </FormControl>
                        <div className="text-sm text-muted-foreground text-right">
                          {charCounts.whatToAchieve}/1200 characters (approx. 200 words)
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="participatedBefore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Have you participated before? <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("participatedBefore") === "yes" && (
                    <FormField
                      control={form.control}
                      name="participationDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please provide details</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Section 4: Confirmation */}
              <Card className="animate-fade-in animate-delay-300">
                <CardHeader>
                  <CardTitle>Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="confirmAccuracy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I confirm all information is accurate <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="understandSelection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I understand selection is not guaranteed <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="canAttend"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I can attend on the event date <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveDraft}
                  size="lg"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  size="lg"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApplicationForm;