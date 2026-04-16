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

export default function Home() {
  const stats = [
    { value: 150, label: "Artistes accompagnés", suffix: "+" },
    { value: 45, label: "Projets réalisés", suffix: "+" },
    { value: 8, label: "Années d'expérience", suffix: "" },
    { value: 200, label: "Événements organisés", suffix: "+" },
  ];

  const services = [
    {
      icon: Music,
      title: "Sonorisation",
      description: "Enceintes, consoles, micros pour tous types d'événements",
    },
    {
      icon: Lightbulb,
      title: "Éclairage",
      description: "Projecteurs, lyres, jeux de lumière pour vos spectacles",
    },
    {
      icon: Radio,
      title: "DJ & Mix",
      description: "Platines, contrôleurs, casques pour vos sets",
    },
    {
      icon: Wrench,
      title: "Backline",
      description: "Instruments et retours scène pour groupes live",
    },
  ];

  const latestProjects = [
    {
      id: "festival-2024",
      title: "Festival Émergence 2024",
      image:
        "https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzQ1MDc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Diffusion",
    },
    {
      id: "atelier-prod",
      title: "Atelier Production Musicale",
      image:
        "https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHdvcmtzaG9wJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzc0NjIwMTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Formation",
    },
    {
      id: "concert-solidaire",
      title: "Concert Solidaire",
      image:
        "https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Événement",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1700166269606-b5ea327d0540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMG1peGluZyUyMGNvbnNvbGUlMjBzdHVkaW98ZW58MXx8fHwxNzc0NTMyNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#8C0343]/90 via-[#771236]/80 to-[#D96704]/70" />
        </div>

        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto">
            Donnons du son à vos projets artistiques
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-100">
            Association culturelle engagée pour l'accompagnement des artistes et
            la diffusion de la musique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#F29F05] text-black hover:bg-[#D96704]"
            >
              <Link to="/association">
                Découvrir l'association <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/location">Location de matériel</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl mb-6 text-white">Notre Manifeste</h2>
            <div className="prose prose-lg mx-auto text-gray-300">
              <p className="text-xl leading-relaxed">
                <strong className="text-[#F29F05]">Dons Du Son</strong> est née
                d'une conviction : la culture doit être accessible à tous.
                Depuis 2022, nous œuvrons pour démocratiser l'accès aux
                équipements techniques professionnels et accompagner les
                artistes émergents dans leurs projets musicaux.
              </p>
              <p className="text-xl leading-relaxed mt-4">
                Notre mission :{" "}
                <em className="text-[#F29F05]">former, équiper et connecter</em>{" "}
                les talents de demain, tout en créant des ponts entre les
                acteurs culturels du territoire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-center mb-12">Notre Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-white">Nos Services</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Location de matériel professionnel pour tous vos événements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-[#1a1a1a] border-gray-800 hover:border-[#8C0343] hover:shadow-lg transition-all"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8C0343]/20 to-[#F29F05]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-[#F29F05]" />
                  </div>
                  <h3 className="text-xl mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </CardContent>
              </Card>
            ))}
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
            <h2 className="text-4xl mb-4 text-white">Dernières Réalisations</h2>
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
                  <h3 className="text-white text-2xl">{project.title}</h3>
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
          <h2 className="text-4xl mb-6">Rejoignez l'aventure</h2>
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
