import React, { useRef, useState } from "react";
import { useEditor } from "../../context/EditorContext";
import { saveContent, Partner } from "../../../lib/content-store";
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
  Facebook,
  Instagram,
  Youtube,
  ShieldAlert,
  Trash2,
  Package,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function AdminSettings() {
  const { content, updateContent, saveChanges } = useEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partial<Partner> | null>(null);

  const handleUpdate = (section: string, field: string, value: any) => {
    updateContent(`settings.${section}.${field}`, value);
  };

  const handleAddPartnerClick = () => {
    setEditingPartner({ id: Date.now().toString(), name: "", logoUrl: "", websiteUrl: "" });
    setIsPartnerDialogOpen(true);
  };

  const handleEditPartnerClick = (partner: Partner) => {
    setEditingPartner({ ...partner });
    setIsPartnerDialogOpen(true);
  };

  const handleDeletePartner = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce partenaire ?")) {
      const newPartners = content.partners.filter((p) => p.id !== id);
      updateContent("partners", newPartners);
      toast.info("Partenaire supprimé");
    }
  };

  const handleSavePartner = () => {
    if (!editingPartner?.name || !editingPartner?.logoUrl) {
      toast.error("Veuillez remplir le nom et l'URL du logo du partenaire.");
      return;
    }

    const currentPartners = content.partners || [];
    let newPartners;
    
    if (currentPartners.find(p => p.id === editingPartner.id)) {
      // Edit existing partner - creating a new array
      newPartners = currentPartners.map((p) =>
        p.id === editingPartner.id ? (editingPartner as Partner) : p
      );
      toast.success("Partenaire mis à jour");
    } else {
      // Add new partner - creating a new array
      newPartners = [...currentPartners, editingPartner as Partner];
      toast.success("Nouveau partenaire ajouté");
    }
    
    updateContent("partners", newPartners);
    setIsPartnerDialogOpen(false);
    setEditingPartner(null);
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
          toast.error("Erreur lors de l{e.target?.result as string}importation du fichier JSON");
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

              <div className="flex flex-col gap-4 p-4 rounded-lg bg-[#262626] border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Afficher la Newsletter</Label>
                    <p className="text-xs text-gray-500">
                      Activer/Désactiver la section Newsletter sur le site.
                    </p>
                  </div>
                  <Switch
                    checked={content.settings.advanced.showNewsletter}
                    onCheckedChange={(checked) =>
                      handleUpdate("advanced", "showNewsletter", checked)
                    }
                  />
                </div>
                {content.settings.advanced.showNewsletter && (
                  <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-400">
                    <ShieldAlert className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Note technique :</strong> Le formulaire est visible sur le site, mais le système d'envoi et de stockage des emails n'est pas encore configuré (API Brevo/Mailchimp manquante). Les inscriptions ne seront pas enregistrées pour le moment.
                    </p>
                  </div>
                )}
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

        {/* Rental Configuration */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#F29F05]" />
              <CardTitle className="text-white">Configuration Location</CardTitle>
            </div>
            <CardDescription className="text-gray-500">
              Paramètres du système de demande de devis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-400">Email de réception des devis</Label>
              <Input
                value={content.settings.rental.rentalEmail || ""}
                onChange={(e) =>
                  handleUpdate("rental", "rentalEmail", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
                placeholder="contact@donsduson.fr"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Délai de réponse affiché</Label>
              <Input
                value={content.settings.rental.replyDelay || ""}
                onChange={(e) =>
                  handleUpdate("rental", "replyDelay", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
                placeholder="Ex: 72 heures"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Acompte par défaut (%)</Label>
              <Input
                value={content.settings.rental.defaultDeposit || ""}
                onChange={(e) =>
                  handleUpdate("rental", "defaultDeposit", e.target.value)
                }
                className="bg-[#262626] border-gray-700"
                placeholder="Ex: 30%"
              />
            </div>
          </CardContent>
        </Card>

        {/* Partners Management */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#F29F05]" />
              <CardTitle className="text-white">Partenaires</CardTitle>
            </div>
            <CardDescription className="text-gray-500">
              Gérez la liste des partenaires affichée sur la page "Nous soutenir".
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.partners?.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#262626] border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <ImageWithFallback src={partner.logoUrl} alt={partner.name} className="h-8 w-auto object-contain" />
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{partner.name}</span>
                    {partner.websiteUrl && (
                      <span className="text-xs text-gray-500 truncate max-w-[150px]">
                        {partner.websiteUrl}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPartnerClick(partner)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePartner(partner.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
            <Button
              className="w-full bg-[#8C0343] hover:bg-[#771236]"
              onClick={handleAddPartnerClick}
            >
              <LinkIcon className="w-4 h-4 mr-2" /> Ajouter un partenaire
            </Button>
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

      <Dialog open={isPartnerDialogOpen} onOpenChange={setIsPartnerDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border text-white">
          <DialogHeader>
            <DialogTitle>{editingPartner?.id ? "Modifier le partenaire" : "Ajouter un partenaire"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="partner-name">Nom du partenaire</Label>
              <Input
                id="partner-name"
                value={editingPartner?.name || ""}
                onChange={(e) =>
                  setEditingPartner((prev) => ({ ...prev, name: e.target.value }))
                }
                className="col-span-3 bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-logo-url">URL du logo</Label>
              <Input
                id="partner-logo-url"
                value={editingPartner?.logoUrl || ""}
                onChange={(e) =>
                  setEditingPartner((prev) => ({ ...prev, logoUrl: e.target.value }))
                }
                className="col-span-3 bg-background border-border"
                placeholder="https://via.placeholder.com/150x50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-website-url">URL du site web (Optionnel)</Label>
              <Input
                id="partner-website-url"
                value={editingPartner?.websiteUrl || ""}
                onChange={(e) =>
                  setEditingPartner((prev) => ({ ...prev, websiteUrl: e.target.value }))
                }
                className="col-span-3 bg-background border-border"
                placeholder="https://www.partenaire.fr"
              />
            </div>
            {editingPartner?.logoUrl && (
              <div className="space-y-2">
                <Label>Aperçu du logo</Label>
                <div className="h-16 w-full flex items-center justify-center border border-border p-2 rounded-md overflow-hidden">
                   <ImageWithFallback src={editingPartner.logoUrl} alt="Logo preview" className="h-full w-auto object-contain" />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPartnerDialogOpen(false)}
              className="border-border"
            >
              Annuler
            </Button>
            <Button onClick={handleSavePartner} className="bg-[#8C0343] hover:bg-[#771236]">
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
