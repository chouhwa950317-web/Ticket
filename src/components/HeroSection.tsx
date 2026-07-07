/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Play, HelpCircle, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

interface HeroSectionProps {
  onStartGame: () => void;
  onViewInfo: () => void;
}

export default function HeroSection({ onStartGame, onViewInfo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      {/* Background organic shape vectors */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-96 h-96 bg-slate-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 font-display"
          id="hero-title"
        >
          發票分類<span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">快手</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-800 mb-4"
        >
          收據、電子發票、雲端發票，你分得出來嗎？
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 leading-relaxed mb-8"
        >
          在限時 60 秒的快節奏挑戰中，把不同票券拖曳（或點選）到正確分類箱。
          認識發票與收據的差異，學會智慧使用雲端發票，為新北市的低碳綠生活盡一份心力，消費更便利也更環保！
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onStartGame}
            id="btn-start-game"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white text-white" />
            開始挑戰
          </button>
          
          <button
            onClick={onViewInfo}
            id="btn-view-info"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-lg border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-slate-500" />
            查看遊戲說明
          </button>
        </motion.div>

        {/* Visual Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left"
        >
          <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-fit">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base mb-1">節能減碳綠生活</h3>
              <p className="text-xs text-slate-500 leading-relaxed">雲端發票免印紙張，為地球省下大量木材，還能減少碳足跡與環境負荷。</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base mb-1">自動對獎超便利</h3>
              <p className="text-xs text-slate-500 leading-relaxed">綁定財政部 APP 即可在開獎日自動對獎，獎金更能直接匯入指定銀行帳戶。</p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base mb-1">雲端專屬雙重獎</h3>
              <p className="text-xs text-slate-500 leading-relaxed">除了常規統一發票獎項，雲端發票還能參加億元級別的「雲端發票專屬獎」！</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
