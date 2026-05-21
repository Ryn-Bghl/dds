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
  Users,
  FileText,
  Clock,
  ExternalLink,
  ShieldAlert,
  MessageSquare,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEditor } from "../../context/EditorContext";
import { Link } from "react-router";
import { Badge } from "../../components/ui/badge";

export default function AdminDashboard() {
  const {
    isEditMode,
    toggleEditMode,
    hasUnsavedLiveChanges,
    saveChanges,
    isLoading,
    content,
  } = useEditor();

  const pendingRequests = content.rentalRequests?.filter(r => r.status === "En attente") || [];
  const newMessages = content.contactMessages?.filter(m => m.status === "Nouveau") || [];
  const upcomingEvents = content.events?.filter(e => !e.isPast) || [];
  const totalItems = content.inventory?.length || 0;
  const teamSize = content.teamMembers?.length || 0;

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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-white tracking-tight">Tableau de Bord</h1>
          <p className="text-gray-400 text-lg">
            Vue d'ensemble de l'activité de Dons Du Son.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button
            onClick={toggleEditMode}
            variant={isEditMode ? "destructive" : "default"}
            className={isEditMode ? "" : "bg-[#F29F05] hover:bg-[#D96704] text-black font-bold"}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {isEditMode ? "Désactiver Édition" : "Mode Édition Rapide"}
          </Button>
          {hasUnsavedLiveChanges && (
            <Button
              onClick={saveChanges}
              className="bg-green-600 hover:bg-green-700 text-white font-bold animate-pulse"
            >
              <Save className="w-4 h-4 mr-2" />
              Publier Pages
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={FileText} 
          label="Demandes en attente" 
          value={pendingRequests.length} 
          color="text-orange-500" 
          link="/admin/rental"
          subValue={pendingRequests.length > 0 ? "Action requise" : "Tout est à jour"}
        />
        <StatCard 
          icon={MessageSquare} 
          label="Nouveaux Messages" 
          value={newMessages.length} 
          color="text-blue-500" 
          link="/admin/messages"
          subValue={newMessages.length > 0 ? "Non lus" : "Boîte de réception vide"}
        />
        <StatCard 
          icon={Calendar} 
          label="Événements à venir" 
          value={upcomingEvents.length} 
          color="text-green-500" 
          link="/admin/events"
          subValue={`Sur ${content.events?.length || 0} au total`}
        />
        <StatCard 
          icon={Users} 
          label="Membres Équipe" 
          value={teamSize} 
          color="text-purple-500" 
          link="/admin/team"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Messages Section */}
          <Card className="bg-[#1a1a1a] border-gray-800 overflow-hidden">
            <CardHeader className="border-b border-gray-800 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-white text-xl">Derniers Messages</CardTitle>
                </div>
                <Link to="/admin/messages" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                  Voir tout <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {content.contactMessages && content.contactMessages.length > 0 ? (
                <div className="divide-y divide-gray-800">
                  {content.contactMessages.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                      <div className="flex flex-col">
                        <span className="text-white font-medium group-hover:text-blue-400 transition-colors">{msg.name}</span>
                        <span className="text-xs text-[#F29F05] font-medium">{msg.subject}</span>
                        <span className="text-[10px] text-gray-500">{msg.createdAt}</span>
                      </div>
                      <Badge variant="outline" className={
                        msg.status === "Nouveau" ? "border-blue-500/50 text-blue-500 bg-blue-500/10" :
                        msg.status === "Répondu" ? "border-green-500/50 text-green-500 bg-green-500/10" :
                        "border-gray-500/50 text-gray-400 bg-gray-500/10"
                      }>
                        {msg.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  Aucun message reçu.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Requests Section */}
          <Card className="bg-[#1a1a1a] border-gray-800 overflow-hidden">
            <CardHeader className="border-b border-gray-800 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#F29F05]" />
                  <CardTitle className="text-white text-xl">Dernières Demandes</CardTitle>
                </div>
                <Link to="/admin/rental" className="text-xs text-[#F29F05] hover:underline flex items-center gap-1">
                  Voir tout <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {content.rentalRequests && content.rentalRequests.length > 0 ? (
                <div className="divide-y divide-gray-800">
                  {content.rentalRequests.slice(0, 3).map((req) => (
                    <div key={req.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                      <div className="flex flex-col">
                        <span className="text-white font-medium group-hover:text-[#F29F05] transition-colors">{req.customerName}</span>
                        <span className="text-xs text-gray-500">{req.createdAt} • {req.totalPrice}€</span>
                      </div>
                      <Badge variant="outline" className={
                        req.status === "En attente" ? "border-orange-500/50 text-orange-500 bg-orange-500/10" :
                        req.status === "Validé" ? "border-green-500/50 text-green-500 bg-green-500/10" :
                        req.status === "Annulé" ? "border-gray-500/50 text-gray-400 bg-gray-500/10" :
                        "border-red-500/50 text-red-500 bg-red-500/10"
                      }>
                        {req.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  Aucune demande de devis enregistrée.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events List */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-xl flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-blue-500" />
                   Prochains Événements
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.slice(0, 3).map(event => (
                  <div key={event.id} className="flex gap-4 p-3 rounded-lg bg-[#262626] border border-gray-700">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img src={event.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold truncate">{event.title}</h4>
                      <p className="text-xs text-gray-400 mb-1">{event.date} • {event.location}</p>
                      <Badge className="bg-blue-500/20 text-blue-400 border-none text-[10px]">{event.category}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Aucun événement à venir.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Status/Info Area */}
        <div className="space-y-6">
          {/* Site Status */}
          <Card className="bg-[#1a1a1a] border-gray-800">
             <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#8C0343]" />
                État du Site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded bg-black/30">
                <span className="text-sm text-gray-400">Mode Maintenance</span>
                <Badge variant={content.settings.advanced.maintenanceMode ? "destructive" : "secondary"}>
                  {content.settings.advanced.maintenanceMode ? "ACTIF" : "OFF"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-black/30">
                <span className="text-sm text-gray-400">Live Edition</span>
                <Badge className={isEditMode ? "bg-green-500 text-black font-bold" : "bg-gray-800 text-gray-400"}>
                  {isEditMode ? "ACTIF" : "INACTIF"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Check */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ConfigItem label="HelloAsso Adhésion" status={!!content.settings.links.helloAssoMembership} />
              <ConfigItem label="HelloAsso Dons" status={!!content.settings.links.helloAssoDonation} />
              <ConfigItem label="Email de location" status={!!content.settings.rental.rentalEmail} />
              <ConfigItem label="Réseaux Sociaux" status={!!content.settings.contact.facebook || !!content.settings.contact.instagram} />
              <Button asChild variant="outline" className="w-full mt-2 border-gray-800 text-gray-400 hover:text-white">
                <Link to="/admin/settings">Modifier tout</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links Overlay Removal - replaced by page navigation in sidebar or bottom */}
          <div className="bg-gradient-to-br from-[#8C0343]/10 to-transparent p-6 rounded-xl border border-[#8C0343]/20">
             <h3 className="text-[#F29F05] font-bold mb-2">Besoin d'aide ?</h3>
             <p className="text-sm text-gray-400 mb-4">Consultez le guide administrateur pour apprendre à gérer vos contenus.</p>
             <Button variant="link" className="p-0 h-auto text-[#F29F05] hover:text-[#D96704]" asChild>
                <Link to="/admin/help">Voir le guide complet →</Link>
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, subValue, link }: any) {
  return (
    <Link to={link || "#"} className="block group">
      <Card className="bg-[#1a1a1a] border-gray-800 hover:border-[#F29F05]/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#F29F05]/5">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-1">{value}</h3>
              {subValue && <p className="text-[10px] text-gray-500 font-medium">{subValue}</p>}
            </div>
            <div className={`p-2 rounded-lg bg-black/50 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ConfigItem({ label, status }: { label: string, status: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      {status ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <AlertCircle className="w-4 h-4 text-red-500" />
      )}
    </div>
  );
}
