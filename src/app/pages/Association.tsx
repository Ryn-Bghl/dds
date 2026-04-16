import {
  GraduationCap,
  Wrench,
  Radio,
  Users,
  Target,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export default function Association() {
  const interventionAreas = [
    {
      icon: GraduationCap,
      title: "Éducation & Formation",
      description:
        "Ateliers pédagogiques, formations techniques et accompagnement des jeunes talents dans leur apprentissage des métiers du son et de la musique.",
      features: [
        "Ateliers d'initiation à la MAO",
        "Formation ingénierie du son",
        "Workshops production musicale",
        "Stages en milieu scolaire",
      ],
    },
    {
      icon: Wrench,
      title: "Accompagnement Technique",
      description:
        "Mise à disposition de studios, conseil en ingénierie sonore et suivi technique des projets artistiques de A à Z.",
      features: [
        "Accès studio d'enregistrement",
        "Conseil en prise de son",
        "Mixage et mastering",
        "Support technique événements",
      ],
    },
    {
      icon: Radio,
      title: "Diffusion Culturelle",
      description:
        "Organisation d'événements, concerts et festivals pour promouvoir les artistes émergents et la diversité musicale.",
      features: [
        "Festivals et concerts",
        "Showcases et tremplins",
        "Résidences artistiques",
        "Partenariats culturels",
      ],
    },
  ];

  const team = [
    {
      name: "Sophie Martin",
      role: "Présidente",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "Thomas Dubois",
      role: "Trésorier",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Léa Bernard",
      role: "Secrétaire",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
    {
      name: "Marc Petit",
      role: "Responsable Technique",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Accessibilité",
      description: "Rendre la culture accessible à tous, sans distinction",
    },
    {
      icon: Users,
      title: "Solidarité",
      description: "Créer du lien entre artistes et acteurs culturels",
    },
    {
      icon: Heart,
      title: "Engagement",
      description: "S'investir pour le développement culturel local",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6">L'Association</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Une équipe passionnée au service de la création musicale et de
            l'accompagnement artistique
          </p>
        </div>
      </section>

      {/* Presentation */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl mb-8 text-center text-foreground">
              Notre Histoire
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-4">
                Fondée en 2022,{" "}
                <strong className="text-foreground">Dons Du Son</strong> est née
                de la rencontre entre des professionnels du secteur audio et des
                passionnés de musique, tous animés par la volonté de
                démocratiser l'accès aux moyens de production musicale.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Face au constat que de nombreux artistes émergents manquent de
                moyens techniques et financiers pour concrétiser leurs projets,
                nous avons décidé de créer une structure associative permettant
                de mutualiser les ressources et les compétences.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Aujourd'hui, nous sommes une équipe de 15 bénévoles actifs et
                comptons plus de 200 adhérents. Notre association est reconnue
                d'intérêt général et œuvre quotidiennement pour le développement
                de la scène musicale en Île-de-France.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-12 text-center text-foreground">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-[#F29F05]" />
                  </div>
                  <h3 className="text-2xl mb-3 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Intervention Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-4 text-center text-foreground">
            Nos Axes d'Intervention
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Trois domaines d'action complémentaires pour un accompagnement
            global des artistes
          </p>
          <div className="space-y-12 max-w-6xl mx-auto">
            {interventionAreas.map((area, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl hover:shadow-[#8C0343]/10 transition-all border-border bg-card"
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    <div className="bg-gradient-to-br from-[#8C0343] to-[#771236] p-8 text-white flex flex-col justify-center">
                      <area.icon className="w-12 h-12 mb-4" />
                      <h3 className="text-3xl mb-3">{area.title}</h3>
                      <p className="text-gray-100">{area.description}</p>
                    </div>
                    <div className="lg:col-span-2 p-8">
                      <h4 className="text-xl mb-4 text-foreground">
                        Actions concrètes :
                      </h4>
                      <ul className="space-y-3">
                        {area.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#F29F05] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-4 text-center text-foreground">
            Notre Équipe
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Les membres du bureau qui portent l'association au quotidien
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-background"
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl mb-1 text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-[#F29F05]">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              + 15 bénévoles actifs qui contribuent régulièrement aux actions de
              l'association
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
