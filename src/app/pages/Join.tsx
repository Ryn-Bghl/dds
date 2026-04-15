import { useState } from "react";
import { Heart, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";

export default function Join() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    motivation: "",
    skills: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Candidature envoyée avec succès ! Nous vous recontacterons rapidement.");
    setFormData({ name: "", email: "", phone: "", motivation: "", skills: "" });
  };

  const benefits = [
    {
      icon: Heart,
      title: "Contribuer à la culture",
      description: "Participez activement au développement de la scène musicale locale",
    },
    {
      icon: Users,
      title: "Rencontrer des passionnés",
      description: "Intégrez une communauté engagée et créez des liens authentiques",
    },
    {
      icon: Lightbulb,
      title: "Développer vos compétences",
      description: "Apprenez de nouvelles techniques et enrichissez votre expérience",
    },
  ];

  const missions = [
    "Assistance technique lors des événements (sonorisation, lumière)",
    "Accueil et gestion du public lors des concerts",
    "Animation d'ateliers et formations",
    "Communication et réseaux sociaux",
    "Logistique et organisation d'événements",
    "Gestion du matériel et des locations",
  ];

  const membershipBenefits = [
    "Tarifs préférentiels sur la location de matériel (-30%)",
    "Accès prioritaire aux formations et ateliers",
    "Invitations aux événements privés de l'association",
    "Participation aux décisions lors des assemblées générales",
    "Réduction sur les concerts organisés par l'association",
    "Newsletter exclusive avec les actualités en avant-première",
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6">Rejoindre Dons Du Son</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Devenez acteur du changement et contribuez à notre mission culturelle
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="benevolat" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="benevolat">Bénévolat</TabsTrigger>
              <TabsTrigger value="adhesion">Adhésion</TabsTrigger>
            </TabsList>

            {/* Bénévolat Tab */}
            <TabsContent value="benevolat" className="space-y-12">
              {/* Why Become a Volunteer */}
              <div>
                <h2 className="text-4xl text-center mb-4 text-foreground">Pourquoi devenir bénévole ?</h2>
                <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                  Rejoignez une équipe dynamique et participez à des projets qui ont du sens
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <benefit.icon className="w-8 h-8 text-[#F29F05]" />
                        </div>
                        <h3 className="text-2xl mb-3 text-foreground">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Missions */}
              <div className="bg-card p-8 md:p-12 rounded-xl border border-border">
                <h2 className="text-3xl mb-6 text-center text-foreground">Nos missions bénévoles</h2>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  Selon vos compétences et disponibilités, vous pouvez participer à :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                  {missions.map((mission, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#F29F05] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{mission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Form */}
              <div className="bg-card p-8 md:p-12 rounded-xl max-w-3xl mx-auto border border-border">
                <h2 className="text-3xl mb-2 text-center text-foreground">Formulaire de candidature</h2>
                <p className="text-muted-foreground text-center mb-8">
                  Remplissez ce formulaire et nous vous recontacterons rapidement
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean.dupont@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skills">Compétences et expériences</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="Décrivez vos compétences techniques, artistiques ou organisationnelles..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="motivation">Motivation *</Label>
                    <Textarea
                      id="motivation"
                      required
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="Pourquoi souhaitez-vous devenir bénévole chez Dons Du Son ?"
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#8C0343] hover:bg-[#771236]" size="lg">
                    Envoyer ma candidature
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* Adhésion Tab */}
            <TabsContent value="adhesion" className="space-y-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl text-center mb-4 text-foreground">Devenir adhérent</h2>
                <p className="text-xl text-muted-foreground text-center mb-12">
                  Soutenez notre action en devenant membre de l'association
                </p>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <Card className="hover:shadow-xl hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                    <CardContent className="p-8">
                      <h3 className="text-2xl mb-2 text-foreground">Adhésion Individuelle</h3>
                      <div className="text-4xl text-[#F29F05] mb-6">20€ / an</div>
                      <p className="text-muted-foreground mb-6">
                        Pour les particuliers souhaitant soutenir nos actions
                      </p>
                      <Button className="w-full bg-[#8C0343] hover:bg-[#771236]">
                        Adhérer en ligne
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-xl hover:shadow-[#8C0343]/20 transition-all border-2 border-[#F29F05] bg-card">
                    <CardContent className="p-8">
                      <div className="bg-[#8C0343] text-white text-sm px-3 py-1 rounded-full inline-block mb-2">
                        RECOMMANDÉ
                      </div>
                      <h3 className="text-2xl mb-2 text-foreground">Adhésion Structure</h3>
                      <div className="text-4xl text-[#F29F05] mb-6">100€ / an</div>
                      <p className="text-muted-foreground mb-6">
                        Pour les associations, labels ou structures culturelles
                      </p>
                      <Button className="w-full bg-[#8C0343] hover:bg-[#771236]">
                        Adhérer en ligne
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Benefits */}
                <div className="bg-card p-8 md:p-12 rounded-xl border border-border">
                  <h3 className="text-3xl mb-8 text-center text-foreground">Avantages adhérents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {membershipBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#F29F05] flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HelloAsso Info */}
                <div className="bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 p-8 rounded-xl text-center border border-border">
                  <p className="text-muted-foreground mb-4">
                    L'adhésion se fait en ligne via notre plateforme HelloAsso sécurisée
                  </p>
                  <Button size="lg" className="bg-[#8C0343] hover:bg-[#771236]">
                    Accéder au formulaire d'adhésion
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}