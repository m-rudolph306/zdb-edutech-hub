import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  companyName: string;
}

type ApprovalStatus = "pending" | "approved" | "rejected" | "not_found";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, companyName: string) => void;
  logout: () => void;
  checkApprovalStatus: (email: string) => ApprovalStatus;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, companyName: string) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      companyName,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    
    // Store login data for applications
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUserIndex = users.findIndex((u: User) => u.email === email);
    if (existingUserIndex === -1) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("redirectAfterLogin");
  };

  const checkApprovalStatus = (email: string): ApprovalStatus => {
    const signupRequests = JSON.parse(localStorage.getItem("signupRequests") || "[]");
    const request = signupRequests.find((r: any) => r.email === email);
    
    if (!request) {
      return "not_found";
    }
    
    return request.status as ApprovalStatus;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
