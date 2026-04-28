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

const TEAM_PLACEHOLDER =
  "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Association() {
  const { content } = useEditor();
  const { association } = content;

  // Map icon names to components
  const iconMap: Record<string, any> = {
    Target,
    Users,
    Heart,
    GraduationCap,
    Wrench,
    Radio,
  };

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
          <Editable path="association.valuesSectionTitle" label="Titre Section Valeurs">
            <h2 className="text-4xl mb-12 text-center text-foreground font-bold">
              {association.valuesSectionTitle || "Nos Valeurs"}
            </h2>
          </Editable>
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
          <Editable path="association.interventionSection.title" label="Titre Section Intervention">
            <h2 className="text-4xl mb-4 text-center text-foreground font-bold">
              {association.interventionSection?.title || "Nos Axes d'Intervention"}
            </h2>
          </Editable>
          <Editable path="association.interventionSection.description" type="textarea" label="Description Section Intervention">
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              {association.interventionSection?.description || "Trois domaines d'action complémentaires pour un accompagnement global des artistes"}
            </p>
          </Editable>
          <div className="space-y-12 max-w-6xl mx-auto">
            {(association.interventionAreas || []).map((area, index) => {
              const Icon = iconMap[area.iconName] || GraduationCap;
              return (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl hover:shadow-[#8C0343]/10 transition-all border-border bg-card"
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      <div className="bg-gradient-to-br from-[#8C0343] to-[#771236] p-8 text-white flex flex-col justify-center">
                        <Icon className="w-12 h-12 mb-4" />
                        <Editable path={`association.interventionAreas.${index}.title`} label="Titre Axe">
                          <h3 className="text-3xl mb-3 font-bold">{area.title}</h3>
                        </Editable>
                        <Editable path={`association.interventionAreas.${index}.description`} type="textarea" label="Description Axe">
                          <p className="text-gray-100">{area.description}</p>
                        </Editable>
                      </div>
                      <div className="lg:col-span-2 p-8">
                        <h4 className="text-xl mb-4 text-foreground font-semibold">
                          Actions concrètes :
                        </h4>
                        <ul className="space-y-3">
                          {(area.features || []).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-[#F29F05] rounded-full mt-2 flex-shrink-0" />
                              <Editable
                                path={`association.interventionAreas.${index}.features.${featureIndex}`}
                                label="Action Concrète"
                              >
                                <span className="text-muted-foreground">
                                  {feature}
                                </span>
                              </Editable>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <Editable path="association.team.title" label="Titre Section Équipe">
            <h2 className="text-4xl mb-4 text-center text-foreground font-bold">
              {association.team?.title || "Notre Équipe"}
            </h2>
          </Editable>
          <Editable
            path="association.team.description"
            type="textarea"
            label="Description Section Équipe"
          >
            <p className="text-xl text-muted-foreground text-center mb-12">
              {association.team?.description || "Les membres du bureau qui portent l'association au quotidien"}
            </p>
          </Editable>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {Array.isArray(content.teamMembers) &&
            content.teamMembers.length > 0 ? (
              content.teamMembers.map((member, index) => (
                <Card
                  key={member.id}
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
                          src={member.imageUrl || TEAM_PLACEHOLDER}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </Editable>
                    </div>
                    <div className="p-4 text-center">
                      <Editable
                        path={`teamMembers.${index}.name`}
                        label="Nom Membre"
                      >
                        <h3 className="text-xl mb-1 text-foreground font-semibold">
                          {member.name}
                        </h3>
                      </Editable>
                      <Editable
                        path={`teamMembers.${index}.role`}
                        label="Rôle Membre"
                      >
                        <p className="text-[#F29F05] font-medium">
                          {member.role}
                        </p>
                      </Editable>
                      <Editable
                        path={`teamMembers.${index}.bio`}
                        type="textarea"
                        label="Biographie Membre"
                        className="mt-2 text-sm text-muted-foreground text-center"
                      >
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
