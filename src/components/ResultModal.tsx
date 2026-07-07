/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, RotateCcw, HelpCircle, Trophy, ThumbsUp, AlertCircle, ChevronRight, Share2, Heart } from 'lucide-react';
import { ScoreResult } from '../types';
// @ts-ignore
import taxLogo from '../assets/images/logo_with_ad.png';
// @ts-ignore
import allCorrectUrl from '../assets/audio/all_correct.mp3';
// @ts-ignore
import gameOverUrl from '../assets/audio/game_over.mp3';

interface ResultModalProps {
  result: ScoreResult;
  onRestart: () => void;
  onViewInstructions: () => void;
}

export default function ResultModal({
  result,
  onRestart,
  onViewInstructions
}: ResultModalProps) {
  const { score, correctCount, wrongCount } = result;
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; color: string; delay: string; duration: string }>>([]);

  // Generate confetti for high scores
  useEffect(() => {
    if (score >= 50) {
      const colors = ['#3b82f6', '#10b981', '#fbbf24', '#f87171', '#a78bfa', '#ec4899'];
      const pieces = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${Math.random() * 2}s`,
        duration: `${2 + Math.random() * 3}s`
      }));
      setConfetti(pieces);
    }
  }, [score]);

  // Play game end sound effects
  useEffect(() => {
    const isAllCorrect = wrongCount === 0 && correctCount > 0;
    const audioUrl = isAllCorrect ? allCorrectUrl : gameOverUrl;
    const audio = new Audio(audioUrl);
    audio.play().catch(err => console.log('Audio play blocked:', err));
  }, [correctCount, wrongCount]);

  // Determine feedback based on score range
  const getEvaluation = () => {
    if (score >= 80) {
      return {
        badge: '🎖️ 發票達人',
        title: '你已經非常熟悉雲端發票了！',
        desc: '天啊！你簡直是新北市的智慧環保之光！完全分得清收據、電子發票與雲端發票的差異，雲端發票綁定與載具歸戶肯定難不倒你！',
        color: 'from-emerald-500 to-green-600',
        bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        icon: <Trophy className="w-16 h-16 text-yellow-500" />
      };
    } else if (score >= 50) {
      return {
        badge: '🥇 發票高手',
        title: '再多練習就能更快分辨！',
        desc: '非常厲害！你對發票有很高的認知，只要稍加注意收據與危險物（如假發票或過期發票），你就能跨入達人殿堂囉！',
        color: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-50 border-blue-200 text-blue-800',
        icon: <Award className="w-16 h-16 text-blue-500" />
      };
    } else if (score >= 20) {
      return {
        badge: '🥈 發票新手',
        title: '記得收據和發票是不一樣的。',
        desc: '不錯的嘗試！請記得「收據」是不能對獎的，且常規的「電子發票證明聯」有紙本，而「雲端發票」則是存在載具中，最環保喔。',
        color: 'from-amber-500 to-orange-600',
        bgColor: 'bg-amber-50 border-amber-200 text-amber-800',
        icon: <ThumbsUp className="w-16 h-16 text-amber-500" />
      };
    } else {
      return {
        badge: '🥉 再挑戰一次',
        title: '一起認識電子發票與雲端發票！',
        desc: '別灰心！這只是一個開始，多看兩次遊戲說明，認識雲端發票不印紙本、還有專屬加碼獎的好處，下次你一定能拿高分！',
        color: 'from-red-500 to-rose-600',
        bgColor: 'bg-red-50 border-red-200 text-red-800',
        icon: <AlertCircle className="w-16 h-16 text-red-500 animate-bounce" />
      };
    }
  };

  const evalInfo = getEvaluation();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      {/* Confetti container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="confetti-piece"
            style={{
              left: c.left,
              backgroundColor: c.color,
              animationDelay: c.delay,
              animationDuration: c.duration,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        id="result-modal"
      >
        {/* Colorful Certificate Header */}
        <div className={`bg-gradient-to-r ${evalInfo.color} p-6 text-center text-white relative`}>
          <div className="absolute top-2 right-2 opacity-10">
            <Trophy className="w-24 h-24" />
          </div>
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase mb-2">
            Challenge Completed
          </span>
          <h2 className="text-2xl font-black tracking-wide">挑戰結算證書</h2>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Grade & Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 p-4 bg-slate-50 rounded-full border border-slate-100 shadow-2xs">
              {evalInfo.icon}
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {evalInfo.badge}
            </h3>
            <p className="text-sm font-bold text-slate-500 mt-1">
              {evalInfo.title}
            </p>
          </div>

          {/* Description Text Box */}
          <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed text-slate-600 font-medium ${evalInfo.bgColor}`}>
            {evalInfo.desc}
          </div>

          {/* Score Stats Panel */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center">
              <span className="text-xs text-slate-400 font-bold block">最終分數</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-800 font-display">
                {score}
              </span>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 text-center">
              <span className="text-xs text-emerald-600 font-bold block">正確分類</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">
                {correctCount}
              </span>
            </div>
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-3 text-center">
              <span className="text-xs text-red-500 font-bold block">錯誤分類</span>
              <span className="text-2xl sm:text-3xl font-black text-red-500 font-display">
                {wrongCount}
              </span>
            </div>
          </div>

          {/* Cloud Invoice Promo Message */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-slate-150 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>新北市政府稅捐稽徵處貼心提醒：</span>
            </div>
            <p className="leading-relaxed">
              下載「財政部統一發票兌獎 APP」設定手機條碼載具，並將銀行帳戶設定於系統中，未來中獎時獎金會自動匯入、還能免繳 0.4% 的印花稅喔！快將雲端發票設定好，省時省力更省錢！
            </p>
          </div>

          {/* Official Logo */}
          <div className="flex flex-col items-center justify-center pt-4 pb-1 border-t border-slate-100">
            <img 
              src={taxLogo} 
              alt="新北市政府稅捐稽徵處 (含廣告)" 
              className="h-16 md:h-20 w-auto max-w-full object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-[10px] text-slate-400 mt-2 font-bold tracking-wider">
              新北市政府稅捐稽徵處 ‧ 共同推廣
            </span>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestart}
            id="btn-restart-game"
            className="flex-1 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            再玩一次
          </button>
          
          <button
            onClick={onViewInstructions}
            id="btn-return-instructions"
            className="flex-1 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            回到遊戲說明
          </button>
        </div>
      </motion.div>
    </div>
  );
}
