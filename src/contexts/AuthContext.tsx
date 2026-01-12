import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Role type for multi-persona platform
export type UserRole = "innovator" | "admin" | "politician";

// Seed admin email - users with this email are auto-approved as admin
const SEED_ADMIN_EMAIL = "admin@zdb.de";

interface User {
  id: string;
  email: string;
  companyName: string;
  role: UserRole;
}

type ApprovalStatus = "pending" | "approved" | "rejected" | "not_found";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPolitician: boolean;
  isInnovator: boolean;
  login: (email: string, companyName: string, role?: UserRole) => void;
  logout: () => void;
  checkApprovalStatus: (email: string) => ApprovalStatus;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Migration function for existing users/signupRequests without role
const migrateExistingData = () => {
  // Migrate users
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const migratedUsers = users.map((u: any) => ({
    ...u,
    role: u.role || "innovator",
  }));
  localStorage.setItem("users", JSON.stringify(migratedUsers));

  // Migrate signupRequests
  const requests = JSON.parse(localStorage.getItem("signupRequests") || "[]");
  const migratedRequests = requests.map((r: any) => ({
    ...r,
    role: r.role || "innovator",
  }));
  localStorage.setItem("signupRequests", JSON.stringify(migratedRequests));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Run migration on mount
    migrateExistingData();

    // Check for existing session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Migration: Add default role if missing
      if (!parsed.role) {
        parsed.role = "innovator";
        localStorage.setItem("user", JSON.stringify(parsed));
      }
      setUser(parsed);
    }
  }, []);

  const login = (email: string, companyName: string, role: UserRole = "innovator") => {
    // Check if this is the seed admin email
    const finalRole = email.toLowerCase() === SEED_ADMIN_EMAIL.toLowerCase() ? "admin" : role;

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      companyName,
      role: finalRole,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    // Store login data for applications
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUserIndex = users.findIndex((u: User) => u.email === email);
    if (existingUserIndex === -1) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      // Update existing user with new role if needed
      users[existingUserIndex] = { ...users[existingUserIndex], role: finalRole };
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("redirectAfterLogin");
  };

  const checkApprovalStatus = (email: string): ApprovalStatus => {
    // Seed admin is always approved
    if (email.toLowerCase() === SEED_ADMIN_EMAIL.toLowerCase()) {
      return "approved";
    }

    const signupRequests = JSON.parse(localStorage.getItem("signupRequests") || "[]");
    const request = signupRequests.find((r: any) => r.email === email);

    if (!request) {
      return "not_found";
    }

    return request.status as ApprovalStatus;
  };

  // Computed role booleans
  const isAdmin = user?.role === "admin";
  const isPolitician = user?.role === "politician";
  const isInnovator = user?.role === "innovator";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        isPolitician,
        isInnovator,
        login,
        logout,
        checkApprovalStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
