import { useParams, Link } from "react-router";
import { ArrowLeft, Package, CheckCircle2, ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useEditor } from "../context/EditorContext";
import { Editable } from "../components/Editable";
import DetailContent from "../components/DetailContent";

export default function EquipmentDetail() {
  const { id } = useParams();
  const { content } = useEditor();
  const inventory = content.inventory;
  const itemIndex = inventory.findIndex((i) => i.id === id);
  const item = itemIndex !== -1 ? inventory[itemIndex] : null;

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-foreground">Matériel non trouvé</h1>
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

  const basePath = `inventory.${itemIndex}`;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Disponible":
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            ✓ Disponible
          </Badge>
        );
      case "Indisponible":
        return (
          <Badge className="bg-red-500/20 text-red-500 border-red-500/30">
            ✕ Indisponible
          </Badge>
        );
      case "Maintenance":
        return (
          <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
            ⚠ Maintenance
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col">
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <Button
            asChild
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <Link to="/location">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour au catalogue
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Gallery / Image */}
            <div className="rounded-3xl overflow-hidden border border-border bg-card relative group">
              <Editable path={`${basePath}.image`} label="URL Image">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Editable>
            </div>

            {/* Main Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Editable path={`${basePath}.category`} label="Catégorie">
                  <Badge
                    variant="outline"
                    className="text-[#F29F05] border-[#F29F05]/30"
                  >
                    {item.category}
                  </Badge>
                </Editable>
                {getStatusBadge(item.status)}
              </div>

              <Editable path={`${basePath}.name`} label="Nom du matériel">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  {item.name}
                </h1>
              </Editable>

              <Editable path={`${basePath}.price`} label="Prix journalier">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#F29F05]">
                    {item.price}€
                  </span>
                  <span className="text-xl text-muted-foreground">/ jour</span>
                </div>
              </Editable>

              <Editable
                path={`${basePath}.description`}
                type="textarea"
                label="Description courte"
              >
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Editable>

              <div className="pt-6 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[#8C0343] hover:bg-[#771236] text-white px-8 h-14 text-lg font-bold"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Ajouter au devis
                </Button>
                <div className="flex items-center gap-3 px-6 bg-card border border-border rounded-xl">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Stock: {item.stock}
                  </span>
                </div>
              </div>

              {/* Specs */}
              <div className="pt-8">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-4">
                  Caractéristiques techniques
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {item.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <DetailContent
              blocks={item.content || []}
              basePath={`${basePath}.content`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
