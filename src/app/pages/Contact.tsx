import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl mb-6">Contact</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
            Une question ? Un projet ? N'hésitez pas à nous contacter
          </p>
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
                  <h3 className="text-lg mb-2 text-foreground">Email</h3>
                  <a href="mailto:contact@donsduson.fr" className="text-[#F29F05] hover:underline">
                    contact@donsduson.fr
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Nous répondons sous 24-48h
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-[#F29F05]" />
                  </div>
                  <h3 className="text-lg mb-2 text-foreground">Téléphone</h3>
                  <a href="tel:+33123456789" className="text-[#F29F05] hover:underline">
                    01 23 45 67 89
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Lun-Ven : 10h-18h
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/20 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-[#F29F05]" />
                  </div>
                  <h3 className="text-lg mb-2 text-foreground">Adresse</h3>
                  <p className="text-muted-foreground">
                    123 rue de la Musique<br />
                    75018 Paris
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Zone d'intervention : Île-de-France
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg hover:shadow-[#8C0343]/20 transition-all border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4 text-foreground">Réseaux sociaux</h3>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#8C0343] text-white rounded-full flex items-center justify-center hover:bg-[#771236] transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#8C0343] text-white rounded-full flex items-center justify-center hover:bg-[#771236] transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#8C0343] text-white rounded-full flex items-center justify-center hover:bg-[#771236] transition-colors"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <h2 className="text-3xl mb-2 text-foreground">Formulaire de contact</h2>
                  <p className="text-muted-foreground mb-8">
                    Remplissez ce formulaire et nous vous répondrons rapidement
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jean.dupont@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Location de matériel, adhésion, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Votre message..."
                        rows={8}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#8C0343] hover:bg-[#771236]" size="lg">
                      <Send className="mr-2 w-5 h-5" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-4 text-foreground">Zone d'intervention</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Nous intervenons principalement en Île-de-France : Paris et toute la région parisienne
          </p>
          
          {/* Map Placeholder */}
          <div className="max-w-5xl mx-auto">
            <div
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1580422500257-ab85fb8e20ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGZyYW5jZSUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NzQ2MjAxNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-[#8C0343]/30 flex items-center justify-center">
                <div className="bg-card border border-border p-6 rounded-xl shadow-xl text-center max-w-sm">
                  <MapPin className="w-12 h-12 text-[#F29F05] mx-auto mb-3" />
                  <h3 className="text-xl mb-2 text-foreground">Paris & Île-de-France</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Une carte interactive serait intégrée ici pour visualiser notre zone d'intervention
                  </p>
                  <Button size="sm" className="bg-[#8C0343] hover:bg-[#771236]">
                    Voir sur Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl mb-4 text-foreground">Questions fréquentes</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vous avez une question ? Consultez nos pages dédiées ou contactez-nous directement
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg">
              Location de matériel
            </Button>
            <Button variant="outline" size="lg">
              Devenir bénévole
            </Button>
            <Button variant="outline" size="lg">
              Adhésion
            </Button>
            <Button variant="outline" size="lg">
              Faire un don
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}