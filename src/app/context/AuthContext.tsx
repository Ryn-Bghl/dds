import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyTOTP } from "../../lib/auth-engine";

interface UserProfile {
  username: string;
  role: "admin" | "user";
  signature?: string;
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
const ADMIN_USERNAME = import.meta.env.VITE_AUTH_ADMIN_ID;
const AUTH_SALT = import.meta.env.VITE_AUTH_SALT;

/**
 * Creates a simple non-reversible hash to sign the session.
 * This prevents users from manually editing localStorage to become admin.
 */
function createSignature(username: string): string {
  const str = `${username}-${AUTH_SALT}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        // Decode from Base64 to prevent casual reading
        const decoded = atob(saved);
        const parsed = JSON.parse(decoded);

        // SECURITY CHECK: Verify the signature
        const expectedSignature = createSignature(parsed.username);
        if (parsed.signature === expectedSignature) {
          setUser(parsed);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, code: string) => {
    if (!ADMIN_USERNAME || !AUTH_SALT) {
      throw new Error("Configuration du serveur incomplète.");
    }

    const isValid = verifyTOTP(code);

    if (isValid && username.trim() === ADMIN_USERNAME) {
      const signature = createSignature(username);
      const newUser: UserProfile = { username, role: "admin", signature };

      setUser(newUser);

      // Encode to Base64 before saving
      const encoded = btoa(JSON.stringify(newUser));
      localStorage.setItem(SESSION_KEY, encoded);
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
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
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
