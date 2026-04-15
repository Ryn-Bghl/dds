import { useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const upcomingEvents = [
  {
    id: 1,
    title: "Showcase Tremplin Hip-Hop",
    date: "2026-04-15",
    time: "20h00",
    location: "La Bellevilloise, Paris 20e",
    category: "Concert",
    description: "Finale du tremplin avec 5 rappeurs sélectionnés",
    price: "Gratuit sur réservation",
    ticketUrl: "https://example.com",
    image: "https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Formation DJ Débutant",
    date: "2026-04-22",
    time: "14h00 - 18h00",
    location: "Studio Dons Du Son, Paris 18e",
    category: "Formation",
    description: "Initiation au mixage et aux techniques de DJ sur vinyle et contrôleur",
    price: "40€ adhérents / 60€ non-adhérents",
    ticketUrl: "https://example.com",
    image: "https://images.unsplash.com/photo-1774118042703-4f3c3ebfa0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHR1cm50YWJsZXMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Festival Émergence 2026",
    date: "2026-06-13",
    time: "15h00 - 23h00",
    location: "Parc de la Villette, Paris 19e",
    category: "Festival",
    description: "3 jours de concerts avec 20 artistes émergents",
    price: "Pass 3 jours : 45€",
    ticketUrl: "https://example.com",
    image: "https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzQ1MDc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Atelier Enregistrement Studio",
    date: "2026-05-10",
    time: "10h00 - 17h00",
    location: "Studio Dons Du Son, Paris 18e",
    category: "Atelier",
    description: "Journée découverte des techniques d'enregistrement en studio professionnel",
    price: "80€ (matériel inclus)",
    ticketUrl: "https://example.com",
    image: "https://images.unsplash.com/photo-1678356434281-0ef01a3ac02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNvcmRpbmclMjBzdHVkaW8lMjBtaWNyb3Bob25lfGVufDF8fHx8MTc3NDU5ODA2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const pastEvents = [
  {
    id: 1,
    title: "Concert Solidaire Janvier 2024",
    date: "2024-01-20",
    location: "Café de la Danse, Paris 11e",
    image: "https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    attendees: 450,
  },
  {
    id: 2,
    title: "Atelier Production Mars 2024",
    date: "2024-03-04",
    location: "Studio Dons Du Son",
    image: "https://images.unsplash.com/photo-1696522732406-065ef560da8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHdvcmtzaG9wJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzc0NjIwMTcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    attendees: 12,
  },
  {
    id: 3,
    title: "Festival Émergence 2024",
    date: "2024-06-15",
    location: "Parc de la Villette",
    image: "https://images.unsplash.com/photo-1669459881627-06c2a4948e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHMlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzQ1MDc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    attendees: 3500,
  },
  {
    id: 4,
    title: "Tremplin Rock Underground",
    date: "2023-11-18",
    location: "Le Trabendo, Paris 19e",
    image: "https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBiYW5kJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    attendees: 280,
  },
  {
    id: 5,
    title: "Formation Mixage Audio",
    date: "2023-09-15",
    location: "Studio Dons Du Son",
    image: "https://images.unsplash.com/photo-1700166269606-b5ea327d0540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMG1peGluZyUyMGNvbnNvbGUlMjBzdHVkaW98ZW58MXx8fHwxNzc0NTMyNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    attendees: 15,
  },
  {
    id: 6,
    title: "Soirée Électro Solidaire",
    date: "2023-10-21",
    location: "Rex Club, Paris 2e",
    image: "https://images.unsplash.com/photo-1774118042703-4f3c3ebfa0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHR1cm50YWJsZXMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc0NjIwMTcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    attendees: 320,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", { 
    day: "numeric", 
    month: "long", 
    year: "numeric" 
  });
};

export default function Events() {
  const [activeTab, setActiveTab] = useState("agenda");

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6">Événements</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Concerts, formations, ateliers : rejoignez-nous lors de nos prochains événements
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="agenda">À venir</TabsTrigger>
              <TabsTrigger value="archives">Archives</TabsTrigger>
            </TabsList>

            {/* Upcoming Events */}
            <TabsContent value="agenda" className="space-y-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-xl hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="lg:col-span-2 p-6 lg:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <Badge className="bg-[#8C0343] mb-3">{event.category}</Badge>
                            <h3 className="text-3xl mb-2 text-foreground">{event.title}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-6">{event.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-[#F29F05] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm text-muted-foreground">Date</div>
                              <div className="font-medium text-foreground">{formatDate(event.date)}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-[#F29F05] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm text-muted-foreground">Horaire</div>
                              <div className="font-medium text-foreground">{event.time}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#F29F05] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm text-muted-foreground">Lieu</div>
                              <div className="font-medium text-foreground">{event.location}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 text-[#F29F05] flex-shrink-0 mt-0.5">€</div>
                            <div>
                              <div className="text-sm text-muted-foreground">Tarif</div>
                              <div className="font-medium text-foreground">{event.price}</div>
                            </div>
                          </div>
                        </div>
                        <Button className="bg-[#8C0343] hover:bg-[#771236]">
                          <ExternalLink className="mr-2 w-4 h-4" />
                          Réserver / S'inscrire
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Past Events */}
            <TabsContent value="archives">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl mb-2 text-foreground">{event.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="pt-3 border-t border-border">
                          <span className="text-sm text-muted-foreground">{event.attendees} participants</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4 text-foreground">Ne manquez aucun événement</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les annonces de nos prochains concerts, formations et ateliers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 border border-border bg-input-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C0343]"
            />
            <Button className="bg-[#8C0343] hover:bg-[#771236] px-8">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}