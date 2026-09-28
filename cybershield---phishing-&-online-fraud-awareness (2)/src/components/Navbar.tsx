import React, { useState } from 'react';
import { 
  Shield, BookOpen, Search, AlertTriangle, Award, BarChart2, 
  ChevronDown, PhoneCall, Lock, MessageSquare, Menu, X, LogOut, Code, ExternalLink 
} from 'lucide-react';
import { NavTab } from '../types';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentTab: NavTab;
  setTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [showVsModal, setShowVsModal] = useState(false);
  const { overallProgressPercent } = useProgress();
  const { currentUser, logout } = useAuth();

  const primaryNavItems: { id: NavTab; label: string }[] = [
    { id: 'learn', label: 'Intelligence' },
    { id: 'scam-types', label: 'Scam Dossiers' },
    { id: 'detect', label: 'Threat Scanner' },
    { id: 'challenge', label: 'Simulations' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  const secondaryNavItems: { id: NavTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'quiz', label: 'Defense Readiness Quiz', icon: <Award className="w-4 h-4 text-cyan-400" />, desc: 'Validate your fraud detection instincts' },
    { id: 'safety', label: 'Zero-Trust Protocol', icon: <Lock className="w-4 h-4 text-emerald-400" />, desc: 'Core operational security guidelines' },
    { id: 'report', label: 'Incident Reporting & Hotline', icon: <PhoneCall className="w-4 h-4 text-rose-400" />, desc: 'Emergency 1930 / IC3 escalation' },
    { id: 'feedback', label: 'Field Feedback', icon: <MessageSquare className="w-4 h-4 text-sky-400" />, desc: 'Submit community scam observations' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setTab(tab);
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-white/[0.08] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">
            
            {/* Zone 1: Brand Wordmark (Clean display type, no compound pill clutter) */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none shrink-0"
              aria-label="CyberShield Home"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/25 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/15 transition-all">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Cyber<span className="text-cyan-400">Shield</span>
              </span>
            </button>

            {/* Zone 2: Navigation Links (Text with quiet indicator, max 5 primary links) */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {primaryNavItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                      isActive 
                        ? 'text-cyan-300' 
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full" />
                    )}
                  </button>
                );
              })}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  onBlur={() => setTimeout(() => setMoreMenuOpen(false), 200)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                    moreMenuOpen || secondaryNavItems.some(i => i.id === currentTab)
                      ? 'text-cyan-300'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                  aria-expanded={moreMenuOpen}
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>

                {moreMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 editorial-surface rounded-xl shadow-2xl shadow-black/80 p-2 z-50 animate-in fade-in-50 duration-200">
                    {secondaryNavItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleNavClick(sub.id)}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                          currentTab === sub.id ? 'bg-cyan-500/10 text-cyan-300' : 'hover:bg-white/[0.04] text-slate-300'
                        }`}
                      >
                        <div className="p-1.5 rounded-md bg-white/[0.04] shrink-0 mt-0.5">
                          {sub.icon}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-white">{sub.label}</div>
                          <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{sub.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: Primary Actions (Progress metric + VS Run + User state) */}
            <div className="flex items-center gap-3">
              {/* Telemetry Progress Indicator */}
              <button
                onClick={() => handleNavClick('dashboard')}
                className="hidden sm:flex items-center gap-2.5 py-1 px-2.5 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer text-left"
                title="View Defense Readiness Dashboard"
              >
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Readiness</div>
                  <div className="text-xs font-bold font-mono tabular-nums text-cyan-400">{overallProgressPercent}%</div>
                </div>
                <div className="w-6 h-6 relative shrink-0">
                  <svg className="w-6 h-6 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="3" className="text-slate-800" fill="none" />
                    <circle 
                      cx="18" cy="18" r="14" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeDasharray="88" 
                      strokeDashoffset={88 - (88 * overallProgressPercent) / 100}
                      strokeLinecap="round" 
                      className="text-cyan-400 transition-all duration-500" 
                      fill="none" 
                    />
                  </svg>
                </div>
              </button>

              {/* Visual Studio Run Info */}
              <button
                onClick={() => setShowVsModal(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] hover:border-cyan-400/40 text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer tactile-button"
                title="Visual Studio Run Instructions"
              >
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>VS Setup</span>
              </button>

              {/* User Profile / Logout */}
              {currentUser && (
                <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
                  <span className="hidden xl:inline text-xs text-slate-300 font-medium">
                    {currentUser.name || currentUser.username}
                  </span>
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/[0.08] bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1">
              Modules
            </div>
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === item.id ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-300 hover:bg-white/[0.04]'
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>
            ))}

            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
              Protocols &amp; Hotline
            </div>
            {secondaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  currentTab === item.id ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between px-3">
              <span className="text-xs text-slate-400 font-mono">Readiness: {overallProgressPercent}%</span>
              <button
                onClick={() => setShowVsModal(true)}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Visual Studio Setup</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Visual Studio Run Modal */}
      {showVsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="editorial-surface rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-white/[0.12] text-slate-200">
            <button
              onClick={() => setShowVsModal(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">Run in Visual Studio / VS Code</h3>
                <p className="text-xs text-slate-400">Run locally via Node.js or inspect pure standalone HTML</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                <div className="font-semibold text-cyan-300 mb-1.5 flex items-center justify-between">
                  <span>Method 1: Full-Stack Project in VS Code</span>
                  <span className="text-[10px] text-slate-400 font-mono">Recommended</span>
                </div>
                <p className="text-slate-400 mb-2">Open terminal in the project root directory and run:</p>
                <pre className="p-2.5 rounded-lg bg-black/60 font-mono text-[11px] text-cyan-200 overflow-x-auto">
{`npm install --legacy-peer-deps\nnpm run dev`}
                </pre>
                <p className="text-slate-400 mt-2">Open <code className="text-cyan-300">http://localhost:3000</code> in your browser.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/[0.08]">
                <div className="font-semibold text-emerald-300 mb-1.5">
                  Method 2: Standalone Single-File Version
                </div>
                <p className="text-slate-400 mb-2">
                  Double-click <code className="text-slate-200 font-mono">cyber-shield.html</code> directly or right-click &rarr; <em>&ldquo;Open with Live Server&rdquo;</em> in Visual Studio.
                </p>
                <a
                  href="./standalone.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors font-medium text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview Standalone HTML</span>
                </a>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowVsModal(false)}
                className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
