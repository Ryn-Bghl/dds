import React from 'react';
import { ContentBlock } from '../../lib/content-store';
import { Editable } from './Editable';

interface DetailContentProps {
  blocks: ContentBlock[];
  basePath: string;
}

export default function DetailContent({ blocks, basePath }: DetailContentProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-12">
      {blocks.map((block, index) => {
        const path = `${basePath}.${index}`;

        switch (block.type) {
          case 'title':
            return (
              <div key={block.id} className="pt-8 border-t border-border/50 first:border-0 first:pt-0">
                <Editable path={`${path}.title`} label="Titre">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {block.title}
                  </h2>
                </Editable>
              </div>
            );

          case 'text':
            return (
              <div key={block.id} className="space-y-4">
                {block.title && (
                  <Editable path={`${path}.title`} label="Sous-titre">
                    <h3 className="text-2xl font-bold text-foreground/90">
                      {block.title}
                    </h3>
                  </Editable>
                )}
                <Editable path={`${path}.text`} type="textarea" label="Paragraphe">
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {block.text}
                  </p>
                </Editable>
              </div>
            );

          case 'image':
            return (
              <div key={block.id} className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-border bg-muted aspect-video relative group">
                  <Editable path={`${path}.url`} label="URL Image">
                    <img
                      src={block.url}
                      alt={block.title || 'Image de contenu'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Editable>
                </div>
                {block.title && (
                  <div className="text-center">
                    <Editable path={`${path}.title`} label="Légende">
                      <p className="text-sm italic text-muted-foreground">
                        {block.title}
                      </p>
                    </Editable>
                  </div>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
