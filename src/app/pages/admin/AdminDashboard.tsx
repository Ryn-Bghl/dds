import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Music,
  Calendar,
  Users,
  Package,
  ArrowUpRight,
  PlusCircle,
  FileEdit,
  Trash2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
export default function AdminDashboard() {
  const stats = [
    {
      label: "Projets Actifs",
      value: "12",
      icon: Music,
      color: "text-blue-500",
    },
    {
      label: "Événements à venir",
      value: "5",
      icon: Calendar,
      color: "text-green-500",
    },
    {
      label: "Demandes Location",
      value: "8",
      icon: Package,
      color: "text-purple-500",
    },
    {
      label: "Nouveaux Bénévoles",
      value: "3",
      icon: Users,
      color: "text-orange-500",
    },
  ];

  const recentActions = [
    {
      id: 1,
      title: "Festival Émergence 2024",
      type: "Projet",
      date: "Il y a 2h",
    },
    {
      id: 2,
      title: "Pack Sonorisation S",
      type: "Location",
      date: "Il y a 5h",
    },
    { id: 3, title: "Concert Solidaire", type: "Événement", date: "Hier" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tableau de Bord</h1>
        <p className="text-gray-400">
          Bienvenue dans l'interface de gestion de Dons Du Son.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#1a1a1a] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Management */}
        <Card className="lg:col-span-2 bg-[#1a1a1a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Gestion des Contenus</CardTitle>
            <Button size="sm" className="bg-[#8C0343] hover:bg-[#771236]">
              <PlusCircle className="w-4 h-4 mr-2" /> Nouveau
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#262626] border border-gray-800 group hover:border-gray-700 transition-colors"
                >
                  <div>
                    <div className="font-medium text-white">{action.title}</div>
                    <div className="text-sm text-gray-500">
                      {action.type} • {action.date}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <FileEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Raccourcis</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              variant="outline"
              className="justify-start text-gray-300 border-gray-800 hover:bg-gray-800"
            >
              <Music className="w-4 h-4 mr-2" /> Éditer les Projets
              <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
            </Button>
            <Button
              variant="outline"
              className="justify-start text-gray-300 border-gray-800 hover:bg-gray-800"
            >
              <Calendar className="w-4 h-4 mr-2" /> Gérer le Calendrier
              <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
            </Button>
            <Button
              variant="outline"
              className="justify-start text-gray-300 border-gray-800 hover:bg-gray-800"
            >
              <Package className="w-4 h-4 mr-2" /> Catalogue Location
              <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
