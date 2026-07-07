/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { GameItem, InvoiceType } from '../types';
import { ShieldAlert, QrCode, Wifi, Cloud, Check } from 'lucide-react';

interface GameCardProps {
  item: GameItem;
  isSelected: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export default function GameCard({
  item,
  isSelected,
  onDragStart,
  onDragEnd
}: GameCardProps) {
  
  // Decide background and accent colors based on invoice type
  const isBomb = item.type === InvoiceType.BOMB;
  const isCloud = item.type === InvoiceType.CLOUD_INVOICE;
  const isReceipt = item.type === InvoiceType.RECEIPT;
  const isEInvoice = item.type === InvoiceType.E_INVOICE;

  return (
    <motion.div
      id={`game-card-${item.id}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      layoutId="active-card"
      initial={{ scale: 0.9, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`
        relative w-full max-w-[300px] mx-auto min-h-[410px] bg-white rounded-2xl shadow-2xl
        overflow-hidden cursor-grab active:cursor-grabbing select-none flex flex-col transition-all duration-300 hover:scale-[1.03]
        ${isBomb ? 'border-4 border-red-500' : ''}
        ${isCloud ? 'border-4 border-emerald-500' : ''}
        ${isReceipt ? 'border-4 border-amber-500' : ''}
        ${isEInvoice ? 'border-4 border-blue-500' : ''}
        ${isSelected ? 'ring-4 ring-blue-100 scale-[1.02]' : ''}
      `}
    >
      {/* Top Banner indicating style */}
      <div className={`
        px-4 py-2 text-center text-xs font-bold text-white tracking-wider flex items-center justify-center gap-1.5
        ${isBomb ? 'bg-gradient-to-r from-red-600 to-amber-600' : ''}
        ${isCloud ? 'bg-gradient-to-r from-emerald-600 to-teal-500' : ''}
        ${isReceipt ? 'bg-gradient-to-r from-amber-500 to-orange-500' : ''}
        ${isEInvoice ? 'bg-gradient-to-r from-blue-600 to-indigo-500' : ''}
      `}>
        {isBomb && <ShieldAlert className="w-3.5 h-3.5" />}
        {isCloud && <Cloud className="w-3.5 h-3.5" />}
        <span>
          {isBomb ? '⚠️ 異常危險警示 ⚠️' : ''}
          {isCloud ? '智慧載具 ‧ 雲端發票' : ''}
          {isReceipt ? '免用統一發票收據' : ''}
          {isEInvoice ? '紙本電子發票證明聯' : ''}
        </span>
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex-grow flex flex-col justify-between relative bg-radial from-white to-slate-50/50">
        
        {/* Decorative Stamps / Overlays */}
        {isReceipt && (
          <div className="absolute right-4 top-14 w-20 h-20 border-4 border-dashed border-red-500/40 rounded-full flex items-center justify-center rotate-12 select-none pointer-events-none">
            <span className="text-[10px] font-bold text-red-500/40 text-center leading-tight">
              免用統一發票<br />專用章
            </span>
          </div>
        )}

        {isBomb && (
          <div className="absolute right-4 top-14 w-24 h-8 bg-red-600/10 border-2 border-red-600/40 text-red-600/40 font-black text-center text-sm leading-7 rotate-[-15deg] uppercase select-none pointer-events-none">
            DANGER 💣
          </div>
        )}

        {isCloud && (
          <div className="absolute right-4 top-14 w-20 h-20 border-4 border-emerald-500/10 text-emerald-500/10 font-black rounded-full flex items-center justify-center rotate-[-10deg] select-none pointer-events-none">
            <span className="text-xs text-center font-bold">GREEN<br />LIFE 🍃</span>
          </div>
        )}

        {/* Card Header Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">
              NO. {item.id.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {item.date || '2026-06-30'}
            </span>
          </div>

          <h4 className="text-lg font-extrabold text-slate-800 leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-slate-400 mt-1">{item.merchant}</p>
        </div>

        {/* Dynamic Simulated Parts based on Card type */}
        <div className="bg-white/80 backdrop-blur-xs border border-slate-100 rounded-xl p-3.5 mb-4 shadow-2xs space-y-2 flex-grow">
          {/* Price tag */}
          <div className="flex items-baseline justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-xs font-bold text-slate-400">消費金額</span>
            <span className={`text-xl font-black ${isBomb ? 'text-red-600' : 'text-slate-800'}`}>
              {item.amount}
            </span>
          </div>

          {/* Details list */}
          <div className="space-y-1 text-slate-600 text-xs font-medium font-sans">
            {item.details.map((detail, idx) => (
              <p
                key={idx}
                className={`leading-relaxed ${
                  detail.startsWith('⚠️') 
                    ? 'text-red-500 font-semibold' 
                    : detail.startsWith('💡') 
                    ? 'text-blue-600 font-semibold' 
                    : detail.startsWith('✨') || detail.startsWith('💎')
                    ? 'text-emerald-600 font-semibold'
                    : 'text-slate-500'
                }`}
              >
                {detail}
              </p>
            ))}
          </div>
        </div>

        {/* Simulated Barcode for cloud carrier, or QR code for e-invoice, or Warning for Bomb */}
        <div className="mt-auto border-t border-slate-100 pt-4 flex flex-col items-center">
          {isCloud && (
            <div className="w-full flex flex-col items-center">
              {/* Fake Mobile Barcode */}
              <div className="h-10 w-full max-w-[180px] bg-white border border-slate-200 flex items-center justify-around px-2 relative select-none">
                {Array.from({ length: 32 }).map((_, i) => {
                  const width = (i % 3 === 0) ? 'w-[1px]' : (i % 5 === 0) ? 'w-[3px]' : 'w-[2px]';
                  const gap = (i % 4 === 0) ? 'mr-[2px]' : 'mr-[1px]';
                  return (
                    <div
                      key={i}
                      className={`h-7 bg-slate-900 ${width} ${gap}`}
                    />
                  );
                })}
              </div>
              <span className="text-xs font-mono font-bold tracking-widest text-slate-700 mt-1.5">
                {item.carrierCode}
              </span>
            </div>
          )}

          {isEInvoice && (
            <div className="flex gap-4 items-center justify-center">
              {/* Fake QR Codes */}
              <div className="p-1 bg-slate-50 border border-slate-200 rounded-md">
                <QrCode className="w-9 h-9 text-slate-800" />
              </div>
              <div className="p-1 bg-slate-50 border border-slate-200 rounded-md">
                <QrCode className="w-9 h-9 text-slate-800" />
              </div>
              <div className="text-[10px] text-slate-400 font-mono leading-tight">
                隨機碼 5288<br />總計 1 項
              </div>
            </div>
          )}

          {isReceipt && (
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 block mb-1">傳統憑證</span>
              <div className="inline-flex gap-1 items-center px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">
                <Wifi className="w-3 h-3 rotate-45" /> 無雲端備份功能
              </div>
            </div>
          )}

          {isBomb && (
            <div className="w-full h-8 bg-amber-500/10 border-t border-b border-amber-500/20 flex items-center justify-center gap-1.5 overflow-hidden">
              <div className="flex gap-4 shrink-0 animate-marquee text-[10px] text-amber-600 font-black tracking-wider">
                <span>⚠️ SYSTEM WARNING ⚠️</span>
                <span>💣 DANGER OVERLOAD 💣</span>
                <span>⚠️ SYSTEM WARNING ⚠️</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Beautiful zigzag torn-paper bottom edge */}
      <div className="h-4 w-full flex overflow-hidden shrink-0 pointer-events-none select-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-[14px] h-[14px] bg-slate-200 shrink-0 rotate-45 -translate-y-2 translate-x-[2px] border-b border-r border-slate-300/40"
            style={{ backgroundColor: '#ffffff' }}
          />
        ))}
      </div>
    </motion.div>
  );
}
