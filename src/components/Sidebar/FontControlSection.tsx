import React from 'react';
import { Type, Sparkles } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';
import { CardStyle } from '../../types';
import { FONTS } from '../../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FontControlSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  style: CardStyle;
  setStyle: React.Dispatch<React.SetStateAction<CardStyle>>;
}

export const FontControlSection = ({
  isOpen,
  onToggle,
  style,
  setStyle
}: FontControlSectionProps) => {
  return (
    <CollapsibleSection
      title="Font Control"
      icon={Type}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Font Family</label>
          <button
            onClick={() => {
              const fonts = FONTS.map(f => f.value);
              const aligns: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
              const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
              const randomSize = Math.floor(Math.random() * 40) + 20;
              const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
              setStyle(s => ({ 
                ...s, 
                fontFamily: randomFont, 
                fontSize: randomSize,
                textColor: randomColor,
                textAlign: aligns[Math.floor(Math.random() * aligns.length)],
                padding: Math.floor(Math.random() * 60) + 20,
                borderWidth: Math.floor(Math.random() * 20),
                letterSpacing: Math.floor(Math.random() * 10) - 2,
                lineHeight: parseFloat((Math.random() * 0.8 + 1).toFixed(1)),
                textShadow: Math.random() > 0.5,
                theme: 'Custom'
              }));
            }}
            className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            Feeling Lucky
          </button>
        </div>
          <div className="grid grid-cols-2 gap-1">
            {FONTS.map(f => (
              <button
                key={f.name}
                onClick={() => setStyle(s => ({ ...s, fontFamily: f.value }))}
                className={cn(
                  "py-1.5 text-[10px] font-bold rounded-lg border transition-all",
                  style.fontFamily === f.value ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-200 text-gray-500 hover:border-gray-300"
                )}
              >
                {f.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Font Size</label>
            <input
              type="number"
              value={style.fontSize}
              onChange={(e) => setStyle(s => ({ ...s, fontSize: parseInt(e.target.value) }))}
              className="w-full p-2 text-xs border border-gray-200 rounded-xl text-center font-bold bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Text Color</label>
            <input
              type="color"
              value={style.textColor}
              onChange={(e) => setStyle(s => ({ ...s, textColor: e.target.value, theme: 'Custom' }))}
              className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Padding</label>
            <input
              type="number"
              value={style.padding}
              onChange={(e) => setStyle(s => ({ ...s, padding: parseInt(e.target.value) }))}
              className="w-full p-2 text-xs border border-gray-200 rounded-xl text-center font-bold bg-gray-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Alignment</label>
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => setStyle(s => ({ ...s, textAlign: align as any }))}
                className={cn(
                  "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all",
                  style.textAlign === align ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {align}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tracking</label>
            <input
              type="range"
              min="-5"
              max="20"
              step="0.5"
              value={style.letterSpacing}
              onChange={(e) => setStyle(s => ({ ...s, letterSpacing: parseFloat(e.target.value) }))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Leading</label>
            <input
              type="range"
              min="0.8"
              max="2"
              step="0.1"
              value={style.lineHeight}
              onChange={(e) => setStyle(s => ({ ...s, lineHeight: parseFloat(e.target.value) }))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-bold text-gray-600">Text Shadow</span>
          <button
            onClick={() => setStyle(s => ({ ...s, textShadow: !s.textShadow }))}
            className={cn(
              "w-10 h-5 rounded-full transition-all relative",
              style.textShadow ? "bg-indigo-600" : "bg-gray-300"
            )}
          >
            <div className={cn(
              "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
              style.textShadow ? "left-6" : "left-1"
            )} />
          </button>
        </div>
      </div>
    </CollapsibleSection>
  );
};
