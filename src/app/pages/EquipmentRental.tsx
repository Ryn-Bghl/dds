import { useState } from "react";
import { Music, Lightbulb, Radio, Wrench, ShoppingCart, Plus, Minus, Trash2, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

type Equipment = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  specs: string[];
};

type CartItem = Equipment & { quantity: number };

const equipmentCatalog: Equipment[] = [
  // Son
  {
    id: "son-1",
    category: "Son",
    name: "Enceinte JBL PRX815",
    image: "https://images.unsplash.com/photo-1686709709573-a877d7012cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VycyUyMHNvdW5kJTIwc3lzdGVtfGVufDF8fHx8MTc3NDYyMDE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 80,
    description: "Enceinte active 1500W, idéale pour petites et moyennes configurations",
    specs: ["1500W RMS", "Bi-amplifiée", "DSP intégré", "Connectique XLR/Jack"],
  },
  {
    id: "son-2",
    category: "Son",
    name: "Console Yamaha MG16XU",
    image: "https://images.unsplash.com/photo-1700166269606-b5ea327d0540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMG1peGluZyUyMGNvbnNvbGUlMjBzdHVkaW98ZW58MXx8fHwxNzc0NTMyNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 60,
    description: "Table de mixage 16 canaux avec effets et interface USB",
    specs: ["16 canaux", "Effets SPX intégrés", "Interface USB", "4 Aux"],
  },
  {
    id: "son-3",
    category: "Son",
    name: "Micro Shure SM58",
    image: "https://images.unsplash.com/photo-1678356434281-0ef01a3ac02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW8lMjBtaWNyb3Bob25lfGVufDF8fHx8MTc3NDU5ODA2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 15,
    description: "Micro dynamique cardioïde, standard pour le chant live",
    specs: ["Directivité cardioïde", "Filtre anti-pop", "Robuste", "Câble XLR inclus"],
  },
  {
    id: "son-4",
    category: "Son",
    name: "Caisson de basses QSC KW181",
    image: "https://images.unsplash.com/photo-1686709709573-a877d7012cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VycyUyMHNvdW5kJTIwc3lzdGVtfGVufDF8fHx8MTc3NDYyMDE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 100,
    description: "Subwoofer actif 18 pouces pour basses puissantes",
    specs: ["1000W RMS", "18 pouces", "Réponse 40Hz-120Hz", "Mode mono/stéréo"],
  },

  // Lumière
  {
    id: "lumiere-1",
    category: "Lumière",
    name: "Lyre LED Moving Head",
    image: "https://images.unsplash.com/photo-1758306120745-a2fb7b34b6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZSUyMGxpZ2h0aW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3NDYxNTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 70,
    description: "Lyre à LED 150W avec gobos et prisme",
    specs: ["LED 150W", "16 canaux DMX", "Gobos rotatifs", "Prisme 3 facettes"],
  },
  {
    id: "lumiere-2",
    category: "Lumière",
    name: "Par LED 18x12W RGBWA+UV",
    image: "https://images.unsplash.com/photo-1758306120745-a2fb7b34b6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZSUyMGxpZ2h0aW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3NDYxNTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 35,
    description: "Projecteur à LED 6 couleurs pour ambiances colorées",
    specs: ["18 LED 12W", "RGBWA+UV", "DMX / Auto / Sound", "Silencieux"],
  },
  {
    id: "lumiere-3",
    category: "Lumière",
    name: "Console DMX 192 canaux",
    image: "https://images.unsplash.com/photo-1758306120745-a2fb7b34b6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZSUyMGxpZ2h0aW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3NDYxNTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 50,
    description: "Contrôleur DMX pour gestion complète de l'éclairage",
    specs: ["192 canaux", "12 fixtures", "30 banques", "Joystick pan/tilt"],
  },
  {
    id: "lumiere-4",
    category: "Lumière",
    name: "Machine à fumée 1500W",
    image: "https://images.unsplash.com/photo-1758306120745-a2fb7b34b6b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZSUyMGxpZ2h0aW5nJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3NDYxNTc1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 40,
    description: "Générateur de fumée pour mise en valeur des faisceaux lumineux",
    specs: ["1500W", "Débit 350m³/min", "DMX", "Télécommande incluse"],
  },

  // DJ
  {
    id: "dj-1",
    category: "DJ",
    name: "Platines Pioneer PLX-500",
    image: "https://images.unsplash.com/photo-1774118042703-4f3c3ebfa0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHR1cm50YWJsZXMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 55,
    description: "Platine vinyle DJ avec entraînement direct",
    specs: ["Entraînement direct", "USB", "Bras en S", "Pitch ±8% / ±16%"],
  },
  {
    id: "dj-2",
    category: "DJ",
    name: "Contrôleur Pioneer DDJ-400",
    image: "https://images.unsplash.com/photo-1774118042703-4f3c3ebfa0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHR1cm50YWJsZXMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 45,
    description: "Contrôleur DJ 2 voies pour Rekordbox",
    specs: ["2 voies", "Rekordbox DJ inclus", "Interface audio", "Pads performance"],
  },
  {
    id: "dj-3",
    category: "DJ",
    name: "Table de mixage DJ Xone:23",
    image: "https://images.unsplash.com/photo-1700166269606-b5ea327d0540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMG1peGluZyUyMGNvbnNvbGUlMjBzdHVkaW98ZW58MXx8fHwxNzc0NTMyNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 50,
    description: "Mixeur DJ 2+1 voies avec filtre analogique",
    specs: ["2+1 voies", "Filtres VCF", "EQ 3 bandes", "Envoi/retour"],
  },
  {
    id: "dj-4",
    category: "DJ",
    name: "Casque DJ Sennheiser HD 25",
    image: "https://images.unsplash.com/photo-1774118042703-4f3c3ebfa0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHR1cm50YWJsZXMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 12,
    description: "Casque professionnel pour DJ et monitoring",
    specs: ["Fermé", "Isolation excellente", "SPL élevé", "Pièces remplaçables"],
  },

  // Backline
  {
    id: "backline-1",
    category: "Backline",
    name: "Ampli basse Ampeg SVT-3 PRO",
    image: "https://images.unsplash.com/photo-1565719178004-420e3480e2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHMlMjBiYWNrbGluZXxlbnwxfHx8fDE3NzQ2MjAxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 65,
    description: "Tête d'ampli basse à lampes 450W",
    specs: ["450W", "Lampes préampli", "EQ 9 bandes", "Sortie DI"],
  },
  {
    id: "backline-2",
    category: "Backline",
    name: "Batterie Yamaha Stage Custom",
    image: "https://images.unsplash.com/photo-1565719178004-420e3480e2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHMlMjBiYWNrbGluZXxlbnwxfHx8fDE3NzQ2MjAxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 90,
    description: "Kit batterie complet 5 fûts avec cymbales",
    specs: ["5 fûts", "Cymbales Zildjian", "Hardware inclus", "Fûts érable"],
  },
  {
    id: "backline-3",
    category: "Backline",
    name: "Ampli guitare Marshall JCM800",
    image: "https://images.unsplash.com/photo-1565719178004-420e3480e2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpY2FsJTIwaW5zdHJ1bWVudHMlMjBiYWNrbGluZXxlbnwxfHx8fDE3NzQ2MjAxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 70,
    description: "Tête d'ampli guitare légendaire 100W à lampes",
    specs: ["100W", "Tout lampes", "2 canaux", "Baffle 4x12 inclus"],
  },
  {
    id: "backline-4",
    category: "Backline",
    name: "Retour de scène actif",
    image: "https://images.unsplash.com/photo-1686709709573-a877d7012cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VycyUyMHNvdW5kJTIwc3lzdGVtfGVufDF8fHx8MTc3NDYyMDE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: 45,
    description: "Moniteur de scène actif 12 pouces",
    specs: ["400W", "12 pouces", "Bi-amplifié", "XLR + Jack"],
  },
];

const categoryIcons = {
  Son: Music,
  Lumière: Lightbulb,
  DJ: Radio,
  Backline: Wrench,
};

export default function EquipmentRental() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  });

  const categories = ["Tous", "Son", "Lumière", "DJ", "Backline"];

  const filteredEquipment = selectedCategory === "Tous"
    ? equipmentCatalog
    : equipmentCatalog.filter((item) => item.category === selectedCategory);

  const addToCart = (equipment: Equipment) => {
    const existingItem = cart.find((item) => item.id === equipment.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === equipment.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...equipment, quantity: 1 }]);
    }
    toast.success(`${equipment.name} ajouté au panier`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter((item) => item.quantity > 0));
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
    toast.success("Demande de devis envoyée ! Nous vous recontacterons sous 24h.");
    setCart([]);
    setQuoteForm({ name: "", email: "", phone: "", eventDate: "", message: "" });
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6">Location de Matériel</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Matériel professionnel pour vos événements : son, lumière, DJ et backline
          </p>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bg-[#8C0343]/10 py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground">
            <div>✓ Tarifs dégressifs dès 3 jours</div>
            <div>✓ Livraison et installation possible</div>
            <div>✓ Assistance technique incluse</div>
          </div>
        </div>
      </div>

      {/* Filters & Cart */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
              <TabsList className="grid grid-cols-5 max-w-2xl">
                {categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Cart Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-[#8C0343] hover:bg-[#771236] relative">
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Panier ({cart.length})
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#F29F05] text-black text-xs w-6 h-6 rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Panier de devis</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Votre panier est vide</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={item.id} className="border-border bg-card">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium mb-1 text-foreground">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{item.price}€/jour</p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="w-8 text-center text-foreground">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-red-500"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Separator />

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Total estimé (1 jour)</p>
                        <p className="text-3xl text-[#F29F05]">{getTotalPrice()}€</p>
                      </div>

                      <form onSubmit={handleSubmitQuote} className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="quote-name">Nom *</Label>
                          <Input
                            id="quote-name"
                            required
                            value={quoteForm.name}
                            onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="quote-email">Email *</Label>
                          <Input
                            id="quote-email"
                            type="email"
                            required
                            value={quoteForm.email}
                            onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="quote-phone">Téléphone</Label>
                          <Input
                            id="quote-phone"
                            type="tel"
                            value={quoteForm.phone}
                            onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="quote-date">Date de l'événement *</Label>
                          <Input
                            id="quote-date"
                            type="date"
                            required
                            value={quoteForm.eventDate}
                            onChange={(e) => setQuoteForm({ ...quoteForm, eventDate: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="quote-message">Message</Label>
                          <Textarea
                            id="quote-message"
                            rows={3}
                            value={quoteForm.message}
                            onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                            placeholder="Détails sur votre événement..."
                          />
                        </div>
                        <Button type="submit" className="w-full bg-[#8C0343] hover:bg-[#771236]" size="lg">
                          <Send className="mr-2 w-4 h-4" />
                          Envoyer la demande de devis
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipment.map((equipment) => {
              const Icon = categoryIcons[equipment.category as keyof typeof categoryIcons];
              return (
                <Card key={equipment.id} className="overflow-hidden hover:shadow-xl hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={equipment.image}
                        alt={equipment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2 bg-[#8C0343]/20 text-[#F29F05] border-[#F29F05]/30">
                        <Icon className="w-3 h-3 mr-1" />
                        {equipment.category}
                      </Badge>
                      <h3 className="text-lg mb-2 text-foreground">{equipment.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{equipment.description}</p>
                      <ul className="text-xs text-muted-foreground mb-4 space-y-1">
                        {equipment.specs.slice(0, 3).map((spec, idx) => (
                          <li key={idx}>• {spec}</li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl text-[#F29F05]">{equipment.price}€</span>
                          <span className="text-sm text-muted-foreground">/jour</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(equipment)}
                          className="bg-[#8C0343] hover:bg-[#771236]"
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
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-center mb-12 text-foreground">Conditions de location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl mb-4 text-foreground">Tarifs</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Tarifs à la journée</li>
                  <li>• Dégressif dès 3 jours (-10%)</li>
                  <li>• Dégressif dès 7 jours (-20%)</li>
                  <li>• Caution remboursable selon matériel</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-4 text-foreground">Services</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Livraison en Île-de-France (sur devis)</li>
                  <li>• Installation et réglages possibles</li>
                  <li>• Assistance technique incluse</li>
                  <li>• Matériel testé et entretenu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}