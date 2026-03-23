import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { toPng } from 'html-to-image';
import { cn } from '../utils/cn';
import { DecorativeElements } from './DecorativeElements';
import { Texture } from './texture';
import { CardStyle } from '../types';
import { THEMES, TEXTURES } from '../constants';

interface PreviewAreaProps {
  cards: string[];
  style: CardStyle;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  textareaRefs: React.MutableRefObject<(HTMLTextAreaElement | null)[]>;
  handleCardEdit: (idx: number, newContent: string) => void;
}

export const PreviewArea = ({
  cards,
  style,
  cardRefs,
  textareaRefs,
  handleCardEdit
}: PreviewAreaProps) => {
  return (
    <main className="flex-1 overflow-y-auto p-12 bg-[#f0f2f5] scroll-smooth no-scrollbar">
      <div className="max-w-5xl mx-auto space-y-16">
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 justify-items-center pb-20">
            <AnimatePresence mode="popLayout">
              {cards.map((content, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100, delay: idx * 0.05 }}
                  className="relative group"
                >
                  {/* Card Container with 3:4 Aspect Ratio */}
                  <div
                    ref={(el) => (cardRefs.current[idx] = el)}
                    className="relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:shadow-[0_48px_80px_-12px_rgba(0,0,0,0.2)]"
                    style={{
                      width: '400px',
                      height: '533px', // 3:4 Ratio (400 * 4/3 = 533.33)
                      background: style.gradient || (style.customGradient 
                        ? `linear-gradient(${style.gradientAngle}deg, ${style.backgroundColor} 0%, ${style.gradientColor2} 100%)`
                        : THEMES.find(t => t.name === style.theme)?.gradient || style.backgroundColor),
                      color: style.textColor,
                      borderColor: style.borderColor,
                      borderWidth: `${style.borderWidth}px`,
                      borderRadius: `${style.borderRadius}px`,
                      padding: `${style.padding}px`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'stretch',
                      position: 'relative',
                      borderStyle: 'solid'
                    }}
                  >
                    {/* Decorative Elements */}
                    <DecorativeElements style={style} cardIdx={idx} />

                    {/* Background Texture Overlay */}
                    <Texture style={style} />

                    {/* Title */}
                    {style.title && (
                      <div 
                        className={cn(
                          "text-lg font-bold mb-4",
                          style.fontFamily
                        )}
                        style={{ 
                          textAlign: style.titleAlign,
                          color: style.textColor,
                          zIndex: 10
                        }}
                      >
                        {style.title}
                      </div>
                    )}

                    {/* Inner Frame */}
                    {style.innerFrameWidth > 0 && (
                      <div 
                        className="absolute pointer-events-none"
                        style={{
                          top: `${style.innerFramePadding}px`,
                          left: `${style.innerFramePadding}px`,
                          right: `${style.innerFramePadding}px`,
                          bottom: `${style.innerFramePadding}px`,
                          border: `${style.innerFrameWidth}px solid ${style.innerFrameColor}`,
                          borderRadius: `${Math.max(0, style.borderRadius - style.innerFramePadding)}px`,
                          zIndex: 5
                        }}
                      />
                    )}

                    {/* Draggable Text Container */}
                    <div className="flex-1 flex flex-col justify-center">
                      <motion.div
                        drag
                        dragConstraints={cardRefs.current[idx] ? {
                          top: - (533 / 2) + style.padding,
                          left: - (400 / 2) + style.padding,
                          right: (400 / 2) - style.padding,
                          bottom: (533 / 2) - style.padding
                        } : undefined}
                        dragElastic={0.1}
                        dragMomentum={false}
                        className="cursor-move active:cursor-grabbing w-full flex flex-col items-center justify-center"
                        style={{
                          maxHeight: `calc(533px - ${style.padding * 2}px)`,
                          alignItems: style.textAlign === 'center' ? 'center' : style.textAlign === 'left' ? 'flex-start' : 'flex-end',
                          textAlign: style.textAlign,
                        }}
                      >
                        <textarea
                          ref={(el) => (textareaRefs.current[idx] = el)}
                          value={content}
                          onChange={(e) => handleCardEdit(idx, e.target.value)}
                          className={cn(
                            "w-full bg-transparent border-none focus:ring-0 outline-none resize-none transition-all no-scrollbar break-words",
                            style.fontFamily
                          )}
                          style={{ 
                            fontSize: `${style.fontSize}px`,
                            color: 'inherit',
                            height: 'auto',
                            maxHeight: `calc(533px - ${style.padding * 2}px)`,
                            padding: 0,
                            margin: 0,
                            overflow: 'hidden',
                            display: 'block',
                            letterSpacing: `${style.letterSpacing}px`,
                            lineHeight: style.lineHeight,
                            textShadow: style.textShadow ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                          }}
                          spellCheck={false}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Footer */}
                    {style.footer && (
                      <div 
                        className={cn(
                          "text-sm font-medium mt-4",
                          style.fontFamily
                        )}
                        style={{ 
                          textAlign: style.footerAlign,
                          color: style.textColor,
                          zIndex: 10
                        }}
                      >
                        {style.footer}
                      </div>
                    )}

                    {style.showPageNumber && (
                      <div 
                        className="absolute bottom-10 right-10 text-[10px] font-black opacity-30 tracking-[0.2em] uppercase pointer-events-none"
                        style={{ color: style.textColor }}
                      >
                        {idx + 1} / {cards.length}
                      </div>
                    )}
                  </div>

                  {/* Individual Export Button */}
                  <div className="absolute -top-4 -right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={async () => {
                        const node = cardRefs.current[idx];
                        if (node) {
                          const dataUrl = await toPng(node, { pixelRatio: 3, backgroundColor: style.backgroundColor });
                          const link = document.createElement('a');
                          link.download = `social-card-${idx + 1}.png`;
                          link.href = dataUrl;
                          link.click();
                        }
                      }}
                      className="p-3 bg-white rounded-2xl shadow-xl hover:bg-gray-50 text-indigo-600 transition-all active:scale-90"
                      title="Download this card"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400 space-y-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-10 bg-white rounded-[40px] shadow-2xl shadow-gray-200 border border-gray-100 relative"
            >
              <ImageIcon className="w-20 h-20 text-indigo-100" />
              <div className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 rounded-2xl shadow-lg">
                <RefreshCw className="w-6 h-6 text-white animate-spin-slow" />
              </div>
            </motion.div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">Ready to split?</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Paste your long-form content in the sidebar to generate beautiful social media cards instantly.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
