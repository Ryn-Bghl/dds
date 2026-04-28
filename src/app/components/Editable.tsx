import React, { useState, useEffect } from "react";
import { useEditor } from "../context/EditorContext";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Pencil, Check, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface EditableProps {
  path: string;
  children: React.ReactNode;
  type?: "text" | "textarea" | "image" | "url";
  className?: string;
  label?: string;
  id?: string; // Unique ID to track this specific editor
}

export const Editable: React.FC<EditableProps> = ({
  path,
  children,
  type = "text",
  className,
  label,
  id: providedId,
}) => {
  const { isEditMode, content, updateContent, activeEditorId, setActiveEditorId } = useEditor();
  
  // Create a stable ID for this editable instance if not provided
  const [internalId] = useState(providedId || `edit-${path}-${Math.random().toString(36).substr(2, 9)}`);
  
  // Local temporary value for the editor
  const [tempValue, setTempValue] = useState("");

  // Check if THIS specific instance is the active editor
  const isEditing = activeEditorId === internalId;

  // Helper to get value from nested path
  const getValue = (path: string, obj: any) => {
    try {
      return path.split(".").reduce((acc, key) => {
        // Handle array index if key is a number
        if (Array.isArray(acc) && !isNaN(Number(key))) {
          return acc[Number(key)];
        }
        return acc?.[key];
      }, obj);
    } catch (e) {
      return "";
    }
  };

  const currentValue = getValue(path, content);

  // Sync tempValue when starting to edit
  useEffect(() => {
    if (isEditing) {
      setTempValue(currentValue || "");
    }
  }, [isEditing, currentValue]);

  if (!isEditMode) {
    return <div className={className}>{children}</div>;
  }

  const handleSave = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    updateContent(path, tempValue);
    setActiveEditorId(null);
  };

  const handleCancel = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveEditorId(null);
  };

  const handleStartEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveEditorId(internalId);
  };

  if (isEditing) {
    const blockEvent = (e: React.MouseEvent | React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    return (
      <div
        className={cn(
          "relative border-2 border-[#F29F05] p-3 rounded-lg bg-[#121212] z-[100] shadow-2xl min-w-[300px]",
          className
        )}
        onClick={blockEvent}
      >
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F29F05]">
            {label || "Édition " + type}
          </span>
          <div className="flex gap-1">
             <Button
              size="icon"
              variant="ghost"
              onClick={handleCancel}
              className="h-7 w-7 text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={handleSave}
              className="h-7 w-7 bg-[#F29F05] text-black hover:bg-[#D96704]"
            >
              <Check className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {type === "textarea" ? (
          <Textarea
            autoFocus
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="bg-[#1a1a1a] text-white border-gray-700 min-h-[150px] w-full focus:border-[#F29F05] focus:ring-1 focus:ring-[#F29F05]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
        ) : (
          <div className="space-y-2">
            <Input
              autoFocus
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="bg-[#1a1a1a] text-white border-gray-700 w-full focus:border-[#F29F05] focus:ring-1 focus:ring-[#F29F05]"
              placeholder={type === "image" ? "URL de l'image..." : "Texte..."}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />
            {type === "image" && tempValue && (
              <div className="mt-2 rounded border border-white/10 overflow-hidden bg-black/50 aspect-video flex items-center justify-center">
                <img 
                  src={tempValue} 
                  alt="Aperçu" 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Invalide';
                  }}
                />
              </div>
            )}
          </div>
        )}
        
        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500">
          <span>{path}</span>
          <span>Echap pour annuler • Ctrl+Entrée pour sauver</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        "before:absolute before:-inset-2 before:border-2 before:border-dashed before:border-transparent before:rounded-lg before:transition-all before:pointer-events-none",
        "hover:before:border-[#F29F05]/40 hover:before:bg-[#F29F05]/5",
        className
      )}
      onClick={handleStartEdit}
    >
      <div className="absolute -top-4 -right-4 bg-[#F29F05] text-black w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 shadow-xl scale-75 group-hover:scale-100 hover:bg-[#D96704]">
        {type === "image" ? <ImageIcon className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
      </div>
      {children}
    </div>
  );
};
