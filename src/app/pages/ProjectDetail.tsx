import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useEditor } from "../context/EditorContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const { content } = useEditor();
  const projects = content.projects;
  const project = id ? projects.find((p) => p.id === id) : null;

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

  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
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
            <Badge className="bg-[#8C0343] text-white mb-4">
              {project.category}
            </Badge>
            <h1 className="text-5xl text-white mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{project.location}</span>
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
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              {project.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12 p-8 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-xl border border-border">
              {project.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl text-[#F29F05] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-8 mb-12">
              {project.content.map((section: any, index: number) => (
                <div key={index}>
                  <h2 className="text-3xl mb-4 text-foreground">
                    {section.subtitle}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <div className="bg-card p-8 rounded-xl border-l-4 border-[#F29F05]">
                <Users className="w-10 h-10 text-[#F29F05] mb-4" />
                <p className="text-lg italic text-muted-foreground mb-4">
                  "{project.testimonial.text}"
                </p>
                <p className="text-sm text-muted-foreground">
                  — {project.testimonial.author}
                </p>
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
