import { useState } from "react";
import {
  Package,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Wrench,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useEditor } from "../../context/EditorContext";
import { RentalPack, InventoryItem } from "../../../lib/content-store";
import { toast } from "sonner";
import BlockEditor from "../../components/admin/BlockEditor";

export default function AdminPacks() {
  const { content, updateContent } = useEditor();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPack, setEditingPack] = useState<Partial<RentalPack> | null>(null);

  const packs = content.rentalPacks || [];
  const inventory = content.inventory || [];

  const handleSavePack = () => {
    if (!editingPack?.name || !editingPack?.price) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    let newPacks;
    if (editingPack.id) {
      // Edit existing
      newPacks = packs.map((pack) =>
        pack.id === editingPack.id ? (editingPack as RentalPack) : pack,
      );
      toast.success("Pack mis à jour");
    } else {
      // Add new
      const newPack = {
        ...editingPack,
        id: `pack-${Date.now()}`,
        items: editingPack.items || [],
        services: editingPack.services || [],
        status: editingPack.status || "Disponible",
        content: editingPack.content || [],
      } as RentalPack;
      newPacks = [newPack, ...packs];
      toast.success("Nouveau pack ajouté");
    }

    updateContent("rentalPacks", newPacks);
    setIsEditDialogOpen(false);
    setEditingPack(null);
  };

  const handleDeletePack = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce pack ?")) {
      const newPacks = packs.filter((pack) => pack.id !== id);
      updateContent("rentalPacks", newPacks);
      toast.info("Pack supprimé");
    }
  };

  const addItemToPack = () => {
    const firstItem = inventory[0];
    if (!firstItem) {
      toast.error("L'inventaire est vide");
      return;
    }
    const newItems = [...(editingPack?.items || []), { equipmentId: firstItem.id, quantity: 1 }];
    setEditingPack({ ...editingPack, items: newItems });
  };

  const removeItemFromPack = (index: number) => {
    const newItems = [...(editingPack?.items || [])];
    newItems.splice(index, 1);
    setEditingPack({ ...editingPack, items: newItems });
  };

  const updateItemInPack = (index: number, field: string, value: any) => {
    const newItems = [...(editingPack?.items || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditingPack({ ...editingPack, items: newItems });
  };

  const addService = () => {
    const newServices = [...(editingPack?.services || []), ""];
    setEditingPack({ ...editingPack, services: newServices });
  };

  const removeService = (index: number) => {
    const newServices = [...(editingPack?.services || [])];
    newServices.splice(index, 1);
    setEditingPack({ ...editingPack, services: newServices });
  };

  const updateService = (index: number, value: string) => {
    const newServices = [...(editingPack?.services || [])];
    newServices[index] = value;
    setEditingPack({ ...editingPack, services: newServices });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Disponible":
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            Disponible
          </Badge>
        );
      case "Indisponible":
        return (
          <Badge className="bg-red-500/20 text-red-500 border-red-500/30">
            Indisponible
          </Badge>
        );
      case "Sur demande":
        return (
          <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
            Sur demande
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Gestion des Packs</h2>
          <p className="text-gray-400">Créez des offres combinées matériel + prestation technique.</p>
        </div>
        <Button
          onClick={() => {
            setEditingPack({
              name: "",
              description: "",
              price: 0,
              image: "",
              items: [],
              services: [],
              status: "Disponible",
              content: [],
            });
            setIsEditDialogOpen(true);
          }}
          className="bg-[#8C0343] hover:bg-[#771236]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un pack
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.map((pack) => (
          <Card key={pack.id} className="overflow-hidden border-border bg-card group">
            <div className="aspect-video relative overflow-hidden bg-muted">
              {pack.image ? (
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-black/50 backdrop-blur-sm border-none text-white hover:bg-black/70"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingPack(pack);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => handleDeletePack(pack.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white line-clamp-1">{pack.name}</h3>
                <span className="text-[#F29F05] font-bold">{pack.price}€/j</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">
                {pack.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Wrench className="w-3.5 h-3.5 text-gray-500" />
                  <span>{pack.items.length} articles, {pack.services.length} services</span>
                </div>
                {getStatusBadge(pack.status)}
              </div>
            </CardContent>
          </Card>
        ))}

        {packs.length === 0 && (
          <div className="col-span-full py-12 text-center bg-card rounded-lg border border-dashed border-border">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Aucun pack trouvé</h3>
            <p className="text-gray-400">Commencez par créer votre premier pack de location.</p>
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card border-border text-white custom-scrollbar">
          <DialogHeader>
            <DialogTitle>{editingPack?.id ? "Modifier le pack" : "Ajouter un pack"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="pack-name">Nom du pack *</Label>
                <Input
                  id="pack-name"
                  value={editingPack?.name || ""}
                  onChange={(e) => setEditingPack((prev) => ({ ...prev!, name: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pack-price">Prix journalier (€) *</Label>
                <Input
                  id="pack-price"
                  type="number"
                  value={editingPack?.price || ""}
                  onChange={(e) =>
                    setEditingPack((prev) => ({ ...prev!, price: Number(e.target.value) }))
                  }
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pack-status">Statut</Label>
                <Select
                  value={editingPack?.status}
                  onValueChange={(v) =>
                    setEditingPack((prev) => ({ ...prev!, status: v as any }))
                  }
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="Indisponible">Indisponible</SelectItem>
                    <SelectItem value="Sur demande">Sur demande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="pack-image">URL de l'image</Label>
                <Input
                  id="pack-image"
                  value={editingPack?.image || ""}
                  onChange={(e) => setEditingPack((prev) => ({ ...prev!, image: e.target.value }))}
                  className="bg-background border-border"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="pack-description">Description</Label>
                <Textarea
                  id="pack-description"
                  value={editingPack?.description || ""}
                  onChange={(e) =>
                    setEditingPack((prev) => ({ ...prev!, description: e.target.value }))
                  }
                  className="bg-background border-border"
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#F29F05]" />
                  Matériel inclus
                </h3>
                <Button variant="outline" size="sm" onClick={addItemToPack} className="border-border">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Ajouter un matériel
                </Button>
              </div>
              
              {editingPack?.items?.map((item, index) => (
                <div key={item.equipmentId || index} className="flex gap-4 items-end bg-background/50 p-3 rounded-lg border border-border">
                  <div className="flex-1 space-y-2">
                    <Label>Matériel</Label>
                    <Select
                      value={item.equipmentId}
                      onValueChange={(v) => updateItemInPack(index, "equipmentId", v)}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {inventory.map((inv) => (
                          <SelectItem key={inv.id} value={inv.id}>
                            {inv.name} ({inv.category})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24 space-y-2">
                    <Label>Quantité</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItemInPack(index, "quantity", Number(e.target.value))}
                      className="bg-background border-border"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItemFromPack(index)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </Button>
                </div>
              ))}
              {editingPack?.items?.length === 0 && (
                <p className="text-sm text-gray-500 italic text-center py-2">Aucun matériel ajouté.</p>
              )}
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[#F29F05]" />
                  Prestations techniques
                </h3>
                <Button variant="outline" size="sm" onClick={addService} className="border-border">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Ajouter un service
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {editingPack?.services?.map((service, index) => (
                  <div key={`${service}-${index}`} className="flex gap-2">
                    <Input
                      value={service}
                      onChange={(e) => updateService(index, e.target.value)}
                      placeholder="Ex: Installation, Livraison, Technicien son..."
                      className="bg-background border-border"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeService(index)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10 flex-shrink-0"
                    >
                      <MinusCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
              {editingPack?.services?.length === 0 && (
                <p className="text-sm text-gray-500 italic text-center py-2">Aucun service ajouté.</p>
              )}
            </div>

            <div className="border-t border-border pt-6">
              <Label className="mb-2 block">Contenu détaillé (Landing page)</Label>
              <BlockEditor
                blocks={editingPack?.content || []}
                onChange={(newBlocks) =>
                  setEditingPack((prev) => (prev ? { ...prev, content: newBlocks } : null))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-border">
              Annuler
            </Button>
            <Button onClick={handleSavePack} className="bg-[#8C0343] hover:bg-[#771236]">
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
