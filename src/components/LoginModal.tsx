import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import SignupRequestModal from "./SignupRequestModal";
import { Clock } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectPath?: string;
}

const LoginModal = ({ open, onOpenChange, redirectPath }: LoginModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, checkApprovalStatus } = useAuth();
  
  const [showSignupRequest, setShowSignupRequest] = useState(false);
  
  const getRedirectPath = () => {
    const storedRedirect = sessionStorage.getItem("redirectAfterLogin");
    if (storedRedirect) {
      sessionStorage.removeItem("redirectAfterLogin");
      return storedRedirect;
    }
    return redirectPath || "/dashboard";
  };
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus",
        variant: "destructive",
      });
      return;
    }

    // Check if user has an approved signup request
    const approvalStatus = checkApprovalStatus(loginEmail);
    
    if (approvalStatus === "pending") {
      toast({
        title: "Registrierung ausstehend",
        description: "Ihre Registrierungsanfrage wird noch geprüft. Bitte warten Sie auf die Genehmigung.",
        variant: "destructive",
      });
      return;
    }
    
    if (approvalStatus === "rejected") {
      toast({
        title: "Zugang abgelehnt",
        description: "Ihre Registrierungsanfrage wurde leider abgelehnt. Bei Fragen kontaktieren Sie uns.",
        variant: "destructive",
      });
      return;
    }
    
    if (approvalStatus === "not_found") {
      toast({
        title: "Konto nicht gefunden",
        description: "Bitte stellen Sie zuerst eine Registrierungsanfrage.",
        variant: "destructive",
      });
      return;
    }

    // Get approved user data
    const signupRequests = JSON.parse(localStorage.getItem("signupRequests") || "[]");
    const approvedRequest = signupRequests.find(
      (r: any) => r.email === loginEmail && r.status === "approved"
    );

    if (approvedRequest) {
      login(loginEmail, approvedRequest.companyName);
      
      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen zurück!",
      });
      
      onOpenChange(false);
      navigate(getRedirectPath());
    }
  };

  const handleOpenSignupRequest = () => {
    onOpenChange(false);
    setShowSignupRequest(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Anmelden</DialogTitle>
            <DialogDescription>
              Melden Sie sich mit Ihrem genehmigten Konto an, um auf die Innovation Area zuzugreifen.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">E-Mail</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="ihre@email.de"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Passwort</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Anmelden
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Noch kein Konto?
              </span>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-secondary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Zwei-Stufen-Registrierung</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Neue Nutzer müssen zuerst eine Registrierungsanfrage stellen. Nach Prüfung und Genehmigung erhalten Sie Zugang.
                </p>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleOpenSignupRequest}
          >
            Registrierungsanfrage stellen
          </Button>
        </DialogContent>
      </Dialog>

      <SignupRequestModal
        open={showSignupRequest}
        onOpenChange={setShowSignupRequest}
      />
    </>
  );
};

export default LoginModal;
