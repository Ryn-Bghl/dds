import { Construction, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEditor } from "../context/EditorContext";
import ddsLogo from "../assets/dds_logo.webp";

export default function Maintenance() {
  const { content } = useEditor();
  const { settings } = content;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={ddsLogo}
            alt="Dons Du Son"
            className="w-24 h-24 rounded-2xl shadow-2xl shadow-[#8C0343]/20"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8C0343]/20 text-[#F29F05] border border-[#8C0343]/30 text-sm font-bold uppercase tracking-wider">
            <Construction className="w-4 h-4" />
            Mode Maintenance
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            On revient <span className="text-[#F29F05]">très vite</span>.
          </h1>
          
          <p className="text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
            Le site de l'association <strong>Dons Du Son</strong> est actuellement en cours de mise à jour pour vous offrir une meilleure expérience.
          </p>
        </div>

        {/* Contact/Socials */}
        <div className="pt-8 border-t border-gray-800 flex flex-col items-center gap-6">
          <p className="text-gray-500">En attendant, vous pouvez nous retrouver sur :</p>
          
          <div className="flex gap-4">
            <a
              href={settings.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8C0343] transition-all hover:scale-110"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href={settings.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8C0343] transition-all hover:scale-110"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href={settings.contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8C0343] transition-all hover:scale-110"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>

          <Button 
            variant="outline" 
            className="border-gray-700 hover:bg-gray-800 text-gray-300"
            onClick={() => window.location.href = `mailto:${settings.contact.email}`}
          >
            <Mail className="mr-2 w-4 h-4" />
            Nous contacter par email
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} Dons Du Son - Association Loi 1901
        </div>
      </div>
    </div>
  );
}
