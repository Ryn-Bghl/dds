import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyTOTP } from "../../lib/auth-engine";

interface UserProfile {
  username: string;
  role: "admin" | "user";
  expiresAt: number; // Expiration timestamp
  sessionId: string; // Random string to make each login unique
  signature: string; // Cryptographic signature
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
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

/**
 * Creates a signature that includes the expiration and sessionId.
 * This makes the sessionStorage string different every single time you log in.
 */
function createSignature(
  username: string,
  expiresAt: number,
  sessionId: string,
): string {
  const str = `${username}-${expiresAt}-${sessionId}-${AUTH_SALT}`;
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
    // Detect if this is a fresh navigation (not a reload)
    const navigationEntries = performance.getEntriesByType(
      "navigation",
    ) as PerformanceNavigationTiming[];
    const isReload =
      navigationEntries.length > 0 && navigationEntries[0].type === "reload";

    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const decoded = atob(saved);
        const parsed: UserProfile = JSON.parse(decoded);

        // 1. Check if the session has expired
        if (Date.now() > parsed.expiresAt) {
          sessionStorage.removeItem(SESSION_KEY);
          setUser(null);
        } else {
          // 2. Verify the signature
          const expectedSignature = createSignature(
            parsed.username,
            parsed.expiresAt,
            parsed.sessionId,
          );
          if (parsed.signature === expectedSignature) {
            setUser(parsed);
          } else {
            sessionStorage.removeItem(SESSION_KEY);
            setUser(null);
          }
        }
      } catch (e) {
        sessionStorage.removeItem(SESSION_KEY);
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
      const expiresAt = Date.now() + SESSION_DURATION;
      const sessionId = Math.random().toString(36).substring(2);
      const signature = createSignature(username, expiresAt, sessionId);

      const newUser: UserProfile = {
        username,
        role: "admin",
        expiresAt,
        sessionId,
        signature,
      };

      setUser(newUser);
      const encoded = btoa(JSON.stringify(newUser));
      sessionStorage.setItem(SESSION_KEY, encoded);
    } else {
      throw new Error("Identifiant ou code incorrect.");
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
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
