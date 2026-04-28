import { Link } from "react-router";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";
import ddsLogo from "../assets/dds_logo.webp";
import { useEditor } from "../context/EditorContext";
import { Editable } from "./Editable";

export default function Footer() {
  const { content } = useEditor();
  const { settings } = content;

  return (
    <footer className="bg-[#0D0D0D] text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={ddsLogo}
                alt={`Logo de l'association ${settings.siteIdentity.title}`}
                className="w-12 h-12 rounded-lg"
              />
              <div className="font-bold text-white">
                {settings.siteIdentity.title}
              </div>
            </div>
            <p className="text-sm mb-4">{settings.siteIdentity.footerText}</p>
            <div className="flex gap-3">
              <a
                href={settings.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8C0343] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8C0343] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8C0343] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/association"
                  className="hover:text-[#F29F05] transition-colors"
                >
                  L'Association
                </Link>
              </li>
              <li>
                <Link
                  to="/projets"
                  className="hover:text-[#F29F05] transition-colors"
                >
                  Projets
                </Link>
              </li>
              <li>
                <Link
                  to="/evenements"
                  className="hover:text-[#F29F05] transition-colors"
                >
                  Événements
                </Link>
              </li>
              <li>
                <Link
                  to="/location"
                  className="hover:text-[#F29F05] transition-colors"
                >
                  Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-white font-semibold mb-4">S'engager</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/rejoindre"
                  className="hover:text-[#F29F05] transition-colors"
                >
                  Devenir bénévole
                </Link>
              </li>
              <li>
                <Link
                  to="/rejoindre"
                  className="hover:text-[#F29F05] transition-colors"
                >
                  Adhérer
                </Link>
              </li>
              <li>
                <Link
                  to="/soutenir"
                  className="hover:text-[#F29F05] transition-colors"
                >
                  Faire un don
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#F29F05] transition-colors"
                >
                  <Editable
                    path="settings.footer.involvedLinks[3].label"
                    label="Libellé Nous Contacter"
                  >
                    Nous contacter
                  </Editable>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F29F05]" />
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="hover:text-[#F29F05] transition-colors"
                >
                  {settings.contact.email}
                </a>
              </li>
              {/* Phone removed from footer too as per roadmap */}
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F29F05]" />
                <span>{settings.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>{settings.siteIdentity.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
