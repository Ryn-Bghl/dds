import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Home,
  Building2,
  Calendar,
  Music,
  Package,
  Settings,
  Edit3,
  Save,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEditor } from "../../context/EditorContext";
import { Link } from "react-router";

export default function AdminDashboard() {
  const {
    isEditMode,
    toggleEditMode,
    hasUnsavedChanges,
    saveChanges,
    isLoading,
  } = useEditor();

  const pages = [
    {
      icon: Home,
      title: "Accueil",
      description: "Titre, description, stats, services",
      href: "/",
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      icon: Building2,
      title: "Association",
      description: "Histoire, valeurs, informations",
      href: "/association",
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      icon: Music,
      title: "Projets & Réalisations",
      description: "Nos projets passés et actuels",
      href: "/projets",
      color: "bg-pink-500/10 text-pink-400",
    },
    {
      icon: Calendar,
      title: "Événements",
      description: "Calendrier et manifestations",
      href: "/events",
      color: "bg-green-500/10 text-green-400",
    },
    {
      icon: Package,
      title: "Location de Matériel",
      description: "Catalogue et demandes",
      href: "/location",
      color: "bg-orange-500/10 text-orange-400",
    },
    {
      icon: Settings,
      title: "Paramètres",
      description: "Infos générales et configuration",
      href: "/admin/settings",
      color: "bg-gray-500/10 text-gray-400",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-8 h-8 border-4 border-[#F29F05] border-t-transparent rounded-full"></div>
          </div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Tableau de Bord</h1>
        <p className="text-lg text-gray-400">
          Bienvenue! Vous êtes ici pour modifier le site facilement.
        </p>
      </div>

      {/* Mode Édition Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-[#8C0343]/30 to-[#D96704]/20 border-[#F29F05]/50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white text-2xl">
                  🎨 Mode Édition
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2 text-base">
                  Activez le mode édition pour modifier le contenu du site
                </CardDescription>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isEditMode
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {isEditMode ? "✓ Activé" : "○ Désactivé"}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-black/40 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#F29F05]" />
                Comment ça fonctionne:
              </h3>
              <ol className="space-y-2 text-gray-300 text-sm">
                <li>
                  <span className="bg-[#8C0343] text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    1
                  </span>
                  Activez le mode édition ci-dessous
                </li>
                <li>
                  <span className="bg-[#8C0343] text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    2
                  </span>
                  Allez sur la page que vous voulez modifier
                </li>
                <li>
                  <span className="bg-[#8C0343] text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    3
                  </span>
                  Survolez un texte → cliquez sur le crayon ✏️
                </li>
                <li>
                  <span className="bg-[#8C0343] text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    4
                  </span>
                  Modifiez et cliquez la coche verte ✓
                </li>
                <li>
                  <span className="bg-[#8C0343] text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    5
                  </span>
                  Cliquez "Enregistrer" quand vous avez fini
                </li>
              </ol>
            </div>

            <Button
              onClick={toggleEditMode}
              className={`w-full py-6 text-lg font-semibold transition-all ${
                isEditMode
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-[#F29F05] hover:bg-[#D96704] text-black"
              }`}
            >
              <Edit3 className="w-5 h-5 mr-3" />
              {isEditMode
                ? "Désactiver le Mode Édition"
                : "Activer le Mode Édition"}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Status */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#F29F05]" />
              État
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Mode Édition</p>
              <p className="text-white font-semibold mt-1">
                {isEditMode ? "✓ Actif" : "○ Inactif"}
              </p>
            </div>
            {hasUnsavedChanges && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
                <p className="text-yellow-200 text-sm font-semibold">
                  ⚠️ Modifications non enregistrées
                </p>
                <p className="text-yellow-100 text-xs mt-1">
                  N'oubliez pas de cliquer "Enregistrer"
                </p>
              </div>
            )}
            {hasUnsavedChanges && (
              <Button
                onClick={saveChanges}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer maintenant
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pages à Éditer */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          📄 Pages à modifier
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Link key={page.href} to={page.href}>
                <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#F29F05] transition-all cursor-pointer h-full hover:shadow-lg hover:shadow-[#8C0343]/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${page.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-gray-500">→</span>
                    </div>
                    <CardTitle className="text-white mt-4">
                      {page.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {page.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tips Card */}
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            Conseils utiles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="text-[#F29F05] font-bold">✓</span>
              <span>
                <strong>Enregistrez régulièrement</strong> - Ne fermez pas le
                navigateur sans cliquer "Enregistrer"
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#F29F05] font-bold">✓</span>
              <span>
                <strong>Testez vos modifications</strong> - Allez voir comment
                ça s'affiche sur la page après édition
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#F29F05] font-bold">✓</span>
              <span>
                <strong>Utilisez le crayon ✏️</strong> - Survolez simplement le
                texte pour voir le crayon
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#F29F05] font-bold">✓</span>
              <span>
                <strong>Besoin d'aide?</strong> - Consultez le guide
                d'utilisation en bas du site
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
