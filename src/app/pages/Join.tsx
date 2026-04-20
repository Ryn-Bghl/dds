import { Users, Heart, Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useEditor } from "../context/EditorContext";
import { Editable } from "../components/Editable";

export default function Join() {
  const { content } = useEditor();
  const { join } = content;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <Editable path="join.header.title" label="Titre Page">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold">
              {join.header.title}
            </h1>
          </Editable>
          <Editable
            path="join.header.description"
            type="textarea"
            label="Description Page"
          >
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
              {join.header.description}
            </p>
          </Editable>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Volunteering */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#8C0343]/20 rounded-full flex items-center justify-center text-[#F29F05]">
                  <Heart className="w-6 h-6" />
                </div>
                <Editable
                  path="join.volunteering.title"
                  label="Titre Bénévolat"
                >
                  <h2 className="text-3xl font-bold text-foreground">
                    {join.volunteering.title}
                  </h2>
                </Editable>
              </div>
              <Editable
                path="join.volunteering.content"
                type="textarea"
                label="Contenu Bénévolat"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {join.volunteering.content}
                </p>
              </Editable>
              <ul className="space-y-4">
                {[
                  "Accueil des artistes et du public",
                  "Aide à l'installation technique",
                  "Soutien à la communication locale",
                  "Gestion de la billetterie et du bar",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#F29F05]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="bg-[#8C0343] hover:bg-[#771236] w-full sm:w-auto"
              >
                Devenir bénévole
              </Button>
            </div>

            {/* Membership */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#8C0343]/20 rounded-full flex items-center justify-center text-[#F29F05]">
                  <Star className="w-6 h-6" />
                </div>
                <Editable path="join.membership.title" label="Titre Adhésion">
                  <h2 className="text-3xl font-bold text-foreground">
                    {join.membership.title}
                  </h2>
                </Editable>
              </div>
              <Editable
                path="join.membership.content"
                type="textarea"
                label="Contenu Adhésion"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {join.membership.content}
                </p>
              </Editable>
              <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    Avantages adhérents :
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-1.5 flex-shrink-0" />
                      -15% sur toute la location de matériel
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-1.5 flex-shrink-0" />
                      Accès prioritaire aux formations et ateliers
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-[#8C0343] rounded-full mt-1.5 flex-shrink-0" />
                      Droit de vote à l'Assemblée Générale
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-card w-full sm:w-auto"
              >
                Adhérer en ligne (20€/an)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Mention */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            Note : Pour votre sécurité, sachez qu'aucun transfert d'argent n'est
            effectué directement sur ce site. Les paiements se font via nos
            plateformes partenaires sécurisées (HelloAsso).
          </p>
        </div>
      </section>
    </div>
  );
}
