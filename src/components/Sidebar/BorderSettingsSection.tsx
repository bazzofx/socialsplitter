import React from 'react';
import { Square } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';
import { CardStyle } from '../../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BorderSettingsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  style: CardStyle;
  setStyle: React.Dispatch<React.SetStateAction<CardStyle>>;
}

export const BorderSettingsSection = ({
  isOpen,
  onToggle,
  style,
  setStyle
}: BorderSettingsSectionProps) => {
  return (
    <CollapsibleSection
      title="Border Settings"
      icon={Square}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Border Width</label>
            <input
              type="number"
              value={style.borderWidth}
              onChange={(e) => setStyle(s => ({ ...s, borderWidth: parseInt(e.target.value) }))}
              className="w-full p-2 text-xs border border-gray-200 rounded-xl text-center font-bold bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Border Color</label>
            <input
              type="color"
              value={style.borderColor}
              onChange={(e) => setStyle(s => ({ ...s, borderColor: e.target.value, theme: 'Custom' }))}
              className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Corner Radius</label>
          <div className="flex p-1 bg-gray-100 rounded-lg">
            {[
              { label: 'none', value: 0 },
              { label: 'md', value: 12 },
              { label: 'xl', value: 24 },
              { label: '3xl', value: 48 }
            ].map((r) => (
              <button
                key={r.label}
                onClick={() => setStyle(s => ({ ...s, borderRadius: r.value }))}
                className={cn(
                  "flex-1 py-1 text-[10px] font-bold rounded-md transition-all",
                  style.borderRadius === r.value ? "bg-white shadow-sm text-indigo-600" : "text-gray-500"
                )}
              >
                {r.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
