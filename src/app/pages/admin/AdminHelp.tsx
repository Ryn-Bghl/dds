import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Edit3,
  CheckCircle2,
  Save,
  AlertCircle,
  HelpCircle,
  MousePointer2,
  Package,
  Calendar,
  Settings,
  ShieldCheck,
  Zap,
  MessageSquare,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";

export default function AdminHelp() {
  const sections = [
    {
      title: "Édition Directe (Live)",
      icon: MousePointer2,
      color: "text-blue-500",
      content: [
        "Activez le 'Mode Édition' dans le tableau de bord ou la barre d'administration.",
        "Survolez n'importe quel texte ou image sur le site pour voir apparaître l'icône ✏️.",
        "Cliquez pour ouvrir l'éditeur, modifiez le contenu, puis validez avec la coche verte ✓.",
        "IMPORTANT: Ces modifications ne sont pas définitives tant que vous ne cliquez pas sur 'PUBLIER LES MODIFICATIONS' dans la barre d'administration.",
      ]
    },
    {
      title: "Gestion du Matériel",
      icon: Package,
      color: "text-orange-500",
      content: [
        "Rendez-vous dans la section 'Location' pour gérer votre inventaire.",
        "Vous pouvez ajouter du matériel, modifier les prix journaliers ou mettre à jour les stocks.",
        "Les 'Packs' vous permettent de créer des offres combinées avec services techniques.",
        "Les modifications dans cette section sont enregistrées IMMÉDIATEMENT.",
      ]
    },
    {
      title: "Événements & Projets",
      icon: Calendar,
      color: "text-green-500",
      content: [
        "Utilisez les sections 'Événements' et 'Projets' pour alimenter l'agenda et le portfolio.",
        "Chaque élément peut avoir un contenu détaillé grâce à l'éditeur de blocs (texte, images, titres).",
        "Vous pouvez marquer les événements comme 'Passés' pour les archiver automatiquement.",
        "Les modifications ici sont également enregistrées IMMÉDIATEMENT.",
      ]
    },
    {
      title: "Paramètres du Site",
      icon: Settings,
      color: "text-gray-400",
      content: [
        "Configurez les liens HelloAsso pour les adhésions et les dons.",
        "Mettez à jour les coordonnées de contact (Email, Réseaux Sociaux, Adresse).",
        "Activez le 'Mode Maintenance' si vous devez effectuer de gros changements en privé.",
        "Gérez la liste des partenaires affichés en bas de page.",
      ]
    },
    {
      title: "Messages de Contact",
      icon: MessageSquare,
      color: "text-blue-400",
      content: [
        "Consultez les messages envoyés via le formulaire de contact du site.",
        "Un badge bleu indique le nombre de nouveaux messages non lus.",
        "Marquez les messages comme 'Répondu' ou 'Archivé' pour garder votre boîte propre.",
        "Vous pouvez répondre directement par email en cliquant sur le bouton dédié.",
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <HelpCircle className="w-10 h-10 text-[#F29F05]" />
          Guide d'Utilisation
        </h1>
        <p className="text-gray-400 text-lg">
          Tout ce qu'il faut savoir pour gérer votre site Dons Du Son comme un pro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <Card key={idx} className="bg-[#1a1a1a] border-gray-800">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`p-2 rounded-lg bg-black/50 ${section.color}`}>
                <section.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-white">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-400">
                    <span className="text-[#F29F05] font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-[#8C0343]/20 to-[#D96704]/10 border-[#F29F05]/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#F29F05]" />
            Le workflow de publication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WorkflowStep 
              number="1" 
              title="Modifier" 
              description="Changez les textes, photos ou inventaire." 
            />
            <WorkflowStep 
              number="2" 
              title="Valider" 
              description="Vérifiez le rendu visuel sur les pages." 
            />
            <WorkflowStep 
              number="3" 
              title="Publier" 
              description="Cliquez sur le bouton de publication en haut." 
              isLast
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Bonnes Pratiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  <strong>Enregistrez souvent :</strong> En mode édition, n'attendez pas d'avoir modifié 50 éléments avant de publier.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  <strong>Images optimisées :</strong> Préférez des images légères (WebP ou JPG) pour que le site reste rapide.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  <strong>Vérification Mobile :</strong> Après un gros changement de texte, vérifiez si le rendu est toujours bon sur téléphone.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-gray-800 border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-300">
              Ne fermez jamais votre onglet si vous avez des modifications en attente (bouton "Publier" visible).
            </p>
            <div className="p-3 bg-red-500/10 rounded border border-red-500/20">
              <p className="text-xs text-red-400">
                Si vous perdez votre connexion internet, attendez qu'elle revienne avant d'essayer de sauvegarder pour éviter de perdre votre travail.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WorkflowStep({ number, title, description, isLast }: any) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="w-12 h-12 rounded-full bg-[#F29F05] text-black flex items-center justify-center font-bold text-xl mb-4 z-10 shadow-lg shadow-[#F29F05]/20">
        {number}
      </div>
      <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
      {!isLast && (
        <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gray-700 z-0"></div>
      )}
    </div>
  );
}
