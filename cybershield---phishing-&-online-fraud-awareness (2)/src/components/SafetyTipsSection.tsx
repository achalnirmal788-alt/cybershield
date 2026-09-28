import React, { useState } from 'react';
import { 
  ShieldCheck, ExternalLink, KeyRound, Globe2, Lock, ShieldAlert, 
  RefreshCw, CheckCircle2, AlertTriangle, Eye, EyeOff, Sparkles, ArrowRight
} from 'lucide-react';
import { SAFETY_RULES, URL_INSPECTION_EXAMPLES } from '../data/safetyTipsData';
import { useProgress } from '../context/ProgressContext';
import { NavTab } from '../types';

interface SafetyTipsProps {
  onNavigate: (tab: NavTab) => void;
}

export const SafetyTipsSection: React.FC<SafetyTipsProps> = ({ onNavigate }) => {
  const { progress, toggleSafetyChecklist } = useProgress();
  const [testPassword, setTestPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeUrlIndex, setActiveUrlIndex] = useState(0);

  const getRuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'ExternalLink': return <ExternalLink className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'KeyRound': return <KeyRound className="w-5 h-5" />;
      case 'Globe2': return <Globe2 className="w-5 h-5" />;
      case 'Lock': return <Lock className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5" />;
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  // Password evaluation algorithm
  const evaluatePassword = (pwd: string) => {
    let score = 0;
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd)
    };

    if (checks.length) score += 2;
    if (pwd.length >= 16) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.lowercase) score += 1;
    if (checks.numbers) score += 1;
    if (checks.special) score += 1;

    let strength: 'Weak' | 'Moderate' | 'Strong' | 'Unbreakable' = 'Weak';
    let color = 'text-rose-400';
    let barColor = 'bg-rose-500';

    if (score >= 6) {
      strength = 'Unbreakable';
      color = 'text-emerald-400';
      barColor = 'bg-emerald-500';
    } else if (score >= 4) {
      strength = 'Strong';
      color = 'text-cyan-400';
      barColor = 'bg-cyan-500';
    } else if (score >= 2) {
      strength = 'Moderate';
      color = 'text-amber-400';
      barColor = 'bg-amber-500';
    }

    return { score, checks, strength, color, barColor };
  };

  const passwordEvaluation = evaluatePassword(testPassword);
  const activeUrlSample = URL_INSPECTION_EXAMPLES[activeUrlIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CYBER DEFENSE PLAYBOOK // 7 GOLDEN RULES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How to Stay Safe: The 7 Golden Rules
        </h1>
        <p className="mt-3 text-slate-300 text-base">
          Proven daily habits and interactive security tools to safeguard your financial accounts, passwords, and devices.
        </p>
      </div>

      {/* The 7 Golden Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAFETY_RULES.map((rule) => {
          const isChecked = !!progress.safetyChecklist[rule.id];
          return (
            <div 
              key={rule.id}
              className="glass-panel p-6 rounded-2xl border-cyan-500/20 flex flex-col justify-between space-y-4 hover:border-cyan-400/40 transition-all relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {getRuleIcon(rule.icon)}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">RULE #{rule.number}</span>
                  </div>
                  
                  {/* Interactive checklist toggle */}
                  <button
                    onClick={() => toggleSafetyChecklist(rule.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isChecked
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                    title="Toggle your personal practice of this rule"
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{isChecked ? 'I Practice This' : 'Mark Practiced'}</span>
                  </button>
                </div>

                <div>
                  <h2 className="text-base font-bold text-white tracking-wide">{rule.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">{rule.tagline}</p>
                </div>

                {/* Do's and Don'ts */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">ALWAYS:</span>
                    <ul className="space-y-1 text-slate-300 pl-2 border-l border-emerald-500/30">
                      {rule.doList.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="leading-snug">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">NEVER:</span>
                    <ul className="space-y-1 text-slate-300 pl-2 border-l border-rose-500/30">
                      {rule.dontList.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="leading-snug">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                <span className="font-bold text-cyan-400 font-mono">Expert Tip: </span>
                {rule.proTip}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Tools Section */}
      <div className="space-y-6 pt-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">Interactive Security Tools</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Practice With Interactive Security Simulators
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Test password strength dynamics and practice analyzing deceptively crafted web addresses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tool 1: Password Strength Meter */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Password Strength Analyzer</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Offline Local Test
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Type or test a sample password to inspect entropy, complexity, and resistance to brute-force credential stuffing.
            </p>

            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="e.g. Cobalt#Forest$982"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength Meter Bar */}
              {testPassword && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Calculated Strength:</span>
                    <span className={`font-bold ${passwordEvaluation.color}`}>
                      {passwordEvaluation.strength} ({passwordEvaluation.score}/7 pts)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${passwordEvaluation.barColor}`}
                      style={{ width: `${Math.min(100, (passwordEvaluation.score / 7) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Requirement Checkpoints */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                  passwordEvaluation.checks.length ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>12+ Characters</span>
                </div>
                <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                  passwordEvaluation.checks.uppercase ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Uppercase [A-Z]</span>
                </div>
                <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                  passwordEvaluation.checks.numbers ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Numbers [0-9]</span>
                </div>
                <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                  passwordEvaluation.checks.special ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Symbols (!@#$)</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                💡 <strong>Tip:</strong> Rather than hard-to-type gibberish, use a 4-word passphrase like <code className="text-cyan-300">Coffee#Bicycle-Planet-Dance88</code>.
              </div>
            </div>
          </div>

          {/* Tool 2: URL Domain Inspector */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">URL & Domain Inspector</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                Interactive Analyzer
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Scammers insert brand names into subdomains to trick you. Click below to inspect real vs lookalike URLs:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {URL_INSPECTION_EXAMPLES.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveUrlIndex(idx)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
                    activeUrlIndex === idx
                      ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Example {idx + 1}
                </button>
              ))}
            </div>

            {/* URL Breakdown Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
              <div className="text-xs text-slate-500">Address Bar Simulation:</div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm break-all font-mono text-white flex items-center justify-between">
                <span>{activeUrlSample.display}</span>
                {activeUrlSample.isLegitimate ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded shrink-0 ml-2">
                    GENUINE
                  </span>
                ) : (
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded shrink-0 ml-2">
                    FAKE / PHISHING
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Actual Host Domain:</span>
                  <span className={`font-bold ${activeUrlSample.isLegitimate ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {activeUrlSample.domain}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1 border-t border-slate-800">
                  {activeUrlSample.notes}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-slate-400">Ready to test in live challenges?</span>
              <button
                onClick={() => onNavigate('challenge')}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Phishing Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
