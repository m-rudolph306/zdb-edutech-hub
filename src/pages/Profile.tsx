import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Building, Globe, Save, ArrowLeft } from "lucide-react";

interface ProfileData {
  companyName: string;
  contactPerson: string;
  email: string;
  website: string;
  description: string;
}

const Profile = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    companyName: "",
    contactPerson: "",
    email: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    // Load existing profile data
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        // Initialize with user data
        setProfile((prev) => ({
          ...prev,
          email: user.email,
          companyName: user.companyName,
        }));
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to localStorage
    if (user) {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));

      // Also update user in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) =>
        u.id === user.id ? { ...u, companyName: profile.companyName } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    toast({
      title: t("profile.save.success.title"),
      description: t("profile.save.success.description"),
    });

    setIsSubmitting(false);
  };

  const getRoleBadge = () => {
    const role = (user as any)?.role || "innovator";
    const roleLabels: Record<string, string> = {
      innovator: t("profile.role.innovator"),
      admin: t("profile.role.admin"),
      politician: t("profile.role.politician"),
    };
    const roleColors: Record<string, string> = {
      innovator: "bg-secondary text-secondary-foreground",
      admin: "bg-primary text-primary-foreground",
      politician: "bg-amber-500 text-white",
    };
    return (
      <Badge className={roleColors[role] || roleColors.innovator}>
        {roleLabels[role] || roleLabels.innovator}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 px-4 md:px-6 mt-[100px] bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("profile.backToDashboard")}
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("profile.title")}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                {getRoleBadge()}
                <span className="text-muted-foreground text-sm">{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Form */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {t("profile.company.title")}
                  </CardTitle>
                  <CardDescription>{t("profile.company.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">{t("profile.form.companyName")}</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={profile.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">{t("profile.form.contactPerson")}</Label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        value={profile.contactPerson}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">{t("profile.form.description")}</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={profile.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t("profile.form.descriptionPlaceholder")}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    {t("profile.contact.title")}
                  </CardTitle>
                  <CardDescription>{t("profile.contact.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("profile.form.email")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">{t("profile.form.website")}</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          name="website"
                          value={profile.website}
                          onChange={handleChange}
                          className="pl-10"
                          placeholder="https://"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? t("profile.saving") : t("profile.save")}
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

export default Profile;
