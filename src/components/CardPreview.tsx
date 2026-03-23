import React from 'react';
import { Download, Scissors, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { CardStyle } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardPreviewProps {
  cards: string[];
  style: CardStyle;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  handleExportCard: (index: number) => void;
}

export const CardPreview = ({
  cards,
  style,
  isSidebarOpen,
  setIsSidebarOpen,
  handleExportCard
}: CardPreviewProps) => {
  return (
    <div className={cn(
      "flex-1 min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-8 relative overflow-hidden transition-all duration-500 ease-in-out",
      isSidebarOpen ? "pl-80" : "pl-0"
    )}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-200 rounded-full blur-3xl" />
      </div>

      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-6 top-6 p-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl shadow-xl hover:bg-indigo-600 hover:text-white transition-all z-40 group active:scale-95"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      {/* Main Preview Area */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {cards.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center"
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-white border-2 border-gray-100 rounded-xl flex items-center justify-center font-black text-gray-900 shadow-lg z-20 group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  
                  <div id={`card-${index}`}>
                    <Card content={card} style={style} index={index} />
                  </div>

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-bottom-4 z-20 flex gap-2">
                    <button 
                      onClick={() => handleExportCard(index)}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      Export PNG
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8 py-20"
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-white border-4 border-dashed border-gray-200 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
                  <Scissors className="w-12 h-12 text-gray-300" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Ready to split?</h2>
                <p className="text-gray-500 font-medium max-w-xs mx-auto text-lg leading-relaxed">
                  Enter some text in the sidebar to start generating your beautiful cards.
                </p>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
              >
                Open Editor
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
