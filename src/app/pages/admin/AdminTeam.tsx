import React, { useState, useEffect } from "react";
import { useEditor } from "../../context/EditorContext";
import { SiteContent } from "../../../lib/content-store";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Plus, Edit, Trash2, Save, X, Users } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";

const TEAM_PLACEHOLDER =
  "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Define the TeamMember interface
interface TeamMember {
  id?: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

// Helper function to generate a simple unique ID
function generateUniqueId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export default function AdminTeam() {
  const { content, updateContent, saveChanges } = useEditor();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formState, setFormState] = useState<TeamMember>({
    id: "",
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormState({ id: "", name: "", role: "", bio: "", imageUrl: "" });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormState({ ...member });
    setIsDialogOpen(true);
  };

  const handleSaveMember = async () => {
    if (
      !formState.name.trim() ||
      !formState.role.trim() ||
      !formState.bio.trim()
    ) {
      toast.warning("Les champs Nom, Rôle et Biographie sont obligatoires.");
      return;
    }

    let updatedTeamMembers;
    if (editingMember) {
      // Update
      updatedTeamMembers = (content.teamMembers || []).map((member) =>
        member.id === editingMember.id
          ? { ...formState, id: editingMember.id }
          : member,
      );
      toast.success(`Le membre "${formState.name}" a été mis à jour.`);
    } else {
      // Add
      const memberToAdd: TeamMember = { ...formState, id: generateUniqueId() };
      updatedTeamMembers = [...(content.teamMembers || []), memberToAdd];
      toast.success(`Le membre "${formState.name}" a été ajouté.`);
    }

    const newContent = updateContent("teamMembers", updatedTeamMembers);
    await saveChanges(newContent);
    setIsDialogOpen(false);
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      const updatedTeamMembers = (content.teamMembers || []).filter(
        (member) => member.id !== id,
      );
      const newContent = updateContent("teamMembers", updatedTeamMembers);
      await saveChanges(newContent);
      toast.success(`Le membre a été supprimé.`);
    }
  };

  // Ensure teamMembers array exists
  useEffect(() => {
    if (!content.teamMembers) {
      updateContent("teamMembers", []);
    }
  }, [content.teamMembers, updateContent]);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestion de l'équipe
          </h1>
          <p className="text-gray-400">
            Gérez les membres qui font vivre Dons Du Son.
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-[#8C0343] hover:bg-[#771236] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Ajouter un membre
        </Button>
      </div>

      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">
            Membres actuels
          </CardTitle>
          <CardDescription className="text-gray-500">
            {content.teamMembers?.length || 0} membre(s) dans l'équipe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!content.teamMembers || content.teamMembers.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-lg border border-dashed border-gray-800">
              <Users className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500">Aucun membre de l'équipe pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#262626] border border-gray-700 rounded-lg p-4 flex flex-col group hover:border-[#8C0343]/50 transition-colors"
                >
                  <div className="relative w-full h-48 rounded-md overflow-hidden mb-4 bg-gray-900">
                    <img
                      src={member.imageUrl || TEAM_PLACEHOLDER}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-black/60 backdrop-blur-md border-none text-white hover:bg-[#8C0343]"
                        onClick={() => handleOpenEdit(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 bg-red-900/60 backdrop-blur-md border-none text-red-200 hover:bg-red-600"
                        onClick={() => handleDeleteMember(member.id!)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <Badge className="w-fit mb-3 bg-[#8C0343]/20 text-[#F29F05] border-[#8C0343]/30">
                    {member.role}
                  </Badge>
                  <p className="text-xs text-gray-400 line-clamp-3 italic">
                    "{member.bio}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog for Add/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Modifier le membre" : "Ajouter un membre"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-400">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Ex: Jean Dupont"
                className="bg-[#262626] border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-400">Poste / Rôle *</Label>
              <Input
                id="role"
                name="role"
                value={formState.role}
                onChange={handleInputChange}
                placeholder="Ex: Président, Trésorier..."
                className="bg-[#262626] border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-400">Biographie courte *</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formState.bio}
                onChange={handleInputChange}
                placeholder="Quelques mots sur le parcours ou l'implication..."
                className="bg-[#262626] border-gray-700 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-gray-400">URL de l'image (optionnel)</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formState.imageUrl}
                onChange={handleInputChange}
                placeholder="Lien vers une photo..."
                className="bg-[#262626] border-gray-700"
              />
              {formState.imageUrl && (
                <div className="mt-2 w-20 h-20 rounded-full overflow-hidden border border-gray-700">
                  <img src={formState.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveMember}
              className="bg-[#8C0343] hover:bg-[#771236] text-white"
            >
              {editingMember ? "Mettre à jour" : "Ajouter au site"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
