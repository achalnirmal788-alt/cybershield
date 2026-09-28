import React, { useState } from 'react';
import { 
  PhoneCall, ShieldAlert, AlertTriangle, ExternalLink, Copy, Check, 
  CreditCard, Key, SmartphoneNfc, FileText, Globe
} from 'lucide-react';
import { EMERGENCY_RESPONSE_STEPS, OFFICIAL_AUTHORITIES } from '../data/reportingData';

export const ReportSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getStepIcon = (icon: string) => {
    switch (icon) {
      case 'CreditCard': return <CreditCard className="w-5 h-5" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5" />;
      case 'Key': return <Key className="w-5 h-5" />;
      case 'SmartphoneNfc': return <SmartphoneNfc className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const filteredAuthorities = selectedCountry === 'All' 
    ? OFFICIAL_AUTHORITIES 
    : OFFICIAL_AUTHORITIES.filter(a => a.country.includes(selectedCountry));

  const countryTabs = ['All', 'India', 'United States', 'United Kingdom', 'Australia', 'Canada', 'European Union'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-400 text-xs font-mono mb-3">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>INCIDENT ESCALATION & OFFICIAL CHANNELS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Report a Scam & Emergency Response
        </h1>
        <p className="mt-3 text-slate-300 text-base">
          If you or someone you know encountered a scam, immediate action during the first hour can save funds and stop identity theft.
        </p>
      </div>

      {/* Emergency Immediate Action Guide (First 30-60 mins) */}
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>CRITICAL INCIDENT PROTOCOL</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            What to Do Immediately After Encountering a Scam
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Follow these sequential steps in order of urgency to minimize financial damage and regain control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EMERGENCY_RESPONSE_STEPS.map((step) => (
            <div 
              key={step.step}
              className="glass-panel p-5 rounded-2xl border-rose-500/20 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    {getStepIcon(step.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {step.urgency}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-mono font-bold text-cyan-400">STEP 0{step.step}</span>
                  <h3 className="text-base font-bold text-white leading-snug">{step.title}</h3>
                </div>

                <p className="text-xs font-semibold text-rose-200/90 leading-relaxed">
                  {step.action}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {step.detail}
                </p>
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-800">
                Action priority: High
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Government & Regulatory Reporting Portals by Country */}
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider font-bold">
            <Globe className="w-4 h-4" />
            <span>GLOBAL JURISDICTION DIRECTORY</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Official Cyber Crime Helplines by Country
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Always report fraudulent numbers, deceptive websites, and financial losses to authorized national authorities.
          </p>
        </div>

        {/* Country Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {countryTabs.map((ct) => (
            <button
              key={ct}
              onClick={() => setSelectedCountry(ct)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCountry === ct
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {ct}
            </button>
          ))}
        </div>

        {/* Authorities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAuthorities.map((auth, idx) => (
            <div 
              key={idx}
              className="glass-panel p-6 rounded-2xl border-cyan-500/20 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{auth.flag}</span>
                    <div>
                      <span className="text-xs font-mono text-cyan-400 block">{auth.country}</span>
                      <h3 className="text-base font-bold text-white">{auth.name}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {auth.description}
                </p>

                {/* Hotline Box with copy */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block">Emergency Helpline / Dial:</span>
                    <span className="text-xs font-mono font-bold text-rose-300">{auth.hotline}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(auth.hotline, `hotline-${idx}`)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-800"
                    title="Copy Helpline Number"
                  >
                    {copiedKey === `hotline-${idx}` ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {auth.emailOrSmsReport && (
                  <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <strong className="text-slate-300">Spam/SMS Reporting: </strong>
                    {auth.emailOrSmsReport}
                  </div>
                )}
              </div>

              {/* External Link */}
              <div className="pt-2">
                <a
                  href={auth.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Visit Official Portal ({auth.website.replace('https://', '')})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
