import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Landmark, 
  Smartphone, 
  Globe, 
  Headset, 
  Key, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  AlertOctagon, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  PhoneCall, 
  Eye, 
  Lock, 
  Play, 
  RotateCcw, 
  Check, 
  X,
  ExternalLink,
  Info
} from 'lucide-react';
import { 
  BANK_KYC_PROCESS_STAGES, 
  BANK_KYC_SIMULATOR_STEPS, 
  REAL_SCAM_MESSAGES, 
  OFFICIAL_KYC_RULES,
  ScamMessageItem
} from '../data/bankKycData';
import { NavTab } from '../types';

interface ScamAndKycProps {
  onNavigate: (tab: NavTab) => void;
}

export const ScamAndKycSection: React.FC<ScamAndKycProps> = ({ onNavigate }) => {
  // Main sub-view tab
  const [activeTab, setActiveTab] = useState<'messages' | 'kyc-process' | 'kyc-sim' | 'rules'>('messages');

  // Real scam messages filters
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [selectedMessageId, setSelectedMessageId] = useState<string>(REAL_SCAM_MESSAGES[0].id);
  const [showRedFlags, setShowRedFlags] = useState<boolean>(true);

  // KYC Process active phase
  const [activePhase, setActivePhase] = useState<number>(1);

  // KYC Simulator state
  const [simStepIndex, setSimStepIndex] = useState<number>(0);
  const [simAnswerGiven, setSimAnswerGiven] = useState<string | null>(null);
  const [simFeedback, setSimFeedback] = useState<string | null>(null);
  const [simCompleted, setSimCompleted] = useState<boolean>(false);

  const selectedMessage = REAL_SCAM_MESSAGES.find(m => m.id === selectedMessageId) || REAL_SCAM_MESSAGES[0];

  const filteredMessages = channelFilter === 'all' 
    ? REAL_SCAM_MESSAGES 
    : REAL_SCAM_MESSAGES.filter(m => m.channel.toLowerCase() === channelFilter.toLowerCase());

  const currentSimStep = BANK_KYC_SIMULATOR_STEPS[simStepIndex];

  const handleSimAction = (choice: 'reject' | 'report' | 'block') => {
    setSimAnswerGiven(choice);
    if (choice === currentSimStep.correctChoice || (choice === 'report' && currentSimStep.correctChoice === 'reject')) {
      setSimFeedback('CORRECT! You spotted the danger and took the safe action.');
    } else {
      setSimFeedback('DEFENSE ALERT: High risk! A scammer would exploit this.');
    }
  };

  const handleNextSimStep = () => {
    if (simStepIndex < BANK_KYC_SIMULATOR_STEPS.length - 1) {
      setSimStepIndex(prev => prev + 1);
      setSimAnswerGiven(null);
      setSimFeedback(null);
    } else {
      setSimCompleted(true);
    }
  };

  const resetSim = () => {
    setSimStepIndex(0);
    setSimAnswerGiven(null);
    setSimFeedback(null);
    setSimCompleted(false);
  };

  const getPhaseIcon = (name: string) => {
    switch (name) {
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Headset': return <Headset className="w-5 h-5 text-purple-400" />;
      case 'Key': return <Key className="w-5 h-5 text-rose-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-red-500" />;
      default: return <Landmark className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-400 text-xs font-mono mb-3">
          <AlertOctagon className="w-3.5 h-3.5 animate-pulse" />
          <span>THREAT INTELLIGENCE & BANK FRAUD DOSSIER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Scam Messages & Bank KYC Scam Process
        </h1>
        <p className="mt-3 text-slate-300 text-base leading-relaxed">
          Inspect real-world fraudulent SMS, WhatsApp, & email messages, and master the full 5-stage anatomy of dangerous Bank KYC verification fraud.
        </p>
      </div>

      {/* Primary Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-3xl mx-auto">
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>1. Real Scam Messages Showcase</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc-process')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'kyc-process'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>2. Bank KYC Scam Process</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc-sim')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'kyc-sim'
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>3. KYC Simulator (Sandbox)</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'rules'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>4. Official Bank Advisory</span>
        </button>
      </div>

      {/* TAB 1: REAL SCAM MESSAGES GALLERY & RED FLAG INSPECTOR */}
      {activeTab === 'messages' && (
        <div className="space-y-8">
          
          {/* Channel Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-mono text-slate-400 uppercase mr-2 hidden sm:inline">Filter Channel:</span>
              {(['all', 'SMS', 'WhatsApp', 'UPI', 'Email', 'Phone'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setChannelFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    channelFilter === filter
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {filter === 'all' ? 'All Channels (8)' : filter}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRedFlags(!showRedFlags)}
                className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition-all ${
                  showRedFlags
                    ? 'bg-rose-950/40 text-rose-300 border-rose-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showRedFlags ? 'Red Flags Highlighted (Active)' : 'Show Clean Message'}</span>
              </button>
            </div>
          </div>

          {/* Grid Layout: Left List + Right Phone Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Message Selector List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
                Select a real scam sample to inspect:
              </div>
              <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                {filteredMessages.map((msg) => {
                  const isSelected = msg.id === selectedMessageId;
                  return (
                    <button
                      key={msg.id}
                      onClick={() => setSelectedMessageId(msg.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            msg.channel === 'SMS' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                            msg.channel === 'WhatsApp' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            msg.channel === 'UPI' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {msg.channel}
                          </span>
                          <span className="text-xs font-bold text-white truncate">{msg.category}</span>
                        </div>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          msg.riskLevel === 'Severe' ? 'text-rose-400 bg-rose-950/40' : 'text-amber-400 bg-amber-950/40'
                        }`}>
                          {msg.riskLevel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        &ldquo;{msg.messageBody}&rdquo;
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/50">
                        <span className="truncate">Sender: {msg.senderDisplay}</span>
                        <span>{msg.receivedTime}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Detailed Simulated Message Device & Clue Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Realistic Mobile / App Viewport */}
              <div className="rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-950/30">
                {/* Phone Top Notch Bar */}
                <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-mono text-[11px] text-slate-300">Simulated {selectedMessage.channel} Message</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                    <AlertTriangle className="w-3 h-3" />
                    <span>SCAM THREAT DETECTED</span>
                  </div>
                </div>

                {/* Message Header Info */}
                <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase font-mono block">Sender Identifier:</span>
                    <span className="text-sm font-semibold text-rose-300 font-mono flex items-center gap-1.5">
                      {selectedMessage.senderDisplay}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">{selectedMessage.receivedTime}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Category: {selectedMessage.category}
                  </span>
                </div>

                {/* Actual Message Body with Red-Flag Callouts */}
                <div className="p-6 bg-slate-950 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm leading-relaxed font-sans relative">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1.5 font-semibold">
                      Full Message Content:
                    </span>
                    
                    <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-normal">
                      &ldquo;{selectedMessage.messageBody}&rdquo;
                    </p>

                    {selectedMessage.maliciousLink && (
                      <div className="mt-3 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-center justify-between gap-2 text-xs">
                        <span className="font-mono text-rose-300 truncate">
                          Malicious Payload / Action: {selectedMessage.maliciousLink}
                        </span>
                        <span className="shrink-0 text-[10px] font-mono bg-rose-500/30 text-rose-200 px-2 py-0.5 rounded uppercase font-bold">
                          DANGER
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Highlights Clues */}
                  {showRedFlags && (
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Warning Signs & Clues in this Message:</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedMessage.highlightKeywords.map((kw, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-rose-950/60 text-rose-300 border border-rose-500/30"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                            <span>Trap: &ldquo;{kw}&rdquo;</span>
                          </span>
                        ))}
                      </div>

                      {/* Psychological Trigger & Hidden Threat */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                          <span className="font-bold text-cyan-300 block">Psychological Hook:</span>
                          <p className="text-slate-300 leading-relaxed">
                            {selectedMessage.psychologicalTrigger}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 text-xs space-y-1">
                          <span className="font-bold text-rose-300 block">Hidden Attack Mechanism:</span>
                          <ul className="text-slate-300 space-y-1 list-disc list-inside">
                            {selectedMessage.hiddenDangers.map((danger, dIdx) => (
                              <li key={dIdx} className="leading-relaxed">{danger}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Safe Action Checklist */}
                      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-emerald-300 text-sm block mb-1">
                            Safe Action / What You Should Do:
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {selectedMessage.safeActionGuideline}
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: COMPLETE BANK KYC SCAM PROCESS DEEP-DIVE */}
      {activeTab === 'kyc-process' && (
        <div className="space-y-10">
          
          {/* Overview Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/40 border border-rose-500/30 relative overflow-hidden">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-mono uppercase font-semibold">
                <Landmark className="w-4 h-4" />
                <span>Critical Cyber Threat Dossier // Banking Frauds</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                How the Bank KYC Scam Works (5-Stage Lifecycle)
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Bank KYC fraud is responsible for over ₹1,200 Crores ($150M) in stolen customer savings annually. Fraudsters combine urgent SMS threats, cloned web portals, remote desktop Trojan apps, and OTP interception to drain bank accounts in less than 3 minutes.
              </p>
            </div>
          </div>

          {/* 5-Step Process Timeline Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {BANK_KYC_PROCESS_STAGES.map((stage) => {
              const isSelected = stage.phase === activePhase;
              return (
                <button
                  key={stage.phase}
                  onClick={() => setActivePhase(stage.phase)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-950/90 border-rose-500 text-white shadow-lg shadow-rose-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isSelected ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Phase 0{stage.phase}
                    </span>
                    {getPhaseIcon(stage.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white truncate">
                      {stage.title.split(':')[1] || stage.title}
                    </span>
                    <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {stage.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive Card */}
          {(() => {
            const currentStage = BANK_KYC_PROCESS_STAGES.find(s => s.phase === activePhase) || BANK_KYC_PROCESS_STAGES[0];
            return (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border-rose-500/30 space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono">
                      <span>PHASE {currentStage.phase} OF 5</span>
                      <span>&bull;</span>
                      <span className="text-slate-400">KYC Attack Architecture</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">{currentStage.title}</h3>
                    <p className="text-sm text-slate-400">{currentStage.subtitle}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 self-start sm:self-auto">
                    {getPhaseIcon(currentStage.iconName)}
                  </div>
                </div>

                {/* 3-Column Technical Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-mono uppercase text-rose-400 font-semibold block">
                      1. Scammer's Tactic:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentStage.scammerTactic}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-mono uppercase text-amber-400 font-semibold block">
                      2. What Victim Experiences:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentStage.victimExperience}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-2">
                    <span className="text-xs font-mono uppercase text-cyan-400 font-semibold block">
                      3. Under the Hood (Technical):
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentStage.underTheHood}
                    </p>
                  </div>
                </div>

                {/* Critical Red Flags */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                    <span>How to Spot this Stage Immediately:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {currentStage.redFlags.map((flag, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-rose-400 font-bold shrink-0 mt-0.5">&#10006;</span>
                        <span className="leading-relaxed">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Golden Rule Banner */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-300 text-sm block mb-1">
                      Golden Defense Rule for Phase {currentStage.phase}:
                    </span>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                      {currentStage.goldenRule}
                    </p>
                  </div>
                </div>

                {/* Timeline Next / Prev Step */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <button
                    disabled={activePhase === 1}
                    onClick={() => setActivePhase(p => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Phase</span>
                  </button>

                  <button
                    disabled={activePhase === 5}
                    onClick={() => setActivePhase(p => Math.min(5, p + 1))}
                    className="px-3 py-1.5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-900/60 cursor-pointer flex items-center gap-1 font-semibold"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })()}

        </div>
      )}

      {/* TAB 3: INTERACTIVE BANK KYC SCAM SIMULATOR (SAFE SANDBOX) */}
      {activeTab === 'kyc-sim' && (
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-400">
              SAFE SANDBOX SIMULATOR // ZERO RISK
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Experience a Real Bank KYC Scam Safely
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Step into the shoes of a target. Test whether you can spot the traps at each critical turning point of the scam.
            </p>
          </div>

          {!simCompleted ? (
            <div className="glass-panel rounded-2xl border-indigo-500/30 overflow-hidden shadow-2xl space-y-6">
              
              {/* Simulator Header & Step Progress */}
              <div className="bg-slate-900/80 p-4 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-indigo-400 font-bold">
                  SIMULATION STEP {simStepIndex + 1} OF {BANK_KYC_SIMULATOR_STEPS.length}
                </span>
                <span className="text-slate-400">{currentSimStep.headerText}</span>
              </div>

              {/* Step Title & Simulation Screen Frame */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{currentSimStep.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Carefully observe what the fraudster presents:</p>
                </div>

                {/* Render specific screen based on type */}
                {currentSimStep.screenType === 'sms' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
                      <span>Sender: <strong className="text-rose-400">{currentSimStep.interactiveContent?.sender}</strong></span>
                      <span>Today 11:32 AM</span>
                    </div>
                    <p className="text-slate-200 text-sm font-sans leading-relaxed">
                      &ldquo;{currentSimStep.interactiveContent?.message}&rdquo;
                    </p>
                    <div className="p-2 rounded bg-rose-950/30 text-rose-300 border border-rose-500/30 text-xs">
                      Suspicious Link: {currentSimStep.interactiveContent?.url}
                    </div>
                  </div>
                )}

                {currentSimStep.screenType === 'browser' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-amber-300 truncate">{currentSimStep.interactiveContent?.url}</span>
                    </div>
                    <div className="p-4 rounded bg-slate-900 space-y-3 font-sans">
                      <div className="text-xs font-bold text-white">Bank Digital KYC Verification Form</div>
                      {currentSimStep.interactiveContent?.formFields?.map((field, fIdx) => (
                        <div key={fIdx} className="space-y-1">
                          <label className="text-[11px] text-slate-400 flex items-center justify-between">
                            <span>{field.label}</span>
                            {field.isSensitive && <span className="text-[10px] text-rose-400 font-mono font-bold">HIGH RISK SENSITIVE</span>}
                          </label>
                          <input 
                            readOnly
                            disabled
                            placeholder={field.placeholder}
                            className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-400 cursor-not-allowed"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentSimStep.screenType === 'caller' && (
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto animate-pulse">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">Incoming Call...</span>
                      <span className="text-base font-bold text-white block">{currentSimStep.interactiveContent?.callerName}</span>
                      <span className="text-xs text-slate-500 font-mono">{currentSimStep.interactiveContent?.callerNumber}</span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-900 text-left text-xs text-slate-300 leading-relaxed border border-slate-800 italic">
                      {currentSimStep.interactiveContent?.audioScript}
                    </div>
                  </div>
                )}

                {currentSimStep.screenType === 'otp' && (
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="text-xs font-mono text-rose-400 font-semibold flex items-center gap-1.5">
                      <Key className="w-4 h-4" />
                      <span>INCOMING CRITICAL BANK ALERT:</span>
                    </div>
                    <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-200 text-sm font-mono leading-relaxed">
                      {currentSimStep.interactiveContent?.otpNotification}
                    </div>
                  </div>
                )}

                {currentSimStep.screenType === 'outcome' && (
                  <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Full Scam Sequence Completed!</h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                      {currentSimStep.scamAnalysis}
                    </p>
                  </div>
                )}

                {/* Analysis Box */}
                {currentSimStep.screenType !== 'outcome' && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
                    <span className="text-cyan-400 font-mono font-semibold flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>Security Analyst Deconstruction:</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {currentSimStep.scamAnalysis}
                    </p>
                  </div>
                )}

                {/* Action Decision Buttons */}
                {currentSimStep.screenType !== 'outcome' && !simAnswerGiven && (
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-white text-center font-mono">
                      {currentSimStep.safetyCheckQuestion}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        onClick={() => handleSimAction('reject')}
                        className="px-4 py-2.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 hover:bg-rose-900 text-xs font-bold cursor-pointer transition-all"
                      >
                        Reject &amp; Disconnect
                      </button>
                      <button
                        onClick={() => handleSimAction('report')}
                        className="px-4 py-2.5 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 text-xs font-bold cursor-pointer transition-all"
                      >
                        Report to 1930 / Bank
                      </button>
                      <button
                        onClick={() => handleSimAction('block')}
                        className="px-4 py-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900 text-xs font-bold cursor-pointer transition-all"
                      >
                        Close &amp; Block Sender
                      </button>
                    </div>
                  </div>
                )}

                {/* Feedback & Proceed to Next Step */}
                {(simAnswerGiven || currentSimStep.screenType === 'outcome') && (
                  <div className="space-y-4 pt-2">
                    {simFeedback && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">
                        {simFeedback}
                      </div>
                    )}
                    <button
                      onClick={handleNextSimStep}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                    >
                      <span>{simStepIndex === BANK_KYC_SIMULATOR_STEPS.length - 1 ? 'Finish Simulation' : 'Advance to Next Step'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>

            </div>
          ) : (
            /* Simulator Completed Badge */
            <div className="glass-panel p-8 rounded-2xl border-emerald-500/40 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                  ACHIEVEMENT UNLOCKED // SIMULATION PASSED
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  Bank KYC Scam Defender Certification
                </h3>
                <p className="text-slate-300 text-sm max-w-lg mx-auto">
                  You successfully navigated the 5 stages of Bank KYC fraud without surrendering credentials, installing rogue software, or releasing OTPs!
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={resetSim}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Simulation</span>
                </button>
                <button
                  onClick={() => onNavigate('detect')}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer shadow-md shadow-cyan-500/20 flex items-center gap-2"
                >
                  <span>Practice Scam Detection Sandbox</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 4: OFFICIAL BANK ADVISORY & DEFENSE PROTOCOL */}
      {activeTab === 'rules' && (
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400">
              REGULATORY COMPLIANCE // CENTRAL BANK ADVISORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Official Guidelines & Re-KYC Rules
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Follow established guidelines set by the Reserve Bank of India (RBI), Federal Trade Commission (FTC), and banking regulators worldwide.
            </p>
          </div>

          <div className="space-y-4">
            {OFFICIAL_KYC_RULES.map((ruleItem, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold font-mono text-xs">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{ruleItem.rule}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{ruleItem.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Golden Hour Box */}
          <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
              <PhoneCall className="w-4 h-4" />
              <span>EMERGENCY PROTOCOL // IF MONEY WAS DEBITED</span>
            </div>
            <h3 className="text-xl font-bold text-white">The 2-Hour Golden Hour Protocol</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              If you accidentally entered your card details, ATM PIN, or shared an OTP:
            </p>
            <ol className="text-xs sm:text-sm text-slate-300 space-y-2 list-decimal list-inside">
              <li><strong>Dial 1930 immediately</strong> (India Cybercrime Financial Fraud Helpline) or report to <strong>cybercrime.gov.in</strong> / <strong>IC3.gov</strong>.</li>
              <li>Call your bank's official 24x7 emergency helpline to freeze all debit cards and block net-banking access.</li>
              <li>Provide police with transaction reference IDs (UTR numbers) so they can instantly freeze the money mule accounts before withdrawals occur.</li>
            </ol>
          </div>

        </div>
      )}

      {/* Global Bottom Navigation Footer */}
      <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('learn')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold cursor-pointer flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&larr; Back to Phishing Learning</span>
        </button>

        <button
          onClick={() => onNavigate('detect')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-bold cursor-pointer shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
        >
          <span>Proceed to Scam Detection Practice &rarr;</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
