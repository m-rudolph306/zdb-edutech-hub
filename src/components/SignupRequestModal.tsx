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
import { useToast } from "@/hooks/use-toast";
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
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const SignupRequestModal = ({ open, onOpenChange }: SignupRequestModalProps) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !companyName || !contactPerson || !shortDescription) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Fehler",
        description: "Sie müssen den Nutzungsbedingungen und der Datenschutzerklärung zustimmen",
        variant: "destructive",
      });
      return;
    }

    // Create signup request
    const signupRequest: SignupRequest = {
      id: `SR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email,
      companyName,
      contactPerson,
      website,
      shortDescription,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem("signupRequests") || "[]");
    
    // Check if email already submitted
    const existingRequest = existingRequests.find((r: SignupRequest) => r.email === email);
    if (existingRequest) {
      toast({
        title: "Hinweis",
        description: "Eine Anfrage mit dieser E-Mail-Adresse existiert bereits",
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
            <h2 className="text-2xl font-bold mb-2">Anfrage eingereicht!</h2>
            <p className="text-muted-foreground mb-6">
              Vielen Dank für Ihre Registrierungsanfrage. Unser Team wird Ihre Angaben prüfen und sich innerhalb von 5-7 Werktagen bei Ihnen melden.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Nächste Schritte:
              </h3>
              <ol className="text-sm text-muted-foreground space-y-2 ml-6 list-decimal">
                <li>Unser Team prüft Ihre Anfrage</li>
                <li>Bei Genehmigung erhalten Sie eine E-Mail mit Zugangsdaten</li>
                <li>Nach dem Login können Sie sich für Events bewerben</li>
              </ol>
            </div>
            <Button onClick={handleClose} className="w-full">
              Schließen
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
          <DialogTitle>Registrierungsanfrage</DialogTitle>
          <DialogDescription>
            Um Teil der Innovation Area zu werden, senden Sie uns zunächst eine Registrierungsanfrage. Nach Prüfung durch unser Team erhalten Sie Zugang zur Bewerbungsplattform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Unternehmensname *</Label>
            <Input
              id="company-name"
              type="text"
              placeholder="Ihr Unternehmen GmbH"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact-person">Ansprechpartner *</Label>
            <Input
              id="contact-person"
              type="text"
              placeholder="Max Mustermann"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail-Adresse *</Label>
            <Input
              id="email"
              type="email"
              placeholder="kontakt@unternehmen.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://www.ihr-unternehmen.de"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="short-description">Kurzbeschreibung Ihrer Innovation *</Label>
            <Textarea
              id="short-description"
              placeholder="Beschreiben Sie kurz Ihre EdTech-Lösung und deren Nutzen für den Bildungsbereich..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              rows={4}
            />
            <p className="text-xs text-muted-foreground">{shortDescription.length}/500 Zeichen</p>
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
              Ich stimme den Nutzungsbedingungen und der Datenschutzerklärung zu *
            </label>
          </div>
          
          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
            Anfrage absenden
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupRequestModal;
