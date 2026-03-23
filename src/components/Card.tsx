import React, { forwardRef } from 'react';
import { CardStyle } from '../types';
import { DecorativeElements } from './DecorativeElements';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  content: string;
  style: CardStyle;
  index: number;
  isDragging?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ content, style, index, isDragging }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden shadow-2xl transition-all duration-300 group",
        isDragging ? "cursor-grabbing scale-105" : "cursor-grab"
      )}
      style={{
        width: '360px',
        height: '480px',
        backgroundColor: style.backgroundColor,
        backgroundImage: style.gradient,
        border: `${style.borderWidth}px solid ${style.borderColor}`,
        borderRadius: `${style.borderRadius}px`,
        padding: `${style.padding}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: style.textAlign === 'center' ? 'center' : style.textAlign === 'left' ? 'flex-start' : 'flex-end',
        textAlign: style.textAlign,
        color: style.textColor,
        fontFamily: style.fontFamily,
        fontSize: `${style.fontSize}px`,
        letterSpacing: `${style.letterSpacing}px`,
        lineHeight: style.lineHeight,
        textShadow: style.textShadow ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      {/* Decorative Elements - Behind Text */}
      {style.elementZIndex === 'behind' && (
        <DecorativeElements style={style} cardIdx={index} />
      )}

      {/* Inner Border Frame */}
      {style.innerFrameWidth > 0 && (
        <div 
          className="absolute pointer-events-none transition-all duration-300"
          style={{
            top: `${style.innerFramePadding}px`,
            left: `${style.innerFramePadding}px`,
            right: `${style.innerFramePadding}px`,
            bottom: `${style.innerFramePadding}px`,
            border: `${style.innerFrameWidth}px solid ${style.innerFrameColor}`,
            borderRadius: `${Math.max(0, style.borderRadius - style.innerFramePadding)}px`,
            opacity: 0.8
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full font-bold whitespace-pre-wrap break-words">
        {content}
      </div>

      {/* Decorative Elements - In Front */}
      {style.elementZIndex === 'front' && (
        <DecorativeElements style={style} cardIdx={index} />
      )}

      {/* Subtle Overlay for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/5 to-white/5 opacity-50" />
    </div>
  );
});

Card.displayName = 'Card';
