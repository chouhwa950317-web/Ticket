/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameItem, InvoiceType, GameStatus, ScoreResult } from '../types';
import { INITIAL_GAME_ITEMS, SCORE_RULES } from '../data';
import DropZone from './DropZone';
import GameCard from './GameCard';
import ResultModal from './ResultModal';
import { Timer, Star, CheckCircle, AlertTriangle, Play, HelpCircle, ShieldAlert, Award } from 'lucide-react';
// @ts-ignore
import bgmUrl from '../assets/audio/bgm.mp3';
// @ts-ignore
import correctUrl from '../assets/audio/correct.mp3';
// @ts-ignore
import wrongUrl from '../assets/audio/wrong.mp3';

interface GameSectionProps {
  onViewInstructions: () => void;
}

export default function GameSection({ onViewInstructions }: GameSectionProps) {
  // Game States
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);

  // Deck Management
  const [deck, setDeck] = useState<GameItem[]>([]);
  const [activeItem, setActiveItem] = useState<GameItem | null>(null);

  // Interaction feedback states
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean; points: number } | null>(null);
  const [hoveredZone, setHoveredZone] = useState<InvoiceType | null>(null);
  const [selectedZone, setSelectedZone] = useState<InvoiceType | null>(null);

  // Timer Ref
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Audio Refs
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  // Initialize BGM and control playback based on gameStatus
  useEffect(() => {
    bgmRef.current = new Audio(bgmUrl);
    bgmRef.current.loop = true;

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (bgmRef.current) {
      if (gameStatus === GameStatus.PLAYING) {
        bgmRef.current.currentTime = 0;
        bgmRef.current.play().catch((err) => console.log('BGM play blocked:', err));
      } else {
        bgmRef.current.pause();
      }
    }
  }, [gameStatus]);

  // Initialize/shuffle deck
  const shuffleDeck = (items: GameItem[]) => {
    return [...items].sort(() => Math.random() - 0.5);
  };

  // Start the game
  const startGame = () => {
    const shuffled = shuffleDeck(INITIAL_GAME_ITEMS);
    setDeck(shuffled.slice(1));
    setActiveItem(shuffled[0]);
    setScore(0);
    setTimeLeft(60);
    setCorrectCount(0);
    setWrongCount(0);
    setFeedback(null);
    setSelectedZone(null);
    setGameStatus(GameStatus.PLAYING);
  };

  // Timer effect
  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setGameStatus(GameStatus.FINISHED);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [gameStatus]);

  // Handle invoice classification scoring
  const handleClassification = (targetZone: InvoiceType) => {
    if (!activeItem || gameStatus !== GameStatus.PLAYING) return;

    const isCorrect = activeItem.type === targetZone;
    let scoreChange = 0;

    // Retrieve scoring rules
    if (isCorrect) {
      // Correct sorting
      scoreChange = SCORE_RULES[activeItem.type].correctScore;
      setCorrectCount((prev) => prev + 1);
      const audio = new Audio(correctUrl);
      audio.play().catch((err) => console.log('Correct audio play blocked:', err));
    } else {
      // Wrong sorting
      if (activeItem.type === InvoiceType.BOMB) {
        // Bomb exploded in another container
        scoreChange = SCORE_RULES[InvoiceType.BOMB].wrongScore; // -5
      } else {
        // Normal invoice in wrong container
        scoreChange = SCORE_RULES[activeItem.type].wrongScore; // -2
      }
      setWrongCount((prev) => prev + 1);
      const audio = new Audio(wrongUrl);
      audio.play().catch((err) => console.log('Wrong audio play blocked:', err));
    }

    // Apply score change (floor score at 0 so it doesn't go negative, or let it go negative depending on design - let's allow it but floor at 0 for more encouraging gameplay)
    setScore((prev) => Math.max(0, prev + scoreChange));

    // Get feedback texts
    const rule = SCORE_RULES[activeItem.type];
    const feedbackText = isCorrect
      ? rule.feedbacks[Math.floor(Math.random() * rule.feedbacks.length)]
      : rule.wrongFeedbacks[Math.floor(Math.random() * rule.wrongFeedbacks.length)];

    setFeedback({
      text: feedbackText,
      isCorrect,
      points: scoreChange
    });

    // Advance to next card
    setTimeout(() => {
      drawNextCard();
    }, 1500); // Give users 1.5 seconds to read the feedback
  };

  // Draw next card from the deck, reshuffling if deck is empty
  const drawNextCard = () => {
    setFeedback(null);
    setSelectedZone(null);

    if (deck.length === 0) {
      const reshuffled = shuffleDeck(INITIAL_GAME_ITEMS);
      setDeck(reshuffled.slice(1));
      setActiveItem(reshuffled[0]);
    } else {
      setActiveItem(deck[0]);
      setDeck((prev) => prev.slice(1));
    }
  };

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e: React.DragEvent) => {
    if (feedback) {
      // Prevent dragging if we are in the feedback delay period
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', activeItem?.type || '');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setHoveredZone(null);
  };

  const handleDragOver = (e: React.DragEvent, type: InvoiceType) => {
    e.preventDefault();
    if (feedback) return;
    setHoveredZone(type);
  };

  const handleDragLeave = () => {
    setHoveredZone(null);
  };

  const handleDrop = (e: React.DragEvent, type: InvoiceType) => {
    e.preventDefault();
    setHoveredZone(null);
    if (feedback) return;
    handleClassification(type);
  };

  // --- Tap / Button Handlers ---
  const handleQuickSort = (type: InvoiceType) => {
    if (feedback) return;
    handleClassification(type);
  };

  // Return formatted results for modal
  const getGameResult = (): ScoreResult => {
    return {
      score,
      correctCount,
      wrongCount,
      history: []
    };
  };

  return (
    <section id="game-section" className="py-12 bg-slate-50 border-t border-b border-slate-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* State 1: Idle Dashboard */}
        {gameStatus === GameStatus.IDLE && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-md text-center max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-100/40 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4">
              <Award className="w-10 h-10 text-blue-600" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3 font-display">
              準備好成為「發票分類快手」了嗎？
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
              你將有 60 秒的時間將隨機出現的收據、電子發票、雲端發票及炸彈危險物，分類拖曳到對應的容器。速度越快、分類正確率越高，得分就越高！
            </p>

            {/* Quick Scoring Guidelines */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left mb-8">
              <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center">
                <span className="text-xl block">☁️🧾</span>
                <span className="text-xs font-bold text-slate-700 block mt-1">雲端發票</span>
                <span className="text-xs font-black text-emerald-600">+5 分</span>
              </div>
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-center">
                <span className="text-xl block">📄</span>
                <span className="text-xs font-bold text-slate-700 block mt-1">電子發票</span>
                <span className="text-xs font-black text-blue-600">+3 分</span>
              </div>
              <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-center">
                <span className="text-xl block">🧾</span>
                <span className="text-xs font-bold text-slate-700 block mt-1">一般收據</span>
                <span className="text-xs font-black text-amber-600">+1 分</span>
              </div>
              <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl text-center">
                <span className="text-xl block">💣</span>
                <span className="text-xs font-bold text-slate-700 block mt-1">避開危險</span>
                <span className="text-xs font-black text-red-600">+2 分</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={startGame}
                id="btn-trigger-start"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                立即開始遊戲
              </button>
              <button
                onClick={onViewInstructions}
                className="px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-slate-500" />
                查看詳細說明
              </button>
            </div>
          </div>
        )}

        {/* State 2: Active Gameplay Screen */}
        {gameStatus === GameStatus.PLAYING && activeItem && (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            
            {/* Header Score/Timer Board */}
            <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
              
              {/* Score widget */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2.5 bg-blue-50 text-blue-600 rounded-lg sm:rounded-xl">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-blue-600" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold block">目前得分</span>
                  <span className="text-lg sm:text-2xl font-black text-blue-600 tabular-nums">
                    {score.toString().padStart(4, '0')} <span className="text-xs text-slate-400 font-normal">分</span>
                  </span>
                </div>
              </div>

              <div className="h-10 w-[1px] bg-slate-200 hidden sm:block"></div>

              {/* Time Remaining widget */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors duration-300 ${
                  timeLeft <= 10 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-600'
                }`}>
                  <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold block">剩餘時間</span>
                  <span className={`text-lg sm:text-2xl font-black tabular-nums tracking-tight transition-colors duration-300 ${
                    timeLeft <= 10 ? 'text-red-500' : 'text-slate-800'
                  }`}>
                    00:{timeLeft.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="h-10 w-[1px] bg-slate-200 hidden sm:block"></div>

              {/* Correct/Incorrect Mini tracker */}
              <div className="flex gap-4 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-around sm:justify-start">
                <div className="text-center">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold block">正確分類</span>
                  <span className="text-lg sm:text-xl font-black text-emerald-600 tabular-nums">{correctCount}</span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold block">錯誤分類</span>
                  <span className="text-lg sm:text-xl font-black text-red-500 tabular-nums">{wrongCount}</span>
                </div>
              </div>

            </div>

            {/* Main Interactive Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Drop Zones (Grid 2x2 for clean responsive scaling) */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="text-center lg:text-left mb-2.5 sm:mb-4">
                  <h3 className="font-extrabold text-slate-700 text-xs sm:text-sm tracking-wider uppercase mb-0.5 sm:mb-1">
                    分類存放箱 (Drop Targets)
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400">
                    拖曳票券到下方格子，或點選卡片後直接點選格子。
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <DropZone
                    type={InvoiceType.RECEIPT}
                    isActive={selectedZone === InvoiceType.RECEIPT}
                    isHovered={hoveredZone === InvoiceType.RECEIPT}
                    onSelect={handleQuickSort}
                    onDragOver={(e) => handleDragOver(e, InvoiceType.RECEIPT)}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  />
                  <DropZone
                    type={InvoiceType.E_INVOICE}
                    isActive={selectedZone === InvoiceType.E_INVOICE}
                    isHovered={hoveredZone === InvoiceType.E_INVOICE}
                    onSelect={handleQuickSort}
                    onDragOver={(e) => handleDragOver(e, InvoiceType.E_INVOICE)}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  />
                  <DropZone
                    type={InvoiceType.CLOUD_INVOICE}
                    isActive={selectedZone === InvoiceType.CLOUD_INVOICE}
                    isHovered={hoveredZone === InvoiceType.CLOUD_INVOICE}
                    onSelect={handleQuickSort}
                    onDragOver={(e) => handleDragOver(e, InvoiceType.CLOUD_INVOICE)}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  />
                  <DropZone
                    type={InvoiceType.BOMB}
                    isActive={selectedZone === InvoiceType.BOMB}
                    isHovered={hoveredZone === InvoiceType.BOMB}
                    onSelect={handleQuickSort}
                    onDragOver={(e) => handleDragOver(e, InvoiceType.BOMB)}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  />
                </div>
              </div>

              {/* Right Column: Active Card Display */}
              <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center">
                <div className="text-center mb-2.5 sm:mb-4">
                  <h3 className="font-extrabold text-slate-700 text-xs sm:text-sm tracking-wider uppercase mb-0.5 sm:mb-1">
                    當前待分類票券
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400">
                    請拖曳上方卡片或點選下方按鈕分類
                  </p>
                </div>

                {/* Animated Ticket display */}
                <div className="relative w-full flex justify-center py-2.5 sm:py-4 bg-slate-100/50 border border-slate-200/40 rounded-3xl min-h-[420px] sm:min-h-[460px]">
                  
                  {/* Feedback Overlay inside the card slot */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-white/95 flex flex-col items-center justify-center p-6 text-center rounded-3xl"
                      >
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring' }}
                          className={`p-4 rounded-full mb-4 ${
                            feedback.isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {feedback.isCorrect ? (
                            <CheckCircle className="w-12 h-12" />
                          ) : (
                            <AlertTriangle className="w-12 h-12" />
                          )}
                        </motion.div>

                        <h4 className={`text-lg font-black ${feedback.isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                          {feedback.isCorrect ? '分類正確！' : '分類錯誤！'}
                        </h4>
                        
                        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed max-w-[220px]">
                          {feedback.text}
                        </p>

                        <motion.span
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className={`text-2xl font-black font-display mt-4 block ${
                            feedback.isCorrect ? 'text-emerald-600' : 'text-red-600'
                          }`}
                        >
                          {feedback.points >= 0 ? `+${feedback.points}` : feedback.points} 分
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <GameCard
                    item={activeItem}
                    isSelected={selectedZone !== null}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                </div>

                {/* Quick Tap Buttons Panel (Extremely helpful on Mobile!) */}
                <div className="w-full mt-3.5 sm:mt-6 bg-white border border-slate-150 p-2.5 sm:p-4 rounded-2xl shadow-xs">
                  <span className="text-xs font-extrabold text-slate-400 block mb-2 sm:mb-3 text-center uppercase tracking-wide">
                    ⚡ 手機快速按鍵分類
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleQuickSort(InvoiceType.RECEIPT)}
                      className="py-2.5 sm:py-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 cursor-pointer"
                    >
                      🧾 分類為：收據
                    </button>
                    <button
                      onClick={() => handleQuickSort(InvoiceType.E_INVOICE)}
                      className="py-2.5 sm:py-3 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 cursor-pointer"
                    >
                      📄 分類為：電子發票
                    </button>
                    <button
                      onClick={() => handleQuickSort(InvoiceType.CLOUD_INVOICE)}
                      className="py-2.5 sm:py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 cursor-pointer"
                    >
                      ☁️ 分類為：雲端發票
                    </button>
                    <button
                      onClick={() => handleQuickSort(InvoiceType.BOMB)}
                      className="py-2.5 sm:py-3 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 cursor-pointer"
                    >
                      💣 分類為：危險物
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* State 3: Game Finished Scoreboard */}
        {gameStatus === GameStatus.FINISHED && (
          <ResultModal
            result={getGameResult()}
            onRestart={startGame}
            onViewInstructions={onViewInstructions}
          />
        )}
      </div>
    </section>
  );
}
