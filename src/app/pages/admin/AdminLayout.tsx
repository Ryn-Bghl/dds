import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Music,
  Calendar,
  Package,
  Settings,
  Home,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AdminBar from "../../components/admin/AdminBar";
import { useEditor } from "../../context/EditorContext";
import { Badge } from "../../components/ui/badge";

export default function AdminLayout() {
  const location = useLocation();
  const { logout } = useAuth();
  const { content } = useEditor();

  const pendingRequests = content.rentalRequests?.filter(r => r.status === "En attente").length || 0;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Music, label: "Projets", path: "/admin/projects" },
    { icon: Calendar, label: "Événements", path: "/admin/events" },
    { 
      icon: Package, 
      label: "Location", 
      path: "/admin/rental",
      badge: pendingRequests > 0 ? pendingRequests : null
    },
    { icon: Settings, label: "Paramètres", path: "/admin/settings" },
  ];

  return (
    <div className="h-screen bg-[#0D0D0D] flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <AdminBar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 bg-[#1a1a1a] hidden md:flex flex-col flex-shrink-0 overflow-y-auto">
          <div className="p-6">
            <div className="text-[#F29F05] font-bold text-xl flex items-center gap-2">
              <div className="w-8 h-8 bg-[#8C0343] rounded flex items-center justify-center text-white">
                D
              </div>
              Admin Panel
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#8C0343] text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <Badge className="ml-auto bg-[#F29F05] text-black border-none h-5 min-w-5 flex items-center justify-center p-0 px-1 text-[10px] font-bold">
                    {item.badge}
                  </Badge>
                )}
                {location.pathname === item.path && !item.badge && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800 mt-auto">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Retour au site
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-900/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto scroll-smooth bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
