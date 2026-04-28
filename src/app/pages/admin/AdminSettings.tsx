import React, { useRef } from "react";
import { useEditor } from "../../context/EditorContext";
import { initialContent, saveContent } from "../../../lib/content-store";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import {
  Save,
  Download,
  Upload,
  RefreshCcw,
  Globe,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  ShieldAlert,
  Trash2,
  Type,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { content, updateContent, saveChanges } = useEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = (section: string, field: string, value: any) => {
    updateContent(`settings.${section}.${field}`, value);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `dds_backup_${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    toast.success("Sauvegarde exportée avec succès");
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          saveContent(json);
          window.location.reload();
          toast.success("Données importées avec succès");
        } catch (err) {
          toast.error("Erreur lors de l'importation du fichier JSON");
        }
      };
      reader.readAsText(file);
    }
  };

  const resetData = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir réinitialiser tout le site ? Toutes les modifications seront perdues.",
      )
    ) {
      localStorage.removeItem("dds_content");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Paramètres Globaux
        </h1>
        <p className="text-gray-400">
          Gérez l'identité du site, les réseaux sociaux et la maintenance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Site Identity */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#F29F05]" />
              <CardTitle className="text-white">Identité & SEO</CardTitle>
            </div>
            <CardDescription className="text-gray-500">
              Informations générales du site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-400">
                Nom de l'association (Titre principal)
              </Label>
              <Input
                value={content.settings.siteIdentity.title}
                onChange={(e) =>
                  handleUpdate("siteIdentity", "title", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Sous-titre (Header)</Label>
              <Input
                value={content.settings.siteIdentity.subtitle}
                onChange={(e) =>
                  handleUpdate("siteIdentity", "subtitle", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
                placeholder="Ex: Association culturelle"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">
                Description SEO (Méta-données)
              </Label>
              <Textarea
                value={content.settings.siteIdentity.description}
                onChange={(e) =>
                  handleUpdate("siteIdentity", "description", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">
                Texte de copyright (footer)
              </Label>
              <Input
                value={content.settings.siteIdentity.copyright}
                onChange={(e) =>
                  handleUpdate("siteIdentity", "copyright", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-[#F29F05]" />
              <CardTitle className="text-white">Réseaux Sociaux</CardTitle>
            </div>
            <CardDescription className="text-gray-500">
              Liens vers vos profils publics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-400 flex items-center gap-2">
                <Facebook className="w-3 h-3" /> Facebook
              </Label>
              <Input
                value={content.settings.contact.facebook}
                onChange={(e) =>
                  handleUpdate("contact", "facebook", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400 flex items-center gap-2">
                <Instagram className="w-3 h-3" /> Instagram
              </Label>
              <Input
                value={content.settings.contact.instagram}
                onChange={(e) =>
                  handleUpdate("contact", "instagram", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400 flex items-center gap-2">
                <Youtube className="w-3 h-3" /> Youtube
              </Label>
              <Input
                value={content.settings.contact.youtube}
                onChange={(e) =>
                  handleUpdate("contact", "youtube", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* External Links */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#F29F05]" />
              <CardTitle className="text-white">Liens Externes (HelloAsso)</CardTitle>
            </div>
            <CardDescription className="text-gray-500">
              Configurez vos liens de paiement et d'adhésion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-400">Lien Dons (HelloAsso)</Label>
              <Input
                value={content.settings.links?.helloAssoDonation || ""}
                onChange={(e) =>
                  handleUpdate("links", "helloAssoDonation", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
                placeholder="https://www.helloasso.com/associations/.../formulaires/1"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Lien Adhésion (HelloAsso)</Label>
              <Input
                value={content.settings.links?.helloAssoMembership || ""}
                onChange={(e) =>
                  handleUpdate("links", "helloAssoMembership", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
                placeholder="https://www.helloasso.com/associations/.../adhesions/..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Lien Boutique (Optionnel)</Label>
              <Input
                value={content.settings.links?.helloAssoStore || ""}
                onChange={(e) =>
                  handleUpdate("links", "helloAssoStore", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <CardTitle className="text-white">
                Maintenance & Données
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#262626] border border-gray-700">
                <div className="space-y-0.5">
                  <Label className="text-white">Mode Maintenance</Label>
                  <p className="text-xs text-gray-500">
                    Désactiver le site public.
                  </p>
                </div>
                <Switch
                  checked={content.settings.advanced.maintenanceMode}
                  onCheckedChange={(checked) =>
                    handleUpdate("advanced", "maintenanceMode", checked)
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={exportData}
                >
                  <Download className="w-4 h-4 mr-2" /> Exporter la sauvegarde
                  (JSON)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" /> Importer une sauvegarde
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={importData}
                  accept=".json"
                  className="hidden"
                />
                <Button
                  variant="destructive"
                  className="w-full justify-start bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"
                  onClick={resetData}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Réinitialiser tout le site
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-8 border-t border-gray-800">
        <Button
          size="lg"
          onClick={saveChanges}
          className="bg-[#8C0343] hover:bg-[#771236] text-white px-12"
        >
          <Save className="w-4 h-4 mr-2" /> Enregistrer tous les paramètres
        </Button>
      </div>
    </div>
  );
}
