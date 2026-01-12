import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserRole } from "@/contexts/AuthContext";
import { Clock, CheckCircle2 } from "lucide-react";

interface SignupRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SignupRequest {
  id: string;
  email: string;
  companyName: string;
  contactPerson: string;
  website: string;
  shortDescription: string;
  role: UserRole;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const SignupRequestModal = ({ open, onOpenChange }: SignupRequestModalProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [role, setRole] = useState<UserRole>("innovator");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !companyName || !contactPerson || !shortDescription) {
      toast({
        title: t("signup.error.title"),
        description: t("signup.error.requiredFields"),
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: t("signup.error.title"),
        description: t("signup.error.invalidEmail"),
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: t("signup.error.title"),
        description: t("signup.error.agreeTerms"),
        variant: "destructive",
      });
      return;
    }

    // Seed admin auto-approval
    const isAdminSeed = email.toLowerCase() === "admin@zdb.de";

    // Create signup request
    const signupRequest: SignupRequest = {
      id: `SR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email,
      companyName,
      contactPerson,
      website,
      shortDescription,
      role: isAdminSeed ? "admin" : role,
      status: isAdminSeed ? "approved" : "pending",
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem("signupRequests") || "[]");

    // Check if email already submitted
    const existingRequest = existingRequests.find((r: SignupRequest) => r.email === email);
    if (existingRequest) {
      toast({
        title: t("signup.error.note"),
        description: t("signup.error.emailExists"),
        variant: "destructive",
      });
      return;
    }

    existingRequests.push(signupRequest);
    localStorage.setItem("signupRequests", JSON.stringify(existingRequests));

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    setCompanyName("");
    setContactPerson("");
    setWebsite("");
    setShortDescription("");
    setRole("innovator");
    setAgreeTerms(false);
    onOpenChange(false);
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t("signup.success.title")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("signup.success.description")}
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                {t("signup.success.nextSteps")}
              </h3>
              <ol className="text-sm text-muted-foreground space-y-2 ml-6 list-decimal">
                <li>{t("signup.success.step1")}</li>
                <li>{t("signup.success.step2")}</li>
                <li>{t("signup.success.step3")}</li>
              </ol>
            </div>
            <Button onClick={handleClose} className="w-full">
              {t("signup.close")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("signup.title")}</DialogTitle>
          <DialogDescription>
            {t("signup.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">{t("signup.form.role")} *</Label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder={t("signup.form.selectRole")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="innovator">{t("signup.role.innovator")}</SelectItem>
                <SelectItem value="politician">{t("signup.role.politician")}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{t("signup.form.roleHint")}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-name">{t("signup.form.companyName")} *</Label>
            <Input
              id="company-name"
              type="text"
              placeholder={t("signup.form.companyNamePlaceholder")}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-person">{t("signup.form.contactPerson")} *</Label>
            <Input
              id="contact-person"
              type="text"
              placeholder={t("signup.form.contactPersonPlaceholder")}
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("signup.form.email")} *</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("signup.form.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">{t("signup.form.website")}</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://www.example.de"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short-description">{t("signup.form.description")} *</Label>
            <Textarea
              id="short-description"
              placeholder={t("signup.form.descriptionPlaceholder")}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              rows={4}
            />
            <p className="text-xs text-muted-foreground">{shortDescription.length}/500 {t("signup.form.characters")}</p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-tight"
            >
              {t("signup.form.agreeTerms")} *
            </label>
          </div>

          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
            {t("signup.form.submit")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupRequestModal;
