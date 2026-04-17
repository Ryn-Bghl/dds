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
import {
  Music,
  AlertCircle,
  Loader2,
  Copy,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { initLogin, verifyLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setIsSubmitting(true);
    try {
      const derivedSecret = await initLogin(username);
      setSecret(derivedSecret);
      setStep(2);
    } catch (err) {
      setError("Erreur d'initialisation de l'authentification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await verifyLogin(username, code);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Code incorrect. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secret);
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
            Administration Dons Du Son
          </CardTitle>
          <CardDescription className="text-gray-400">
            {step === 1
              ? "Identifiez-vous pour accéder à la console de gestion"
              : "Vérification de sécurité en deux étapes"}
          </CardDescription>
        </CardHeader>

        {step === 1 ? (
          <form onSubmit={handleUsernameSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-200">
                  Utilisateur
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin_dds"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-[#262626] border-gray-700 text-white focus:border-[#F29F05] focus:ring-[#F29F05]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-[#F29F05] text-black hover:bg-[#D96704] font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Initialiser la connexion"
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit}>
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

              <div className="bg-[#262626] border border-gray-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F29F05] uppercase tracking-wider">
                    Instructions TOTP.app
                  </span>
                  <a
                    href="https://totp.app"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] flex items-center gap-1 text-gray-400 hover:text-white underline transition-colors"
                  >
                    Ouvrir l'application <ExternalLink className="w-2 h-2" />
                  </a>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-300">
                    1. Copiez cette clé secrète dans TOTP.app :
                  </p>
                  <div className="flex items-center justify-between bg-black/40 border border-gray-700 p-3 rounded-md group">
                    <code className="text-sm font-mono font-bold text-white tracking-widest">
                      {secret}
                    </code>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="text-gray-500 hover:text-[#F29F05] transition-colors p-1"
                      title="Copier la clé"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-300">
                  2. Saisissez le code à 6 chiffres généré :
                </p>
              </div>

              <div className="grid gap-2 text-center">
                <Label htmlFor="code" className="text-gray-200 mb-1">
                  Code de vérification
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
                  autoFocus
                />
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
                  "Vérifier et accéder"
                )}
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-gray-500 hover:text-gray-300 underline transition-colors"
              >
                Utiliser un autre nom d'utilisateur
              </button>
            </CardFooter>
          </form>
        )}
      </Card>

      <div className="fixed bottom-8 flex items-center gap-2 text-gray-600 text-xs">
        <ShieldCheck className="w-3 h-3" />
        <p>
          © {new Date().getFullYear()} Dons Du Son - Connexion Sécurisée Sans
          Base de Données
        </p>
      </div>
    </div>
  );
}
