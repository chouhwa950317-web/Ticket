/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, HelpCircle, Eye } from 'lucide-react';

export default function InfoCards() {
  const cards = [
    {
      id: 'info-receipt',
      title: '收據 (Receipt)',
      emoji: '🧾',
      badge: '不能參加對獎',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      bgColor: 'bg-amber-50/30 border-amber-100',
      accentColor: 'text-amber-600',
      bulletIconColor: 'text-amber-500',
      description: '小店家、個人或特定機關開立的交易憑證，通常不具備「發票」資格。',
      points: [
        '常見於早餐店、計程車、路邊停車、診所掛號費、個人房東。',
        '上方通常印有「免用統一發票收據」及商家的統一編號章。',
        '⚠️ 核心重點：沒有統一發票字軌號碼，無法參加統一發票對獎。'
      ]
    },
    {
      id: 'info-einvoice',
      title: '電子發票 (Paper E-Invoice)',
      emoji: '📄',
      badge: '紙本感熱紙 ‧ 可對獎',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      bgColor: 'bg-blue-50/30 border-blue-100',
      accentColor: 'text-blue-600',
      bulletIconColor: 'text-blue-500',
      description: '商家銷售貨物或勞務時，利用網路傳輸、並列印出給消費者的紙本發票憑證。',
      points: [
        '最常見的形式，例如超商、超市、百貨公司、咖啡廳列印的發票。',
        '含有 QR Code、隨機碼、期軌號（如 UX-12345678）。',
        '⚠️ 核心重點：發票正本遺失、污損、模糊將無法補發領獎。需要人工一張張核對。'
      ]
    },
    {
      id: 'info-cloud',
      title: '雲端發票 (Cloud Invoice)',
      emoji: '☁️🧾',
      badge: '無紙化 ‧ 雙重對獎機會',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      bgColor: 'bg-emerald-50/30 border-emerald-100',
      accentColor: 'text-emerald-600',
      bulletIconColor: 'text-emerald-500',
      description: '結帳時不印出實體紙本，直接儲存在手機條碼載具、悠遊卡、信用卡、電商會員帳號中的綠色發票。',
      points: [
        '完全無紙化！透過掃描載具條碼或綁定各項載具完成自動存雲端。',
        '「雲端發票專屬獎」總獎金高達數億元，中獎機率大大提升。',
        '⚠️ 核心重點：免整理、不怕遺失、自動對獎、獎金直接轉帳，兼顧環保與省時！'
      ]
    },
    {
      id: 'info-bomb',
      title: '危險物 (Danger / Fake)',
      emoji: '💣',
      badge: '扣分干擾物',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      bgColor: 'bg-red-50/30 border-red-100',
      accentColor: 'text-red-600',
      bulletIconColor: 'text-red-500',
      description: '遊戲中的障礙物。包括偽造發票、過期好幾年的舊發票、釣魚詐騙網址或普通的宣傳折價券。',
      points: [
        '包含假冒的千萬大獎簡訊釣魚、變造隨機碼、或是商業折價廣告單。',
        '在真實世界中，這些可能伴隨個資洩漏、詐騙扣款或違法刑事責任。',
        '⚠️ 核心重點：看到它們時千萬不要放錯箱！必須投入「危險物」箱進行隔離。'
      ]
    }
  ];

  return (
    <section id="info-section" className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            搞懂四種分類，挑戰更高分！
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            在開始「發票分類快手」遊戲前，讓我們先快速瀏覽各票券的特徵與優缺點。答對越高階的綠色發票，分數累積越快喔！
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              id={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col border border-slate-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl filter drop-shadow-xs select-none">{card.emoji}</span>
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-800">{card.title}</h3>
                  </div>
                </div>
                <span className={`text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full font-bold border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 flex-grow">
                {card.description}
              </p>

              <div className="space-y-2.5 border-t border-slate-100 pt-4 mt-auto">
                {card.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex gap-2.5 items-start">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${card.bulletIconColor}`} />
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Informative Tip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row gap-4 items-center sm:items-start"
        >
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-base mb-1 text-center sm:text-left">
              為什麼要大力推廣「雲端發票」？
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              根據統計，台灣每年列印高達數十億張發票。改用「雲端發票」能節省大量紙張與碳排放。
              新北市稅捐稽徵處鼓勵大家：設定好手機條碼、完成載具歸戶並設定領獎匯款帳戶，
              即可享受免整理、不怕遺失、自動對獎、中獎獎金自動入帳的完美便捷生活！
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
