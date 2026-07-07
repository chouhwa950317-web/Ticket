/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import HeroSection from './components/HeroSection';
import InfoCards from './components/InfoCards';
import GameSection from './components/GameSection';
import { Smartphone, CheckCircle, ArrowRight, ShieldCheck, Heart, Leaf, Globe } from 'lucide-react';
// @ts-ignore
import logoBlack from './assets/images/logo_black.png';

export default function App() {
  
  // Custom scroll triggers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Bureau branding */}
          <div className="flex items-center gap-3">
            <img 
              src={logoBlack} 
              alt="新北市政府稅捐稽徵處" 
              className="h-10 sm:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Nav Links (Hidden on tiny devices) */}
          <nav className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => scrollToSection('info-section')}
              className="text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              票券知識
            </button>
            <button
              onClick={() => scrollToSection('tutorial-section')}
              className="text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              載具教學
            </button>
            <button
              onClick={() => scrollToSection('game-section')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-100 hover:shadow-lg transition-all cursor-pointer"
            >
              進入遊戲 🎮
            </button>
          </nav>

        </div>
      </header>

      {/* 2. Hero Section */}
      <HeroSection
        onStartGame={() => scrollToSection('game-section')}
        onViewInfo={() => scrollToSection('info-section')}
      />

      {/* 3. Educational Information Cards Section */}
      <InfoCards />

      {/* 4. Active Interactive Game Stage */}
      <div className="bg-slate-100/50 py-4">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 border border-green-200 text-green-700 text-xs font-semibold rounded-full mb-4">
            <Leaf className="w-3.5 h-3.5 text-green-600" />
            無紙化綠色奇蹟 ‧ 環保永續
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            「發票分類快手」限時挑戰賽
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mb-8">
            限時 60 秒！仔細看清每張票券特徵，將收據、紙本電子發票與環保雲端發票分門別類，更要小心突如其來的干擾炸彈物喔！
          </p>
        </div>
        <GameSection onViewInstructions={() => scrollToSection('info-section')} />
      </div>

      {/* 5. Cloud Carrier Tutorial Section (手機條碼申請三部曲) */}
      <section id="tutorial-section" className="py-16 bg-white border-t border-b border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-bold tracking-wider mb-3">
              3分鐘搞定 ‧ 終身免發票整理煩惱
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              雲端發票手機條碼申請三部曲
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-2">
              跟著下方步驟，快速辦理專屬載具，開啟你的綠色無紙化高獎金日常吧！
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black text-lg mb-4">
                  1
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">下載官方應用 APP</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  在手機應用程式商店（App Store / Google Play）搜尋並下載財政部官方唯一的<strong>「統一發票兌獎」</strong>APP。
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <span>認明財政部紅藍 Logo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-black text-lg mb-4">
                  2
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">註冊並取得手機條碼</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  打開 APP 輸入手機號碼與 Email，系統將透過簡訊發送驗證碼。登入後即可取得開頭為「/」的專屬手機條碼。
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-green-600">
                <span>例如：/ABC1234</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-2xs relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-black text-lg mb-4">
                  3
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">歸戶與設定中獎匯款</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  將悠遊卡、一卡通、電商帳號等常用載具綁定至手機條碼。並填寫個人的銀行帳戶，未來中獎時獎金會一分不少自動匯入！
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-600">
                <span>中獎簡訊通知、24H自動入帳</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Legal / Official Promotional Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center font-bold">
                新
              </div>
              <div>
                <h3 className="font-black text-white text-base tracking-wide">
                  新北市政府稅捐稽徵處
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  推廣電子發票與雲端發票載具宣導 ‧ 版權所有
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.tax.ntpc.gov.tw"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl transition-all text-xs font-bold flex items-center gap-1"
              >
                <Globe className="w-4 h-4" />
                官網首頁
              </a>
              <div className="p-2.5 bg-slate-800 rounded-xl text-xs font-bold flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                資訊安全標章
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
            <div>
              <h4 className="font-bold text-slate-200 mb-2">雲端發票重要優勢：</h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>免印紙張：減少大量林木砍伐與印刷化學溶劑污染，友善自然環境。</li>
                <li>專屬獎項：享有「雲端發票專屬獎」，中獎機會比紙本多更多！</li>
                <li>自動對獎：不怕發票遺失、不需手動整理、24小時全自動對領獎。</li>
                <li>安全無毒：遠離感熱紙雙酚A化學殘留，守護您與家人的健康。</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-200 mb-2">宣導活動說明：</h4>
              <p>
                本網站為新北市政府稅捐稽徵處推廣雲端發票使用之互動遊戲專區。期盼透過簡單有趣的票券分類情境，
                讓廣大民眾在寓教於樂中深刻分辨一般收據與中獎發票的差異，並理解使用載具及不列印紙本發票的好處。
                讓我們攜手推進無紙智慧生活，節能減碳，為下一代保留更美好的寶島家園！
              </p>
              <div className="flex items-center gap-1 mt-4 text-[10px] text-slate-500 font-bold">
                <span>用愛心與環保守護家園</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>新北市與您同行</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-slate-850 text-[10px] text-slate-600 font-medium tracking-wide">
            Copyright © 2026 新北市政府稅捐稽徵處. All Rights Reserved. 
          </div>

        </div>
      </footer>

    </div>
  );
}
