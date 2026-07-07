/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum InvoiceType {
  RECEIPT = 'RECEIPT',             // 收據
  E_INVOICE = 'E_INVOICE',         // 電子發票
  CLOUD_INVOICE = 'CLOUD_INVOICE', // 雲端發票
  BOMB = 'BOMB'                    // 炸彈 / 危險物
}

export interface GameItem {
  id: string;
  title: string;
  type: InvoiceType;
  emoji: string;
  description: string;
  details: string[];               // Details printed on the simulated card
  amount?: string;
  merchant?: string;
  date?: string;
  carrierCode?: string;            // Specifically for Cloud Invoices (e.g., /ABC1234)
}

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface ScoreResult {
  score: number;
  correctCount: number;
  wrongCount: number;
  history: Array<{
    item: GameItem;
    targetZone: InvoiceType;
    isCorrect: boolean;
    scoreChange: number;
    feedback: string;
    timestamp: number;
  }>;
}
