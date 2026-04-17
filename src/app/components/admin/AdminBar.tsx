import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Settings, Plus, Eye, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function AdminBar() {
  const { logout, user } = useAuth();

  if (user?.role !== 'admin') return null;

  return (
    <div className="bg-[#8C0343] text-white py-2 px-4 flex items-center justify-between sticky top-0 z-[60] text-sm font-medium shadow-lg">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border-r border-white/20 pr-4">
          <Settings className="w-4 h-4" />
          <span>Mode Administration</span>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/admin" className="flex items-center gap-1.5 hover:text-[#F29F05] transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Tableau de bord
          </Link>
          <button className="flex items-center gap-1.5 hover:text-[#F29F05] transition-colors">
            <Plus className="w-4 h-4" />
            Nouveau Projet
          </button>
          <Link to="/" className="flex items-center gap-1.5 hover:text-[#F29F05] transition-colors">
            <Eye className="w-4 h-4" />
            Voir le site
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-white/80 hidden sm:inline">Connecté en tant que <strong className="text-white">{user.email}</strong></span>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-white hover:bg-white/10 h-7 px-2"
        >
          <LogOut className="w-4 h-4 mr-1.5" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
