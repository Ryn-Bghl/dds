import { useState } from "react";
import { Coins, Landmark } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useEditor } from "../context/EditorContext";
import { Editable } from "../components/Editable";

export default function Support() {
  const { content } = useEditor();
  const { support, settings } = content;
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const handleDonation = (amount?: string) => {
    const baseUrl = settings.links?.helloAssoDonation || "https://www.helloasso.com/associations/dons-du-son";
    
    if (!amount || amount === "Libre") {
      window.open(baseUrl, "_blank");
      return;
    }

    // Convert "20€" to "20"
    const numericAmount = amount.replace("€", "");
    
    try {
      const url = new URL(baseUrl);
      // HelloAsso parameters vary, but 'amount' is a common one for pre-filling.
      // Usually it's in cents for checkouts, but simple forms might take euros.
      // We'll provide it in euros as it's the most common for simple redirects.
      url.searchParams.append("amount", numericAmount);
      window.open(url.toString(), "_blank");
    } catch (e) {
      window.open(baseUrl, "_blank");
    }
  };

  const handlePartnership = () => {
    const email = settings.contact.email;
    const subject = encodeURIComponent("Demande de partenariat - Dons Du Son");
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-[#8C0343] via-[#771236] to-[#D96704] text-white">
        <div className="container mx-auto px-4 text-center">
          <Editable path="support.header.title" label="Titre Page">
            <h1 className="text-5xl md:text-6xl mb-6 font-bold">
              {support.header.title}
            </h1>
          </Editable>
          <Editable
            path="support.header.description"
            type="textarea"
            label="Description Page"
          >
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100">
              {support.header.description}
            </p>
          </Editable>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Donations */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#8C0343]/20 rounded-full flex items-center justify-center text-[#F29F05]">
                  <Coins className="w-6 h-6" />
                </div>
                <Editable path="support.donations.title" label="Titre Dons">
                  <h2 className="text-3xl font-bold text-foreground">
                    {support.donations.title}
                  </h2>
                </Editable>
              </div>
              <Editable
                path="support.donations.content"
                type="textarea"
                label="Contenu Dons"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {support.donations.content}
                </p>
              </Editable>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["10€", "20€", "50€", "100€", "Libre"].map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={`border-border font-bold transition-all ${
                      selectedAmount === amount 
                        ? "bg-[#8C0343] text-white hover:bg-[#8C0343]/90" 
                        : "hover:bg-[#8C0343] hover:text-white"
                    }`}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    {amount}
                  </Button>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-[#8C0343] hover:bg-[#771236] w-full h-14 text-lg font-bold"
                onClick={() => handleDonation(selectedAmount || undefined)}
              >
                {selectedAmount && selectedAmount !== "Libre" 
                  ? `Donner ${selectedAmount} via HelloAsso` 
                  : "Faire un don via HelloAsso"}
              </Button>
              <p className="text-xs text-muted-foreground text-center italic">
                * 66% de votre don est déductible de vos impôts.
              </p>
            </div>

            {/* Partnership */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#8C0343]/20 rounded-full flex items-center justify-center text-[#F29F05]">
                  <Landmark className="w-6 h-6" />
                </div>
                <Editable
                  path="support.partnership.title"
                  label="Titre Partenariat"
                >
                  <h2 className="text-3xl font-bold text-foreground">
                    {support.partnership.title}
                  </h2>
                </Editable>
              </div>
              <Editable
                path="support.partnership.content"
                type="textarea"
                label="Contenu Partenariat"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {support.partnership.content}
                </p>
              </Editable>

              <Card className="bg-card border-border border-dashed border-2">
                <CardContent className="p-8 text-center space-y-4">
                  <p className="text-muted-foreground font-medium">
                    Vous souhaitez construire un projet commun avec Dons Du Son
                    ?
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#F29F05] text-[#F29F05] hover:bg-[#F29F05] hover:text-black w-full"
                    onClick={handlePartnership}
                  >
                    Devenir partenaire
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Mention */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-foreground">
            Ils nous font confiance
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {content.partners.map((partner, idx) => (
              <Editable key={partner.id} path={`partners.${idx}.logoUrl`} label="URL Logo Partenaire">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-12 w-32 object-contain"
                />
              </Editable>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
