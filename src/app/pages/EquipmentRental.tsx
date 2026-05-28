import { useState } from "react";
import {
  Music,
  Lightbulb,
  Radio,
  Wrench,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Send,
  CheckCircle2,
  Package,
  LayoutGrid,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { useEditor } from "../context/EditorContext";
import { useCart } from "../context/CartContext";
import { InventoryItem, RentalPack } from "../../lib/content-store";
import { Link } from "react-router";
import { Editable } from "../components/Editable";

const categoryIcons = {
  Son: Music,
  Lumière: Lightbulb,
  DJ: Radio,
  Backline: Wrench,
};

export default function EquipmentRental() {
  const { content } = useEditor();
  const { rental } = content;
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    submitQuote,
    cancelLastRequest,
    isSubmitted,
    setIsSubmitted,
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  });

  const inventory = content.inventory || [];
  const rentalPacks = content.rentalPacks || [];

  const existingCategories = [
    "Tous",
    ...Array.from(new Set(inventory.map((item) => item.category))),
  ];

  const filteredEquipment = inventory.filter((item) => {
    const matchesCategory =
      selectedCategory === "Tous" || item.category === selectedCategory;
    return matchesCategory;
  });

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuote(quoteForm);
    if (cart.length > 0) {
      setQuoteForm({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        message: "",
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <Editable path="rental.header.title" label="Titre Page">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold">
              {rental?.header?.title || "Location de Matériel"}
            </h1>
          </Editable>
          <Editable
            path="rental.header.description"
            type="textarea"
            label="Description Page"
          >
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
              {rental?.header?.description ||
                "Matériel professionnel pour vos événements : son, lumière, DJ et backline"}
            </p>
          </Editable>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bg-[#8C0343]/10 py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground font-medium">
            <div>✓ Tarifs dégressifs dès 3 jours</div>
            <div>✓ Livraison et installation possible</div>
            <div>✓ Assistance technique incluse</div>
          </div>
        </div>
      </div>

      {/* Filters & Cart */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full overflow-x-auto">
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full"
              >
                <TabsList className="inline-flex w-auto min-w-full md:min-w-0">
                  {existingCategories.map((cat) => (
                    <TabsTrigger key={cat} value={cat} className="px-6">
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Cart Button */}
            <Sheet
              onOpenChange={(open) => {
                if (!open) setIsSubmitted(false);
              }}
            >
              <SheetTrigger asChild>
                <Button className="bg-[#8C0343] hover:bg-[#771236] relative">
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Panier ({cart.length})
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#F29F05] text-black text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-card border-l border-border p-0">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 px-6">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">
                        Demande envoyée !
                      </h3>
                      <p className="text-gray-400">
                        Votre demande de devis a été enregistrée avec succès.
                        Notre équipe vous contactera sous 72 heures.
                      </p>
                    </div>
                    <div className="flex flex-col w-full gap-3">
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-[#8C0343] hover:bg-[#771236]"
                      >
                        Fermer le panier
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={cancelLastRequest}
                        className="text-gray-500 hover:text-red-400 hover:bg-red-900/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Annuler ma demande (Erreur ?)
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <SheetHeader className="px-6 py-6 border-b border-border bg-background/50">
                      <SheetTitle className="text-foreground font-bold text-2xl">
                        Panier de devis
                      </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 opacity-50">
                          <ShoppingCart className="w-12 h-12 text-gray-500" />
                          <p className="text-muted-foreground font-medium">
                            Votre panier est vide
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-4">
                            {cart.map((item) => (
                              <Card
                                key={item.id}
                                className="border-border bg-background overflow-hidden"
                              >
                                <CardContent className="p-4">
                                  <div className="flex gap-4">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-bold mb-1 text-foreground truncate">
                                        {item.name}
                                      </h4>
                                      <p className="text-sm text-[#F29F05] mb-2 font-medium">
                                        {item.price}€/jour
                                      </p>
                                      <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 bg-black/20 rounded-md p-1">
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                              updateQuantity(item.id, -1)
                                            }
                                            className="h-7 w-7 p-0 hover:bg-white/10"
                                          >
                                            <Minus className="w-3 h-3" />
                                          </Button>
                                          <span className="w-6 text-center text-foreground font-bold text-sm">
                                            {item.quantity}
                                          </span>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                              updateQuantity(item.id, 1)
                                            }
                                            className="h-7 w-7 p-0 hover:bg-white/10"
                                          >
                                            <Plus className="w-3 h-3" />
                                          </Button>
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => removeFromCart(item.id)}
                                          className="ml-auto text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          <div className="bg-[#8C0343]/5 p-6 rounded-xl border border-[#8C0343]/20 space-y-2">
                            <div className="flex justify-between items-end">
                              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                Total estimé (1 jour)
                              </p>
                              <p className="text-4xl text-[#F29F05] font-bold leading-none">
                                {getTotalPrice()}€
                              </p>
                            </div>
                            <p className="text-[10px] text-gray-500 italic">
                              * Ce total est une estimation journalière hors frais de livraison ou services techniques.
                            </p>
                          </div>

                          <div className="space-y-6 pt-2">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <Send className="w-4 h-4 text-[#F29F05]" />
                              Finaliser ma demande
                            </h3>
                            <form
                              onSubmit={handleSubmitQuote}
                              className="space-y-4"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="quote-name">Nom complet *</Label>
                                  <Input
                                    id="quote-name"
                                    required
                                    value={quoteForm.name}
                                    onChange={(e) =>
                                      setQuoteForm({
                                        ...quoteForm,
                                        name: e.target.value,
                                      })
                                    }
                                    className="bg-background border-border h-11"
                                    placeholder="Ex: Jean Dupont"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="quote-email">Email *</Label>
                                  <Input
                                    id="quote-email"
                                    type="email"
                                    required
                                    value={quoteForm.email}
                                    onChange={(e) =>
                                      setQuoteForm({
                                        ...quoteForm,
                                        email: e.target.value,
                                      })
                                    }
                                    className="bg-background border-border h-11"
                                    placeholder="jean@exemple.fr"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="quote-phone">Téléphone</Label>
                                  <Input
                                    id="quote-phone"
                                    type="tel"
                                    value={quoteForm.phone}
                                    onChange={(e) =>
                                      setQuoteForm({
                                        ...quoteForm,
                                        phone: e.target.value,
                                      })
                                    }
                                    className="bg-background border-border h-11"
                                    placeholder="06 12 34 56 78"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="quote-date">
                                    Date de l'événement *
                                  </Label>
                                  <Input
                                    id="quote-date"
                                    type="date"
                                    required
                                    value={quoteForm.eventDate}
                                    onChange={(e) =>
                                      setQuoteForm({
                                        ...quoteForm,
                                        eventDate: e.target.value,
                                      })
                                    }
                                    className="bg-background border-border h-11"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="quote-message">Message ou besoins spécifiques</Label>
                                <Textarea
                                  id="quote-message"
                                  rows={4}
                                  value={quoteForm.message}
                                  onChange={(e) =>
                                    setQuoteForm({
                                      ...quoteForm,
                                      message: e.target.value,
                                    })
                                  }
                                  placeholder="Détails sur votre événement, horaires, lieu de livraison..."
                                  className="bg-background border-border resize-none"
                                />
                              </div>
                              <Button
                                type="submit"
                                className="w-full bg-[#8C0343] hover:bg-[#771236] text-white font-bold h-12 text-lg shadow-lg shadow-[#8C0343]/20"
                                size="lg"
                              >
                                <Send className="mr-2 w-4 h-4" />
                                Envoyer la demande de devis
                              </Button>
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Packs Section */}
      {selectedCategory === "Tous" && rentalPacks.length > 0 && (
        <section className="py-16 bg-gray-900/50 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-8 h-8 text-[#F29F05]" />
              <h2 className="text-3xl font-bold text-white">Nos Packs Tout-en-un</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {rentalPacks.map((pack) => {
                const isPackAvailable = pack.items.every(packItem => {
                   const equipment = inventory.find(e => e.id === packItem.equipmentId);
                   return equipment && equipment.stock >= packItem.quantity && equipment.status === "Disponible";
                });
                const availableStatus = isPackAvailable && pack.status === "Disponible";

                return (
                  <Card key={pack.id} className={`bg-card border-border overflow-hidden transition-colors group ${!availableStatus ? 'opacity-75' : 'hover:border-[#8C0343]'}`}>
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 relative overflow-hidden">
                        <img
                          src={pack.image}
                          alt={pack.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-2">
                          <Badge className="bg-[#8C0343] text-white border-none">BEST-SELLER</Badge>
                          {!availableStatus && (
                            <Badge variant="destructive" className="bg-red-500 text-white border-none">INDISPONIBLE</Badge>
                          )}
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{pack.name}</h3>
                            <p className="text-sm text-gray-400">{pack.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#F29F05]">{pack.price}€</p>
                            <p className="text-xs text-gray-500">/jour</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-6 flex-1">
                          <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Matériel inclus</h4>
                            <div className="flex flex-wrap gap-2">
                              {pack.items.map((item) => {
                                const equipment = inventory.find(e => e.id === item.equipmentId);
                                return (
                                  <Badge key={item.equipmentId} variant="outline" className="bg-background/50 border-border text-gray-300">
                                    {item.quantity}x {equipment?.name || "Matériel"}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Services inclus</h4>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                              {pack.services.map((service) => (
                                <li key={service} className="text-sm text-gray-300 flex items-center gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                                  {service}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button 
                            className="flex-1 bg-[#8C0343] hover:bg-[#771236] disabled:opacity-50"
                            onClick={() => addToCart(pack, true)}
                            disabled={!availableStatus}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            {availableStatus ? "Ajouter au devis" : "Indisponible"}
                          </Button>
                          <Button variant="outline" className="border-border" asChild>
                            <Link to={`/location/pack/${pack.id}`}>Détails</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Equipment Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <LayoutGrid className="w-8 h-8 text-[#F29F05]" />
            <h2 className="text-3xl font-bold text-white">Matériel individuel</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipment.map((equipment) => {
              const Icon =
                categoryIcons[equipment.category as keyof typeof categoryIcons];
              const isAvailable = equipment.status === "Disponible" && equipment.stock > 0;

              return (
                <Card
                  key={equipment.id}
                  className={`overflow-hidden transition-all border-border bg-card group ${!isAvailable ? 'opacity-75' : 'hover:shadow-xl hover:shadow-[#8C0343]/20'}`}
                >
                  <CardContent className="p-0">
                    <Link
                      to={`/location/${equipment.id}`}
                      className="block aspect-square overflow-hidden relative"
                    >
                      <img
                        src={equipment.image}
                        alt={equipment.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-bold text-sm bg-[#8C0343] px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          Voir les détails
                        </span>
                      </div>
                      {!isAvailable && (
                        <div className="absolute top-2 right-2">
                           <Badge variant="destructive" className="bg-red-500 text-white border-none">INDISPONIBLE</Badge>
                        </div>
                      )}
                    </Link>
                    <div className="p-4">
                      <Badge
                        variant="secondary"
                        className="mb-2 bg-[#8C0343]/20 text-[#F29F05] border-[#F29F05]/30"
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {equipment.category}
                      </Badge>
                      <Link to={`/location/${equipment.id}`}>
                        <h3 className="text-lg mb-2 text-foreground font-bold line-clamp-1 hover:text-[#8C0343] transition-colors">
                          {equipment.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {equipment.description}
                      </p>
                      <ul className="text-xs text-muted-foreground mb-4 space-y-1 min-h-[48px]">
                        {equipment.specs.slice(0, 3).map((spec) => (
                          <li key={spec}>• {spec}</li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-2xl text-[#F29F05] font-bold">
                            {equipment.price}€
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /jour
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(equipment)}
                          disabled={!isAvailable}
                          className="bg-[#8C0343] hover:bg-[#771236] text-white font-semibold disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          {isAvailable ? "Ajouter" : "Indisponible"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-center mb-12 text-foreground font-bold">
              Conditions de location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Editable path="rental.conditions.title" label="Titre Tarifs">
                  <h3 className="text-xl mb-4 text-[#F29F05] font-bold flex items-center gap-2">
                    {rental?.conditions?.title || "Tarifs"}
                  </h3>
                </Editable>
                <ul className="space-y-3 text-muted-foreground font-medium">
                  {(rental?.conditions?.items || [
                    "Tarifs à la journée",
                    "Dégressif dès 3 jours (-10%)",
                    "Dégressif dès 7 jours (-20%)",
                    "Caution remboursable selon matériel",
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />
                      <Editable
                        path={`rental.conditions.items.${idx}`}
                        label={`Tarif ${idx + 1}`}
                      >
                        <span>{item}</span>
                      </Editable>
                    </li>
                  ))}
                  {parseFloat(content.settings.rental.defaultDeposit) > 0 && (
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                      Acompte de {content.settings.rental.defaultDeposit} à la réservation
                    </li>
                  )}
                </ul>
              </div>
              <div className="space-y-4">
                <Editable path="rental.services.title" label="Titre Services">
                  <h3 className="text-xl mb-4 text-[#F29F05] font-bold flex items-center gap-2">
                    {rental?.services?.title || "Services"}
                  </h3>
                </Editable>
                <ul className="space-y-3 text-muted-foreground font-medium">
                  {(rental?.services?.items || [
                    "Livraison en Île-de-France (sur devis)",
                    "Installation et réglages possibles",
                    "Assistance technique incluse",
                    "Matériel testé et entretenu",
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />
                      <Editable
                        path={`rental.services.items.${idx}`}
                        label={`Service ${idx + 1}`}
                      >
                        <span>{item}</span>
                      </Editable>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
