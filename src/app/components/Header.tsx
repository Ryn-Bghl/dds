import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import ddsLogo from "../assets/dds_logo.png";

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

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {/* <div className="w-12 h-12 bg-gradient-to-br from-[#8C0343] to-[#F29F05] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">DDS</span>
            </div> */}
            <img
              src={ddsLogo}
              alt="Logo de l'association Dons Du Son"
              className="w-12 h-12 rounded-lg"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-white">Dons Du Son</div>
              <div className="text-xs text-gray-400">
                Association culturelle
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
          </nav>

          {/* Mobile Menu Button */}
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
