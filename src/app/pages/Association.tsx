import {
  GraduationCap,
  Wrench,
  Radio,
  Users,
  Target,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { useEditor } from "../context/EditorContext";
import { Editable } from "../components/Editable";

export default function Association() {
  const { content } = useEditor();
  const { association } = content;

  const iconMap: Record<string, any> = {
    Target,
    Users,
    Heart,
  };

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

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <Editable path="association.header.title" label="Titre Page">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold">
              {association.header.title}
            </h1>
          </Editable>
          <Editable
            path="association.header.description"
            type="textarea"
            label="Description Page"
          >
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
              {association.header.description}
            </p>
          </Editable>
        </div>
      </section>

      {/* Presentation */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Editable path="association.history.title" label="Titre Histoire">
              <h2 className="text-4xl mb-8 text-center text-foreground font-bold">
                {association.history.title}
              </h2>
            </Editable>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <Editable
                path="association.history.content"
                type="textarea"
                label="Contenu Histoire"
              >
                <div className="whitespace-pre-wrap text-lg leading-relaxed mb-4">
                  {association.history.content}
                </div>
              </Editable>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-12 text-center text-foreground font-bold">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(Array.isArray(association.values) ? association.values : []).map(
              (value, index) => {
                const Icon = iconMap[value.iconName] || Target;
                return (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-[#F29F05]" />
                      </div>
                      <Editable
                        path={`association.values.${index}.title`}
                        label="Titre Valeur"
                      >
                        <h3 className="text-2xl mb-3 text-foreground font-semibold">
                          {value.title}
                        </h3>
                      </Editable>
                      <Editable
                        path={`association.values.${index}.description`}
                        type="textarea"
                        label="Description Valeur"
                      >
                        <p className="text-muted-foreground">
                          {value.description}
                        </p>
                      </Editable>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Intervention Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-4 text-center text-foreground font-bold">
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
                      <h3 className="text-3xl mb-3 font-bold">{area.title}</h3>
                      <p className="text-gray-100">{area.description}</p>
                    </div>
                    <div className="lg:col-span-2 p-8">
                      <h4 className="text-xl mb-4 text-foreground font-semibold">
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
          <Editable path="association.team.title" label="Titre Section Équipe">
            <h2 className="text-4xl mb-4 text-center text-foreground font-bold">
              Notre Équipe
            </h2>
          </Editable>
          <Editable path="association.team.description" type="textarea" label="Description Section Équipe">
            <p className="text-xl text-muted-foreground text-center mb-12">
              Les membres du bureau qui portent l'association au quotidien
            </p>
          </Editable>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {Array.isArray(content.teamMembers) && content.teamMembers.length > 0 ? (
              content.teamMembers.map((member, index) => (
                <Card
                  key={member.id || index} // Use id if available, fallback to index
                  className="overflow-hidden hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-background"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <Editable
                        path={`teamMembers.${index}.imageUrl`}
                        type="image"
                        label="Image Membre"
                      >
                        <img
                          src={member.imageUrl || "https://placehold.co/400x400?text=No+Image"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </Editable>
                    </div>
                    <div className="p-4 text-center">
                      <Editable path={`teamMembers.${index}.name`} label="Nom Membre">
                        <h3 className="text-xl mb-1 text-foreground font-semibold">
                          {member.name}
                        </h3>
                      </Editable>
                      <Editable path={`teamMembers.${index}.role`} label="Rôle Membre">
                        <p className="text-[#F29F05] font-medium">{member.role}</p>
                      </Editable>
                      <Editable path={`teamMembers.${index}.bio`} type="textarea" label="Biographie Membre" className="mt-2 text-sm text-muted-foreground text-center">
                        <p className="text-sm text-muted-foreground text-center min-h-[40px]">
                           {member.bio || "Pas de biographie disponible."}
                        </p>
                      </Editable>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground italic">
                L'équipe sera bientôt dévoilée.
              </p>
            )}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground italic">
              + 15 bénévoles actifs qui contribuent régulièrement aux actions de
              l'association
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
