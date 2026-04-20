import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteContent, loadContent, saveContent } from "../../lib/content-store";
import { toast } from "sonner";

interface EditorContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  content: SiteContent;
  updateContent: (path: string, value: any) => void;
  saveChanges: () => void;
  hasUnsavedChanges: boolean;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<SiteContent>(loadContent());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const updateContent = (path: string, value: any) => {
    const keys = path.split(".");
    const newContent = { ...content };
    let current: any = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setContent(newContent);
    setHasUnsavedChanges(true);
  };

  const saveChanges = () => {
    saveContent(content);
    setHasUnsavedChanges(false);
    toast.success("Modifications enregistrées avec succès !");
  };

  return (
    <EditorContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        content,
        updateContent,
        saveChanges,
        hasUnsavedChanges,
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
