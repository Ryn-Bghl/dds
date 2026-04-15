import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#0D0D0D]">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="text-9xl font-bold text-[#F29F05] mb-4">404</div>
          <h1 className="text-4xl mb-4 text-white">Page non trouvée</h1>
          <p className="text-xl text-gray-400 max-w-md mx-auto mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#8C0343] hover:bg-[#771236]">
            <Link to="/">
              <Home className="mr-2 w-5 h-5" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 w-5 h-5" />
            Page précédente
          </Button>
        </div>
      </div>
    </div>
  );
}