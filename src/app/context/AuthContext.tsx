import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyTOTP } from "../../lib/auth-engine";

interface UserProfile {
  username: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_KEY = "dds_admin_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, code: string) => {
    // Only 'admin_dds' (or whatever you want) can login
    const isValid = verifyTOTP(code);

    if (isValid && username === "admin_dds") {
      const newUser: UserProfile = { username, role: "admin" };
      setUser(newUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    } else {
      throw new Error("Identifiant ou code incorrect.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
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
