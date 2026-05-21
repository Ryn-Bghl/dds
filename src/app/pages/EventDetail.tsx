import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, MapPin, Clock, Tag } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useEditor } from "../context/EditorContext";
import { Editable } from "../components/Editable";
import DetailContent from "../components/DetailContent";

export default function EventDetail() {
  const { id } = useParams();
  const { content } = useEditor();
  const events = content.events;
  const eventIndex = events.findIndex((e) => e.id.toString() === id);
  const event = eventIndex !== -1 ? events[eventIndex] : null;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-foreground">Événement non trouvé</h1>
          <Button asChild>
            <Link to="/evenements">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour à l'agenda
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const basePath = `events.${eventIndex}`;

  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="relative h-[500px] overflow-hidden">
        <Editable path={`${basePath}.image`} label="URL Image de couverture">
          <img
            src={event.image}
            alt={event.title}
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
              <Link to="/evenements">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Retour à l'agenda
              </Link>
            </Button>
            <div className="mb-4">
              <Editable path={`${basePath}.category`} label="Catégorie">
                <Badge className="bg-[#F29F05] text-black font-bold">
                  {event.category}
                </Badge>
              </Editable>
            </div>
            <Editable path={`${basePath}.title`} label="Titre de l'événement">
              <h1 className="text-5xl text-white mb-4 font-bold">{event.title}</h1>
            </Editable>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F29F05]" />
                <Editable path={`${basePath}.date`} label="Date">
                  <span>{event.date}</span>
                </Editable>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#F29F05]" />
                  <Editable path={`${basePath}.time`} label="Heure">
                    <span>{event.time}</span>
                  </Editable>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#F29F05]" />
                <Editable path={`${basePath}.location`} label="Lieu">
                  <span>{event.location}</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Column */}
              <div className="lg:col-span-2">
                <Editable path={`${basePath}.description`} type="textarea" label="Description courte">
                  <p className="text-2xl text-foreground font-medium leading-relaxed mb-16">
                    {event.description}
                  </p>
                </Editable>

                <DetailContent
                  blocks={event.content || []}
                  basePath={`${basePath}.content`}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <div className="bg-card p-8 rounded-2xl border border-border sticky top-32">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#8C0343]" />
                    Informations
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Tarif</p>
                      <Editable path={`${basePath}.price`} label="Prix / Info Tarif">
                        <p className="font-bold text-lg text-[#F29F05]">{event.price || 'Entrée libre'}</p>
                      </Editable>
                    </div>
                    {event.isPast && event.attendees !== undefined && event.attendees !== null && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Participants</p>
                        <p className="font-bold text-lg text-foreground">{event.attendees}</p>
                      </div>
                    )}
                    {event.ticketUrl && !event.isPast && (
                      <Button className="w-full bg-[#8C0343] hover:bg-[#771236] mt-4">
                        Réserver ma place
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
