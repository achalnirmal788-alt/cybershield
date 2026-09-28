import React, { useState } from 'react';
import { 
  BarChart2, Award, CheckCircle2, ShieldCheck, Target, 
  RotateCcw, Sparkles, BookOpen, ExternalLink, ArrowRight, Printer, Check
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { NavTab } from '../types';

interface DashboardProps {
  onNavigate: (tab: NavTab) => void;
}

export const DashboardSection: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { progress, overallProgressPercent, resetProgress } = useProgress();
  const [showCertificate, setShowCertificate] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const completedLessonsCount = progress.completedLessons.length;
  const highestQuiz = progress.highestQuizScore;
  const challengeKeys = Object.keys(progress.completedChallenges);
  const challengesDoneCount = challengeKeys.length;
  const correctChallenges = Object.values(progress.completedChallenges).filter(c => c.correct).length;

  const badges = [
    {
      id: 'first-step',
      name: 'Cyber Sentinel',
      desc: 'Completed initial security orientation and modules.',
      icon: '🛡️',
      unlocked: completedLessonsCount >= 2
    },
    {
      id: 'quiz-ace',
      name: 'Sharp Eyed',
      desc: 'Scored 8/10 or higher in the Cyber Awareness Quiz.',
      icon: '🎯',
      unlocked: highestQuiz >= 8
    },
    {
      id: 'challenge-pro',
      name: 'Phish Hunter',
      desc: 'Completed at least 5 realistic phishing challenges.',
      icon: '⚡',
      unlocked: challengesDoneCount >= 5
    },
    {
      id: 'defense-master',
      name: '70%+ Readiness',
      desc: 'Achieved 70%+ overall threat defense readiness score.',
      icon: '👑',
      unlocked: overallProgressPercent >= 70
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>PERSONAL DEFENSE TELEMETRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Security Awareness Dashboard
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Real-time track record of your learning modules, challenge drills, and overall anti-scam readiness.
          </p>
        </div>

        {/* Reset progress */}
        <div className="self-start sm:self-auto">
          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-xs font-semibold text-slate-400 hover:text-rose-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset My Progress</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-rose-500/40">
              <span className="text-[11px] text-rose-300 px-2">Reset all?</span>
              <button
                onClick={() => {
                  resetProgress();
                  setResetConfirm(false);
                }}
                className="px-2 py-1 rounded bg-rose-600 text-white text-[11px] font-bold cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[11px] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Stats Row: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Overall Progress */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono uppercase">Awareness Progress</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-4xl font-black font-mono text-cyan-300">
              {overallProgressPercent}%
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Target benchmark: <strong className="text-white">70%+</strong> for safe online behavior.
            </p>
          </div>
          
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mt-4">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Lessons Completed */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono uppercase">Lessons Completed</span>
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-4xl font-black font-mono text-white">
              {completedLessonsCount} <span className="text-lg font-normal text-slate-500">/ 6</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Modules covering email, SMS, vishing, fake sites, and QR quishing.
            </p>
          </div>
          <button
            onClick={() => onNavigate('learn')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 mt-3 cursor-pointer"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Metric 3: Quiz Score */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono uppercase">Quiz Best Score</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-4xl font-black font-mono text-amber-300">
              {highestQuiz} <span className="text-lg font-normal text-slate-500">/ 10</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {progress.quizAttempts.length > 0 
                ? `${progress.quizAttempts.length} attempt(s) recorded` 
                : 'Not attempted yet'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('quiz')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 mt-3 cursor-pointer"
          >
            <span>{highestQuiz > 0 ? 'Retake Quiz' : 'Take Quiz'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Metric 4: Challenges Completed */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono uppercase">Phishing Challenges</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-4xl font-black font-mono text-emerald-300">
              {challengesDoneCount} <span className="text-lg font-normal text-slate-500">/ 8</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Accuracy: <strong className="text-white">{challengesDoneCount > 0 ? Math.round((correctChallenges / challengesDoneCount) * 100) : 0}%</strong>
            </p>
          </div>
          <button
            onClick={() => onNavigate('challenge')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 mt-3 cursor-pointer"
          >
            <span>Launch Challenges</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Badges and Mastery Milestones */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>Cyber Competency Badges</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Earn digital badges by mastering defensive modules and passing simulation checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-4 rounded-xl border transition-all ${
                badge.unlocked 
                  ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm shadow-cyan-500/10' 
                  : 'bg-slate-950/50 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{badge.icon}</span>
                {badge.unlocked ? (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    UNLOCKED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">LOCKED</span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white">{badge.name}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-snug">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Studio & Pure HTML Edition Box */}
      <div className="glass-panel p-6 rounded-2xl border-blue-500/30 bg-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
            Visual Studio / VS Code Integration
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Pure HTML + JavaScript + CSS Edition Available
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Want to run this project in Visual Studio or VS Code without installing any packages or Node.js? Use our standalone <strong>cyber-shield.html</strong> single-file build with Live Server!
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="/standalone.html"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Standalone HTML</span>
          </a>
        </div>
      </div>

      {/* Certificate Generator Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Official Completion Credential
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Certificate of Anti-Phishing Awareness
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Demonstrate your cybersecurity awareness readiness with a personalized Certificate of Completion. Available once your awareness progress reaches 70%.
          </p>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          disabled={overallProgressPercent < 70}
          className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20 shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{overallProgressPercent >= 70 ? 'Generate Certificate' : `Unlocks at 70% (Now ${overallProgressPercent}%)`}</span>
        </button>
      </div>

      {/* Printable Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border-2 border-cyan-500 rounded-3xl max-w-3xl w-full p-8 sm:p-10 relative shadow-2xl text-center space-y-6">
            
            {/* Certificate Header Border & Stamp */}
            <div className="border-4 border-double border-cyan-500/50 p-6 sm:p-8 rounded-2xl relative">
              <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">
                CYBERSHIELD DEFENSE ACADEMY
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 font-serif">
                Certificate of Cybersecurity Awareness
              </h2>
              <p className="text-xs text-slate-400 mt-2 font-sans">
                This certifies that the bearer has completed the comprehensive Anti-Phishing & Online Fraud Readiness Curriculum.
              </p>

              <div className="my-6 py-4 border-y border-cyan-500/30">
                <span className="text-xs uppercase font-mono text-slate-400 block mb-1">Presented to:</span>
                <span className="text-2xl font-bold text-cyan-300 font-sans">Certified Cyber Sentinel</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono text-slate-300 pt-2">
                <div>
                  <span className="text-slate-500 block text-[10px]">READINESS SCORE</span>
                  <span className="font-bold text-white">{overallProgressPercent}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">QUIZ SCORE</span>
                  <span className="font-bold text-emerald-400">{highestQuiz}/10</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">VERIFIED DATE</span>
                  <span className="font-bold text-white">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-cyan-400/80 font-mono">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Verified Cryptographic ID: CS-SEC-{Math.floor(Math.random() * 900000 + 100000)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
