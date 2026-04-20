import { Link, useLocation } from "react-router";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import ddsLogo from "../assets/dds_logo.png";
import { useAuth } from "../context/AuthContext";
import { useEditor } from "../context/EditorContext";

const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/association", label: "L'Association" },
  { path: "/projets", label: "Projets" },
  { path: "/evenements", label: "Événements" },
  { path: "/location", label: "Location" },
  { path: "/rejoindre", label: "Rejoindre" },
  { path: "/soutenir", label: "Soutenir" },
  { path: "/contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { content } = useEditor();
  const { settings } = content;

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={ddsLogo}
              alt={`Logo de l'association ${settings.siteIdentity.title}`}
              className="w-12 h-12 rounded-lg"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-white">
                {settings.siteIdentity.title}
              </div>
              <div className="text-xs text-gray-400">
                {settings.siteIdentity.description.substring(0, 30)}...
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-[#8C0343] text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <div className="ml-4 flex items-center gap-2 border-l border-gray-700 pl-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                  <User className="w-3 h-3 text-[#F29F05]" />
                  <span>Admin</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-400 hover:text-red-400 hover:bg-red-900/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="lg:hidden text-gray-400"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-[#8C0343] text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
