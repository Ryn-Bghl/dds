import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useEditor } from "../../context/EditorContext";
import {
  LayoutDashboard,
  LogOut,
  Edit3,
  Save,
  Globe,
  RotateCcw,
} from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { cn } from "../ui/utils";

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
    <div className="bg-[#1a1a1a] text-white py-1 px-4 flex flex-col sm:flex-row items-center justify-between sticky top-0 z-[100] text-xs font-medium shadow-2xl border-b border-[#F29F05]/30 gap-4 sm:gap-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-[#8C0343] px-3 py-1 rounded-sm">
          <Globe className="w-3.5 h-3.5" />
          <span className="font-bold tracking-tight">DONS DU SON</span>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 hover:text-[#F29F05] transition-colors py-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tableau de bord</span>
          </Link>
          
          <div className="h-4 w-px bg-white/10 hidden md:block"></div>

          <button
            onClick={toggleEditMode}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded transition-all",
              isEditMode 
                ? "bg-[#F29F05] text-black font-bold shadow-lg shadow-[#F29F05]/20" 
                : "hover:bg-white/5 text-gray-300 hover:text-white"
            )}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditMode ? "Édition Active" : "Modifier la page"}</span>
          </button>

          {hasUnsavedChanges && (
            <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded border border-white/10 ml-2 animate-in fade-in slide-in-from-left-2 duration-300">
              <Button
                size="sm"
                onClick={discardChanges}
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/5 h-6 px-2 text-[10px]"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Annuler
              </Button>
              <Button
                size="sm"
                onClick={saveChanges}
                className="bg-[#F29F05] text-black hover:bg-[#D96704] h-6 px-3 text-[10px] font-bold shadow-lg shadow-[#F29F05]/10"
              >
                <Save className="w-3 h-3 mr-1" />
                PUBLIER LES MODIFICATIONS
              </Button>
            </div>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-500 hidden lg:inline">
          Session : <strong className="text-gray-300">{user.username}</strong>
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-gray-400 hover:text-white hover:bg-white/5 h-6 px-2 text-[10px]"
        >
          <LogOut className="w-3.5 h-3.5 mr-1" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
