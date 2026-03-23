import React from 'react';
import { Home, Sparkles, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentSection } from './ContentSection';
import { VisualStyleSection } from './VisualStyleSection';
import { BorderSettingsSection } from './BorderSettingsSection';
import { InnerBorderSection } from './InnerBorderSection';
import { DecorativeElementsSection } from './DecorativeElementsSection';
import { FontControlSection } from './FontControlSection';
import { SplitMode, CardStyle } from '../../types';
import { THEMES } from '../../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  showLanding: boolean;
  setShowLanding: (show: boolean) => void;
  openSection: string | null;
  setOpenSection: (section: string | null) => void;
  text: string;
  setText: (text: string) => void;
  splitMode: SplitMode;
  setSplitMode: (mode: SplitMode) => void;
  charLimit: number;
  setCharLimit: (limit: number) => void;
  separator: string;
  setSeparator: (sep: string) => void;
  cardsCount: number;
  style: CardStyle;
  setStyle: React.Dispatch<React.SetStateAction<CardStyle>>;
  applyTheme: (theme: typeof THEMES[0]) => void;
  handleFeelingLucky: () => void;
  handleExportAll: () => void;
}

export const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setShowLanding,
  openSection,
  setOpenSection,
  text,
  setText,
  splitMode,
  setSplitMode,
  charLimit,
  setCharLimit,
  separator,
  setSeparator,
  cardsCount,
  style,
  setStyle,
  applyTheme,
  handleFeelingLucky,
  handleExportAll
}: SidebarProps) => {
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-500 ease-in-out shadow-2xl overflow-hidden flex flex-col",
        isSidebarOpen ? "w-80" : "w-0"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-gray-900 leading-none">SPLITCARDS</h1>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Studio v1.0</p>
          </div>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <button 
          onClick={() => setShowLanding(true)}
          className="w-full flex items-center gap-3 p-3 text-sm font-bold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all group border border-transparent hover:border-indigo-100"
        >
          <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
          Home
        </button>

        <ContentSection
          isOpen={openSection === 'content'}
          onToggle={() => toggleSection('content')}
          text={text}
          setText={setText}
          splitMode={splitMode}
          setSplitMode={setSplitMode}
          charLimit={charLimit}
          setCharLimit={setCharLimit}
          separator={separator}
          setSeparator={setSeparator}
          cardsCount={cardsCount}
        />

        <VisualStyleSection
          isOpen={openSection === 'visual'}
          onToggle={() => toggleSection('visual')}
          style={style}
          setStyle={setStyle}
          applyTheme={applyTheme}
        />

        <BorderSettingsSection
          isOpen={openSection === 'border'}
          onToggle={() => toggleSection('border')}
          style={style}
          setStyle={setStyle}
        />

        <InnerBorderSection
          isOpen={openSection === 'innerBorder'}
          onToggle={() => toggleSection('innerBorder')}
          style={style}
          setStyle={setStyle}
        />

        <DecorativeElementsSection
          isOpen={openSection === 'elements'}
          onToggle={() => toggleSection('elements')}
          style={style}
          setStyle={setStyle}
        />

        <FontControlSection
          isOpen={openSection === 'font'}
          onToggle={() => toggleSection('font')}
          style={style}
          setStyle={setStyle}
        />
      </div>

      {/* Sidebar Footer Actions */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
        <button
          onClick={handleFeelingLucky}
          className="w-full py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 group active:scale-95"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-spin" />
          I'm Feeling Lucky
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleExportAll}
            className="flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
          <button className="flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-all active:scale-95">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
