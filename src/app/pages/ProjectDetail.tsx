import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const projectsData: Record<string, any> = {
  "festival-2024": {
    title: "Festival Émergence 2024",
    category: "Diffusion",
    date: "15-17 Juin 2024",
    location: "Parc de la Villette, Paris",
    image: "https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzQ1MDc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Le Festival Émergence est notre événement phare annuel, dédié à la découverte de nouveaux talents musicaux. Pour cette édition 2024, nous avons réuni 15 artistes émergents issus de scènes musicales diverses : rap, électro, rock indépendant et musiques du monde.",
    stats: [
      { label: "Artistes", value: "15" },
      { label: "Spectateurs", value: "3 500" },
      { label: "Jours", value: "3" },
    ],
    content: [
      {
        subtitle: "Objectifs du projet",
        text: "Offrir une plateforme de visibilité aux artistes émergents qui n'ont pas encore accès aux grandes scènes parisiennes. Le festival a également pour vocation de créer des rencontres entre professionnels du secteur et jeunes talents.",
      },
      {
        subtitle: "Organisation",
        text: "L'événement s'est déroulé sur 3 jours avec 2 scènes principales et une scène acoustique. Nous avons mobilisé une équipe de 40 bénévoles et collaboré avec 5 partenaires culturels locaux pour la logistique et la communication.",
      },
      {
        subtitle: "Impact",
        text: "Plus de 3 500 spectateurs ont assisté aux concerts. Suite au festival, 8 artistes ont signé avec des labels ou trouvé des tourneurs pour développer leur carrière. Le festival a également permis de renforcer la visibilité de l'association auprès du grand public.",
      },
    ],
    testimonial: {
      text: "Participer au Festival Émergence a été un tournant pour notre groupe. La qualité technique et l'accueil ont été exceptionnels. Nous avons pu nous produire devant un vrai public et rencontrer des professionnels qui nous suivent maintenant.",
      author: "Léa, chanteuse du groupe The Velvet Waves",
    },
  },
  "atelier-prod": {
    title: "Atelier Production Musicale",
    category: "Formation",
    date: "4-8 Mars 2024",
    location: "Studio Dons Du Son, Paris 18e",
    image: "https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHdvcmtzaG9wJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzc0NjIwMTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Formation intensive de 5 jours dédiée à la production musicale en home studio, destinée aux musiciens et beatmakers souhaitant développer leurs compétences techniques.",
    stats: [
      { label: "Participants", value: "12" },
      { label: "Heures de formation", value: "40" },
      { label: "Projets finalisés", value: "12" },
    ],
    content: [
      {
        subtitle: "Programme",
        text: "La formation couvre l'ensemble du processus de création : composition assistée par ordinateur (MAO), arrangement, mixage et mastering. Chaque participant travaille sur son propre projet du début à la fin.",
      },
      {
        subtitle: "Intervenants",
        text: "Nous avons fait appel à 3 producteurs professionnels reconnus dans leur domaine (électro, hip-hop et pop) pour animer les différents modules. Des sessions en petits groupes permettent un suivi personnalisé.",
      },
      {
        subtitle: "Résultats",
        text: "À l'issue de la formation, chaque participant a finalisé un morceau complet prêt à la diffusion. Plusieurs morceaux ont ensuite été sélectionnés pour figurer sur une compilation digitale promue par l'association.",
      },
    ],
    testimonial: {
      text: "Cette formation m'a permis de franchir un cap dans ma pratique musicale. J'ai enfin compris les techniques de mixage et je produis maintenant mes morceaux de manière autonome.",
      author: "Karim, participant à l'atelier",
    },
  },
  "concert-solidaire": {
    title: "Concert Solidaire",
    category: "Diffusion",
    date: "20 Janvier 2024",
    location: "Café de la Danse, Paris 11e",
    image: "https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Soirée caritative réunissant 5 groupes locaux pour collecter des fonds au profit d'associations œuvrant pour l'insertion sociale par la culture.",
    stats: [
      { label: "Groupes", value: "5" },
      { label: "Spectateurs", value: "450" },
      { label: "Fonds collectés", value: "4 200€" },
    ],
    content: [
      {
        subtitle: "Contexte",
        text: "Ce concert a été organisé en partenariat avec 3 associations d'insertion sociale. L'objectif était de récolter des fonds tout en offrant une scène à des artistes engagés socialement.",
      },
      {
        subtitle: "Déroulement",
        text: "La soirée a démarré par une présentation des associations bénéficiaires, suivie de 5 concerts de styles variés (rock, reggae, soul). L'ambiance chaleureuse et l'engagement du public ont fait de cette soirée un moment fort.",
      },
      {
        subtitle: "Bilan",
        text: "Les 4 200€ collectés ont été répartis équitablement entre les 3 associations partenaires. Au-delà de l'aspect financier, cet événement a renforcé les liens entre structures culturelles et sociales du quartier.",
      },
    ],
    testimonial: {
      text: "Une soirée magnifique qui prouve que la musique peut vraiment changer les choses. Merci à Dons Du Son d'avoir organisé cet événement.",
      author: "Sandra, représentante d'une association partenaire",
    },
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = id ? projectsData[id] : null;

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
            <Button asChild variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <Link to="/projets">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Retour aux projets
              </Link>
            </Button>
            <Badge className="bg-[#8C0343] text-white mb-4">{project.category}</Badge>
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
                  <div className="text-4xl text-[#F29F05] mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-8 mb-12">
              {project.content.map((section: any, index: number) => (
                <div key={index}>
                  <h2 className="text-3xl mb-4 text-foreground">{section.subtitle}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{section.text}</p>
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
                <p className="text-sm text-muted-foreground">— {project.testimonial.author}</p>
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
            Contactez-nous pour que nous puissions vous accompagner dans sa réalisation
          </p>
          <Button asChild size="lg" className="bg-white text-[#8C0343] hover:bg-gray-100">
            <Link to="/contact">
              Nous contacter
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}