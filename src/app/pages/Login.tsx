import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Music, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(username, code);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Identifiant ou code incorrect.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,3,67,0.15),transparent_70%)]" />

      <Card className="w-full max-w-md bg-[#1a1a1a] border-gray-800 relative z-10 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#8C0343] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(140,3,67,0.5)]">
              <Music className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white uppercase">
            Administration
          </CardTitle>
          <CardDescription className="text-gray-400">
            Connexion sécurisée par authentification à deux facteurs
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-900/20 border-red-900 text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="username" className="text-gray-200">
                Utilisateur
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Identifiant"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-[#262626] border-gray-700 text-white focus:border-[#F29F05] focus:ring-[#F29F05]"
              />
            </div>

            <div className="grid gap-2 text-center pt-2">
              <Label htmlFor="code" className="text-gray-200 mb-1">
                Code TOTP
              </Label>
              <Input
                id="code"
                type="text"
                maxLength={6}
                placeholder="000000"
                className="bg-[#262626] border-gray-700 text-white text-3xl h-16 text-center tracking-[0.3em] font-bold focus:border-[#F29F05] focus:ring-[#F29F05]"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                required
                autoComplete="one-time-code"
              />
              <p className="text-[10px] text-gray-500 mt-2 italic">
                Saisissez le code à 6 chiffres depuis votre application TOTP.app
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-[#8C0343] text-white hover:bg-[#771236] font-semibold py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Se connecter"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="fixed bottom-8 flex items-center gap-2 text-gray-600 text-xs">
        <ShieldCheck className="w-3 h-3" />
        <p>© {new Date().getFullYear()} Dons Du Son - Accès Sécurisé</p>
      </div>
    </div>
  );
}
