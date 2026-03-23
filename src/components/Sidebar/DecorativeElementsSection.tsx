import React from 'react';
import { Sparkles } from 'lucide-react';
import { CollapsibleSection } from '../CollapsibleSection';
import { CardStyle } from '../../types';
import { DECORATIVE_ELEMENTS } from '../../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DecorativeElementsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  style: CardStyle;
  setStyle: React.Dispatch<React.SetStateAction<CardStyle>>;
}

export const DecorativeElementsSection = ({
  isOpen,
  onToggle,
  style,
  setStyle
}: DecorativeElementsSectionProps) => {
  return (
    <CollapsibleSection
      title="Decorative Elements"
      icon={Sparkles}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Element Controls</span>
          <button
            onClick={() => setStyle(s => ({
              ...s,
              elementIcon: DECORATIVE_ELEMENTS[Math.floor(Math.random() * (DECORATIVE_ELEMENTS.length - 1)) + 1].value,
              elementColor: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
              elementOpacity: parseFloat((Math.random() * 0.3 + 0.05).toFixed(2)),
              elementQuantity: Math.floor(Math.random() * 15) + 5,
              elementSize: Math.floor(Math.random() * 60) + 20,
              elementSeed: Math.floor(Math.random() * 1000),
            }))}
            className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            Feeling Lucky
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Element Type</span>
            <select
              value={style.elementIcon}
              onChange={(e) => {
                const val = e.target.value;
                setStyle(s => ({ 
                  ...s, 
                  elementIcon: val,
                  elementQuantity: val !== 'none' ? 5 : 0
                }));
              }}
              className="w-full p-2 text-xs border border-gray-200 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {DECORATIVE_ELEMENTS.map(e => (
                <option key={e.value} value={e.value}>{e.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Color</span>
              <input
                type="color"
                value={style.elementColor}
                onChange={(e) => setStyle(s => ({ ...s, elementColor: e.target.value }))}
                className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Opacity</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={style.elementOpacity}
                onChange={(e) => setStyle(s => ({ ...s, elementOpacity: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Quantity</span>
              <input
                type="number"
                min="0"
                max="100"
                value={style.elementQuantity}
                onChange={(e) => setStyle(s => ({ ...s, elementQuantity: parseInt(e.target.value) }))}
                className="w-full p-1.5 text-xs border border-gray-200 rounded-lg text-center font-bold bg-gray-50"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Size</span>
              <input
                type="number"
                min="10"
                max="400"
                value={style.elementSize}
                onChange={(e) => setStyle(s => ({ ...s, elementSize: parseInt(e.target.value) }))}
                className="w-full p-1.5 text-xs border border-gray-200 rounded-lg text-center font-bold bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Position Mode</span>
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
              {['random', 'grid', 'border'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setStyle(s => ({ ...s, elementPositionMode: mode as any }))}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all",
                    style.elementPositionMode === mode ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Rotation</span>
              <input
                type="number"
                min="0"
                max="360"
                disabled={style.elementRandomRotation}
                value={style.elementRotation}
                onChange={(e) => setStyle(s => ({ ...s, elementRotation: parseInt(e.target.value) }))}
                className="w-full p-1.5 text-xs border border-gray-200 rounded-lg text-center font-bold bg-gray-50 disabled:opacity-50"
              />
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Random Rot</span>
              <button
                onClick={() => setStyle(s => ({ ...s, elementRandomRotation: !s.elementRandomRotation }))}
                className={cn(
                  "w-full py-1.5 rounded-lg text-[9px] font-bold uppercase border transition-all",
                  style.elementRandomRotation ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-200 text-gray-500"
                )}
              >
                {style.elementRandomRotation ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Blend Mode</span>
            <select
              value={style.elementBlendMode}
              onChange={(e) => setStyle(s => ({ ...s, elementBlendMode: e.target.value }))}
              className="w-full p-2 text-xs border border-gray-200 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {['normal', 'multiply', 'screen', 'overlay', 'soft-light', 'difference'].map(mode => (
                <option key={mode} value={mode}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Layering</span>
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
              {[
                { label: 'Behind Text', value: 'behind' },
                { label: 'In Front', value: 'front' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStyle(s => ({ ...s, elementZIndex: opt.value as any }))}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all",
                    style.elementZIndex === opt.value ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};
