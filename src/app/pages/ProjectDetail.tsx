import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useEditor } from "../context/EditorContext";
import { Editable } from "../components/Editable";
import DetailContent from "../components/DetailContent";

export default function ProjectDetail() {
  const { id } = useParams();
  const { content } = useEditor();
  const projects = content.projects;
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projectIndex !== -1 ? projects[projectIndex] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-foreground">Projet non trouvé</h1>
          <Button asChild>
            <Link to="/projets">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour aux projets
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const basePath = `projects.${projectIndex}`;

  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="relative h-[500px] overflow-hidden">
        <Editable path={`${basePath}.image`} label="URL Image de couverture">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </Editable>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button
              asChild
              variant="ghost"
              className="text-white hover:bg-white/20 mb-4"
            >
              <Link to="/projets">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Retour aux projets
              </Link>
            </Button>
            <div className="mb-4">
              <Editable path={`${basePath}.category`} label="Catégorie">
                <Badge className="bg-[#8C0343] text-white">
                  {project.category}
                </Badge>
              </Editable>
            </div>
            <Editable path={`${basePath}.title`} label="Titre du projet">
              <h1 className="text-5xl text-white mb-4 font-bold">
                {project.title}
              </h1>
            </Editable>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F29F05]" />
                <Editable path={`${basePath}.date`} label="Date">
                  <span>{project.date}</span>
                </Editable>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#F29F05]" />
                <Editable path={`${basePath}.location`} label="Lieu">
                  <span>{project.location}</span>
                </Editable>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Description */}
            <Editable
              path={`${basePath}.description`}
              type="textarea"
              label="Description courte"
            >
              <p className="text-2xl text-foreground font-medium leading-relaxed mb-16">
                {project.description}
              </p>
            </Editable>

            {/* Content Blocks */}
            <div className="mb-20">
              <DetailContent
                blocks={project.content}
                basePath={`${basePath}.content`}
              />
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <div className="bg-card p-10 rounded-3xl border border-border relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#F29F05]" />
                <Users className="w-12 h-12 text-[#F29F05] mb-6 opacity-50" />
                <Editable
                  path={`${basePath}.testimonial.text`}
                  type="textarea"
                  label="Texte du témoignage"
                >
                  <p className="text-xl italic text-foreground mb-6 leading-relaxed">
                    "{project.testimonial.text}"
                  </p>
                </Editable>
                <Editable
                  path={`${basePath}.testimonial.author`}
                  label="Auteur"
                >
                  <p className="text-base font-bold text-[#F29F05] uppercase tracking-wider">
                    — {project.testimonial.author}
                  </p>
                </Editable>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-6">Vous avez un projet ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez-nous pour que nous puissions vous accompagner dans sa
            réalisation
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-[#8C0343] hover:bg-gray-100"
          >
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
