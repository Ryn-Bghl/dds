import { useState } from "react";
import {
  Mail,
  User,
  Calendar,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  MoreVertical,
  Filter,
  ArrowLeft,
  MessageSquare,
  Archive,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useEditor } from "../../context/EditorContext";
import { ContactMessage } from "../../../lib/content-store";
import { toast } from "sonner";
import { Separator } from "../../components/ui/separator";

export default function AdminMessages() {
  const { content, updateContent, saveChanges } = useEditor();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Tous");

  const messages = content.contactMessages || [];

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "Tous" || msg.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (id: string, status: ContactMessage["status"]) => {
    const newMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, status } : msg
    );
    const newContent = updateContent("contactMessages", newMessages);
    await saveChanges(newContent);
    toast.success(`Message marqué comme: ${status}`);
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      const newMessages = messages.filter((msg) => msg.id !== id);
      const newContent = updateContent("contactMessages", newMessages);
      await saveChanges(newContent);
      toast.info("Message supprimé");
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Nouveau":
        return (
          <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
            Nouveau
          </Badge>
        );
      case "Lu":
        return (
          <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
            Lu
          </Badge>
        );
      case "Répondu":
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            Répondu
          </Badge>
        );
      case "Archivé":
        return (
          <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">
            Archivé
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleMarkAllAsRead = async () => {
    const newMessages = messages.map((msg) =>
      msg.status === "Nouveau" ? { ...msg, status: "Lu" as const } : msg
    );
    const newContent = updateContent("contactMessages", newMessages);
    await saveChanges(newContent);
    toast.success("Tous les messages ont été marqués comme lus");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Messages de Contact</h1>
          <p className="text-gray-400">
            Gérez les demandes reçues via le formulaire de contact du site.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">
            {messages.filter(m => m.status === "Nouveau").length} Nouveaux
          </Badge>
          {messages.some(m => m.status === "Nouveau") && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              Tout marquer comme lu
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {["Tous", "Nouveau", "Lu", "Répondu", "Archivé"].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className={statusFilter === status ? "bg-[#8C0343] hover:bg-[#771236]" : "border-border"}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredMessages.length === 0 ? (
              <div className="py-12 text-center bg-card rounded-lg border border-dashed border-border">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Aucun message trouvé.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <Card 
                  key={msg.id} 
                  className={`cursor-pointer transition-all border-border hover:border-[#8C0343]/50 ${selectedMessage?.id === msg.id ? 'border-[#8C0343] bg-[#8C0343]/5 shadow-lg' : 'bg-card'}`}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === "Nouveau") {
                      handleUpdateStatus(msg.id, "Lu");
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white truncate max-w-[150px]">{msg.name}</h4>
                      {getStatusBadge(msg.status)}
                    </div>
                    <p className="text-xs text-[#F29F05] font-medium mb-2 truncate">
                      {msg.subject}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {msg.createdAt}
                      </div>
                      <div className="truncate max-w-[100px]">{msg.email}</div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="bg-[#1a1a1a] border-gray-800 sticky top-24">
              <CardHeader className="border-b border-gray-800 pb-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-white text-2xl">{selectedMessage.name}</CardTitle>
                      {getStatusBadge(selectedMessage.status)}
                    </div>
                    <CardDescription className="text-gray-400 flex items-center gap-2">
                      <Mail className="w-3 h-3" /> {selectedMessage.email}
                      <span className="text-gray-600">•</span>
                      <Calendar className="w-3 h-3" /> Reçu le {selectedMessage.createdAt}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="border-gray-700 text-gray-300">
                          <Clock className="w-4 h-4 mr-2" /> Statut
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(selectedMessage.id, "Lu")}>
                          <Clock className="w-4 h-4 mr-2 text-orange-500" /> Marquer comme Lu
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(selectedMessage.id, "Répondu")}>
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Marquer comme Répondu
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(selectedMessage.id, "Archivé")}>
                          <Archive className="w-4 h-4 mr-2 text-gray-400" /> Archiver
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <Label className="text-gray-500 text-xs uppercase tracking-wider mb-2 block">Sujet</Label>
                  <p className="text-[#F29F05] text-lg font-bold">{selectedMessage.subject}</p>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <Label className="text-gray-500 text-xs uppercase tracking-wider mb-4 block">Message</Label>
                  <div className="bg-[#262626] p-6 rounded-xl border border-gray-700">
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" className="border-gray-700 text-gray-300" asChild>
                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                      <Mail className="w-4 h-4 mr-2" /> Répondre par Email
                    </a>
                  </Button>
                  <Button 
                    className="bg-[#8C0343] hover:bg-[#771236]"
                    onClick={() => handleUpdateStatus(selectedMessage.id, "Répondu")}
                  >
                    Marquer comme traité
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-card rounded-lg border border-dashed border-border opacity-50">
              <MessageSquare className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Sélectionnez un message</h3>
              <p className="text-gray-400">Cliquez sur un message dans la liste pour voir le contenu et y répondre.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
