import React from 'react';
import { Type } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';
import { SplitMode } from '../../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ContentSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  text: string;
  setText: (text: string) => void;
  splitMode: SplitMode;
  setSplitMode: (mode: SplitMode) => void;
  charLimit: number;
  setCharLimit: (limit: number) => void;
  separator: string;
  setSeparator: (sep: string) => void;
  cardsCount: number;
}

export const ContentSection = ({
  isOpen,
  onToggle,
  text,
  setText,
  splitMode,
  setSplitMode,
  charLimit,
  setCharLimit,
  separator,
  setSeparator,
  cardsCount
}: ContentSectionProps) => {
  return (
    <CollapsibleSection
      title="Content & Strategy"
      icon={Type}
      isOpen={isOpen}
      onToggle={onToggle}
      badge={cardsCount}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Source Text</label>
          <textarea
            className="w-full h-32 p-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none bg-gray-50 font-medium"
            placeholder="Paste your long text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Split Strategy</label>
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setSplitMode('character')}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                splitMode === 'character' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Auto
            </button>
            <button
              onClick={() => setSplitMode('separator')}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                splitMode === 'separator' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              Manual
            </button>
          </div>

          {splitMode === 'character' ? (
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <span>Char Limit</span>
                <span className="text-indigo-600 font-mono">{charLimit}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={charLimit}
                onChange={(e) => setCharLimit(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Separator</span>
              <input
                type="text"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 font-medium"
                placeholder="e.g. ---"
              />
            </div>
          )}
        </div>
      </div>
    </CollapsibleSection>
  );
};
