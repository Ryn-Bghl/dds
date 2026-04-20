import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useEditor } from "../../context/EditorContext";
import {
  LayoutDashboard,
  Settings,
  Plus,
  Eye,
  LogOut,
  Edit3,
  Save,
  Globe,
  RotateCcw,
} from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

export default function AdminBar() {
  const { logout, user } = useAuth();
  const {
    isEditMode,
    toggleEditMode,
    hasUnsavedChanges,
    saveChanges,
    discardChanges,
  } = useEditor();

  if (user?.role !== "admin") return null;

  return (
    <div className="bg-[#8C0343] text-white py-2 px-4 flex flex-col sm:flex-row items-center justify-between sticky top-0 z-[60] text-sm font-medium shadow-lg gap-4 sm:gap-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 border-r border-white/20 pr-4">
          <Settings className="w-4 h-4" />
          <span>Admin</span>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 hover:text-[#F29F05] transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden md:inline">Tableau de bord</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
            <Edit3
              className={`w-3.5 h-3.5 ${isEditMode ? "text-[#F29F05]" : "text-white/60"}`}
            />
            <span className="text-xs">Mode Édition</span>
            <Switch
              checked={isEditMode}
              onCheckedChange={toggleEditMode}
              className="scale-75 data-[state=checked]:bg-[#F29F05]"
            />
          </div>
          {hasUnsavedChanges && (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={discardChanges}
                variant="ghost"
                className="text-white hover:bg-white/10 h-7 px-3"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Annuler
              </Button>
              <Button
                size="sm"
                onClick={saveChanges}
                className="bg-[#F29F05] text-black hover:bg-[#D96704] h-7 px-3 animate-pulse"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Enregistrer
              </Button>
            </div>
          )}
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-[#F29F05] transition-colors border-l border-white/20 pl-4"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden md:inline">Voir le site</span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-white/80 hidden lg:inline">
          Connecté : <strong className="text-white">{user.username}</strong>
        </span>
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
