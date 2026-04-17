import React, { createContext, useContext, useState, useEffect } from "react";
import { deriveSecret, verifyTOTP } from "../../lib/auth-engine";

interface UserProfile {
  username: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initLogin: (username: string) => Promise<string>;
  verifyLogin: (username: string, code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real stateless system, this would be a JWT in a cookie
const SESSION_KEY = "dds_admin_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
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

  const initLogin = async (username: string): Promise<string> => {
    // Calculate the secret for this user
    return deriveSecret(username);
  };

  const verifyLogin = async (username: string, code: string) => {
    const secret = deriveSecret(username);
    const isValid = verifyTOTP(code, secret);

    if (isValid) {
      const newUser: UserProfile = { username, role: "admin" };
      setUser(newUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    } else {
      throw new Error("ACCÈS REFUSÉ : CODE INCORRECT");
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
        initLogin,
        verifyLogin,
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
