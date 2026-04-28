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
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

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
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<TeamMember>({
    id: "",
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
  });

  // Effect to initialize the form when editing or adding
  useEffect(() => {
    if (editingMember) {
      setNewMember(editingMember);
    } else {
      setNewMember({ id: "", name: "", role: "", bio: "", imageUrl: "" });
    }
  }, [editingMember, content.teamMembers]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    if (
      !newMember.name.trim() ||
      !newMember.role.trim() ||
      !newMember.bio.trim()
    ) {
      toast.warning("Les champs Nom, Rôle et Biographie sont obligatoires.");
      return;
    }
    const memberToAdd: TeamMember = { ...newMember, id: generateUniqueId() };
    const updatedTeamMembers = [...(content.teamMembers || []), memberToAdd];
    updateContent("teamMembers", updatedTeamMembers);
    setNewMember({ id: "", name: "", role: "", bio: "", imageUrl: "" }); // Clear form
    toast.success(`Le membre "${memberToAdd.name}" a été ajouté avec succès!`);
  };

  const handleUpdateMember = () => {
    if (
      !editingMember ||
      !newMember.name.trim() ||
      !newMember.role.trim() ||
      !newMember.bio.trim()
    ) {
      toast.warning("Les champs Nom, Rôle et Biographie sont obligatoires.");
      return;
    }
    const updatedTeamMembers = (content.teamMembers || []).map((member) =>
      member.id === editingMember.id
        ? { ...newMember, id: editingMember.id }
        : member,
    );
    updateContent("teamMembers", updatedTeamMembers);
    setEditingMember(null); // Exit editing mode
    toast.success(
      `Le membre "${newMember.name}" a été mis à jour avec succès!`,
    );
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      const updatedTeamMembers = (content.teamMembers || []).filter(
        (member) => member.id !== id,
      );
      updateContent("teamMembers", updatedTeamMembers);
      if (editingMember && editingMember.id === id) {
        setEditingMember(null);
      }
      toast.success(`Le membre a été supprimé avec succès.`);
    }
  };

  const handleEditClick = (member: TeamMember) => {
    setEditingMember(member);
    setNewMember(member);
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    setNewMember({ id: "", name: "", role: "", bio: "", imageUrl: "" });
  };

  const handleSave = async () => {
    await saveChanges();
    toast.success("Tous les changements pour l'équipe ont été sauvegardés.");
  };

  // Ensure teamMembers array exists
  useEffect(() => {
    if (!content.teamMembers) {
      updateContent("teamMembers", []);
    }
  }, [content.teamMembers, updateContent]);

  return (
    <div className="space-y-8 max-w-5xl p-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Gestion de l'équipe
        </h1>
        <p className="text-gray-400">
          Ajoutez, modifiez et supprimez les membres de votre équipe.
        </p>
      </div>

      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">
            {editingMember ? "Modifier un membre" : "Ajouter un nouveau membre"}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {editingMember
              ? "Modifiez les informations du membre sélectionné."
              : "Entrez les détails du nouveau membre de l'équipe."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-400">Nom</Label>
              <Input
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                placeholder="Nom du membre"
                className="bg-[#262626] border-gray-700 mt-1"
              />
            </div>
            <div>
              <Label className="text-gray-400">Rôle</Label>
              <Input
                name="role"
                value={newMember.role}
                onChange={handleInputChange}
                placeholder="Ex: Président, Chargé de projet"
                className="bg-[#262626] border-gray-700 mt-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400">Biographie courte</Label>
            <Textarea
              name="bio"
              value={newMember.bio}
              onChange={handleInputChange}
              placeholder="Une courte description du membre..."
              className="bg-[#262626] border-gray-700 mt-1"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-400">URL de l'image (optionnel)</Label>
            <div className="flex gap-2">
              <Input
                name="imageUrl"
                value={newMember.imageUrl}
                onChange={handleInputChange}
                placeholder="Laissez vide pour utiliser l'image par défaut"
                className="bg-[#262626] border-gray-700 flex-grow"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            {editingMember ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleUpdateMember}
                  className="bg-[#8C0343] hover:bg-[#771236] text-white px-8"
                >
                  <Save className="w-4 h-4 mr-2" /> Mettre à jour
                </Button>
              </>
            ) : (
              <Button
                onClick={handleAddMember}
                className="bg-[#8C0343] hover:bg-[#771236] text-white px-8"
              >
                <Plus className="w-4 h-4 mr-2" /> Ajouter le membre
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">
            Membres actuels de l'équipe
          </CardTitle>
          <CardDescription className="text-gray-500">
            {content.teamMembers?.length === 0 &&
              "Aucun membre de l'équipe n'a encore été ajouté."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {content.teamMembers?.length === 0 ? (
            <p className="text-gray-500">
              Aucun membre de l'équipe pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.teamMembers?.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#262626] border border-gray-700 rounded-lg p-4 flex flex-col justify-between"
                >
                  <img
                    src={member.imageUrl || TEAM_PLACEHOLDER}
                    alt={member.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{member.role}</p>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={() => handleEditClick(member)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/50"
                      onClick={() => handleDeleteMember(member.id!)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end pt-8 border-t border-gray-800">
        <Button
          size="lg"
          onClick={handleSave}
          className="bg-[#8C0343] hover:bg-[#771236] text-white px-12"
          disabled={!content.teamMembers || content.teamMembers.length === 0}
        >
          <Save className="w-4 h-4 mr-2" />{" "}
          {content.teamMembers && content.teamMembers.length > 0
            ? "Enregistrer les changements de l'équipe"
            : "Aucun changement à enregistrer"}
        </Button>
      </div>
    </div>
  );
}
