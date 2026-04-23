import { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Music,
  Lightbulb,
  Radio,
  Wrench,
  Image as ImageIcon,
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
import { InventoryItem } from "../../../lib/content-store";
import { toast } from "sonner";

const categoryIcons = {
  Son: Music,
  Lumière: Lightbulb,
  DJ: Radio,
  Backline: Wrench,
};

export default function AdminRentals() {
  const { content, updateContent } = useEditor();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [stockFilter, setStockFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("name");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<InventoryItem> | null>(
    null,
  );

  const inventory = content.inventory || [];

  const filteredInventory = inventory
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "Tous" || item.category === categoryFilter;
      const matchesStatus =
        statusFilter === "Tous" || item.status === statusFilter;
      const matchesStock =
        stockFilter === "Tous" ||
        (stockFilter === "En Stock" && item.stock > 0) ||
        (stockFilter === "Rupture" && item.stock === 0);
      return matchesSearch && matchesCategory && matchesStatus && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "stock-desc") return b.stock - a.stock;
      return 0;
    });

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("Tous");
    setStatusFilter("Tous");
    setStockFilter("Tous");
    setSortBy("name");
  };

  const activeFiltersCount = [
    categoryFilter !== "Tous",
    statusFilter !== "Tous",
    stockFilter !== "Tous",
    searchTerm !== "",
  ].filter(Boolean).length;

  const handleSaveItem = () => {
    if (!editingItem?.name || !editingItem?.category || !editingItem?.price) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    let newInventory;
    if (editingItem.id) {
      // Edit existing
      newInventory = inventory.map((item) =>
        item.id === editingItem.id ? (editingItem as InventoryItem) : item,
      );
      toast.success("Matériel mis à jour");
    } else {
      // Add new
      const newItem = {
        ...editingItem,
        id: `item-${Date.now()}`,
        specs: editingItem.specs || [],
        status: editingItem.status || "Disponible",
        stock: editingItem.stock || 1,
      } as InventoryItem;
      newInventory = [newItem, ...inventory];
      toast.success("Nouveau matériel ajouté");
    }

    updateContent("inventory", newInventory);
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce matériel ?")) {
      const newInventory = inventory.filter((item) => item.id !== id);
      updateContent("inventory", newInventory);
      toast.info("Matériel supprimé");
    }
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
      case "Maintenance":
        return (
          <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
            Maintenance
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
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestion de l'Inventaire
          </h1>
          <p className="text-gray-400">
            Gérez le parc de matériel technique de l'association.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingItem({
              category: "Son",
              status: "Disponible",
              stock: 1,
              specs: [],
            });
            setIsEditDialogOpen(true);
          }}
          className="bg-[#8C0343] hover:bg-[#771236]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter du matériel
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Rechercher un matériel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px] bg-background border-border">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous">Toutes catégories</SelectItem>
                  <SelectItem value="Son">Son</SelectItem>
                  <SelectItem value="Lumière">Lumière</SelectItem>
                  <SelectItem value="DJ">DJ</SelectItem>
                  <SelectItem value="Backline">Backline</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-background border-border">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous">Tous les statuts</SelectItem>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Indisponible">Indisponible</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>

              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-[140px] bg-background border-border">
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous">Tout le stock</SelectItem>
                  <SelectItem value="En Stock">En Stock</SelectItem>
                  <SelectItem value="Rupture">Rupture</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-background border-border">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom (A-Z)</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="stock-desc">
                    Stock (Décroissant)
                  </SelectItem>
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Réinitialiser
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400 border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>
                {filteredInventory.length} matériel
                {filteredInventory.length > 1 ? "s" : ""} trouvé
                {filteredInventory.length > 1 ? "s" : ""}
              </span>
            </div>
            {activeFiltersCount > 0 && (
              <div className="flex gap-2">
                {categoryFilter !== "Tous" && (
                  <Badge
                    variant="secondary"
                    className="bg-muted text-gray-300 border-none"
                  >
                    {categoryFilter}
                  </Badge>
                )}
                {statusFilter !== "Tous" && (
                  <Badge
                    variant="secondary"
                    className="bg-muted text-gray-300 border-none"
                  >
                    {statusFilter}
                  </Badge>
                )}
                {stockFilter !== "Tous" && (
                  <Badge
                    variant="secondary"
                    className="bg-muted text-gray-300 border-none"
                  >
                    {stockFilter}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredInventory.map((item) => {
          const Icon = categoryIcons[item.category] || Package;
          return (
            <Card
              key={item.id}
              className="overflow-hidden border-border bg-card group"
            >
              <div className="aspect-video relative overflow-hidden bg-muted">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
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
                          setEditingItem(item);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4 mr-2" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-black/50 backdrop-blur-sm border-none text-white">
                    <Icon className="w-3 h-3 mr-1" />
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[#F29F05] font-bold">
                    {item.price}€/j
                  </span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-300">Stock: {item.stock}</span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredInventory.length === 0 && (
          <div className="col-span-full py-12 text-center bg-card rounded-lg border border-dashed border-border">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              Aucun matériel trouvé
            </h3>
            <p className="text-gray-400">
              Essayez de modifier vos filtres ou ajoutez du nouveau matériel.
            </p>
          </div>
        )}
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-card border-border text-white">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id ? "Modifier le matériel" : "Ajouter du matériel"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="name">Nom du matériel *</Label>
              <Input
                id="name"
                value={editingItem?.name || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Select
                value={editingItem?.category}
                onValueChange={(v) =>
                  setEditingItem((prev) => ({ ...prev, category: v as any }))
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Son">Son</SelectItem>
                  <SelectItem value="Lumière">Lumière</SelectItem>
                  <SelectItem value="DJ">DJ</SelectItem>
                  <SelectItem value="Backline">Backline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Prix journalier (€) *</Label>
              <Input
                id="price"
                type="number"
                value={editingItem?.price || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock total</Label>
              <Input
                id="stock"
                type="number"
                value={editingItem?.stock || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    stock: Number(e.target.value),
                  }))
                }
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={editingItem?.status}
                onValueChange={(v) =>
                  setEditingItem((prev) => ({ ...prev, status: v as any }))
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Indisponible">Indisponible</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="image">URL de l'image</Label>
              <Input
                id="image"
                value={editingItem?.image || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({ ...prev, image: e.target.value }))
                }
                className="bg-background border-border"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingItem?.description || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="bg-background border-border"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-border"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveItem}
              className="bg-[#8C0343] hover:bg-[#771236]"
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
