import React, { useState } from "react";
import { useEditor } from "../context/EditorContext";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface EditableProps {
  path: string;
  children: React.ReactNode;
  type?: "text" | "textarea" | "image";
  className?: string;
  label?: string;
}

export const Editable: React.FC<EditableProps> = ({
  path,
  children,
  type = "text",
  className,
  label,
}) => {
  const { isEditMode, content, updateContent } = useEditor();
  const [isEditing, setIsEditing] = useState(false);

  // Extract value from path
  const getValue = (path: string, obj: any) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const currentValue = getValue(path, content);
  const [tempValue, setTempValue] = useState(currentValue);

  if (!isEditMode) {
    return <div className={className}>{children}</div>;
  }

  const handleSave = () => {
    updateContent(path, tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(currentValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className={cn(
          "relative border-2 border-[#F29F05] p-2 rounded-md bg-black/50 z-50",
          className,
        )}
      >
        {label && (
          <label className="text-xs text-[#F29F05] mb-1 block">{label}</label>
        )}
        {type === "textarea" ? (
          <Textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="bg-[#1a1a1a] text-white border-gray-700 min-h-[100px]"
          />
        ) : (
          <Input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="bg-[#1a1a1a] text-white border-gray-700"
          />
        )}
        <div className="flex gap-2 mt-2 justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="bg-[#F29F05] text-black hover:bg-[#D96704]"
            onClick={handleSave}
          >
            <Check className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative group cursor-pointer border-2 border-transparent hover:border-[#F29F05]/50 rounded-md transition-all",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
      }}
    >
      {" "}
      <div className="absolute -top-3 -right-3 bg-[#F29F05] text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
        <Pencil className="w-3 h-3" />
      </div>
      {children}
    </div>
  );
};
