import { useState } from "react";
import {
  Package,
  Plus,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  XCircle,
  Music,
  Lightbulb,
  Radio,
  Wrench,
  Image as ImageIcon,
  LayoutGrid,
  FileText,
  Calendar as CalendarIcon,
  User,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  XCircle as XCircleIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
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
import { InventoryItem, RentalRequest } from "../../../lib/content-store";
import { toast } from "sonner";
import BlockEditor from "../../components/admin/BlockEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import AdminPacks from "./AdminPacks";
import { Separator } from "../../components/ui/separator";

const categoryIcons = {
  Son: Music,
  Lumière: Lightbulb,
  DJ: Radio,
  Backline: Wrench,
};

export default function AdminRentals() {
  const { content, updateContent } = useEditor();
  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<InventoryItem> | null>(
    null,
  );
  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(null);

  const inventory = content.inventory || [];
  const rentalRequests = content.rentalRequests || [];

  const existingCategories = [
    "Tous",
    ...Array.from(new Set(inventory.map((item) => item.category))),
  ];

  const filteredInventory = inventory.filter((item) => {
    return categoryFilter === "Tous" || item.category === categoryFilter;
  });

  const resetFilters = () => {
    setCategoryFilter("Tous");
  };

  const activeFiltersCount = categoryFilter !== "Tous" ? 1 : 0;

  const handleSaveItem = () => {
    if (!editingItem?.name || !editingItem?.category || !editingItem?.price) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    // Normalize category: trim and capitalize first letter
    const normalizedCategory = editingItem.category.trim();
    const formattedCategory =
      normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1);

    const itemToSave = {
      ...editingItem,
      category: formattedCategory,
    };

    let newInventory;
    if (editingItem.id) {
      // Edit existing
      newInventory = inventory.map((item) =>
        item.id === editingItem.id ? (itemToSave as InventoryItem) : item,
      );
      toast.success("Matériel mis à jour");
    } else {
      // Add new
      const newItem = {
        ...itemToSave,
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

  const handleUpdateRequestStatus = (id: string, status: RentalRequest["status"]) => {
    const newRequests = rentalRequests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    updateContent("rentalRequests", newRequests);
    toast.success(`Statut de la demande mis à jour: ${status}`);
    if (selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status });
    }
  };

  const handleDeleteRequest = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      const newRequests = rentalRequests.filter((req) => req.id !== id);
      updateContent("rentalRequests", newRequests);
      toast.info("Demande supprimée");
      if (selectedRequest?.id === id) setSelectedRequest(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Disponible":
      case "Validé":
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            {status}
          </Badge>
        );
      case "Indisponible":
      case "Refusé":
        return (
          <Badge className="bg-red-500/20 text-red-500 border-red-500/30">
            {status}
          </Badge>
        );
      case "Maintenance":
      case "En attente":
        return (
          <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Gestion de la Location
        </h1>
        <p className="text-gray-400">
          Gérez le parc de matériel technique, les offres combinées et les demandes clients.
        </p>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="bg-gray-800/50 border border-gray-700 p-1">
          <TabsTrigger value="inventory" className="data-[state=active]:bg-[#8C0343] data-[state=active]:text-white">
            <LayoutGrid className="w-4 h-4 mr-2" />
            Inventaire
          </TabsTrigger>
          <TabsTrigger value="packs" className="data-[state=active]:bg-[#8C0343] data-[state=active]:text-white">
            <Package className="w-4 h-4 mr-2" />
            Packs
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-[#8C0343] data-[state=active]:text-white">
            <FileText className="w-4 h-4 mr-2" />
            Demandes
            {rentalRequests.filter(r => r.status === "En attente").length > 0 && (
              <Badge className="ml-2 bg-[#F29F05] text-black border-none h-5 min-w-5 flex items-center justify-center p-0 px-1 text-[10px] font-bold">
                {rentalRequests.filter(r => r.status === "En attente").length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Matériel Individuel</h2>
            <Button
              onClick={() => {
                setEditingItem({
                  category: "",
                  status: "Disponible",
                  stock: 1,
                  specs: [],
                  content: [],
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
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-400">
                    Filtrer par catégorie :
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 flex-1">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[200px] bg-background border-border">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat === "Tous" ? "Toutes les catégories" : cat}
                        </SelectItem>
                      ))}
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

                <div className="text-sm text-gray-400">
                  {filteredInventory.length} matériel
                  {filteredInventory.length > 1 ? "s" : ""} trouvé
                  {filteredInventory.length > 1 ? "s" : ""}
                </div>
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
        </TabsContent>

        <TabsContent value="packs" className="pt-6">
          <AdminPacks />
        </TabsContent>

        <TabsContent value="requests" className="space-y-6 pt-6">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Demandes de Devis</h2>
            <div className="text-sm text-gray-400">
              {rentalRequests.length} demande{rentalRequests.length > 1 ? "s" : ""} au total
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Requests List */}
            <div className="lg:col-span-1 space-y-4">
              {rentalRequests.length === 0 ? (
                <div className="py-12 text-center bg-card rounded-lg border border-dashed border-border">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Aucune demande pour le moment.</p>
                </div>
              ) : (
                rentalRequests.map((req) => (
                  <Card 
                    key={req.id} 
                    className={`cursor-pointer transition-all border-border hover:border-[#8C0343]/50 ${selectedRequest?.id === req.id ? 'border-[#8C0343] bg-[#8C0343]/5 shadow-lg' : 'bg-card'}`}
                    onClick={() => setSelectedRequest(req)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{req.customerName}</h4>
                        {getStatusBadge(req.status)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <CalendarIcon className="w-3 h-3" />
                        {req.eventDate}
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{req.items.length} article{req.items.length > 1 ? 's' : ''}</span>
                        <span className="text-[#F29F05] font-bold">{req.totalPrice}€</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Request Details */}
            <div className="lg:col-span-2">
              {selectedRequest ? (
                <Card className="bg-[#1a1a1a] border-gray-800 sticky top-24">
                  <CardHeader className="border-b border-gray-800 pb-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-white text-2xl">{selectedRequest.customerName}</CardTitle>
                          {getStatusBadge(selectedRequest.status)}
                        </div>
                        <CardDescription className="text-gray-400">
                          Demande reçue le {selectedRequest.createdAt}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-700 text-gray-300">
                              Changer le statut
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleUpdateRequestStatus(selectedRequest.id, "En attente")}>
                              <Clock className="w-4 h-4 mr-2 text-orange-500" /> En attente
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateRequestStatus(selectedRequest.id, "Validé")}>
                              <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Validé
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateRequestStatus(selectedRequest.id, "Refusé")}>
                              <XCircleIcon className="w-4 h-4 mr-2 text-red-500" /> Refusé
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          onClick={() => handleDeleteRequest(selectedRequest.id)}
                          className="bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-8">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <Label className="text-gray-500 flex items-center gap-2">
                          <Mail className="w-3 h-3" /> Email
                        </Label>
                        <p className="text-white font-medium">{selectedRequest.email}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-gray-500 flex items-center gap-2">
                          <Phone className="w-3 h-3" /> Téléphone
                        </Label>
                        <p className="text-white font-medium">{selectedRequest.phone || 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-gray-500 flex items-center gap-2">
                          <CalendarIcon className="w-3 h-3" /> Date événement
                        </Label>
                        <p className="text-white font-medium">{selectedRequest.eventDate}</p>
                      </div>
                    </div>

                    {selectedRequest.message && (
                      <div className="bg-[#262626] p-4 rounded-lg border border-gray-700">
                        <Label className="text-gray-400 mb-2 block">Message du client :</Label>
                        <p className="text-gray-300 italic">"{selectedRequest.message}"</p>
                      </div>
                    )}

                    <Separator className="bg-gray-800" />

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-white flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#F29F05]" />
                        Détail du matériel
                      </h4>
                      <div className="bg-[#262626] rounded-lg border border-gray-700 overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="text-xs text-gray-400 uppercase bg-black/30">
                            <tr>
                              <th className="px-4 py-3">Désignation</th>
                              <th className="px-4 py-3 text-center">Qté</th>
                              <th className="px-4 py-3 text-right">Prix/j</th>
                              <th className="px-4 py-3 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {selectedRequest.items.map((item, idx) => (
                              <tr key={idx} className="text-gray-300 hover:bg-white/5">
                                <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                                <td className="px-4 py-3 text-center">{item.quantity}</td>
                                <td className="px-4 py-3 text-right">{item.price}€</td>
                                <td className="px-4 py-3 text-right font-bold text-[#F29F05]">
                                  {item.price * item.quantity}€
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-black/30">
                            {parseFloat(content.settings.rental.defaultDeposit) > 0 && (
                              <tr>
                                <td colSpan={3} className="px-4 py-2 text-right text-xs text-gray-500 uppercase">Acompte ({content.settings.rental.defaultDeposit})</td>
                                <td className="px-4 py-2 text-right text-sm font-bold text-gray-400">
                                  {Math.round(selectedRequest.totalPrice * (parseFloat(content.settings.rental.defaultDeposit) / 100))}€
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td colSpan={3} className="px-4 py-4 text-right font-bold text-white uppercase tracking-wider">Total estimé</td>
                              <td className="px-4 py-4 text-right text-2xl font-bold text-[#F29F05]">
                                {selectedRequest.totalPrice}€
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline" className="border-gray-700 text-gray-300" asChild>
                        <a href={`mailto:${selectedRequest.email}?subject=Réponse devis Dons Du Son`}>
                          <Mail className="w-4 h-4 mr-2" /> Répondre au client
                        </a>
                      </Button>
                      <Button className="bg-[#8C0343] hover:bg-[#771236]">
                        Générer PDF (Bientôt)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-card rounded-lg border border-dashed border-border opacity-50">
                  <FileText className="w-16 h-16 text-gray-600 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Sélectionnez une demande</h3>
                  <p className="text-gray-400">Cliquez sur une demande dans la liste pour voir les détails et la gérer.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit/Add Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card border-border text-white custom-scrollbar">
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
              <Input
                id="category"
                value={editingItem?.category || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="bg-background border-border"
                placeholder="Ex: Son, Lumière, Vidéo..."
              />
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
            <div className="col-span-2 space-y-2">
              <Label htmlFor="specs">Caractéristiques techniques (une par ligne)</Label>
              <Textarea
                id="specs"
                value={editingItem?.specs ? editingItem.specs.join("\n") : ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    specs: e.target.value.split("\n").map((s) => s.trim()),
                  }))
                }
                className="bg-background border-border"
                rows={4}
                placeholder="Ex: 16 canaux&#10;Effets SPX intégrés&#10;Interface USB"
              />
            </div>

            <div className="col-span-2 border-t border-border pt-6 mt-2">
              <BlockEditor
                blocks={editingItem?.content || []}
                onChange={(newBlocks) =>
                  setEditingItem((prev) =>
                    prev ? { ...prev, content: newBlocks } : null,
                  )
                }
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
