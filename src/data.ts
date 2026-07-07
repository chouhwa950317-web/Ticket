/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameItem, InvoiceType } from './types';

export const INITIAL_GAME_ITEMS: GameItem[] = [
  // --- RECEIPTS (收據) ---
  {
    id: 'receipt-1',
    title: '美而美早餐店 收據',
    type: InvoiceType.RECEIPT,
    emoji: '🧾',
    description: '蓋有免用統一發票專用章，無發票號碼',
    merchant: '美而美早餐店新莊店',
    amount: 'NT$ 85',
    date: '2026-06-15',
    details: [
      '品名：培根蛋餅、大冰奶',
      '蓋章：免用統一發票專用章',
      '統編：8834XXXX',
      '⚠️ 注意：此非統一發票，無法參與統一發票中獎對獎'
    ]
  },
  {
    id: 'receipt-2',
    title: '大台北計程車 乘車證明',
    type: InvoiceType.RECEIPT,
    emoji: '🚕',
    description: '司機手寫或熱感應乘車收據，無發票期軌號',
    merchant: '個人計程車林師傅',
    amount: 'NT$ 250',
    date: '2026-06-20',
    details: [
      '起訖點：板橋車站 -> 新北市政府',
      '車號：TDY-8888',
      '乘車證明 / 司機收據簽章',
      '⚠️ 提醒：屬於憑證收據，不可參加中獎號碼對獎'
    ]
  },
  {
    id: 'receipt-3',
    title: '愛心診所 掛號費收據',
    type: InvoiceType.RECEIPT,
    emoji: '🏥',
    description: '醫療機構開立之行政收據',
    merchant: '愛心小兒科診所',
    amount: 'NT$ 150',
    date: '2026-06-18',
    details: [
      '項目：掛號費 NT$ 150',
      '自費項目：NT$ 0',
      '經手人：張護理師',
      '⚠️ 備註：醫療收據可作報稅扣除額，但非發票、不能對獎'
    ]
  },
  {
    id: 'receipt-4',
    title: '雅築公寓 租金收據',
    type: InvoiceType.RECEIPT,
    emoji: '🏠',
    description: '房東開立之租金簽收憑證',
    merchant: '房東陳先生',
    amount: 'NT$ 12,000',
    date: '2026-06-01',
    details: [
      '項目：115年度6月份房屋租金',
      '金額：壹萬貳仟元整',
      '收款人簽章：陳大明 (私章)',
      '⚠️ 提醒：私人收據，不具備發票對獎資格'
    ]
  },
  {
    id: 'receipt-5',
    title: '路邊停車 繳費收據',
    type: InvoiceType.RECEIPT,
    emoji: '🅿️',
    description: '路邊停車格繳費收據（非發票）',
    merchant: '新北市政府交通局',
    amount: 'NT$ 40',
    date: '2026-06-25',
    details: [
      '車牌號碼：ABC-1234',
      '路段：板橋區中山路一段',
      '計費時間：10:00 - 12:00',
      '⚠️ 注意：此聯為繳費簽收聯，無發票字軌'
    ]
  },

  // --- ELECTRONIC INVOICES (電子發票 - 有紙本) ---
  {
    id: 'einvoice-1',
    title: '7-11 電子發票證明聯',
    type: InvoiceType.E_INVOICE,
    emoji: '📄',
    description: '超商印出的感熱紙實體電子發票',
    merchant: '統一超商板新門市',
    amount: 'NT$ 65',
    date: '2026-06-28',
    details: [
      '發票期軌：UX-12345678',
      '格式：115年05-06月期',
      '隨機碼：5288  統編：22334455',
      '品名：御飯糰、無糖綠茶',
      '💡 特色：有實體紙本，需妥善保管，若遺失無法補印對獎'
    ]
  },
  {
    id: 'einvoice-2',
    title: '全聯福利中心 發票證明聯',
    type: InvoiceType.E_INVOICE,
    emoji: '📄',
    description: '超市印出的實體發票證明聯',
    merchant: '全聯板橋江子翠店',
    amount: 'NT$ 388',
    date: '2026-06-22',
    details: [
      '發票期軌：UX-87654321',
      '格式：115年05-06月期',
      '隨機碼：9912  統編：11223344',
      '品名：鮮奶、吐司、蘋果',
      '💡 特色：熱感應紙本印出，若受熱或油污可能導致字跡模糊'
    ]
  },
  {
    id: 'einvoice-3',
    title: '星巴克 咖啡發票證明聯',
    type: InvoiceType.E_INVOICE,
    emoji: '☕',
    description: '咖啡廳消費開立的紙本電子發票',
    merchant: '星巴克板橋新站門市',
    amount: 'NT$ 165',
    date: '2026-06-26',
    details: [
      '發票期軌：UX-45671234',
      '格式：115年05-06月期',
      '隨機碼：1103  統編：55667788',
      '品名：經典那堤 (大杯)',
      '💡 特色：紙本電子發票，對獎時需持此正本至指定地點兌領'
    ]
  },
  {
    id: 'einvoice-4',
    title: '大潤發 購物發票證明聯',
    type: InvoiceType.E_INVOICE,
    emoji: '🛒',
    description: '量販店結帳列印出的長條電子發票',
    merchant: '大潤發中和店',
    amount: 'NT$ 1,250',
    date: '2026-06-10',
    details: [
      '發票期軌：UX-99887766',
      '格式：115年05-06月期',
      '隨機碼：3477  統編：98765432',
      '品名：洗髮精、衛生紙、泡麵、零食等',
      '💡 特色：紙本保存不易，容易堆積，對獎需人工一張張核對'
    ]
  },

  // --- CLOUD INVOICES (雲端發票 - 存於載具、無紙本) ---
  {
    id: 'cloud-1',
    title: '雲端發票 (手機條碼載具)',
    type: InvoiceType.CLOUD_INVOICE,
    emoji: '☁️🧾',
    description: '結帳時掃描手機條碼，直接將發票存入雲端',
    merchant: '全家便利商店板農店',
    amount: 'NT$ 120',
    date: '2026-06-29',
    carrierCode: '/NTPC999',
    details: [
      '📱 載具類型：手機條碼 /NTPC999',
      '發票期軌：UX-55661122 (已儲存於雲端)',
      '品名：美式咖啡、地瓜、香蕉',
      '✨ 優勢：完全不列印紙本發票，減少砍伐樹木，最為環保！',
      '💎 超值：除了一般發票對獎，還能享有專屬「雲端發票專屬獎」！'
    ]
  },
  {
    id: 'cloud-2',
    title: '蝦皮購物 雲端發票 (會員載具)',
    type: InvoiceType.CLOUD_INVOICE,
    emoji: '🛍️',
    description: '電商平台消費，自動開立並綁定會員載具',
    merchant: '蝦皮購物平台',
    amount: 'NT$ 590',
    date: '2026-06-24',
    carrierCode: '蝦皮會員載具 (已歸戶)',
    details: [
      '📱 載具類型：電商會員載具 (系統自動歸戶)',
      '發票期軌：UX-22446688',
      '品名：手機殼、抗藍光保護貼',
      '✨ 優勢：中獎後系統會主動寄發 Email 告知，或自動匯款至綁定帳戶！',
      '💎 方便：不必擔心發票不見，自動對獎、獎金自動入帳！'
    ]
  },
  {
    id: 'cloud-3',
    title: 'Uber Eats 雲端發票 (跨境電商)',
    type: InvoiceType.CLOUD_INVOICE,
    emoji: '🛵',
    description: '外送平台消費，雲端發票直接儲存於電子信箱載具',
    merchant: 'Uber Eats 外送平台',
    amount: 'NT$ 320',
    date: '2026-06-27',
    carrierCode: '電子信箱載具',
    details: [
      '📱 載具類型：Email 載具 (已綁定財政部)',
      '發票期軌：UX-33669900',
      '品名：牛肉麵套餐、燙青菜',
      '✨ 優勢：結合財政部統一發票兌獎 APP，所有載具集中管理！',
      '💎 安全：發票資料備份在雲端，不用怕發票遺失錯失千萬大獎。'
    ]
  },
  {
    id: 'cloud-4',
    title: '台灣電力公司 雲端發票 (公用事業)',
    type: InvoiceType.CLOUD_INVOICE,
    emoji: '⚡',
    description: '公用事業水電瓦斯費，自動轉為雲端發票',
    merchant: '台灣電力公司新北市營業處',
    amount: 'NT$ 1,420',
    date: '2026-06-15',
    carrierCode: '公用事業載具',
    details: [
      '📱 載具類型：公用事業會員載具',
      '發票期軌：UX-11223344',
      '品名：115年04-05月電費',
      '✨ 優勢：不印紙本，水電繳費後直接在財政部系統存成雲端發票',
      '💎 便捷：可用手機條碼綁定，所有生活繳費發票都可一目了然！'
    ]
  },
  {
    id: 'cloud-5',
    title: '悠遊卡 雲端發票 (悠遊卡載具)',
    type: InvoiceType.CLOUD_INVOICE,
    emoji: '💳',
    description: '捷運與公車感應、超商嗶卡扣款發票直接存悠遊卡',
    merchant: '台北捷運 / 悠遊卡小額消費',
    amount: 'NT$ 45',
    date: '2026-06-29',
    carrierCode: '悠遊卡載具 (已歸戶)',
    details: [
      '📱 載具類型：悠遊卡非接觸式載具',
      '發票期軌：UX-77889900',
      '品名：台北捷運搭乘乘車費',
      '✨ 優勢：嗶卡即可儲存！可在超商多媒體機(KIOSK)或手機APP查閱',
      '💎 環保：免去紙張印製，實踐無紙化低碳綠色新生活！'
    ]
  },

  // --- BOMBS (炸彈干擾物) ---
  {
    id: 'bomb-1',
    title: '⚠️ 惡意釣魚網頁連結 💣',
    type: InvoiceType.BOMB,
    emoji: '💣',
    description: '「您中了一千萬元，請點此輸入信用卡號領取」',
    merchant: '不知名詐騙集團',
    amount: '⚠️ 帳戶遭盜刷風險 ⚠️',
    date: '2026-06-30',
    details: [
      '⚠️ 詐騙陷阱：假冒財政部發出的簡訊與網址',
      '「恭喜您發票中大獎，請點擊連結領取：http://bogus-invoice.gov-tw.xyz」',
      '💀 危險：點擊會被竊取個資！請認明官方兌獎 APP 才是安全保障！',
      '👉 動作：請將此有害卡片丟到【危險物】分類箱！'
    ]
  },
  {
    id: 'bomb-2',
    title: '⚠️ 偽造發票號碼卡 💣',
    type: InvoiceType.BOMB,
    emoji: '💣',
    description: '人工變造、塗改中獎號碼的假發票',
    merchant: '跳蚤市場不明攤販',
    amount: 'NT$ 10,000,000 (偽造)',
    date: '2022-01-01',
    details: [
      '⚠️ 違法警告：偽造或變造發票領獎屬於刑事犯罪',
      '發票字軌號碼有明顯修改痕跡，且隨機碼不符',
      '💀 危險：這是不法票券，若拿到兌獎窗口會觸犯詐欺罪！',
      '👉 動作：請迅速丟到【危險物】分類箱，切勿持去兌換！'
    ]
  },
  {
    id: 'bomb-3',
    title: '⚠️ 五年前的過期發票 💣',
    type: InvoiceType.BOMB,
    emoji: '💣',
    description: '早已過期超過數年、無法領獎的舊發票',
    merchant: '倉庫角落的舊鞋盒',
    amount: 'NT$ 200 (早已過期)',
    date: '2021-03-12',
    details: [
      '⚠️ 提醒：統一發票領獎期限為開獎後 3 個月內',
      '這張是 110年03-04月期的實體發票，早已失效',
      '💀 危險：這是無效的過期垃圾紙張，不可當作有效發票分類！',
      '👉 動作：請放入【危險物】分類箱！如果是雲端發票就不怕漏看過期囉！'
    ]
  },
  {
    id: 'bomb-4',
    title: '⚠️ 商業廣告宣傳單 💣',
    type: InvoiceType.BOMB,
    emoji: '💣',
    description: '設計得像發票的商業特賣會宣傳傳單',
    merchant: '路邊發傳單的小姐',
    amount: 'NT$ 0 (折價券)',
    date: '2026-06-30',
    details: [
      '⚠️ 欺騙視覺：印有類似發票格式的折價券，但根本不是發票',
      '寫著「限時大優惠，憑此單享 8 折」，無任何發票編號',
      '💀 危險：這只是普通的垃圾廣告傳單，不是任何發票或收據！',
      '👉 動作：丟去【危險物】分類箱吧！'
    ]
  }
];

export const SCORE_RULES: Record<InvoiceType, {
  name: string;
  correctScore: number;
  wrongScore: number;
  feedbacks: string[];
  wrongFeedbacks: string[];
}> = {
  [InvoiceType.RECEIPT]: {
    name: '收據',
    correctScore: 1,
    wrongScore: -2,
    feedbacks: [
      '答對了！收據通常不是統一發票，不能參與財政部對獎喔。',
      '沒錯！這是收據憑證，常用於免用統一發票的小商家或特定收支證明。'
    ],
    wrongFeedbacks: [
      '再想想，收據和統一發票是不一樣的，它沒有發票期軌號碼。',
      '不對喔，收據不能對獎，應該分類到「收據」箱。'
    ]
  },
  [InvoiceType.E_INVOICE]: {
    name: '電子發票',
    correctScore: 3,
    wrongScore: -2,
    feedbacks: [
      '答對了！電子發票證明聯可以參加統一發票對獎。',
      '答對了！紙本電子發票是有中獎機會的。但容易受熱、磨損或遺失，要小心保管！'
    ],
    wrongFeedbacks: [
      '這是實體列印的「電子發票證明聯」，可以參加對獎喔。',
      '弄錯了，這個有印出紙本感熱紙，是屬於實體電子發票。'
    ]
  },
  [InvoiceType.CLOUD_INVOICE]: {
    name: '雲端發票',
    correctScore: 5,
    wrongScore: -2,
    feedbacks: [
      '答對了！雲端發票最環保，不用印出紙本，還能享有「雲端發票專屬獎」雙重對獎機會！',
      '太棒了！存在手機條碼或載具中，不僅愛地球，財政部 APP 還會幫你自動對獎、獎金匯入指定帳戶！'
    ],
    wrongFeedbacks: [
      '雲端發票是存在手機條碼、悠遊卡、信用卡或會員載具中，不列印紙本發票喔。',
      '這是存在雲端載具的雲端發票，應該放到「雲端發票」箱！'
    ]
  },
  [InvoiceType.BOMB]: {
    name: '危險物',
    correctScore: 2,
    wrongScore: -5,
    feedbacks: [
      '成功避開炸彈！偽造、詐騙連結、過期發票和廣告單，都屬於干擾危險物！',
      '安全守護！這不是合法的當期發票或收據，丟進危險物箱是明智的決定！'
    ],
    wrongFeedbacks: [
      '小心炸彈！放錯分類箱會扣 5 分！這是無效或有害物件。',
      '太危險了！這是詐騙連結、過期發票或假票，必須放入「危險物」箱中隔離！'
    ]
  }
};
