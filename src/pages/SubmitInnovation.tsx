import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { BUNDESLAENDER } from "@/data/innovations";
import { ArrowLeft, Lightbulb, CheckCircle2 } from "lucide-react";

const CATEGORIES = ["AI", "VR", "Assessment", "Management", "Content Creation"];
const TECHNOLOGIES = ["Software", "Hardware", "Platform"];

interface InnovationSubmission {
  id: string;
  name: string;
  description: string;
  categories: string[];
  region: string;
  technology: string;
  website: string;
  submittedBy: string;
  submittedByEmail: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const SubmitInnovation = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categories: [] as string[],
    region: "",
    technology: "",
    website: "",
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c !== category),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      toast({
        title: t("submitInnovation.error.title"),
        description: t("submitInnovation.error.selectCategory"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.region) {
      toast({
        title: t("submitInnovation.error.title"),
        description: t("submitInnovation.error.selectRegion"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.technology) {
      toast({
        title: t("submitInnovation.error.title"),
        description: t("submitInnovation.error.selectTechnology"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Generate unique ID
    const id = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setSubmissionId(id);

    const submission: InnovationSubmission = {
      id,
      name: formData.name,
      description: formData.description,
      categories: formData.categories,
      region: formData.region,
      technology: formData.technology,
      website: formData.website,
      submittedBy: user?.id || "",
      submittedByEmail: user?.email || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem(`innovation_${id}`, JSON.stringify(submission));

    // Also add to user's innovations list
    const userInnovations = JSON.parse(localStorage.getItem(`user_innovations_${user?.id}`) || "[]");
    userInnovations.push(id);
    localStorage.setItem(`user_innovations_${user?.id}`, JSON.stringify(userInnovations));

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: t("submitInnovation.success.title"),
      description: t("submitInnovation.success.description"),
    });
  };

  if (isSubmitted) {
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
              {t("submitInnovation.confirmation.title")}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {t("submitInnovation.confirmation.description")}
            </p>
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">{t("submitInnovation.confirmation.submissionId")}</p>
              <p className="text-2xl font-bold text-primary">{submissionId}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/dashboard")} variant="outline">
                {t("submitInnovation.confirmation.backToDashboard")}
              </Button>
              <Button onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  description: "",
                  categories: [],
                  region: "",
                  technology: "",
                  website: "",
                });
              }} className="bg-secondary hover:bg-secondary/90">
                {t("submitInnovation.confirmation.submitAnother")}
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
      <section className="relative py-12 md:py-16 px-4 md:px-6 mt-[100px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("submitInnovation.backToDashboard")}
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
              <Lightbulb className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("submitInnovation.title")}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t("submitInnovation.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("submitInnovation.form.basicInfo")}</CardTitle>
                  <CardDescription>{t("submitInnovation.form.basicInfoDescription")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("submitInnovation.form.name")} *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("submitInnovation.form.namePlaceholder")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">{t("submitInnovation.form.description")} *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={t("submitInnovation.form.descriptionPlaceholder")}
                      rows={5}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.description.length}/500 {t("submitInnovation.form.characters")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">{t("submitInnovation.form.website")}</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://www.example.de"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("submitInnovation.form.categories")} *</CardTitle>
                  <CardDescription>{t("submitInnovation.form.categoriesDescription")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {CATEGORIES.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={formData.categories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location & Technology */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("submitInnovation.form.classification")}</CardTitle>
                  <CardDescription>{t("submitInnovation.form.classificationDescription")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t("submitInnovation.form.region")} *</Label>
                      <Select
                        value={formData.region}
                        onValueChange={(value) => setFormData({ ...formData, region: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("submitInnovation.form.regionPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {BUNDESLAENDER.map((land) => (
                            <SelectItem key={land} value={land}>
                              {land}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("submitInnovation.form.technology")} *</Label>
                      <Select
                        value={formData.technology}
                        onValueChange={(value) => setFormData({ ...formData, technology: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("submitInnovation.form.technologyPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {TECHNOLOGIES.map((tech) => (
                            <SelectItem key={tech} value={tech}>
                              {tech}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                  {t("submitInnovation.form.cancel")}
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-secondary hover:bg-secondary/90">
                  {isSubmitting ? t("submitInnovation.form.submitting") : t("submitInnovation.form.submit")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubmitInnovation;
