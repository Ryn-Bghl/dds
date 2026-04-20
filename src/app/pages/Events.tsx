import { useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useEditor } from "../context/EditorContext";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Events() {
  const { content } = useEditor();
  const events = Array.isArray(content.events) ? content.events : [];
  const [activeTab, setActiveTab] = useState("agenda");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = ["Tous", ...new Set(events.map((e) => e.category))];

  const filteredEvents =
    selectedCategory === "Tous"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  const upcomingEvents = filteredEvents.filter((e) => !e.isPast);
  const pastEvents = filteredEvents.filter((e) => e.isPast);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6 font-bold">Événements</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Concerts, formations, ateliers : rejoignez-nous lors de nos
            prochains événements
          </p>
        </div>
      </section>

      {/* Categories / Filters */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[#8C0343] hover:bg-[#771236]"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="agenda">À venir</TabsTrigger>
              <TabsTrigger value="archives">Archives</TabsTrigger>
            </TabsList>

            {/* Upcoming Events */}
            <TabsContent value="agenda" className="space-y-8">
              {upcomingEvents.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  Aucun événement à venir pour le moment dans cette catégorie.
                </p>
              ) : (
                upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-xl hover:shadow-[#8C0343]/20 transition-all border-border bg-card"
                  >
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
                              <Badge className="bg-[#8C0343] mb-3">
                                {event.category}
                              </Badge>
                              <h3 className="text-3xl mb-2 text-foreground font-bold">
                                {event.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-6">
                            {event.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 text-[#F29F05] flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Date
                                </div>
                                <div className="font-medium text-foreground">
                                  {formatDate(event.date)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Clock className="w-5 h-5 text-[#F29F05] flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Horaire
                                </div>
                                <div className="font-medium text-foreground">
                                  {event.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#F29F05] flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Lieu
                                </div>
                                <div className="font-medium text-foreground">
                                  {event.location}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 text-[#F29F05] flex-shrink-0 mt-0.5">
                                €
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Tarif
                                </div>
                                <div className="font-medium text-foreground">
                                  {event.price}
                                </div>
                              </div>
                            </div>
                          </div>
                          {event.ticketUrl && (
                            <Button
                              asChild
                              className="bg-[#8C0343] hover:bg-[#771236]"
                            >
                              <a
                                href={event.ticketUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 w-4 h-4" />
                                Réserver / S'inscrire
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Past Events */}
            <TabsContent value="archives">
              {pastEvents.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  Aucune archive disponible dans cette catégorie.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card"
                    >
                      <CardContent className="p-0">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl mb-2 text-foreground font-bold">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.attendees && (
                            <div className="pt-3 border-t border-border">
                              <span className="text-sm text-muted-foreground">
                                {event.attendees} participants
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4 text-foreground font-bold">
            Ne manquez aucun événement
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les annonces de nos
            prochains concerts, formations et ateliers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 border border-border bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C0343]"
            />
            <Button className="bg-[#8C0343] hover:bg-[#771236] px-8 text-white font-bold">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
