import React from 'react';
import { Frame } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';
import { CardStyle } from '../../types';

interface InnerBorderSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  style: CardStyle;
  setStyle: React.Dispatch<React.SetStateAction<CardStyle>>;
}

export const InnerBorderSection = ({
  isOpen,
  onToggle,
  style,
  setStyle
}: InnerBorderSectionProps) => {
  return (
    <CollapsibleSection
      title="Inner Border"
      icon={Frame}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Border Color</label>
            <input
              type="color"
              value={style.innerFrameColor}
              onChange={(e) => setStyle(s => ({ ...s, innerFrameColor: e.target.value }))}
              className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Border Size</label>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={style.innerFrameWidth}
                onChange={(e) => setStyle(s => ({ ...s, innerFrameWidth: parseInt(e.target.value) }))}
                className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[10px] font-bold text-gray-500 w-4">{style.innerFrameWidth}</span>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Distance (Padding)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={style.innerFramePadding}
              onChange={(e) => setStyle(s => ({ ...s, innerFramePadding: parseInt(e.target.value) }))}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-[10px] font-bold text-gray-500 w-6">{style.innerFramePadding}px</span>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
