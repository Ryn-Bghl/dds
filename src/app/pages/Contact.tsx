import { useState } from "react";
import { Mail, MapPin, Facebook, Instagram, Youtube, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { useEditor } from "../context/EditorContext";
import { Editable } from "../components/Editable";
import { ContactMessage } from "../../lib/content-store";
// Import Accordion components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Contact() {
  const { content, updateContent, saveChanges } = useEditor();
  const { contact } = content;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        status: "Nouveau",
      };

      const currentMessages = Array.isArray(content.contactMessages) 
        ? content.contactMessages 
        : [];
      
      const newContent = updateContent("contactMessages", [newMessage, ...currentMessages]);
      
      // Save changes to the backend
      await saveChanges(newContent);
      
      setLastMessageId(newMessage.id);
      setIsSubmitted(true);
      
      // Also trigger a mailto as a notification/fallback
      const contactEmail = content.settings.contact.email;
      const mailtoSubject = encodeURIComponent(`Nouveau message de contact : ${formData.subject}`);
      const mailtoBody = encodeURIComponent(
        `Nom : ${formData.name}\n` +
        `Email : ${formData.email}\n` +
        `Sujet : ${formData.subject}\n\n` +
        `Message :\n${formData.message}\n\n` +
        `--- Message enregistré dans le panneau d'administration ---`
      );
      
      window.open(`mailto:${contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
      
      toast.success(
        "Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUndo = async () => {
    if (!lastMessageId) return;

    if (window.confirm("Voulez-vous vraiment annuler l'envoi de ce message ?")) {
      const currentMessages = Array.isArray(content.contactMessages) 
        ? content.contactMessages 
        : [];
      const updatedMessages = currentMessages.filter(m => m.id !== lastMessageId);
      const updatedContent = updateContent("contactMessages", updatedMessages);
      
      try {
        await saveChanges(updatedContent);
        setLastMessageId(null);
        setIsSubmitted(false);
        toast.info("Message annulé avec succès");
      } catch (e) {
        toast.error("Erreur lors de l'annulation");
      }
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <Editable path="contact.header.title" label="Titre Page">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold">
              {contact.header.title}
            </h1>
          </Editable>
          <Editable
            path="contact.header.description"
            type="textarea"
            label="Description Page"
          >
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
              {contact.header.description}
            </p>
          </Editable>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Cards */}
            <div className="space-y-6">
              <Card className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-[#F29F05]" />
                  </div>
                  <h3 className="text-lg mb-2 text-foreground font-semibold">
                    Email
                  </h3>
                  <Editable path="contact.info.email" label="Email de contact">
                    <a
                      href={`mailto:${contact.info.email}`}
                      className="text-[#F29F05] hover:underline font-medium"
                    >
                      {contact.info.email}
                    </a>
                  </Editable>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    Nous répondons sous 24-48h
                  </p>
                </CardContent>
              </Card>

              {/* Note: Phone removed per TOFIX.md instructions */}

              <Card className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-[#F29F05]" />
                  </div>
                  <h3 className="text-lg mb-2 text-foreground font-semibold">
                    Siège Social
                  </h3>
                  <Editable
                    path="contact.info.address"
                    type="textarea"
                    label="Adresse"
                  >
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {contact.info.address}
                    </p>
                  </Editable>
                  <Editable
                    path="contact.info.zone"
                    label="Zone d'intervention"
                  >
                    <p className="text-sm text-muted-foreground mt-2 font-medium">
                      {contact.info.zone}
                    </p>
                  </Editable>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4 text-foreground font-semibold">
                    Réseaux sociaux
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={contact.info.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#8C0343] text-white rounded-full flex items-center justify-center hover:bg-[#771236] transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={contact.info.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#8C0343] text-white rounded-full flex items-center justify-center hover:bg-[#771236] transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href={contact.info.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#8C0343] text-white rounded-full flex items-center justify-center hover:bg-[#771236] transition-colors"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Editable
                      path="contact.info.socials.facebook"
                      label="Lien Facebook"
                    >
                      <span className="text-[10px] text-muted-foreground opacity-50 hover:opacity-100 block truncate">
                        FB: {contact.info.socials.facebook}
                      </span>
                    </Editable>
                    <Editable
                      path="contact.info.socials.instagram"
                      label="Lien Instagram"
                    >
                      <span className="text-[10px] text-muted-foreground opacity-50 hover:opacity-100 block truncate">
                        IG: {contact.info.socials.instagram}
                      </span>
                    </Editable>
                    <Editable
                      path="contact.info.socials.youtube"
                      label="Lien Youtube"
                    >
                      <span className="text-[10px] text-muted-foreground opacity-50 hover:opacity-100 block truncate">
                        YT: {contact.info.socials.youtube}
                      </span>
                    </Editable>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border bg-card shadow-xl">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="py-12 flex flex-col items-center text-center space-y-6">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white">Message envoyé !</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          Merci pour votre message. Nous vous répondrons dans les plus brefs délais (généralement sous 48h).
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Button
                          onClick={() => setIsSubmitted(false)}
                          className="bg-[#8C0343] hover:bg-[#771236]"
                        >
                          Envoyer un autre message
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleUndo}
                          className="border-border text-muted-foreground hover:text-red-500 hover:border-red-500/50"
                        >
                          Annuler l'envoi (Erreur ?)
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl mb-2 text-foreground font-bold">
                        Formulaire de contact
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        Remplissez ce formulaire et nous vous répondrons rapidement
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nom complet *</Label>
                            <Input
                              id="name"
                              required
                              disabled={isSubmitting}
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              placeholder="Jean Dupont"
                              className="bg-background border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              disabled={isSubmitting}
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              placeholder="jean.dupont@example.com"
                              className="bg-background border-border"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Sujet *</Label>
                          <Input
                            id="subject"
                            required
                            disabled={isSubmitting}
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({ ...formData, subject: e.target.value })
                            }
                            placeholder="Location de matériel, adhésion, etc."
                            className="bg-background border-border"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            required
                            disabled={isSubmitting}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder="Votre message..."
                            rows={8}
                            className="bg-background border-border"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#8C0343] hover:bg-[#771236] text-white font-bold"
                          size="lg"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 w-5 h-5" />
                              Envoyer le message
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-4 text-foreground font-bold">
            Zone d'intervention
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Nous intervenons dans toute la France metropolitaine.
          </p>

          {/* Map Placeholder */}
          <div className="max-w-5xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4742943.902230488!2d2.5003734339051586!3d46.75246807722547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sfr!2sfr!4v1777389890964!5m2!1sfr!2sfr"
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4 text-foreground font-bold">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vous avez une question ? Consultez nos pages dédiées ou
            contactez-nous directement.
          </p>
          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto text-left">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Editable
                    path="contact.faq.rental.question"
                    label="Location Matériel Q"
                  >
                    Quelles sont les modalités pour louer du matériel ?
                  </Editable>
                </AccordionTrigger>
                <AccordionContent>
                  <Editable
                    path="contact.faq.rental.answer"
                    type="textarea"
                    label="Location Matériel A"
                  >
                    La location est ouverte à tous. Il suffit de sélectionner vos articles dans notre catalogue, de valider votre panier de devis, et nous vous répondrons sous 72h avec un devis détaillé incluant les éventuels frais de livraison.
                  </Editable>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <Editable
                    path="contact.faq.volunteer.question"
                    label="Bénévole Q"
                  >
                    Comment puis-je m'impliquer en tant que bénévole ?
                  </Editable>
                </AccordionTrigger>
                <AccordionContent>
                  <Editable
                    path="contact.faq.volunteer.answer"
                    type="textarea"
                    label="Bénévole A"
                  >
                    Nous recherchons toujours des passionnés pour l'accueil, la technique ou la logistique lors de nos événements. Rendez-vous sur la page "Rejoindre" pour nous envoyer votre candidature simplifiée par mail.
                  </Editable>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <Editable
                    path="contact.faq.membership.question"
                    label="Adhésion Q"
                  >
                    Pourquoi adhérer à l'association Dons Du Son ?
                  </Editable>
                </AccordionTrigger>
                <AccordionContent>
                  <Editable
                    path="contact.faq.membership.answer"
                    type="textarea"
                    label="Adhésion A"
                  >
                    Adhérer (15€/an) vous permet de soutenir nos actions culturelles, de bénéficier de réductions sur la location de matériel et d'accéder en priorité à nos ateliers et formations internes.
                  </Editable>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <Editable path="contact.faq.donation.question" label="Don Q">
                    Mes dons sont-ils déductibles d'impôts ?
                  </Editable>
                </AccordionTrigger>
                <AccordionContent>
                  <Editable
                    path="contact.faq.donation.answer"
                    type="textarea"
                    label="Don A"
                  >
                    Oui, Dons Du Son est une association reconnue d'intérêt général. Vos dons ouvrent droit à une réduction d'impôt égale à 66% du montant versé, dans la limite de 20% de votre revenu imposable.
                  </Editable>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  <Editable path="contact.faq.zone.question" label="Zone Q">
                    Dans quelles zones géographiques intervenez-vous ?
                  </Editable>
                </AccordionTrigger>
                <AccordionContent>
                  <Editable
                    path="contact.faq.zone.answer"
                    type="textarea"
                    label="Zone A"
                  >
                    Nous sommes basés en Île-de-France, mais nous pouvons intervenir dans toute la France métropolitaine pour des projets spécifiques ou de la location de matériel avec livraison.
                  </Editable>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
