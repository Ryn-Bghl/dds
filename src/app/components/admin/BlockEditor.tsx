import React from 'react';
import { ContentBlock } from '../../../lib/content-store';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Trash2,
  MoveUp,
  MoveDown,
  Type,
  AlignLeft,
  Image as ImageIcon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from '../ui/label';

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      title: type === 'title' ? 'Nouveau titre' : '',
      text: type === 'text' ? 'Votre texte ici...' : '',
      url: type === 'image' ? '' : undefined,
    };
    onChange([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter(b => b.id !== id));
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      onChange(newBlocks);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-bold text-white">Sections de contenu</Label>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => addBlock('title')} className="h-8">
            <Type className="w-3.5 h-3.5 mr-1.5" /> Titre
          </Button>
          <Button size="sm" variant="outline" onClick={() => addBlock('text')} className="h-8">
            <AlignLeft className="w-3.5 h-3.5 mr-1.5" /> Texte
          </Button>
          <Button size="sm" variant="outline" onClick={() => addBlock('image')} className="h-8">
            <ImageIcon className="w-3.5 h-3.5 mr-1.5" /> Image
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={block.id} className="group relative bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 transition-all hover:border-gray-700">
            {/* Actions Toolbar */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full shadow-lg"
                onClick={() => moveBlock(index, 'up')}
                disabled={index === 0}
              >
                <MoveUp className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full shadow-lg"
                onClick={() => moveBlock(index, 'down')}
                disabled={index === blocks.length - 1}
              >
                <MoveDown className="w-4 h-4" />
              </Button>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-[#1a1a1a] border border-gray-800 text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeBlock(block.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F29F05] bg-[#F29F05]/10 px-2 py-0.5 rounded">
                  {block.type}
                </span>
              </div>

              {block.type === 'title' && (
                <Input
                  value={block.title}
                  onChange={e => updateBlock(block.id, { title: e.target.value })}
                  className="text-xl font-bold bg-[#262626] border-gray-700"
                  placeholder="Entrez votre titre..."
                />
              )}

              {block.type === 'text' && (
                <div className="space-y-3">
                  <Input
                    value={block.title}
                    onChange={e => updateBlock(block.id, { title: e.target.value })}
                    className="font-semibold bg-[#262626] border-gray-700"
                    placeholder="Sous-titre (optionnel)"
                  />
                  <Textarea
                    value={block.text}
                    onChange={e => updateBlock(block.id, { text: e.target.value })}
                    className="min-h-[120px] bg-[#262626] border-gray-700 leading-relaxed"
                    placeholder="Contenu de la section..."
                  />
                </div>
              )}

              {block.type === 'image' && (
                <div className="space-y-3">
                  <Input
                    value={block.url}
                    onChange={e => updateBlock(block.id, { url: e.target.value })}
                    className="bg-[#262626] border-gray-700"
                    placeholder="URL de l'image (Unsplash ou autre)"
                  />
                  {block.url && (
                    <div className="aspect-video rounded-lg overflow-hidden border border-gray-800 bg-black">
                      <img src={block.url} alt="Preview" className="w-full h-full object-cover opacity-50" />
                    </div>
                  )}
                  <Input
                    value={block.title}
                    onChange={e => updateBlock(block.id, { title: e.target.value })}
                    className="text-sm bg-[#262626] border-gray-700"
                    placeholder="Légende de l'image (optionnel)"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {blocks.length === 0 && (
          <div className="py-12 text-center border-2 border-dashed border-gray-800 rounded-xl">
            <p className="text-gray-500 italic">Aucune section de contenu. Utilisez les boutons ci-dessus pour commencer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
