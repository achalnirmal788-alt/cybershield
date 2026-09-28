import React, { useState } from 'react';
import { 
  BookOpen, Mail, MessageSquare, PhoneCall, Share2, Globe, QrCode, 
  CheckCircle, ArrowRight, ShieldCheck, ChevronRight, AlertCircle, Info 
} from 'lucide-react';
import { PHISHING_OVERVIEW, PHISHING_TYPES } from '../data/learningData';
import { useProgress } from '../context/ProgressContext';
import { NavTab } from '../types';

interface LearnSectionProps {
  onNavigate: (tab: NavTab) => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({ onNavigate }) => {
  const [activeTypeId, setActiveTypeId] = useState<string>(PHISHING_TYPES[0].id);
  const [activeLifecycleStep, setActiveLifecycleStep] = useState<number>(1);
  const { progress, markLessonComplete } = useProgress();

  const activeType = PHISHING_TYPES.find(t => t.id === activeTypeId) || PHISHING_TYPES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail': return <Mail className="w-5 h-5" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'QrCode': return <QrCode className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleMarkLearned = (id: string) => {
    markLessonComplete(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>CYBER ACADEMY // FOUNDATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Learn About Phishing & Social Engineering
        </h1>
        <p className="mt-3 text-slate-300 text-base leading-relaxed">
          Master what phishing is, how attackers craft deceptive lures, and explore the 6 fundamental phishing vectors with interactive real-world simulations.
        </p>
      </div>

      {/* Part 1: What is Phishing? */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border-cyan-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[90px] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-wider uppercase font-semibold">
              <Info className="w-4 h-4" />
              <span>Core Definition</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What is Phishing?
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              {PHISHING_OVERVIEW.definition}
            </p>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-300 space-y-2">
              <p className="font-semibold text-white">Why does the spelling use &ldquo;Ph&rdquo;?</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                The term originated in the mid-1990s among early hackers (&ldquo;phreakers&rdquo;) who &ldquo;fished&rdquo; for AOL passwords by dangling fake lures (such as posing as system administrators). Today, it has evolved into a multi-billion dollar criminal industry using artificial intelligence, domain impersonation, and psychological coercion.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {PHISHING_OVERVIEW.dangerStats.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-center flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">{item.stat}</div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: How Phishing Works (Interactive Lifecycle) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">The Attack Cycle</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              How Phishing Works (5 Attack Stages)
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Click each stage to see how cybercriminals transition from scouting targets to draining bank accounts.
          </p>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PHISHING_OVERVIEW.lifecycleStages.map((stage) => {
            const isSelected = activeLifecycleStep === stage.step;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveLifecycleStep(stage.step)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    STEP 0{stage.step}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate text-white">{stage.name}</div>
              </button>
            );
          })}
        </div>

        {/* Stage Content Card */}
        {(() => {
          const stage = PHISHING_OVERVIEW.lifecycleStages.find(s => s.step === activeLifecycleStep) || PHISHING_OVERVIEW.lifecycleStages[0];
          return (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/30 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 font-mono text-2xl font-black shadow-inner shadow-cyan-500/20">
                0{stage.step}
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Attack Stage Execution</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{stage.name}</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {stage.desc}
                </p>
              </div>
              <div className="shrink-0 flex gap-2">
                <button
                  disabled={activeLifecycleStep <= 1}
                  onClick={() => setActiveLifecycleStep(prev => prev - 1)}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={activeLifecycleStep >= 5}
                  onClick={() => setActiveLifecycleStep(prev => prev + 1)}
                  className="px-3 py-2 rounded-lg bg-cyan-600 border border-cyan-500 text-xs font-bold text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-500 cursor-pointer"
                >
                  Next Step
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Part 3: Types of Phishing (Detailed Breakdown) */}
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">Attack Vectors</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The 6 Primary Types of Phishing
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Examine the distinct mechanics, warning signs, and defenses for each attack channel.
          </p>
        </div>

        {/* Channels Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PHISHING_TYPES.map((type) => {
            const isSelected = activeTypeId === type.id;
            const isCompleted = progress.completedLessons.includes(type.id);
            return (
              <button
                key={type.id}
                onClick={() => setActiveTypeId(type.id)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isCompleted && (
                  <span className="absolute top-2 right-2 text-emerald-400" title="Completed lesson">
                    <CheckCircle className="w-4 h-4 fill-emerald-500/20" />
                  </span>
                )}
                <div className={`p-2 rounded-lg w-fit mb-3 ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {getIcon(type.icon)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">{type.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{type.alias}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Type Deep Dive Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {getIcon(activeType.icon)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{activeType.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {activeType.severity} Threat
                  </span>
                </div>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">{activeType.alias}</p>
              </div>
            </div>

            {/* Mark as Learned Button */}
            <button
              onClick={() => handleMarkLearned(activeType.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto ${
                progress.completedLessons.includes(activeType.id)
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>
                {progress.completedLessons.includes(activeType.id) ? 'Completed (Tracked in Dashboard)' : 'Mark Lesson as Completed'}
              </span>
            </button>
          </div>

          <p className="text-slate-300 text-base leading-relaxed">
            {activeType.fullDesc}
          </p>

          {/* Real World Scenario Simulation */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 relative">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold mb-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>REAL-WORLD ATTACK SIMULATION</span>
            </div>
            <p className="text-sm font-mono text-slate-200 bg-slate-950/70 p-3 rounded-lg border border-slate-800">
              {activeType.realWorldScenario}
            </p>
          </div>

          {/* Two Columns: How it works vs Key Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <ChevronRight className="w-4 h-4 text-cyan-400" />
                <span>HOW THE FRAUDSTER EXECUTES IT</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeType.howItWorks.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>TELLTALE WARNING INDICATORS</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeType.keyIndicators.map((ind, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold mt-0.5">&#10003;</span>
                    <span className="leading-relaxed">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Action inside card */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800">
            <span>Module Completed? Advance to threat analysis.</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('scam-types')}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Proceed to Scam Messages &amp; Bank KYC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Progression Footer Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('login')}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold cursor-pointer flex items-center justify-center gap-2"
        >
          <span>&larr; Back to Login &amp; Register</span>
        </button>

        <div className="text-center sm:text-right">
          <span className="text-xs text-slate-400 block">Up next in curriculum:</span>
          <span className="text-sm font-bold text-white">Scam Messages &amp; Bank KYC Process</span>
        </div>

        <button
          onClick={() => onNavigate('scam-types')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
        >
          <span>Proceed to Threat Intelligence &rarr;</span>
        </button>
      </div>

    </div>
  );
};
