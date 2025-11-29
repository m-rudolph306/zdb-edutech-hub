import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar, FileText, Clock } from "lucide-react";

const ApplicationConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("id");
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    if (!applicationId) {
      navigate("/");
      return;
    }

    const storedData = localStorage.getItem(`application_${applicationId}`);
    if (storedData) {
      setApplicationData(JSON.parse(storedData));
    }
  }, [applicationId, navigate]);

  if (!applicationData) {
    return null;
  }

  const submittedDate = new Date(applicationData.submittedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-16 md:py-24 px-4 md:px-6 mt-[72px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <CheckCircle2 className="h-20 w-20 text-secondary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Application Submitted Successfully!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your application for Innovation Area {applicationData.event} has been received
            </p>
          </div>

          <Card className="mb-8 animate-fade-in animate-delay-100">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Application ID:</span>
                  </div>
                  <span className="text-lg font-bold text-primary">#{applicationId}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Event:</span>
                  </div>
                  <span>{applicationData.event}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Submitted:</span>
                  </div>
                  <span>{submittedDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge variant="secondary">Submitted</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 animate-fade-in animate-delay-200">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">What happens next?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Our advisory board will review your application (typically 2-4 weeks)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>You'll receive email updates on your application status</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Track your application in your dashboard</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row gap-4 animate-fade-in animate-delay-300">
            <Button
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              size="lg"
            >
              View My Dashboard
            </Button>
            <Button
              onClick={() => navigate("/apply/select-event")}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Apply to Another Event
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApplicationConfirmation;