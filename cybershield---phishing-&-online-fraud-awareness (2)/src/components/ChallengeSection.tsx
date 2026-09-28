import React, { useState } from 'react';
import { 
  Compass, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, 
  Mail, MessageSquare, ShieldCheck, ExternalLink, HelpCircle, ChevronRight
} from 'lucide-react';
import { PHISHING_CHALLENGE_ITEMS } from '../data/challengeData';
import { useProgress } from '../context/ProgressContext';
import { NavTab } from '../types';

interface ChallengeSectionProps {
  onNavigate: (tab: NavTab) => void;
}

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({ onNavigate }) => {
  const { progress, recordChallengeAnswer } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [userSelected, setUserSelected] = useState<'genuine' | 'suspicious' | null>(null);

  const total = PHISHING_CHALLENGE_ITEMS.length;
  const currentItem = PHISHING_CHALLENGE_ITEMS[currentIndex];

  const handleVerdict = (choice: 'genuine' | 'suspicious') => {
    if (revealed) return;
    setUserSelected(choice);
    setRevealed(true);

    const isScam = currentItem.isSuspicious;
    const isCorrect = (choice === 'suspicious' && isScam) || (choice === 'genuine' && !isScam);
    recordChallengeAnswer(currentItem.id, choice, isCorrect);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
      setRevealed(false);
      setUserSelected(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setRevealed(false);
      setUserSelected(null);
    }
  };

  const completedCount = Object.keys(progress.completedChallenges).length;
  const correctCount = Object.values(progress.completedChallenges).filter(c => c.correct).length;

  const isScam = currentItem.isSuspicious;
  const isCorrect = (userSelected === 'suspicious' && isScam) || (userSelected === 'genuine' && !isScam);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>PHISHING SIMULATOR GAUNTLET</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Phishing or Genuine? Spot the Trap
        </h1>
        <p className="text-sm text-slate-300">
          Inspect realistic simulated emails, text messages, and alerts. Decide if each one is authentic or an attack.
        </p>
      </div>

      {/* Progress & Stat Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold">Challenge {currentIndex + 1} of {total}</span>
          <span className="text-slate-600">|</span>
          <span>{currentItem.format} Interface</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Completed: <strong className="text-white">{completedCount}/{total}</strong></span>
          <span>Accuracy: <strong className="text-emerald-400">{completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0}%</strong></span>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/30 space-y-6 shadow-2xl">
        
        {/* Realistic Mockup Header */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
          
          {/* Mock Client Top Bar */}
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-medium text-slate-300">Simulated {currentItem.format} Client</span>
            </div>
            <span>{currentItem.timestamp}</span>
          </div>

          {/* Sender & Subject info */}
          <div className="p-4 bg-slate-900/50 border-b border-slate-800/80 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-mono">From:</span>
              <span className="font-semibold text-white">{currentItem.senderDisplay} &lt;{currentItem.senderAddress}&gt;</span>
            </div>
            {currentItem.subject && (
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="text-slate-500 font-mono">Subject:</span>
                <span className="font-bold text-cyan-200">{currentItem.subject}</span>
              </div>
            )}
          </div>

          {/* Message Body Canvas */}
          <div className="p-6 bg-slate-950 text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
            {currentItem.body}

            {/* Embedded Link Preview */}
            {currentItem.embeddedLink && (
              <div className="mt-5 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-cyan-400 font-semibold underline flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{currentItem.embeddedLink.displayText}</span>
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                    Hover / Target Link
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  Destination URL: <code className="text-amber-300">{currentItem.embeddedLink.actualUrl}</code>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* User Choice Buttons (Genuine vs Suspicious) */}
        {!revealed ? (
          <div className="space-y-3 pt-2">
            <div className="text-center text-xs font-mono uppercase tracking-wider text-slate-400">
              What is your verdict on this message?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleVerdict('genuine')}
                className="py-4 px-6 rounded-xl font-bold text-sm bg-slate-900 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>✅ Genuine Message</span>
              </button>

              <button
                onClick={() => handleVerdict('suspicious')}
                className="py-4 px-6 rounded-xl font-bold text-sm bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-rose-950/40 hover:border-rose-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-rose-500/20"
              >
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>🚨 Suspicious / Scam</span>
              </button>
            </div>
          </div>
        ) : (
          /* Explanation Screen */
          <div className="space-y-5 animate-fadeIn">
            
            {/* Verdict Result Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isCorrect 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              <div className="mt-0.5">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold">
                  {isCorrect ? 'Correct Decision!' : 'Incorrect Judgment!'} You marked it as &ldquo;{userSelected}&rdquo;.
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentItem.verdictReason}
                </p>
              </div>
            </div>

            {/* Key Clues Breakdown */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Forensic Analysis & Clues:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentItem.keyClues.map((clue, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{clue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Lesson */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-300">
              <span className="font-bold text-cyan-300 block mb-0.5 font-mono">Defensive Takeaway:</span>
              <span>{currentItem.safetyLesson}</span>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrevious}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 cursor-pointer"
              >
                Previous
              </button>

              {currentIndex < total - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <span>Next Challenge ({currentIndex + 2}/{total})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/30"
                >
                  <span>View Dashboard Results</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
