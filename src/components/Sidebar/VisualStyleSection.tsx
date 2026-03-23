import React from 'react';
import { Palette } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';
import { CardStyle } from '../../types';
import { THEMES, GRADIENTS } from '../../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VisualStyleSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  style: CardStyle;
  setStyle: React.Dispatch<React.SetStateAction<CardStyle>>;
  applyTheme: (theme: typeof THEMES[0]) => void;
}

export const VisualStyleSection = ({
  isOpen,
  onToggle,
  style,
  setStyle,
  applyTheme
}: VisualStyleSectionProps) => {
  return (
    <CollapsibleSection
      title="Visual Style"
      icon={Palette}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Themes</label>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.name}
              onClick={() => applyTheme(t)}
              className={cn(
                "h-10 rounded-xl border transition-all flex items-center justify-center text-[10px] font-bold uppercase tracking-tight",
                style.theme === t.name ? "ring-2 ring-indigo-500 border-transparent" : "border-gray-200 hover:border-gray-300"
              )}
              style={{ 
                background: t.gradient || t.bg, 
                color: t.text,
                boxShadow: style.theme === t.name ? '0 4px 12px rgba(79, 70, 229, 0.2)' : 'none'
              }}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Background Gradient</label>
          <div className="grid grid-cols-4 gap-2">
            {GRADIENTS.map((g) => (
              <button
                key={g.name}
                onClick={() => setStyle(s => ({ ...s, gradient: g.value }))}
                className={cn(
                  "h-8 rounded-lg transition-all border-2",
                  style.gradient === g.value ? "border-indigo-500 scale-110 shadow-md" : "border-transparent hover:scale-105"
                )}
                style={{ background: g.value }}
                title={g.name}
              />
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
