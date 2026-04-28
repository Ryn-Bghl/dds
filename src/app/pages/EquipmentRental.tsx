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
import { toast } from "sonner";
import { useEditor } from "../context/EditorContext";
import { RentalRequest, InventoryItem, RentalPack } from "../../lib/content-store";
import { Link } from "react-router";

type CartItem = (InventoryItem | RentalPack) & { quantity: number; isPack?: boolean };

const categoryIcons = {
  Son: Music,
  Lumière: Lightbulb,
  DJ: Radio,
  Backline: Wrench,
};

export default function EquipmentRental() {
  const { content, updateContent } = useEditor();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    const isAvailable = item.status === "Disponible";
    return matchesCategory && isAvailable;
  });

  const addToCart = (item: InventoryItem | RentalPack, isPack = false) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1, isPack }]);
    }
    toast.success(`${item.name} ajouté au panier`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("Article retiré du panier");
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    const newRequest: RentalRequest = {
      id: `req-${Date.now()}`,
      customerName: quoteForm.name,
      email: quoteForm.email,
      phone: quoteForm.phone,
      eventDate: quoteForm.eventDate,
      status: "En attente",
      totalPrice: getTotalPrice(),
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      createdAt: new Date().toLocaleDateString("fr-FR"),
    };

    updateContent("rentalRequests", [newRequest, ...content.rentalRequests]);

    setIsSubmitted(true);
    setCart([]);
    setQuoteForm({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6 font-bold">
            Location de Matériel
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Matériel professionnel pour vos événements : son, lumière, DJ et
            backline
          </p>
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
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-card border-l border-border">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
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
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-[#8C0343] hover:bg-[#771236]"
                    >
                      Fermer
                    </Button>
                  </div>
                ) : (
                  <>
                    <SheetHeader>
                      <SheetTitle className="text-foreground font-bold text-2xl">
                        Panier de devis
                      </SheetTitle>
                    </SheetHeader>

                    <div className="mt-6 space-y-4">
                      {cart.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          Votre panier est vide
                        </p>
                      ) : (
                        <>
                          {cart.map((item) => (
                            <Card
                              key={item.id}
                              className="border-border bg-background"
                            >
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-bold mb-1 text-foreground">
                                      {item.name}
                                    </h4>
                                    <p className="text-sm text-[#F29F05] mb-2 font-medium">
                                      {item.price}€/jour
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          updateQuantity(item.id, -1)
                                        }
                                        className="h-8 w-8 p-0"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                      <span className="w-8 text-center text-foreground font-bold">
                                        {item.quantity}
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          updateQuantity(item.id, 1)
                                        }
                                        className="h-8 w-8 p-0"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-auto text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                          <Separator className="bg-border" />

                          <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1 font-medium">
                              Total estimé (1 jour)
                            </p>
                            <p className="text-4xl text-[#F29F05] font-bold">
                              {getTotalPrice()}€
                            </p>
                          </div>

                          <form
                            onSubmit={handleSubmitQuote}
                            className="space-y-4 pt-4 border-t border-border mt-4"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="quote-name">Nom *</Label>
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
                                className="bg-background"
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
                                className="bg-background"
                              />
                            </div>
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
                                className="bg-background"
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
                                className="bg-background"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="quote-message">Message</Label>
                              <Textarea
                                id="quote-message"
                                rows={3}
                                value={quoteForm.message}
                                onChange={(e) =>
                                  setQuoteForm({
                                    ...quoteForm,
                                    message: e.target.value,
                                  })
                                }
                                placeholder="Détails sur votre événement..."
                                className="bg-background"
                              />
                            </div>
                            <Button
                              type="submit"
                              className="w-full bg-[#8C0343] hover:bg-[#771236] text-white font-bold h-12"
                              size="lg"
                            >
                              <Send className="mr-2 w-4 h-4" />
                              Envoyer la demande de devis
                            </Button>
                          </form>
                        </>
                      )}
                    </div>
                  </>
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
              {rentalPacks.filter(p => p.status === "Disponible").map((pack) => (
                <Card key={pack.id} className="bg-card border-border overflow-hidden hover:border-[#8C0343] transition-colors group">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/3 relative overflow-hidden">
                      <img
                        src={pack.image}
                        alt={pack.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-[#8C0343] text-white border-none">BEST-SELLER</Badge>
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
                          className="flex-1 bg-[#8C0343] hover:bg-[#771236]"
                          onClick={() => addToCart(pack, true)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter au devis
                        </Button>
                        <Button variant="outline" className="border-border" asChild>
                          <Link to={`/location/pack/${pack.id}`}>Détails</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
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
              return (
                <Card
                  key={equipment.id}
                  className="overflow-hidden hover:shadow-xl hover:shadow-[#8C0343]/20 transition-all border-border bg-card group"
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
                          className="bg-[#8C0343] hover:bg-[#771236] text-white font-semibold"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Ajouter
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
                <h3 className="text-xl mb-4 text-[#F29F05] font-bold flex items-center gap-2">
                  Tarifs
                </h3>
                <ul className="space-y-3 text-muted-foreground font-medium">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                    Tarifs à la journée
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                    Dégressif dès 3 jours (-10%)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                    Dégressif dès 7 jours (-20%)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                    Caution remboursable selon matériel
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl mb-4 text-[#F29F05] font-bold flex items-center gap-2">
                  Services
                </h3>
                <ul className="space-y-3 text-muted-foreground font-medium">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                    Livraison en Île-de-France (sur devis)
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                    Installation et réglages possibles
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                    Assistance technique incluse
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-2 flex-shrink-0" />{" "}
                    Matériel testé et entretenu
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
