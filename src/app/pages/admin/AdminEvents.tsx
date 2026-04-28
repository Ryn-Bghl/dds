import React, { useState } from "react";
import { useEditor } from "../../context/EditorContext";
import { Event } from "../../../lib/content-store";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Switch } from "../../components/ui/switch";
import BlockEditor from "../../components/admin/BlockEditor";

export default function AdminEvents() {
  const { content, updateContent } = useEditor();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Event | null>(null);

  const handleAdd = () => {
    const newEvent: Event = {
      id: Date.now(),
      title: "Nouvel Événement",
      date: new Date().toISOString().split("T")[0],
      time: "20:00",
      location: "Lieu",
      category: "Concert",
      description: "Description de l'événement",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
      isPast: false,
    };
    updateContent("events", [newEvent, ...content.events]);
    toast.success("Événement ajouté");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Supprimer cet événement ?")) {
      updateContent(
        "events",
        content.events.filter((e) => e.id !== id),
      );
      toast.success("Événement supprimé");
    }
  };

  const startEdit = (event: Event) => {
    setEditingId(event.id);
    setEditForm({ ...event });
  };

  const saveEdit = () => {
    if (editForm) {
      const newEvents = content.events.map((e) =>
        e.id === editForm.id ? editForm : e,
      );
      updateContent("events", newEvents);
      setEditingId(null);
      setEditForm(null);
      toast.success("Événement mis à jour");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestion des Événements
          </h1>
          <p className="text-gray-400">
            Gérez l'agenda et les archives de l'association.
          </p>
        </div>
        <Button onClick={handleAdd} className="bg-[#8C0343] hover:bg-[#771236]">
          <Plus className="w-4 h-4 mr-2" /> Nouvel Événement
        </Button>
      </div>

      <div className="grid gap-6">
        {content.events.map((event) => (
          <Card
            key={event.id}
            className="bg-[#1a1a1a] border-gray-800 overflow-hidden"
          >
            {editingId === event.id ? (
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
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">
                      Date (YYYY-MM-DD)
                    </label>
                    <Input
                      value={editForm?.date}
                      onChange={(e) =>
                        setEditForm((prev) =>
                          prev ? { ...prev, date: e.target.value } : null,
                        )
                      }
                      className="bg-[#262626] border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Horaire</label>
                    <Input
                      value={editForm?.time}
                      onChange={(e) =>
                        setEditForm((prev) =>
                          prev ? { ...prev, time: e.target.value } : null,
                        )
                      }
                      className="bg-[#262626] border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">Passé ?</label>
                    <div className="flex items-center h-10">
                      <Switch
                        checked={editForm?.isPast}
                        onCheckedChange={(checked) =>
                          setEditForm((prev) =>
                            prev ? { ...prev, isPast: checked } : null,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Lieu</label>
                  <Input
                    value={editForm?.location}
                    onChange={(e) =>
                      setEditForm((prev) =>
                        prev ? { ...prev, location: e.target.value } : null,
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
              <div className="flex items-start p-4 gap-4">
                <div className="w-32 h-24 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                  <img
                    src={event.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white text-lg">
                      {event.title}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider ${event.isPast ? "bg-gray-800 text-gray-500" : "bg-[#8C0343]/20 text-[#F29F05]"}`}
                    >
                      {event.isPast ? "Passé" : "À venir"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" /> {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {event.location}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {event.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEdit(event)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(event.id)}
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
