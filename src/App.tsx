/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Type, 
  Scissors, 
  Download, 
  Palette, 
  Settings2, 
  Layout, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  CheckCircle,
  ArrowRight,
  Share2,
  RefreshCw,
  Image as ImageIcon,
  MoreHorizontal,
  HelpCircle,
  Sparkles,
  Circle,
  Square,
  Frame,
  Heart,
  Triangle,
  Waves,
  Star,
  Zap,
  Moon,
  Sun,
  Cloud,
  Ghost,
  Coffee,
  Music,
  Trophy,
  Target,
  Flame,
  Leaf,
  Wind,
  Snowflake,
  Hexagon,
  Octagon,
  Diamond,
  Anchor,
  Award,
  Bell,
  Bird,
  Bomb,
  Bot,
  Bug,
  Cake,
  Camera,
  Cat,
  Cherry,
  Citrus,
  Coins,
  Cookie,
  Crown,
  Dog,
  Droplet,
  Dumbbell,
  Eye,
  Feather,
  Fish,
  Flag,
  Flower,
  Flower2,
  Gamepad2,
  Gem,
  Gift,
  GlassWater,
  Globe,
  GraduationCap,
  Hammer,
  HandMetal,
  HardHat,
  Headphones,
  History,
  Home,
  IceCream,
  Infinity,
  Key,
  Lamp,
  Languages,
  Laptop,
  Library,
  LifeBuoy,
  Lightbulb,
  Magnet,
  Mail,
  Map,
  MapPin,
  Martini,
  Medal,
  Megaphone,
  Mic,
  Microscope,
  Mountain,
  Mouse,
  Navigation,
  Network,
  Newspaper,
  Package,
  PaintBucket,
  Paintbrush,
  Palmtree,
  Paperclip,
  PartyPopper,
  Pencil,
  Phone,
  PieChart,
  PiggyBank,
  Pill,
  Pizza,
  Plane,
  Play,
  Plug,
  Pocket,
  Podcast,
  Power,
  Printer,
  Puzzle,
  QrCode,
  Quote,
  Radiation,
  Radio,
  Rat,
  Receipt,
  Recycle,
  Rocket,
  Rss,
  Ruler,
  Sailboat,
  Save,
  Scale,
  Scan,
  Scroll,
  Search,
  Send,
  Server,
  Settings,
  Shield,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Shovel,
  Shuffle,
  Sidebar,
  Sigma,
  Signal,
  Siren,
  Skull,
  Slack,
  Slash,
  Slice,
  Sliders,
  Smartphone,
  Smile,
  Sofa,
  Soup,
  Speaker,
  Sprout,
  Stamp,
  Stethoscope,
  Sticker,
  StickyNote,
  Sunrise,
  Sunset,
  Sword,
  Swords,
  Syringe,
  Table,
  Tablet,
  Tag,
  Tent,
  Terminal,
  Thermometer,
  ThumbsDown,
  ThumbsUp,
  Ticket,
  Timer,
  Tornado,
  ToyBrick,
  Train,
  Trash2,
  TreePine,
  Trees,
  Truck,
  Tv,
  Twitch,
  Twitter,
  Umbrella,
  User,
  Users,
  Utensils,
  Variable,
  Video,
  Volume2,
  Wallet,
  Wand2,
  Watch,
  Webcam,
  Webhook,
  Weight,
  Wheat,
  Wifi,
  Wine,
  Workflow,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type SplitMode = 'character' | 'separator';

interface CardStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  fontSize: number;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  padding: number;
  borderRadius: number;
  showPageNumber: boolean;
  theme: string;
  letterSpacing: number;
  lineHeight: number;
  textShadow: boolean;
  gradient: string | null;
  gradientAngle: number;
  customGradient: boolean;
  gradientColor2: string;
  showInnerFrame: boolean;
  innerFrameColor: string;
  innerFrameWidth: number;
  innerFramePadding: number;
  title: string;
  titleAlign: 'left' | 'center' | 'right';
  footer: string;
  footerAlign: 'left' | 'center' | 'right';
  elementIcon: string;
  elementColor: string;
  elementOpacity: number;
  elementQuantity: number;
  elementSize: number;
  elementSeed: number;
  elementRotation: number;
  elementRandomRotation: boolean;
  elementBlendMode: string;
  elementPositionMode: 'random' | 'grid' | 'border';
  elementZIndex: 'behind' | 'front';
}

const DECORATIVE_ELEMENTS = [
  { name: 'None', value: 'none' },
  { name: 'Stars', value: 'Star' },
  { name: 'Sparkles', value: 'Sparkles' },
  { name: 'Circles', value: 'Circle' },
  { name: 'Squares', value: 'Square' },
  { name: 'Hearts', value: 'Heart' },
  { name: 'Triangles', value: 'Triangle' },
  { name: 'Hexagons', value: 'Hexagon' },
  { name: 'Octagons', value: 'Octagon' },
  { name: 'Diamonds', value: 'Diamond' },
  { name: 'Waves', value: 'Waves' },
  { name: 'Bolts', value: 'Zap' },
  { name: 'Moon', value: 'Moon' },
  { name: 'Sun', value: 'Sun' },
  { name: 'Cloud', value: 'Cloud' },
  { name: 'Ghost', value: 'Ghost' },
  { name: 'Coffee', value: 'Coffee' },
  { name: 'Music', value: 'Music' },
  { name: 'Trophy', value: 'Trophy' },
  { name: 'Target', value: 'Target' },
  { name: 'Flame', value: 'Flame' },
  { name: 'Leaf', value: 'Leaf' },
  { name: 'Wind', value: 'Wind' },
  { name: 'Snowflake', value: 'Snowflake' },
  { name: 'Anchor', value: 'Anchor' },
  { name: 'Award', value: 'Award' },
  { name: 'Bell', value: 'Bell' },
  { name: 'Bird', value: 'Bird' },
  { name: 'Bomb', value: 'Bomb' },
  { name: 'Bot', value: 'Bot' },
  { name: 'Bug', value: 'Bug' },
  { name: 'Cake', value: 'Cake' },
  { name: 'Camera', value: 'Camera' },
  { name: 'Cat', value: 'Cat' },
  { name: 'Cherry', value: 'Cherry' },
  { name: 'Citrus', value: 'Citrus' },
  { name: 'Coins', value: 'Coins' },
  { name: 'Cookie', value: 'Cookie' },
  { name: 'Crown', value: 'Crown' },
  { name: 'Dog', value: 'Dog' },
  { name: 'Droplet', value: 'Droplet' },
  { name: 'Dumbbell', value: 'Dumbbell' },
  { name: 'Eye', value: 'Eye' },
  { name: 'Feather', value: 'Feather' },
  { name: 'Fish', value: 'Fish' },
  { name: 'Flag', value: 'Flag' },
  { name: 'Flower', value: 'Flower' },
  { name: 'Gamepad', value: 'Gamepad2' },
  { name: 'Gem', value: 'Gem' },
  { name: 'Gift', value: 'Gift' },
  { name: 'Graduation', value: 'GraduationCap' },
  { name: 'Hammer', value: 'Hammer' },
  { name: 'Metal', value: 'HandMetal' },
  { name: 'Headphones', value: 'Headphones' },
  { name: 'Ice Cream', value: 'IceCream' },
  { name: 'Infinity', value: 'Infinity' },
  { name: 'Key', value: 'Key' },
  { name: 'Lamp', value: 'Lamp' },
  { name: 'Library', value: 'Library' },
  { name: 'Life Buoy', value: 'LifeBuoy' },
  { name: 'Lightbulb', value: 'Lightbulb' },
  { name: 'Magnet', value: 'Magnet' },
  { name: 'Map', value: 'Map' },
  { name: 'Martini', value: 'Martini' },
  { name: 'Medal', value: 'Medal' },
  { name: 'Megaphone', value: 'Megaphone' },
  { name: 'Mic', value: 'Mic' },
  { name: 'Mountain', value: 'Mountain' },
  { name: 'Mouse', value: 'Mouse' },
  { name: 'Navigation', value: 'Navigation' },
  { name: 'Package', value: 'Package' },
  { name: 'Paint Bucket', value: 'PaintBucket' },
  { name: 'Paintbrush', value: 'Paintbrush' },
  { name: 'Palm Tree', value: 'Palmtree' },
  { name: 'Paperclip', value: 'Paperclip' },
  { name: 'Party Popper', value: 'PartyPopper' },
  { name: 'Piggy Bank', value: 'PiggyBank' },
  { name: 'Pizza', value: 'Pizza' },
  { name: 'Plane', value: 'Plane' },
  { name: 'Puzzle', value: 'Puzzle' },
  { name: 'Rocket', value: 'Rocket' },
  { name: 'Sailboat', value: 'Sailboat' },
  { name: 'Skull', value: 'Skull' },
  { name: 'Smile', value: 'Smile' },
  { name: 'Sprout', value: 'Sprout' },
  { name: 'Sticker', value: 'Sticker' },
  { name: 'Sword', value: 'Sword' },
  { name: 'Tent', value: 'Tent' },
  { name: 'Tornado', value: 'Tornado' },
  { name: 'Toy Brick', value: 'ToyBrick' },
  { name: 'Truck', value: 'Truck' },
  { name: 'Umbrella', value: 'Umbrella' },
  { name: 'Wand', value: 'Wand2' },
  { name: 'Wine', value: 'Wine' },
  { name: 'Globe', value: 'Globe' },
  { name: 'Laptop', value: 'Laptop' },
  { name: 'Microscope', value: 'Microscope' },
  { name: 'Newspaper', value: 'Newspaper' },
  { name: 'Pencil', value: 'Pencil' },
  { name: 'Phone', value: 'Phone' },
  { name: 'Pie Chart', value: 'PieChart' },
  { name: 'Pill', value: 'Pill' },
  { name: 'Play', value: 'Play' },
  { name: 'Plug', value: 'Plug' },
  { name: 'Pocket', value: 'Pocket' },
  { name: 'Podcast', value: 'Podcast' },
  { name: 'Power', value: 'Power' },
  { name: 'Printer', value: 'Printer' },
  { name: 'Qr Code', value: 'QrCode' },
  { name: 'Quote', value: 'Quote' },
  { name: 'Radiation', value: 'Radiation' },
  { name: 'Radio', value: 'Radio' },
  { name: 'Rat', value: 'Rat' },
  { name: 'Receipt', value: 'Receipt' },
  { name: 'Recycle', value: 'Recycle' },
  { name: 'Rss', value: 'Rss' },
  { name: 'Ruler', value: 'Ruler' },
  { name: 'Save', value: 'Save' },
  { name: 'Scale', value: 'Scale' },
  { name: 'Scan', value: 'Scan' },
  { name: 'Scissors', value: 'Scissors' },
  { name: 'Scroll', value: 'Scroll' },
  { name: 'Search', value: 'Search' },
  { name: 'Send', value: 'Send' },
  { name: 'Server', value: 'Server' },
  { name: 'Settings', value: 'Settings' },
  { name: 'Shield', value: 'Shield' },
  { name: 'Shirt', value: 'Shirt' },
  { name: 'Shopping Bag', value: 'ShoppingBag' },
  { name: 'Shopping Cart', value: 'ShoppingCart' },
  { name: 'Shovel', value: 'Shovel' },
  { name: 'Shuffle', value: 'Shuffle' },
  { name: 'Sidebar', value: 'Sidebar' },
  { name: 'Sigma', value: 'Sigma' },
  { name: 'Signal', value: 'Signal' },
  { name: 'Siren', value: 'Siren' },
  { name: 'Slack', value: 'Slack' },
  { name: 'Slash', value: 'Slash' },
  { name: 'Slice', value: 'Slice' },
  { name: 'Sliders', value: 'Sliders' },
  { name: 'Smartphone', value: 'Smartphone' },
  { name: 'Sofa', value: 'Sofa' },
  { name: 'Soup', value: 'Soup' },
  { name: 'Speaker', value: 'Speaker' },
  { name: 'Stamp', value: 'Stamp' },
  { name: 'Stethoscope', value: 'Stethoscope' },
  { name: 'Sticky Note', value: 'StickyNote' },
  { name: 'Sunrise', value: 'Sunrise' },
  { name: 'Sunset', value: 'Sunset' },
  { name: 'Swords', value: 'Swords' },
  { name: 'Syringe', value: 'Syringe' },
  { name: 'Table', value: 'Table' },
  { name: 'Tablet', value: 'Tablet' },
  { name: 'Tag', value: 'Tag' },
  { name: 'Terminal', value: 'Terminal' },
  { name: 'Thermometer', value: 'Thermometer' },
  { name: 'Thumbs Down', value: 'ThumbsDown' },
  { name: 'Thumbs Up', value: 'ThumbsUp' },
  { name: 'Ticket', value: 'Ticket' },
  { name: 'Timer', value: 'Timer' },
  { name: 'Train', value: 'Train' },
  { name: 'Trash', value: 'Trash2' },
  { name: 'Tree Pine', value: 'TreePine' },
  { name: 'Trees', value: 'Trees' },
  { name: 'Tv', value: 'Tv' },
  { name: 'Twitch', value: 'Twitch' },
  { name: 'Twitter', value: 'Twitter' },
  { name: 'User', value: 'User' },
  { name: 'Users', value: 'Users' },
  { name: 'Utensils', value: 'Utensils' },
  { name: 'Variable', value: 'Variable' },
  { name: 'Video', value: 'Video' },
  { name: 'Volume', value: 'Volume2' },
  { name: 'Wallet', value: 'Wallet' },
  { name: 'Watch', value: 'Watch' },
  { name: 'Webcam', value: 'Webcam' },
  { name: 'Webhook', value: 'Webhook' },
  { name: 'Weight', value: 'Weight' },
  { name: 'Wheat', value: 'Wheat' },
  { name: 'Wifi', value: 'Wifi' },
  { name: 'Workflow', value: 'Workflow' },
  { name: 'Youtube', value: 'Youtube' },
  { name: 'Infinity', value: 'Infinity' },
  { name: 'Languages', value: 'Languages' },
  { name: 'Life Buoy', value: 'LifeBuoy' },
  { name: 'Lightbulb', value: 'Lightbulb' },
  { name: 'Magnet', value: 'Magnet' },
  { name: 'Mail', value: 'Mail' },
  { name: 'Martini', value: 'Martini' },
  { name: 'Medal', value: 'Medal' },
  { name: 'Megaphone', value: 'Megaphone' },
  { name: 'Mic', value: 'Mic' },
  { name: 'Mountain', value: 'Mountain' },
  { name: 'Mouse', value: 'Mouse' },
  { name: 'Navigation', value: 'Navigation' },
  { name: 'Package', value: 'Package' },
  { name: 'Paint Bucket', value: 'PaintBucket' },
  { name: 'Paintbrush', value: 'Paintbrush' },
  { name: 'Palm Tree', value: 'Palmtree' },
  { name: 'Paperclip', value: 'Paperclip' },
  { name: 'Party Popper', value: 'PartyPopper' },
  { name: 'Piggy Bank', value: 'PiggyBank' },
  { name: 'Pizza', value: 'Pizza' },
  { name: 'Plane', value: 'Plane' },
  { name: 'Puzzle', value: 'Puzzle' },
  { name: 'Rocket', value: 'Rocket' },
  { name: 'Sailboat', value: 'Sailboat' },
  { name: 'Skull', value: 'Skull' },
  { name: 'Smile', value: 'Smile' },
  { name: 'Sprout', value: 'Sprout' },
  { name: 'Sticker', value: 'Sticker' },
  { name: 'Sword', value: 'Sword' },
  { name: 'Tent', value: 'Tent' },
  { name: 'Tornado', value: 'Tornado' },
  { name: 'Toy Brick', value: 'ToyBrick' },
  { name: 'Truck', value: 'Truck' },
  { name: 'Umbrella', value: 'Umbrella' },
  { name: 'Wand', value: 'Wand2' },
  { name: 'Wine', value: 'Wine' },
];

const DecorativeElements = ({ style, cardIdx }: { style: CardStyle, cardIdx: number }) => {
  if (style.elementIcon === 'none' || style.elementQuantity === 0) return null;

  const elements = [];
  const seed = style.elementSeed + cardIdx;
  
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const icons: Record<string, any> = {
    Type, Scissors, Download, Palette, Settings2, Layout, ChevronRight, ChevronLeft,
    ChevronDown, ChevronUp, Copy, Check, RefreshCw, ImageIcon, MoreHorizontal, HelpCircle,
    Sparkles, Circle, Square, Heart, Triangle, Waves, Star, Zap, Moon, Sun, Cloud, Ghost,
    Coffee, Music, Trophy, Target, Flame, Leaf, Wind, Snowflake, Hexagon, Octagon,
    Diamond, Anchor, Award, Bell, Bird, Bomb, Bot, Bug, Cake, Camera, Cat, Cherry,
    Citrus, Coins, Cookie, Crown, Dog, Droplet, Dumbbell, Eye, Feather, Fish, Flag,
    Flower, Flower2, Gamepad2, Gem, Gift, GlassWater, Globe, GraduationCap, Hammer,
    HandMetal, HardHat, Headphones, History, Home, IceCream, Infinity, Key, Lamp,
    Languages, Laptop, Library, LifeBuoy, Lightbulb, Magnet, Mail, Map, MapPin, Martini,
    Medal, Megaphone, Mic, Microscope, Mountain, Mouse, Navigation, Network, Newspaper,
    Package, PaintBucket, Paintbrush, Palmtree, Paperclip, PartyPopper, Pencil, Phone,
    PieChart, PiggyBank, Pill, Pizza, Plane, Play, Plug, Pocket, Podcast, Power, Printer,
    Puzzle, QrCode, Quote, Radiation, Radio, Rat, Receipt, Recycle, Rocket, Rss, Ruler,
    Sailboat, Save, Scale, Scan, Scroll, Search, Send, Server, Settings, Shield, Shirt,
    ShoppingBag, ShoppingCart, Shovel, Shuffle, Sidebar, Sigma, Signal, Siren, Skull,
    Slack, Slash, Slice, Sliders, Smartphone, Smile, Sofa, Soup, Speaker, Sprout, Stamp,
    Stethoscope, Sticker, StickyNote, Sunrise, Sunset, Sword, Swords, Syringe, Table,
    Tablet, Tag, Tent, Terminal, Thermometer, ThumbsDown, ThumbsUp, Ticket, Timer,
    Tornado, ToyBrick, Train, Trash2, TreePine, Trees, Truck, Tv, Twitch, Twitter,
    Umbrella, User, Users, Utensils, Variable, Video, Volume2, Wallet, Wand2, Watch,
    Webcam, Webhook, Weight, Wheat, Wifi, Wine, Workflow, Youtube
  };
  
  const IconComponent = icons[style.elementIcon];
  if (!IconComponent) return null;

  const getPosition = (i: number) => {
    if (style.elementPositionMode === 'grid') {
      const cols = Math.ceil(Math.sqrt(style.elementQuantity));
      const rows = Math.ceil(style.elementQuantity / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        x: (col + 0.5) * (100 / cols),
        y: (row + 0.5) * (100 / rows)
      };
    }
    if (style.elementPositionMode === 'border') {
      const side = i % 4;
      const pos = random(seed + i) * 100;
      switch(side) {
        case 0: return { x: pos, y: 0 }; // Top
        case 1: return { x: 100, y: pos }; // Right
        case 2: return { x: pos, y: 100 }; // Bottom
        default: return { x: 0, y: pos }; // Left
      }
    }
    // Default: random
    return {
      x: random(seed + i * 1.1) * 100,
      y: random(seed + i * 2.2) * 100
    };
  };

  for (let i = 0; i < style.elementQuantity; i++) {
    const { x, y } = getPosition(i);
    const rotation = style.elementRandomRotation 
      ? random(seed + i * 3.3) * 360 
      : style.elementRotation;
    const scale = 0.5 + random(seed + i * 4.4) * 1;

    elements.push(
      <div
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
          opacity: style.elementOpacity,
          color: style.elementColor,
          mixBlendMode: style.elementBlendMode as any,
          zIndex: style.elementZIndex === 'behind' ? 1 : 20
        }}
      >
        <IconComponent size={style.elementSize} />
      </div>
    );
  }

  return <>{elements}</>;
};

const CollapsibleSection = ({ 
  title, 
  icon: Icon, 
  isOpen, 
  onToggle, 
  children,
  badge
}: { 
  title: string, 
  icon: any, 
  isOpen: boolean, 
  onToggle: () => void, 
  children: React.ReactNode,
  badge?: string | number
}) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 px-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-1.5 rounded-lg transition-colors",
            isOpen ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
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
            <span className="px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold">
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
            <div className="px-6 pb-6 space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FONTS = [
  { name: 'Sans', value: 'font-sans' },
  { name: 'Serif', value: 'font-serif' },
  { name: 'Mono', value: 'font-mono' },
  { name: 'Display', value: 'font-sans font-black uppercase italic' },
];

const THEMES = [
  { name: 'Minimal', bg: '#ffffff', text: '#171717', border: '#e5e5e5', gradient: null },
  { name: 'Dark Mode', bg: '#171717', text: '#ffffff', border: '#262626', gradient: null },
  { name: 'Royal', bg: '#1e1b4b', text: '#e0e7ff', border: '#312e81', gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' },
  { name: 'Forest', bg: '#064e3b', text: '#ecfdf5', border: '#065f46', gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' },
  { name: 'Sunset', bg: '#7c2d12', text: '#fff7ed', border: '#9a3412', gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)' },
  { name: 'Lavender', bg: '#4c1d95', text: '#f5f3ff', border: '#5b21b6', gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)' },
  { name: 'Ocean', bg: '#0c4a6e', text: '#f0f9ff', border: '#075985', gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)' },
  { name: 'Crimson', bg: '#ef4444', text: '#ffffff', border: '#dc2626', gradient: null },
  { name: 'Gold', bg: '#d4af37', text: '#ffffff', border: '#b8860b', gradient: null },
  { name: 'Titan', bg: '#8e8e93', text: '#ffffff', border: '#636366', gradient: null },
  { name: 'Blush', bg: '#f4c2c2', text: '#171717', border: '#e5b0b0', gradient: null },
  { name: 'Sky Blue', bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd', gradient: null },
];

const GRADIENTS = [
  { name: 'Indigo', value: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
  { name: 'Rose', value: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)' },
  { name: 'Emerald', value: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' },
  { name: 'Amber', value: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
  { name: 'Sky', value: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)' },
  { name: 'Violet', value: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' },
  { name: 'Fuchsia', value: 'linear-gradient(135deg, #d946ef 0%, #e879f9 100%)' },
  { name: 'Slate', value: 'linear-gradient(135deg, #475569 0%, #64748b 100%)' },
];

// --- Components ---

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] font-sans overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative px-6 py-12 lg:py-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Social Splitter V1</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic">
            Split. <br />
            Style. <br />
            <span className="text-indigo-600">Share.</span>
          </h1>
          
          <p className="text-lg text-gray-500 max-w-md font-medium leading-relaxed">
            Transform your long-form thoughts into perfectly sized 3:4 social media cards. Designed for creators who value aesthetics and clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onStart}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#171717] text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 px-6 text-gray-400 font-bold text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span>Join 2,000+ creators</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50" />
          
          <div className="relative grid grid-cols-2 gap-4 rotate-3 scale-110">
            <div className="space-y-4 translate-y-8">
              <div className="aspect-[3/4] bg-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center p-6 text-white text-center italic font-black text-xl">
                "The best way to predict the future is to create it."
              </div>
              <div className="aspect-[3/4] bg-white border-2 border-gray-100 rounded-2xl shadow-xl flex items-center justify-center p-6 text-gray-900 text-center font-serif italic text-lg">
                Minimalism is not a lack of something. It's simply the perfect amount of something.
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-[#171717] rounded-2xl shadow-2xl flex items-center justify-center p-6 text-white text-center font-mono text-sm">
                01 // THE PROCESS IS THE PRODUCT.
              </div>
              <div className="aspect-[3/4] bg-rose-500 rounded-2xl shadow-xl flex items-center justify-center p-6 text-white text-center font-black uppercase text-2xl leading-none">
                BOLD <br /> MOVES <br /> ONLY
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black uppercase italic tracking-tight">Powerful Features</h2>
            <p className="text-gray-500 font-medium">Everything you need to create viral social content in seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Scissors className="w-8 h-8 text-indigo-600" />,
                title: "Smart Splitting",
                desc: "Automatically split long text by character limit or use custom separators for perfect control."
              },
              {
                icon: <Palette className="w-8 h-8 text-rose-500" />,
                title: "Visual Themes",
                desc: "Choose from curated themes or build your own with custom gradients, fonts, and borders."
              },
              {
                icon: <Download className="w-8 h-8 text-emerald-500" />,
                title: "Instant Export",
                desc: "Export all your cards as high-quality PNGs ready for Instagram, Twitter, or LinkedIn."
              },
              {
                icon: <Sparkles className="w-8 h-8 text-amber-500" />,
                title: "Decorative Elements",
                desc: "Add icons, patterns, and shapes to give your cards a unique, professional touch."
              },
              {
                icon: <Type className="w-8 h-8 text-violet-500" />,
                title: "Typography Control",
                desc: "Fine-tune every aspect of your text: size, tracking, leading, and alignment."
              },
              {
                icon: <Share2 className="w-8 h-8 text-sky-500" />,
                title: "Social Ready",
                desc: "Cards are perfectly sized at 3:4 ratio, optimized for the best engagement on mobile."
              }
            ].map((feature, i) => (
              <div key={i} className="space-y-4 group">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl font-black uppercase italic tracking-tight leading-none">
                How it <br /> <span className="text-indigo-600">works.</span>
              </h2>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Paste your content", desc: "Drop your long-form text into the editor. It can be a blog post, a thread, or just a random thought." },
                  { step: "02", title: "Choose your split", desc: "Decide how you want to break it up. Use our smart character limit or add your own separators." },
                  { step: "03", title: "Style your cards", desc: "Apply themes, change fonts, add gradients, and decorative elements until it looks perfect." },
                  { step: "04", title: "Download & Share", desc: "Hit export and get a zip file with all your cards. Post them and watch the engagement grow." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-3xl font-black text-indigo-100 italic">{item.step}</span>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold">{item.title}</h4>
                      <p className="text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">SS</div>
                  <div>
                    <div className="font-bold">Social Splitter Editor</div>
                    <div className="text-xs text-gray-400 font-medium">v1.0.0 • Active Session</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-full w-full" />
                  <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-32 bg-indigo-50 rounded-2xl border-2 border-indigo-100 border-dashed" />
                    <div className="h-32 bg-rose-50 rounded-2xl border-2 border-rose-100 border-dashed" />
                  </div>
                </div>
                <button 
                  onClick={onStart}
                  className="w-full py-4 bg-[#171717] text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  Enter Editor
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-400 text-sm font-bold uppercase tracking-widest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Social Splitter V1</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
          </div>
          <div>© 2026 All Rights Reserved</div>
        </div>
      </footer>
    </div>
  );
};

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
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-200 bg-white flex flex-col overflow-y-auto shrink-0">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-100">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Social Splitter</h1>
            </div>
            <button 
              onClick={() => setShowLanding(true)}
              className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              title="Return to Home"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Content Creator Tool</p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Quick Guide */}
          <div className="p-6 pb-0">
            <section className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                Quick Guide
              </div>
              <p className="text-[11px] text-indigo-600 leading-relaxed">
                1. Paste your text in the box.<br />
                2. Use <code className="bg-indigo-100 px-1 rounded font-bold">\\</code> to manually split into new cards.<br />
                3. Customize the style and download!
              </p>
            </section>
          </div>

          <div className="py-2">
            {/* Content & Strategy */}
            <CollapsibleSection
              title="Content & Strategy"
              icon={Type}
              isOpen={expandedSections.content}
              onToggle={() => toggleSection('content')}
              badge={cards.length}
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

            <div className="px-6 py-2">
              <button
                onClick={handleFeelingLucky}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-indigo-100 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Feeling Lucky
              </button>
            </div>

            {/* Visual Style */}
            <CollapsibleSection
              title="Visual Style"
              icon={Palette}
              isOpen={expandedSections.visual}
              onToggle={() => toggleSection('visual')}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Themes</label>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => applyTheme(t)}
                      className={cn(
                        "h-10 rounded-xl border transition-all flex items-center justify-center text-[10px] font-bold uppercase tracking-tight",
                        style.theme === t.name ? "ring-2 ring-indigo-500 border-transparent" : "border-gray-200 hover:border-gray-300"
                      )}
                      style={{ 
                        background: t.gradient || t.bg, 
                        color: t.text,
                        boxShadow: style.theme === t.name ? '0 4px 12px rgba(79, 70, 229, 0.2)' : 'none'
                      }}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Background Gradient</label>
                  <div className="grid grid-cols-4 gap-2">
                    {GRADIENTS.map((g) => (
                      <button
                        key={g.name}
                        onClick={() => setStyle(s => ({ ...s, gradient: g.value }))}
                        className={cn(
                          "h-8 rounded-lg transition-all border-2",
                          style.gradient === g.value ? "border-indigo-500 scale-110 shadow-md" : "border-transparent hover:scale-105"
                        )}
                        style={{ background: g.value }}
                        title={g.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Border Settings */}
            <CollapsibleSection
              title="Border Settings"
              icon={Square}
              isOpen={expandedSections.border}
              onToggle={() => toggleSection('border')}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Border Width</label>
                    <input
                      type="number"
                      value={style.borderWidth}
                      onChange={(e) => setStyle(s => ({ ...s, borderWidth: parseInt(e.target.value) }))}
                      className="w-full p-2 text-xs border border-gray-200 rounded-xl text-center font-bold bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Border Color</label>
                    <input
                      type="color"
                      value={style.borderColor}
                      onChange={(e) => setStyle(s => ({ ...s, borderColor: e.target.value, theme: 'Custom' }))}
                      className="w-full h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Corner Radius</label>
                  <div className="flex p-1 bg-gray-100 rounded-lg">
                    {[
                      { label: 'none', value: 0 },
                      { label: 'md', value: 12 },
                      { label: 'xl', value: 24 },
                      { label: '3xl', value: 48 }
                    ].map((r) => (
                      <button
                        key={r.label}
                        onClick={() => setStyle(s => ({ ...s, borderRadius: r.value }))}
                        className={cn(
                          "flex-1 py-1 text-[10px] font-bold rounded-md transition-all",
                          style.borderRadius === r.value ? "bg-white shadow-sm text-indigo-600" : "text-gray-500"
                        )}
                      >
                        {r.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Inner Border Settings */}
            <CollapsibleSection
              title="Inner Border"
              icon={Frame}
              isOpen={expandedSections.innerBorder}
              onToggle={() => toggleSection('innerBorder')}
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

            {/* Decorative Elements */}
            <CollapsibleSection
              title="Decorative Elements"
              icon={Sparkles}
              isOpen={expandedSections.elements}
              onToggle={() => toggleSection('elements')}
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

            {/* Font Control */}
            <CollapsibleSection
              title="Font Control"
              icon={Type}
              isOpen={expandedSections.typography}
              onToggle={() => toggleSection('typography')}
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

            {/* Card Title */}
            <CollapsibleSection
              title="Card Title"
              icon={Layout}
              isOpen={expandedSections.title}
              onToggle={() => toggleSection('title')}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Title Text</label>
                  <input
                    type="text"
                    value={style.title}
                    onChange={(e) => setStyle(s => ({ ...s, title: e.target.value }))}
                    className="w-full p-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 font-medium"
                    placeholder="e.g. Daily Wisdom"
                  />
                  <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                    {['left', 'center', 'right'].map((align) => (
                      <button
                        key={align}
                        onClick={() => setStyle(s => ({ ...s, titleAlign: align as any }))}
                        className={cn(
                          "flex-1 py-1 rounded-lg text-[9px] font-bold uppercase transition-all",
                          style.titleAlign === align ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Card Footer */}
            <CollapsibleSection
              title="Card Footer"
              icon={MoreHorizontal}
              isOpen={expandedSections.footer}
              onToggle={() => toggleSection('footer')}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Footer Text</label>
                  <input
                    type="text"
                    value={style.footer}
                    onChange={(e) => setStyle(s => ({ ...s, footer: e.target.value }))}
                    className="w-full p-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 font-medium"
                    placeholder="e.g. @yourhandle"
                  />
                  <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                    {['left', 'center', 'right'].map((align) => (
                      <button
                        key={align}
                        onClick={() => setStyle(s => ({ ...s, footerAlign: align as any }))}
                        className={cn(
                          "flex-1 py-1 rounded-lg text-[9px] font-bold uppercase transition-all",
                          style.footerAlign === align ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-gray-600">Page Numbers</span>
                  <button
                    onClick={() => setStyle(s => ({ ...s, showPageNumber: !s.showPageNumber }))}
                    className={cn(
                      "w-10 h-5 rounded-full transition-all relative",
                      style.showPageNumber ? "bg-indigo-600" : "bg-gray-300"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                      style.showPageNumber ? "left-6" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            </CollapsibleSection>

            {/* Export */}
            <CollapsibleSection
              title="Export Options"
              icon={Download}
              isOpen={expandedSections.export}
              onToggle={() => toggleSection('export')}
            >
              <div className="space-y-4">
                <button
                  onClick={handleExportAll}
                  disabled={cards.length === 0}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" />
                  Export {cards.length} Cards
                </button>
                <p className="text-[10px] text-center text-gray-400 font-medium">
                  Exports as high-quality PNG images
                </p>
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </aside>

      {/* Main Preview Area */}
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
