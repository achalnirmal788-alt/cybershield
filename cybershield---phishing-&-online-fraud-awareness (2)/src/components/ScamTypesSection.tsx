import React, { useState } from 'react';
import { 
  AlertTriangle, Landmark, Briefcase, ShoppingBag, Trophy, 
  QrCode, Headset, UserX, AlertOctagon, Check, ArrowRight, ShieldCheck, Phone
} from 'lucide-react';
import { COMMON_SCAM_TYPES } from '../data/scamTypesData';
import { NavTab } from '../types';

interface ScamTypesProps {
  onNavigate: (tab: NavTab) => void;
}

export const ScamTypesSection: React.FC<ScamTypesProps> = ({ onNavigate }) => {
  const [selectedScamId, setSelectedScamId] = useState<string>(COMMON_SCAM_TYPES[0].id);

  const getScamIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'QrCode': return <QrCode className="w-5 h-5" />;
      case 'Headset': return <Headset className="w-5 h-5" />;
      case 'UserX': return <UserX className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const activeScam = COMMON_SCAM_TYPES.find(s => s.id === selectedScamId) || COMMON_SCAM_TYPES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-400 text-xs font-mono mb-3">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>THREAT INTELLIGENCE DOSSIER // 7 FRAUD MODES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Common Online Frauds & Scam Tactics
        </h1>
        <p className="mt-3 text-slate-300 text-base">
          Analyze real-world scam anatomy across banking, employment, online shopping, UPI apps, and social networks.
        </p>
      </div>

      {/* Main Grid: Left Nav + Right Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Scam Selector Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
            Select a scam category to analyze:
          </div>
          {COMMON_SCAM_TYPES.map((scam) => {
            const isSelected = scam.id === selectedScamId;
            return (
              <button
                key={scam.id}
                onClick={() => setSelectedScamId(scam.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2.5 rounded-lg shrink-0 ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {getScamIcon(scam.icon)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white truncate">{scam.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                      {scam.category} &bull; {scam.samplePreview.channel}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    scam.riskLevel === 'Severe' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {scam.riskLevel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Deep Analysis Panel */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/30 space-y-6">
          
          {/* Header of Active Scam */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>{activeScam.category}</span>
                <span>&bull;</span>
                <span className="text-rose-400 font-semibold">{activeScam.riskLevel} Risk</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{activeScam.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{activeScam.subtitle}</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 self-start sm:self-auto">
              {getScamIcon(activeScam.icon)}
            </div>
          </div>

          {/* Realistic Visual Message Simulator Box */}
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Simulated {activeScam.samplePreview.channel} Message</span>
              </span>
              <span className="text-[11px] text-slate-500">Sender: {activeScam.samplePreview.sender}</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-sm font-sans text-slate-200 leading-relaxed">
              <div className="text-xs text-cyan-400 font-mono mb-1 font-semibold">
                Incoming Notification:
              </div>
              &ldquo;{activeScam.samplePreview.message}&rdquo;
              {activeScam.samplePreview.linkOrCallToAction && (
                <div className="mt-2 text-xs font-mono text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-500/30 flex items-center justify-between">
                  <span className="truncate">Malicious Trap: {activeScam.samplePreview.linkOrCallToAction}</span>
                  <span className="text-[10px] bg-rose-500/30 px-1.5 py-0.5 rounded text-rose-200">FRAUD</span>
                </div>
              )}
            </div>
          </div>

          {/* Modus Operandi (How the scam works) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Modus Operandi (Attack Execution Steps)</span>
            </h3>
            <ol className="space-y-2 text-xs text-slate-300">
              {activeScam.modusOperandi.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Warning Flags */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Critical Red Warning Flags</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {activeScam.warningFlags.map((flag, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">&#10006;</span>
                  <span className="leading-relaxed">{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate Action Checklist */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-300 block text-sm mb-1">
                Immediate Safe Response:
              </span>
              <p className="leading-relaxed text-slate-300">
                {activeScam.immediateAction}
              </p>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs">
            <button
              onClick={() => onNavigate('detect')}
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Practice detecting red flags in sample messages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-rose-400" />
              <span>Already targeted? View Helplines</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
