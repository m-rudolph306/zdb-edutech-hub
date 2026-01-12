import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Store the intended destination for after login
      sessionStorage.setItem("redirectAfterLogin", location.pathname + location.search);
      navigate("/", { state: { openLogin: true } });
      return;
    }

    // Role check - redirect to appropriate dashboard if user doesn't have required role
    if (requiredRole && user?.role !== requiredRole) {
      // Redirect based on user's actual role
      switch (user?.role) {
        case "admin":
          navigate("/admin");
          break;
        case "politician":
          navigate("/overview");
          break;
        case "innovator":
        default:
          navigate("/dashboard");
          break;
      }
    }
  }, [isAuthenticated, requiredRole, user, navigate, location]);

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if user doesn't have required role
  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
