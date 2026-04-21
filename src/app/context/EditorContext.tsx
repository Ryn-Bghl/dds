import React, { createContext, useContext, useState, useEffect } from "react";
import {
  SiteContent,
  loadContent,
  saveContent,
  initialContent,
} from "../../lib/content-store";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface EditorContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  content: SiteContent;
  updateContent: (path: string, value: any) => void;
  saveChanges: () => void;
  discardChanges: () => void;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  activeEditorId: string | null;
  setActiveEditorId: (id: string | null) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeEditorId, setActiveEditorId] = useState<string | null>(null);

  // Load content on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedContent = await loadContent();
        setContent(loadedContent);
      } catch (e) {
        console.error("Failed to load content", e);
        setContent(initialContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Disable edit mode if user logs out
  useEffect(() => {
    if (!user || user.role !== "admin") {
      setIsEditMode(false);
    }
  }, [user]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const updateContent = (path: string, value: any) => {
    const keys = path.split(".");
    const newContent = { ...content };
    let current: any = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      // Preserve arrays using spread syntax, copy objects
      if (Array.isArray(current[keys[i]])) {
        current[keys[i]] = [...current[keys[i]]];
      } else {
        current[keys[i]] = { ...current[keys[i]] };
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setContent(newContent);
    setHasUnsavedChanges(true);
  };

  const saveChanges = async () => {
    try {
      await saveContent(content);
      setHasUnsavedChanges(false);
      toast.success("Modifications enregistrées avec succès !");
    } catch (e) {
      toast.error("Erreur lors de la sauvegarde");
      console.error("Failed to save changes", e);
    }
  };

  const discardChanges = () => {
    if (window.confirm("Annuler toutes les modifications non enregistrées ?")) {
      const reloadData = async () => {
        try {
          const loadedContent = await loadContent();
          setContent(loadedContent);
          setHasUnsavedChanges(false);
          toast.info("Modifications annulées");
        } catch (e) {
          console.error("Failed to reload content", e);
        }
      };
      reloadData();
    }
  };

  return (
    <EditorContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        content,
        updateContent,
        saveChanges,
        discardChanges,
        hasUnsavedChanges,
        isLoading,
        activeEditorId,
        setActiveEditorId,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
};
