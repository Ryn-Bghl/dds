import { useParams, Link } from "react-router";
import { ArrowLeft, Package, CheckCircle2, ShoppingCart, Wrench } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useEditor } from "../context/EditorContext";
import { useCart } from "../context/CartContext";
import { Editable } from "../components/Editable";
import DetailContent from "../components/DetailContent";

export default function PackDetail() {
  const { id } = useParams();
  const { content } = useEditor();
  const { addToCart } = useCart();
  const packs = content.rentalPacks || [];
  const packIndex = packs.findIndex((p) => p.id === id);
  const pack = packIndex !== -1 ? packs[packIndex] : null;
  const inventory = content.inventory || [];

  if (!pack) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-foreground">Pack non trouvé</h1>
          <Button asChild>
            <Link to="/location">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour au catalogue
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const basePath = `rentalPacks.${packIndex}`;

  const isPackAvailable = pack.items.every(packItem => {
    const equipment = inventory.find(e => e.id === packItem.equipmentId);
    return equipment && equipment.stock >= packItem.quantity && equipment.status === "Disponible";
  });

  return (
    <div className="flex flex-col">
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
            <Link to="/location">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour au catalogue
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden border border-border bg-card aspect-video relative group">
              <Editable path={`${basePath}.image`} label="URL Image">
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Editable>
            </div>

            {/* Main Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-[#8C0343] text-white border-none">PACK COMBINÉ</Badge>
                <Badge variant="outline" className={`${isPackAvailable && pack.status === "Disponible" ? 'text-green-500 border-green-500/30' : 'text-red-500 border-red-500/30'}`}>
                  {isPackAvailable && pack.status === "Disponible" ? `✓ ${pack.status}` : '✕ Indisponible'}
                </Badge>
              </div>

              <Editable path={`${basePath}.name`} label="Nom du pack">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{pack.name}</h1>
              </Editable>

              <Editable path={`${basePath}.price`} label="Prix journalier">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#F29F05]">{pack.price}€</span>
                  <span className="text-xl text-muted-foreground">/ jour</span>
                </div>
              </Editable>

              <Editable path={`${basePath}.description`} type="textarea" label="Description courte">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {pack.description}
                </p>
              </Editable>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  onClick={() => pack && addToCart(pack, true)}
                  disabled={!isPackAvailable || pack.status !== "Disponible"}
                  className="w-full md:w-auto bg-[#8C0343] hover:bg-[#771236] text-white px-12 h-14 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  {!isPackAvailable || pack.status !== "Disponible" ? "Indisponible" : "Ajouter le pack au devis"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {/* Items included */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#F29F05]" />
                    Matériel inclus
                  </h3>
                  <div className="space-y-3">
                    {pack.items.map((item) => {
                      const equipment = inventory.find(e => e.id === item.equipmentId);
                      return (
                        <div key={item.equipmentId} className="flex items-center gap-3 text-gray-300 bg-card p-3 rounded-lg border border-border">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8C0343]/20 text-[#F29F05] font-bold text-sm">
                            {item.quantity}
                          </span>
                          <span className="font-medium">{equipment?.name || "Matériel"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Services included */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-4 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-[#F29F05]" />
                    Services & Prestations
                  </h3>
                  <div className="space-y-3">
                    {pack.services.map((service) => (
                      <div key={service} className="flex items-center gap-3 text-gray-300 bg-card p-3 rounded-lg border border-border">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <DetailContent
              blocks={pack.content || []}
              basePath={`${basePath}.content`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
