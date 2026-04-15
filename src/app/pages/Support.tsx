import { Heart, Gift, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Support() {
  const impactAreas = [
    {
      icon: Users,
      title: "Formation des jeunes",
      description: "Financer des ateliers pédagogiques gratuits dans les quartiers prioritaires",
    },
    {
      icon: Gift,
      title: "Équipement",
      description: "Renouveler et entretenir notre parc de matériel technique professionnel",
    },
    {
      icon: TrendingUp,
      title: "Événements",
      description: "Organiser des concerts et festivals accessibles à tous les publics",
    },
  ];

  const donationTypes = [
    {
      amount: "20€",
      impact: "Finance 1h d'atelier pédagogique pour un groupe",
    },
    {
      amount: "50€",
      impact: "Permet l'achat de petits équipements (câbles, micros)",
    },
    {
      amount: "100€",
      impact: "Couvre les frais de sonorisation d'un petit concert",
    },
    {
      amount: "200€",
      impact: "Finance une journée de formation complète",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl mb-6">Soutenir Dons Du Son</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Votre don nous aide à poursuivre notre mission de démocratisation de la culture musicale
          </p>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-4 text-foreground">À quoi servira votre don ?</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Chaque euro compte et contribue directement à nos actions sur le terrain
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {impactAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <area.icon className="w-8 h-8 text-[#F29F05]" />
                  </div>
                  <h3 className="text-2xl mb-3 text-foreground">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Examples */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 text-foreground">L'impact de votre contribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {donationTypes.map((donation, index) => (
              <Card key={index} className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-background">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl text-[#F29F05] mb-4">{donation.amount}</div>
                  <p className="text-muted-foreground">{donation.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Reduction Info */}
      <section className="py-12 bg-[#8C0343]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl mb-4 text-foreground">Déduction fiscale</h3>
            <p className="text-lg text-foreground mb-2">
              <strong>66% de votre don est déductible de vos impôts</strong>
            </p>
            <p className="text-muted-foreground">
              Un don de 100€ ne vous coûte réellement que 34€ après réduction d'impôts. 
              Vous recevrez un reçu fiscal automatiquement.
            </p>
          </div>
        </div>
      </section>

      {/* HelloAsso Widget Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-center mb-4 text-foreground">Faire un don</h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Don ponctuel ou mensuel, choisissez la formule qui vous convient
            </p>

            {/* HelloAsso Placeholder */}
            <div className="bg-card border-2 border-dashed border-border rounded-xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <Gift className="w-16 h-16 mx-auto mb-6 text-[#F29F05]" />
                <h3 className="text-2xl mb-4 text-foreground">Widget HelloAsso</h3>
                <p className="text-muted-foreground mb-6">
                  Le formulaire de don HelloAsso sera intégré ici. Il permet de faire des dons 
                  sécurisés par carte bancaire ou virement.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-[#8C0343] hover:bg-[#771236]" size="lg">
                    Don ponctuel
                  </Button>
                  <Button variant="outline" className="w-full border-[#F29F05] text-[#F29F05] hover:bg-[#F29F05]/10" size="lg">
                    Don mensuel
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Plateforme sécurisée HelloAsso • Paiement 100% sécurisé
                </p>
              </div>
            </div>

            {/* Alternative Support Methods */}
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="text-2xl text-center mb-8 text-foreground">Autres moyens de nous soutenir</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg mb-2 text-foreground">Virement bancaire</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Contactez-nous pour obtenir notre RIB
                    </p>
                    <Button variant="outline" size="sm">
                      Nous contacter
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg mb-2 text-foreground">Chèque</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      À l'ordre de "Dons Du Son"
                    </p>
                    <Button variant="outline" size="sm">
                      Voir l'adresse
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg mb-2 text-foreground">Don en nature</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Matériel audio, instruments...
                    </p>
                    <Button variant="outline" size="sm">
                      Proposer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 bg-gradient-to-br from-[#8C0343] to-[#771236] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-6">Transparence financière</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Nous nous engageons à une totale transparence sur l'utilisation des dons. 
            Nos comptes sont certifiés et nos rapports d'activité publiés chaque année.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Voir nos rapports financiers
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Télécharger nos statuts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}