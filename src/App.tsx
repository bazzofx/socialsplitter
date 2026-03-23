/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { LandingPage } from './components/LandingPage';
import { Sidebar } from './components/Sidebar';
import { PreviewArea } from './components/PreviewArea';
import { CardStyle, SplitMode } from './types';
import { THEMES, FONTS, GRADIENTS, DECORATIVE_ELEMENTS, TEXTURES } from './constants';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [text, setText] = useState('');
  const [splitMode, setSplitMode] = useState<SplitMode>('separator');
  const [charLimit, setCharLimit] = useState(280);
  const [separator, setSeparator] = useState('\\\\');
  const [cards, setCards] = useState<string[]>([]);
  const [style, setStyle] = useState<CardStyle>({
    backgroundColor: '#ffffff',
    textColor: '#171717',
    borderColor: '#e5e5e5',
    borderWidth: 0,
    fontSize: 32,
    fontFamily: 'font-sans',
    textAlign: 'center',
    padding: 40,
    borderRadius: 24,
    showPageNumber: true,
    theme: 'Minimal',
    letterSpacing: 0,
    lineHeight: 1.2,
    textShadow: false,
    gradient: null,
    gradientAngle: 135,
    customGradient: false,
    gradientColor2: '#4f46e5',
    showInnerFrame: false,
    innerFrameColor: '#d4af37',
    innerFrameWidth: 2,
    innerFramePadding: 20,
    title: '',
    titleAlign: 'center',
    footer: '',
    footerAlign: 'center',
    elementIcon: 'none',
    elementColor: '#4f46e5',
    elementOpacity: 0.1,
    elementQuantity: 0,
    elementSize: 40,
    elementSeed: 42,
    elementRotation: 0,
    elementRandomRotation: true,
    elementBlendMode: 'normal',
    elementPositionMode: 'random',
    elementZIndex: 'behind',
    texture: 'none',
    textureOpacity: 0.1,
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    content: true,
    visual: false,
    typography: false,
    elements: false,
    border: false,
    innerBorder: false,
    title: false,
    footer: false,
    export: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  // --- Logic ---

  useEffect(() => {
    textareaRefs.current.forEach(textarea => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [cards, style.fontSize, style.padding]);

  useEffect(() => {
    if (!text) {
      setCards([]);
      return;
    }

    let newCards: string[] = [];
    if (splitMode === 'separator') {
      newCards = text.split(separator).map(s => s.trim()).filter(Boolean);
    } else {
      const words = text.split(/\s+/);
      let currentCard = '';
      
      words.forEach(word => {
        if ((currentCard + ' ' + word).length <= charLimit) {
          currentCard += (currentCard ? ' ' : '') + word;
        } else {
          if (currentCard) newCards.push(currentCard);
          currentCard = word;
        }
      });
      if (currentCard) newCards.push(currentCard);
    }
    setCards(newCards);
  }, [text, splitMode, charLimit, separator]);

  const handleCardEdit = (idx: number, newContent: string) => {
    const updatedCards = [...cards];
    updatedCards[idx] = newContent;
    setCards(updatedCards);
  };

  const handleExportAll = async () => {
    for (let i = 0; i < cards.length; i++) {
      const node = cardRefs.current[i];
      if (node) {
        try {
          const dataUrl = await toPng(node, { 
            quality: 1, 
            pixelRatio: 3,
            backgroundColor: style.backgroundColor 
          });
          const link = document.createElement('a');
          link.download = `social-card-${i + 1}.png`;
          link.href = dataUrl;
          link.click();
        } catch (err) {
          console.error('Export failed', err);
        }
      }
    }
  };

  const applyTheme = (theme: typeof THEMES[0]) => {
    setStyle(prev => ({
      ...prev,
      backgroundColor: theme.bg,
      textColor: theme.text,
      borderColor: theme.border,
      theme: theme.name,
      customGradient: !!theme.gradient,
      gradient: null
    }));
  };

  const handleFeelingLucky = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const fonts = FONTS.map(f => f.value);
    const aligns: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
    const elements = DECORATIVE_ELEMENTS.filter(e => e.value !== 'none').map(e => e.value);
    const textures = TEXTURES.map(t => t.value);
    
    const newStyle: CardStyle = {
      ...style,
      backgroundColor: randomColor(),
      textColor: randomColor(),
      borderColor: randomColor(),
      borderWidth: Math.floor(Math.random() * 20),
      fontSize: Math.floor(Math.random() * 40) + 20,
      fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
      textAlign: aligns[Math.floor(Math.random() * aligns.length)],
      padding: Math.floor(Math.random() * 60) + 20,
      borderRadius: Math.floor(Math.random() * 50),
      letterSpacing: Math.floor(Math.random() * 10) - 2,
      lineHeight: parseFloat((Math.random() * 0.8 + 1).toFixed(1)),
      gradient: Math.random() > 0.7 ? GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)].value : null,
      gradientAngle: Math.floor(Math.random() * 360),
      customGradient: Math.random() > 0.5,
      gradientColor2: randomColor(),
      showInnerFrame: Math.random() > 0.7,
      innerFrameColor: randomColor(),
      innerFrameWidth: Math.floor(Math.random() * 10) + 1,
      innerFramePadding: Math.floor(Math.random() * 40) + 10,
      theme: 'Custom',
      elementIcon: Math.random() > 0.3 ? elements[Math.floor(Math.random() * elements.length)] : 'none',
      elementColor: randomColor(),
      elementOpacity: parseFloat((Math.random() * 0.3 + 0.05).toFixed(2)),
      elementQuantity: Math.floor(Math.random() * 15),
      elementSize: Math.floor(Math.random() * 100) + 20,
      elementSeed: Math.floor(Math.random() * 1000),
      texture: Math.random() > 0.5 ? textures[Math.floor(Math.random() * textures.length)] : 'none',
      textureOpacity: parseFloat((Math.random() * 0.2 + 0.05).toFixed(2)),
    };
    setStyle(newStyle);

    // Sequential refresh: increase font size by 1px after randomization is done
    setTimeout(() => {
      setStyle(prev => ({
        ...prev,
        fontSize: prev.fontSize + 1
      }));
    }, 50);
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans overflow-hidden">
      <Sidebar 
        setShowLanding={setShowLanding}
        text={text}
        setText={setText}
        splitMode={splitMode}
        setSplitMode={setSplitMode}
        charLimit={charLimit}
        setCharLimit={setCharLimit}
        separator={separator}
        setSeparator={setSeparator}
        cards={cards}
        style={style}
        setStyle={setStyle}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        handleFeelingLucky={handleFeelingLucky}
        handleExportAll={handleExportAll}
        applyTheme={applyTheme}
      />

      <PreviewArea 
        cards={cards}
        style={style}
        cardRefs={cardRefs}
        textareaRefs={textareaRefs}
        handleCardEdit={handleCardEdit}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        textarea::-webkit-scrollbar,
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
