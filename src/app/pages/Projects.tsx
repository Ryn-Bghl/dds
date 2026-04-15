import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const projects = [
  {
    id: "festival-2024",
    title: "Festival Émergence 2024",
    category: "Diffusion",
    image: "https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzQ1MDc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Festival de 3 jours mettant en avant 15 artistes émergents",
    date: "Juin 2024",
  },
  {
    id: "atelier-prod",
    title: "Atelier Production Musicale",
    category: "Formation",
    image: "https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHdvcmtzaG9wJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzc0NjIwMTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Formation intensive de 5 jours sur la production en home studio",
    date: "Mars 2024",
  },
  {
    id: "concert-solidaire",
    title: "Concert Solidaire",
    category: "Diffusion",
    image: "https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Soirée caritative au profit d'associations locales",
    date: "Janvier 2024",
  },
  {
    id: "residence-studio",
    title: "Résidence Studio",
    category: "Accompagnement",
    image: "https://images.unsplash.com/photo-1678356434281-0ef01a3ac02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW8lMjBtaWNyb3Bob25lfGVufDF8fHx8MTc3NDU5ODA2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Accompagnement de 3 groupes pour l'enregistrement d'un EP",
    date: "Février 2024",
  },
  {
    id: "tremplin-rap",
    title: "Tremplin Rap Underground",
    category: "Diffusion",
    image: "https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Compétition pour jeunes rappeurs avec showcase final",
    date: "Avril 2024",
  },
  {
    id: "formation-ingeson",
    title: "Formation Ingénieur du Son",
    category: "Formation",
    image: "https://images.unsplash.com/photo-1700166269606-b5ea327d0540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMG1peGluZyUyMGNvbnNvbGUlMjBzdHVkaW98ZW58MXx8fHwxNzc0NTMyNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Cursus de 10 semaines pour devenir technicien son",
    date: "Septembre 2023 - Novembre 2023",
  },
];

const categories = ["Tous", "Formation", "Diffusion", "Accompagnement"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProjects = selectedCategory === "Tous"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6">Projets & Réalisations</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Découvrez les projets que nous avons accompagnés et réalisés
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-[#8C0343] hover:bg-[#771236]" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projets/${project.id}`}
                className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-[#8C0343]/20 transition-all border border-border"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-[#8C0343]/20 text-[#F29F05] border-[#F29F05]/30">
                      {project.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>
                  <h3 className="text-2xl mb-2 text-foreground group-hover:text-[#F29F05] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}