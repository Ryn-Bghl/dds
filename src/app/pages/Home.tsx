import { Link } from "react-router";
import {
  ArrowRight,
  Music,
  Users,
  Lightbulb,
  Calendar,
  Wrench,
  Radio,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import AnimatedCounter from "../components/AnimatedCounter";
import { useEditor } from "../context/EditorContext";
import { Editable } from "../components/Editable";

export default function Home() {
  const { content, isEditMode } = useEditor();
  const { home, projects } = content;

  // Map icon names to components
  const iconMap: Record<string, any> = {
    Music,
    Lightbulb,
    Radio,
    Wrench,
  };

  const latestProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${home.hero.backgroundImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#8C0343]/90 via-[#771236]/80 to-[#D96704]/70" />
        </div>

        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <Editable path="home.hero.title" label="Titre Principal">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto font-bold">
              {home.hero.title}
            </h1>
          </Editable>

          <Editable
            path="home.hero.description"
            type="textarea"
            label="Description"
          >
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-100">
              {home.hero.description}
            </p>
          </Editable>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#F29F05] text-black hover:bg-[#D96704]"
            >
              <Link to="/association">
                <Editable path="home.hero.ctaPrimary">
                  {home.hero.ctaPrimary}
                </Editable>{" "}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/location">
                <Editable path="home.hero.ctaSecondary">
                  {home.hero.ctaSecondary}
                </Editable>
              </Link>
            </Button>
          </div>

          {isEditMode && (
            <div className="mt-8 flex justify-center">
              <Editable
                path="home.hero.backgroundImage"
                label="URL de l'image de fond (Unsplash)"
              >
                <span className="text-xs text-white/40 hover:text-white/80 transition-colors bg-black/20 px-3 py-1 rounded-full">
                  Changer l'image de fond
                </span>
              </Editable>
            </div>
          )}
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Editable path="home.manifesto.title" label="Titre Manifeste">
              <h2 className="text-4xl mb-6 text-white">
                {home.manifesto.title}
              </h2>
            </Editable>
            <div className="prose prose-lg mx-auto text-gray-300">
              <Editable
                path="home.manifesto.content"
                type="textarea"
                label="Contenu du Manifeste"
              >
                <div className="whitespace-pre-wrap text-xl leading-relaxed">
                  {home.manifesto.content}
                </div>
              </Editable>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 font-bold">Notre Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {(Array.isArray(home.stats) ? home.stats : []).map(
              (stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl md:text-6xl mb-2 font-bold">
                    <Editable
                      path={`home.stats.${index}.value`}
                      label="Valeur Numérique"
                    >
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </Editable>
                  </div>
                  <Editable
                    path={`home.stats.${index}.label`}
                    label={`Label Stat ${index + 1}`}
                  >
                    <div className="text-lg opacity-90">{stat.label}</div>
                  </Editable>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-white font-bold">Nos Services</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Location de matériel professionnel pour tous vos événements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {(Array.isArray(home.services) ? home.services : []).map(
              (service, index) => {
                const Icon = iconMap[service.iconName] || Music;
                return (
                  <Card
                    key={index}
                    className="bg-[#1a1a1a] border-gray-800 hover:border-[#8C0343] hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#8C0343]/20 to-[#F29F05]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-[#F29F05]" />
                      </div>
                      <Editable
                        path={`home.services.${index}.title`}
                        label="Titre Service"
                      >
                        <h3 className="text-xl mb-2 text-white font-semibold">
                          {service.title}
                        </h3>
                      </Editable>
                      <Editable
                        path={`home.services.${index}.description`}
                        type="textarea"
                        label="Description Service"
                      >
                        <p className="text-gray-400">{service.description}</p>
                      </Editable>
                    </CardContent>
                  </Card>
                );
              },
            )}
          </div>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#8C0343] hover:bg-[#771236]"
            >
              <Link to="/location">
                Voir tout le catalogue <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-white font-bold">
              Dernières Réalisations
            </h2>
            <p className="text-xl text-gray-400">
              Découvrez nos projets récents
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {latestProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projets/${project.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#F29F05] text-sm mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Link to="/projets">
                Tous nos projets <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#771236] to-[#0D0D0D] text-white">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-[#F29F05]" />
          <h2 className="text-4xl mb-6 font-bold">Rejoignez l'aventure</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Devenez bénévole, adhérent ou soutenez nos actions pour contribuer
            au développement de la scène musicale locale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#F29F05] text-black hover:bg-[#D96704]"
            >
              <Link to="/rejoindre">Devenir bénévole</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/soutenir">Faire un don</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
