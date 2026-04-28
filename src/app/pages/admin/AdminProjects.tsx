import React, { useState } from "react";
import { useEditor } from "../../context/EditorContext";
import { Project } from "../../../lib/content-store";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";
import { toast } from "sonner";
import BlockEditor from "../../components/admin/BlockEditor";

export default function AdminProjects() {
  const { content, updateContent } = useEditor();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Project | null>(null);

  const handleAdd = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "Nouveau Projet",
      category: "Diffusion",
      image:
        "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?w=800",
      description: "Description courte du projet",
      date: "2024",
      location: "Lieu",
      stats: [],
      content: [],
    };
    updateContent("projects", [newProject, ...content.projects]);
    toast.success("Projet ajouté");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer ce projet ?")) {
      updateContent(
        "projects",
        content.projects.filter((p) => p.id !== id),
      );
      toast.success("Projet supprimé");
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm({ ...project });
  };

  const saveEdit = () => {
    if (editForm) {
      const newProjects = content.projects.map((p) =>
        p.id === editForm.id ? editForm : p,
      );
      updateContent("projects", newProjects);
      setEditingId(null);
      setEditForm(null);
      toast.success("Projet mis à jour");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestion des Projets
          </h1>
          <p className="text-gray-400">
            Ajoutez, modifiez ou supprimez les projets de l'association.
          </p>
        </div>
        <Button onClick={handleAdd} className="bg-[#8C0343] hover:bg-[#771236]">
          <Plus className="w-4 h-4 mr-2" /> Nouveau Projet
        </Button>
      </div>

      <div className="grid gap-6">
        {content.projects.map((project) => (
          <Card
            key={project.id}
            className="bg-[#1a1a1a] border-gray-800 overflow-hidden"
          >
            {editingId === project.id ? (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Titre</label>
                    <Input
                      value={editForm?.title}
                      onChange={(e) =>
                        setEditForm((prev) =>
                          prev ? { ...prev, title: e.target.value } : null,
                        )
                      }
                      className="bg-[#262626] border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Catégorie</label>
                    <Input
                      value={editForm?.category}
                      onChange={(e) =>
                        setEditForm((prev) =>
                          prev ? { ...prev, category: e.target.value } : null,
                        )
                      }
                      className="bg-[#262626] border-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">URL Image</label>
                  <Input
                    value={editForm?.image}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, image: e.target.value } : null,
                      )
                    }
                    className="bg-[#262626] border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Description</label>
                  <Textarea
                    value={editForm?.description}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, description: e.target.value } : null,
                      )
                    }
                    className="bg-[#262626] border-gray-700"
                  />
                </div>
                <div className="border-t border-gray-800 pt-6 my-6">
                  <BlockEditor
                    blocks={editForm?.content || []}
                    onChange={(newBlocks) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, content: newBlocks } : null,
                      )
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setEditingId(null)}
                    className="text-gray-400"
                  >
                    <X className="w-4 h-4 mr-2" /> Annuler
                  </Button>
                  <Button
                    onClick={saveEdit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" /> Enregistrer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-4 gap-4">
                <div className="w-24 h-24 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{project.title}</h3>
                    <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEdit(project)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
