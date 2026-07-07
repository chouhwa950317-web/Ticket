/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InvoiceType } from '../types';
import { FileText, FileSpreadsheet, CloudLightning, Skull } from 'lucide-react';

interface DropZoneProps {
  type: InvoiceType;
  isActive: boolean;             // Highlight if selected for click-to-drop
  isHovered: boolean;            // Highlight if dragging over
  onSelect: (type: InvoiceType) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, type: InvoiceType) => void;
}

export default function DropZone({
  type,
  isActive,
  isHovered,
  onSelect,
  onDragOver,
  onDragLeave,
  onDrop
}: DropZoneProps) {
  
  // Custom styles depending on invoice type
  const config = {
    [InvoiceType.RECEIPT]: {
      title: '一般收據',
      label: '通常不可對獎',
      emoji: '🧾',
      color: 'slate',
      borderClass: 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 shadow-sm',
      activeClass: 'ring-4 ring-slate-100 bg-slate-50 border-slate-400',
      hoverClass: 'bg-slate-50 border-slate-400 scale-[1.02]',
      icon: <FileText className="w-5 h-5 text-slate-500" />,
      scoreTag: '+1 分',
      scoreColor: 'text-slate-400'
    },
    [InvoiceType.E_INVOICE]: {
      title: '電子發票',
      label: '實體紙本可對獎',
      emoji: '📄',
      color: 'blue',
      borderClass: 'border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50 text-blue-900 shadow-sm',
      activeClass: 'ring-4 ring-blue-100 bg-blue-50/50 border-blue-400',
      hoverClass: 'bg-blue-50 border-blue-400 scale-[1.02]',
      icon: <FileSpreadsheet className="w-5 h-5 text-blue-500" />,
      scoreTag: '+3 分',
      scoreColor: 'text-blue-400'
    },
    [InvoiceType.CLOUD_INVOICE]: {
      title: '雲端發票',
      label: '存在載具、雙重對獎',
      emoji: '☁️🧾',
      color: 'emerald',
      borderClass: 'border-emerald-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 text-emerald-900 shadow-sm',
      activeClass: 'ring-4 ring-emerald-100 bg-emerald-50/50 border-emerald-400',
      hoverClass: 'bg-emerald-50 border-emerald-400 scale-[1.02]',
      icon: <CloudLightning className="w-5 h-5 text-emerald-500" />,
      scoreTag: '+5 分',
      scoreColor: 'text-emerald-500'
    },
    [InvoiceType.BOMB]: {
      title: '危險物',
      label: '有害、詐騙、過期票',
      emoji: '💣',
      color: 'red',
      borderClass: 'border-red-200 hover:border-red-400 bg-white hover:bg-red-50 text-red-900 shadow-sm',
      activeClass: 'ring-4 ring-red-100 bg-red-50/50 border-red-400',
      hoverClass: 'bg-red-50 border-red-400 scale-[1.02]',
      icon: <Skull className="w-5 h-5 text-red-500" />,
      scoreTag: '+2 分',
      scoreColor: 'text-red-400'
    }
  }[type];

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div
        id={`dropzone-${type.toLowerCase()}`}
        onClick={() => onSelect(type)}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, type)}
        className={`
          relative overflow-hidden cursor-pointer flex flex-col items-center justify-center p-4 w-full
          border-2 border-dashed rounded-2xl transition-all duration-200 select-none text-center h-32
          ${config.borderClass}
          ${isActive ? config.activeClass : ''}
          ${isHovered ? config.hoverClass : ''}
        `}
      >
        {/* Decorative background shape */}
        <div className={`absolute -right-6 -bottom-6 w-12 h-12 rounded-full opacity-5 bg-current`} />

        {/* Emoji and Icon */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-3xl filter drop-shadow-xs">{config.emoji}</span>
        </div>

        {/* Titles */}
        <h3 className="font-bold text-sm sm:text-base tracking-wide text-slate-800">{config.title}</h3>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{config.label}</p>
      </div>
      
      {/* Sleek score gain tag */}
      <span className={`text-[10px] font-bold uppercase tracking-wider ${config.scoreColor}`}>
        {config.scoreTag}
      </span>
    </div>
  );
}
