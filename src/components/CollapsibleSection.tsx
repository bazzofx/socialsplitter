import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../utils/cn';

interface CollapsibleSectionProps {
  title: string;
  icon: any;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badge?: string | number;
}

export const CollapsibleSection = ({ 
  title, 
  icon: Icon, 
  isOpen, 
  onToggle, 
  children,
  badge
}: CollapsibleSectionProps) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-2 lg:py-4 px-4 lg:px-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-1.5 rounded-lg transition-colors",
            isOpen ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
          )}>
            <Icon className="w-4 h-4" />
          </div>
          <span className={cn(
            "text-sm font-bold tracking-tight transition-colors",
            isOpen ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
          )}>
            {title}
          </span>
          {badge !== undefined && (
            <span className="px-1.5 py-0.5 rounded-full bg-yellow-100 text-black text-[10px] font-bold">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-2 lg:space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
