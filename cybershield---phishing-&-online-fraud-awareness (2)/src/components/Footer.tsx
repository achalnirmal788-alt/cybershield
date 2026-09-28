import React from 'react';
import { Shield, PhoneCall } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  setTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setTab }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-slate-950 mt-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Col 1: Brand & Charter (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-bold text-base tracking-tight text-white">
                Cyber<span className="text-cyan-400">Shield</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Open digital literacy initiative engineered to counteract social engineering, payment fraud, and credential exfiltration through evidence-based cognitive training.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              Zero Trust Architecture · Non-profit Educational Project
            </div>
          </div>

          {/* Col 2: Intelligence & Modules (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Intelligence
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setTab('learn')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Phishing Mechanics
                </button>
              </li>
              <li>
                <button onClick={() => setTab('scam-types')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  KYC &amp; Bank Smishing
                </button>
              </li>
              <li>
                <button onClick={() => setTab('scam-types')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Reverse UPI Deception
                </button>
              </li>
              <li>
                <button onClick={() => setTab('safety')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Zero Trust Invariants
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Drills (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Drills
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setTab('detect')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Heuristic Scanner
                </button>
              </li>
              <li>
                <button onClick={() => setTab('challenge')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Phishing Simulation
                </button>
              </li>
              <li>
                <button onClick={() => setTab('quiz')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Readiness Assessment
                </button>
              </li>
              <li>
                <button onClick={() => setTab('dashboard')} className="hover:text-cyan-300 transition-colors cursor-pointer text-left">
                  Defense Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Sovereign Helplines (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>Emergency Fraud Lines</span>
            </div>
            <div className="editorial-surface rounded-xl p-3 text-xs space-y-2 font-mono">
              <div className="flex justify-between items-center text-slate-300">
                <span>India (I4C):</span>
                <span className="text-rose-400 font-bold tabular-nums">1930</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>USA (FBI IC3):</span>
                <span className="text-cyan-300 font-bold">ic3.gov</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Cyber Portal:</span>
                <span className="text-slate-400">cybercrime.gov.in</span>
              </div>
            </div>
            <button
              onClick={() => setTab('report')}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Escalation Protocol &rarr;</span>
            </button>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} CyberShield Defense Intelligence. Educational simulation platform.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => setTab('feedback')} className="hover:text-slate-200 transition-colors cursor-pointer">
              Community Feedback
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button onClick={() => setTab('safety')} className="hover:text-slate-200 transition-colors cursor-pointer">
              Operational Protocols
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
