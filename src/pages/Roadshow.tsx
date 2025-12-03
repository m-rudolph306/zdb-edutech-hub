import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, Award, Briefcase, CheckCircle2, Building2, GraduationCap, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Roadshow = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inquiryId, setInquiryId] = useState("");
  const [eventDate, setEventDate] = useState<Date>();

  const [formData, setFormData] = useState({
    organizationType: "",
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    eventName: "",
    eventLocation: "",
    expectedAttendees: "",
    eventType: "",
    focusAreas: [] as string[],
    specialRequirements: "",
    budgetRange: "",
    howDidYouHear: "",
    agreeToContact: false,
  });

  const handleFocusAreaChange = (area: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: checked
        ? [...prev.focusAreas, area]
        : prev.focusAreas.filter((a) => a !== area),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToContact) {
      toast({
        title: "Agreement Required",
        description: "Please agree to be contacted regarding your inquiry",
        variant: "destructive",
      });
      return;
    }

    if (!eventDate) {
      toast({
        title: "Date Required",
        description: "Please select an event date",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Generate inquiry ID
    const id = `RW-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
    setInquiryId(id);

    // Save to localStorage
    const inquiryData = {
      ...formData,
      eventDate: eventDate.toISOString(),
      id,
      submittedAt: new Date().toISOString(),
      status: "new",
    };

    localStorage.setItem(`roadshow_${id}`, JSON.stringify(inquiryData));

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowConfirmation(true);

    toast({
      title: "Inquiry Submitted!",
      description: "We'll contact you within 2-3 business days",
    });

    // Scroll to top to show confirmation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px]">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-secondary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Thank You for Your Inquiry!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              We'll review your request and contact you within 2-3 business days
            </p>
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Your Inquiry ID</p>
              <p className="text-2xl font-bold text-primary">{inquiryId}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/")} variant="outline">
                Return to Homepage
              </Button>
              <Button onClick={() => navigate("/events")} className="bg-secondary hover:bg-secondary/90">
                View Events
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground animate-fade-in">
            Innovation Area On Demand
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-100">
            Bring Germany's premier education innovation showcase to your event
          </p>
          <Button
            size="lg"
            onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg hover:scale-105 transition-all animate-fade-in animate-delay-200"
          >
            Submit Inquiry
          </Button>
        </div>
      </section>

      {/* What is Roadshow Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
            What is Roadshow on Demand?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            Cities, municipalities, education conferences, and trade fairs can book the Innovation Area as a complete package. 
            We bring our curated selection of education innovators directly to your event, complete with professional presentation and moderation.
          </p>
        </div>
      </section>

      {/* Three Benefits */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Innovation Area Roadshow?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Curated Selection</h3>
                <p className="text-muted-foreground">
                  We handpick 5-6 relevant innovators specifically for your audience and event focus
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Professional Execution</h3>
                <p className="text-muted-foreground">
                  Full organization, setup, and moderation included - we handle everything
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Policy Impact</h3>
                <p className="text-muted-foreground">
                  Bring your stakeholders together with vetted education solutions backed by research
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Who Is This For?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Cities & Municipalities</h3>
                <p className="text-muted-foreground">
                  Bring innovation to local education initiatives and policy discussions
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Users className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Education Conferences</h3>
                <p className="text-muted-foreground">
                  Enhance your event with curated innovation showcase and expert moderation
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <Briefcase className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Trade Fairs</h3>
                <p className="text-muted-foreground">
                  Add premium innovation content to your exhibition program
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            How It Works
          </h2>
          <div className="space-y-8">
            {[
              { step: 1, title: "Submit Inquiry", description: "Fill out our form with your event details and requirements" },
              { step: 2, title: "Consultation Call", description: "We'll discuss your goals and audience in a consultation call" },
              { step: 3, title: "Curation", description: "We handpick and prepare the perfect innovators for your event" },
              { step: 4, title: "Your Event", description: "Innovation Area comes to life at your venue with full support" },
            ].map((item, index) => (
              <div key={item.step} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-12 md:py-20 px-4 md:px-6 bg-background scroll-mt-20">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Request Innovation Area for Your Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Type */}
                <div className="space-y-2">
                  <Label htmlFor="organizationType">Organization Type *</Label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city">City/Municipality</SelectItem>
                      <SelectItem value="conference">Education Conference</SelectItem>
                      <SelectItem value="fair">Trade Fair</SelectItem>
                      <SelectItem value="district">School District</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Organization Name */}
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person Name *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                {/* Event Details */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Event Details</h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name *</Label>
                      <Input
                        id="eventName"
                        value={formData.eventName}
                        onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Event Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !eventDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={eventDate}
                            onSelect={setEventDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventLocation">Event Location *</Label>
                      <Input
                        id="eventLocation"
                        value={formData.eventLocation}
                        onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                        placeholder="City, Venue"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                        <Input
                          id="expectedAttendees"
                          type="number"
                          value={formData.expectedAttendees}
                          onChange={(e) => setFormData({ ...formData, expectedAttendees: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select
                          value={formData.eventType}
                          onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="municipal">Municipal Event</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Focus Areas</h3>
                  <p className="text-sm text-muted-foreground mb-4">Select all that apply</p>
                  <div className="space-y-3">
                    {[
                      { id: "k12", label: "K-12 Education" },
                      { id: "higher", label: "Higher Education" },
                      { id: "teacher", label: "Teacher Training" },
                      { id: "leadership", label: "Educational Leadership" },
                      { id: "tech", label: "Technology Integration" },
                      { id: "other", label: "Other" },
                    ].map((area) => (
                      <div key={area.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={area.id}
                          checked={formData.focusAreas.includes(area.id)}
                          onCheckedChange={(checked) => handleFocusAreaChange(area.id, checked as boolean)}
                        />
                        <label htmlFor={area.id} className="text-sm cursor-pointer">
                          {area.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    placeholder="Tell us about your event and what you're looking for"
                    rows={4}
                  />
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label htmlFor="budgetRange">Budget Range (Optional)</Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under5k">Under €5,000</SelectItem>
                      <SelectItem value="5k-10k">€5,000 - €10,000</SelectItem>
                      <SelectItem value="10k-20k">€10,000 - €20,000</SelectItem>
                      <SelectItem value="over20k">Over €20,000</SelectItem>
                      <SelectItem value="discuss">To be discussed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* How Did You Hear */}
                <div className="space-y-2">
                  <Label htmlFor="howDidYouHear">How did you hear about us? (Optional)</Label>
                  <Input
                    id="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
                  />
                </div>

                {/* Agreement */}
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="agreeToContact"
                    checked={formData.agreeToContact}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToContact: checked as boolean })}
                    required
                  />
                  <label htmlFor="agreeToContact" className="text-sm cursor-pointer">
                    I agree to be contacted by ZDB regarding this inquiry *
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 text-foreground">How far in advance should we book?</h3>
                <p className="text-muted-foreground">
                  We recommend 3-6 months lead time for optimal curation and preparation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 text-foreground">Can we choose specific innovators?</h3>
                <p className="text-muted-foreground">
                  We welcome your input and will curate based on your focus areas and audience needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 text-foreground">What's included in the package?</h3>
                <p className="text-muted-foreground">
                  Full organization, startup selection, setup, moderation, and teardown - everything you need for a successful showcase.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2 text-foreground">Is this available internationally?</h3>
                <p className="text-muted-foreground">
                  Currently focused on Germany, but we're open to discussions for international events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Roadshow;
