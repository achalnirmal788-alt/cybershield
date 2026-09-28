import React, { useState } from 'react';
import { 
  ShieldAlert, ArrowRight, ShieldCheck, AlertOctagon, Terminal, 
  Smartphone, Lock, ExternalLink, Zap, CheckCircle2, ChevronRight, Eye, ShieldX, HelpCircle
} from 'lucide-react';
import { NavTab } from '../types';

interface HomeHeroProps {
  onNavigate: (tab: NavTab) => void;
}

type ThreatVector = 'kyc' | 'upi' | 'apk';

interface ThreatCase {
  id: ThreatVector;
  title: string;
  category: string;
  sender: string;
  message: string;
  riskScore: number;
  highlightedZone: string;
  forensicNote: string;
  attackerGoal: string;
  countermeasure: string;
}

const THREAT_CASES: Record<ThreatVector, ThreatCase> = {
  kyc: {
    id: 'kyc',
    title: 'Bank KYC Suspension Smishing',
    category: 'Credential Harvester',
    sender: 'VM-HDFCBK-ALERT',
    message: 'Dear Customer, your NetBanking account will be DEACTIVATED today due to pending PAN/KYC. Update immediately at https://hdfc-kyc-update.online/verify to avoid block.',
    riskScore: 98,
    highlightedZone: 'https://hdfc-kyc-update.online/verify',
    forensicNote: 'The attacker registered a lookalike ".online" top-level domain instead of the legitimate ".com" corporate portal. Banks NEVER send external verification links for KYC.',
    attackerGoal: 'Capture Customer ID, Password, and 2-Factor OTP to initiate unauthorized wire transfer.',
    countermeasure: 'Never click the link. Log in solely through your official mobile banking application downloaded from Google Play or App Store.'
  },
  upi: {
    id: 'upi',
    title: 'Reverse UPI QR "Refund" Trap',
    category: 'Financial Social Engineering',
    sender: 'OLX / Marketplace Buyer',
    message: 'I have sent you the advance payment of Rs 15,000 for your listing. Kindly scan this QR code and enter your 6-digit UPI PIN to receive the credit into your bank.',
    riskScore: 99,
    highlightedZone: 'Scan QR code and enter UPI PIN to RECEIVE',
    forensicNote: 'Fundamental UPI architecture rule: You NEVER need to enter a UPI PIN or scan a QR code to RECEIVE money. Entering a PIN ONLY authorizes debits.',
    attackerGoal: 'Trick seller into authorizing an instant debit transfer out of their bank balance.',
    countermeasure: 'Immediately terminate communication. Block the buyer and report the number on the Cyber Crime Portal.'
  },
  apk: {
    id: 'apk',
    title: 'Electricity Bill Disconnection APK',
    category: 'Remote Access Trojan (RAT)',
    sender: 'DISCOM-URGENT',
    message: 'Electricity power will be disconnected at 9:30 PM due to unpaid bill of Rs 480. Download the official bill update utility: Bijli_Suvidha_v2.apk to pay instantly.',
    riskScore: 96,
    highlightedZone: 'Download Bijli_Suvidha_v2.apk',
    forensicNote: 'The file ends with ".apk" rather than directing to an official government utility app store. Once installed, it intercepts incoming OTPs and records keystrokes.',
    attackerGoal: 'Install background SMS reader permissions to exfiltrate bank 2FA OTP codes silently.',
    countermeasure: 'Verify billing status directly on your state electricity board official portal or local bill counter.'
  }
};

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate }) => {
  const [activeVector, setActiveVector] = useState<ThreatVector>('kyc');
  const [quickScanInput, setQuickScanInput] = useState('');
  const [quickScanResult, setQuickScanResult] = useState<{
    status: 'safe' | 'suspicious' | 'phishing';
    confidence: number;
    analysis: string;
  } | null>(null);

  const selectedCase = THREAT_CASES[activeVector];

  const handleQuickScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickScanInput.trim()) return;

    const lower = quickScanInput.toLowerCase();
    const hasSuspiciousTerms = /kyc|pan|block|suspend|deactivate|lottery|winner|qr|apk|urgent|immediately|otp|password|free recharge/i.test(lower);
    const hasSuspiciousTld = /\.xyz|\.online|\.top|\.live|\.club|\.info|\.site|\.fun|\.link/i.test(lower);
    const isUpiDebit = /receive.*pin|scan.*receive/i.test(lower);

    if (isUpiDebit || hasSuspiciousTld || (hasSuspiciousTerms && /http/i.test(lower))) {
      setQuickScanResult({
        status: 'phishing',
        confidence: 96,
        analysis: 'High-severity markers detected: Lookalike domain or reverse payment deception mechanism found. Do not engage.'
      });
    } else if (hasSuspiciousTerms) {
      setQuickScanResult({
        status: 'suspicious',
        confidence: 84,
        analysis: 'Artificial urgency or account-threat phraseology detected. Verify through official authenticated channels.'
      });
    } else {
      setQuickScanResult({
        status: 'safe',
        confidence: 91,
        analysis: 'No overt smishing lures or malicious keywords detected. Maintain standard zero-trust vigilance.'
      });
    }
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-20">
      {/* Diffused architectural radial glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[450px] bg-cyan-500/[0.04] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-sky-500/[0.03] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION 1: Asymmetrical Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Human Narrative & Editorial Typography (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Zero-Pill Unboxed Metadata Header */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wide text-slate-400">
              <span className="text-cyan-400 font-semibold">Zero-Trust Protocol</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>2026 Countermeasure Lab</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Human Defense Intelligence</span>
            </div>

            {/* Fluid Hero Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white tracking-tight leading-[1.12]">
              Neutralize digital fraud{' '}
              <span className="font-serif-display italic font-normal text-cyan-300">
                before
              </span>{' '}
              it breaches your perimeter.
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Over 82% of modern cyber incidents exploit human instinct rather than system code. 
              CyberShield deconstructs reverse-payment traps, lookalike banking portals, and weaponized 
              urgency lures into verified defensive reflexes.
            </p>

            {/* High-Intent Primary & Secondary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('learn')}
                className="tactile-button px-6 py-3 rounded-xl font-semibold text-sm tracking-wide bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Launch Intelligence Module</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('detect')}
                className="tactile-button px-5 py-3 rounded-xl font-medium text-sm tracking-wide editorial-surface text-slate-200 hover:text-white hover:border-cyan-400/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>Deep Threat Scanner</span>
              </button>
            </div>

            {/* Adjacent Quantitative Proof Strip */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">4.7M+</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">Attacks cataloged in 2026 intelligence database</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tabular-nums">1930</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">Direct cyber helpline protocol integration</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">0-sec</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">Latency on heuristic deception triage</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Threat Dissection Bento (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="editorial-surface rounded-2xl p-6 relative shadow-2xl border border-white/[0.1] text-slate-200">
              
              {/* Header: Vector Selector Tabs */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-mono font-medium text-slate-300">Live Attack Dissection</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 tabular-nums">
                  Risk Index: {selectedCase.riskScore}/100
                </span>
              </div>

              {/* Segmented Vector Controls */}
              <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-lg mb-4 text-xs font-medium">
                {(['kyc', 'upi', 'apk'] as ThreatVector[]).map((vec) => (
                  <button
                    key={vec}
                    onClick={() => setActiveVector(vec)}
                    className={`flex-1 py-1.5 px-2 rounded-md transition-all cursor-pointer text-center truncate ${
                      activeVector === vec 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {vec === 'kyc' ? 'KYC Lure' : vec === 'upi' ? 'UPI QR Trap' : 'Fake APK'}
                  </button>
                ))}
              </div>

              {/* Deconstruction Anatomy Sandbox */}
              <div className="space-y-4">
                {/* Simulated Device Screen */}
                <div className="rounded-xl bg-black/70 p-4 border border-white/[0.08] relative">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 mb-2 border-b border-white/[0.06]">
                    <span>Sender: <strong className="text-slate-200">{selectedCase.sender}</strong></span>
                    <span className="text-rose-400 font-semibold">{selectedCase.category}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed">
                    {selectedCase.message.split(selectedCase.highlightedZone).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="bg-rose-500/20 text-rose-300 border-b border-rose-400 font-semibold px-0.5">
                            {selectedCase.highlightedZone}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                {/* Forensic Analysis Callout */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-300">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>Attack Architecture</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedCase.forensicNote}
                  </p>
                </div>

                {/* Countermeasure Directive */}
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Countermeasure</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedCase.countermeasure}
                  </p>
                </div>

                {/* Action to Challenge */}
                <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                  <span>Practice under live simulated conditions</span>
                  <button
                    onClick={() => onNavigate('challenge')}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Run Simulation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: The Bento Box Matrix of Deception Defense */}
        <div className="mt-24 space-y-8">
          
          {/* Section Header with generous whitespace */}
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              Architectural Defense
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              The Four Vectors of Social Engineering
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Every fraudulent operation relies on distinct psychological levers. Master their mechanics to disarm attacks instinctively.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Bento Card 1: Large Editorial Cognitive Vector (Col-Span 7) */}
            <div className="lg:col-span-7 editorial-surface rounded-2xl p-7 flex flex-col justify-between editorial-surface-hover">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>01. Cognitive Exploit Vectors</span>
                  <span className="text-cyan-400 font-semibold">Human Vulnerability</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  How Scammers Bypass Critical Reasoning
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Fraudsters never attack your password directly first; they induce high-arousal emotional states (fear of arrest, urgent greed, panic of disconnection) that suppress analytical cognition.
                </p>

                {/* 3 Core Levers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <div className="text-xs font-bold text-white font-mono">Artificial Panic</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Deadlines under 2 hours (&ldquo;Account blocks in 30 mins&rdquo;) designed to prevent independent verification.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <div className="text-xs font-bold text-white font-mono">Spoofed Authority</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Impersonating police officers, tax inspectors, or bank executives with stolen logos.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <div className="text-xs font-bold text-white font-mono">False Reversal</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Claiming an accidental overpayment and demanding immediate UPI QR scan to settle funds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Curated field intelligence</span>
                <button
                  onClick={() => onNavigate('learn')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Threat Library</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bento Card 2: Interactive Instant Threat Scanner Sandbox (Col-Span 5) */}
            <div className="lg:col-span-5 editorial-surface rounded-2xl p-7 flex flex-col justify-between editorial-surface-hover">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>02. Instant Triage</span>
                  <span className="text-emerald-400 font-semibold">Live Sandbox</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Field Test Any Message or URL
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Paste suspicious text, SMS headers, or payment requests below for rapid heuristic threat decomposition.
                </p>

                <form onSubmit={handleQuickScan} className="space-y-2.5">
                  <div className="relative">
                    <textarea
                      value={quickScanInput}
                      onChange={(e) => setQuickScanInput(e.target.value)}
                      placeholder="e.g. Your electricity connection will be disconnected tonight. Pay via http://power-discom.online/bill"
                      rows={3}
                      className="w-full rounded-xl bg-black/60 border border-white/[0.1] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 p-3 text-xs text-slate-200 placeholder:text-slate-500 font-mono resize-none focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 cursor-pointer tactile-button"
                  >
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Run Heuristic Inspection</span>
                  </button>
                </form>

                {quickScanResult && (
                  <div className={`p-3 rounded-xl border text-xs leading-relaxed animate-in fade-in-50 duration-200 ${
                    quickScanResult.status === 'phishing'
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : quickScanResult.status === 'suspicious'
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  }`}>
                    <div className="font-semibold flex items-center justify-between mb-1">
                      <span className="uppercase tracking-wide">
                        {quickScanResult.status === 'phishing' ? 'High Risk Threat' : quickScanResult.status === 'suspicious' ? 'Caution Advised' : 'No Critical Markers'}
                      </span>
                      <span className="font-mono tabular-nums">{quickScanResult.confidence}% confidence</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{quickScanResult.analysis}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.08] text-right">
                <button
                  onClick={() => onNavigate('detect')}
                  className="text-xs text-cyan-400 hover:underline font-mono inline-flex items-center gap-1"
                >
                  <span>Open Deep Scanner Suite &rarr;</span>
                </button>
              </div>
            </div>

            {/* Bento Card 3: Non-Negotiable Operational Security Rules (Col-Span 5) */}
            <div className="lg:col-span-5 editorial-surface rounded-2xl p-7 flex flex-col justify-between editorial-surface-hover">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>03. Sovereign Protocol</span>
                  <span className="text-slate-300">Non-Negotiable</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Golden Invariants of Digital Banking
                </h3>
                
                <div className="space-y-3 pt-1 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white block font-medium">OTP is exclusively for debits</strong>
                      <span className="text-slate-400 leading-snug">No financial institution requires an OTP to receive a refund or cash transfer.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white block font-medium">Inspect root domain boundaries</strong>
                      <span className="text-slate-400 leading-snug">Pay attention to the final domain before the first single slash (<code className="text-cyan-300 font-mono">sbi.com.co</code> vs <code className="text-emerald-300 font-mono">sbi.co.in</code>).</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white block font-medium">Refuse remote control utilities</strong>
                      <span className="text-slate-400 leading-snug">Never install AnyDesk, TeamViewer, or QuickSupport on instruction from an incoming caller.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Zero Trust Standard</span>
                <button
                  onClick={() => onNavigate('safety')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Review All 12 Safety Rules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bento Card 4: Immediate Emergency Response Protocol (Col-Span 7) */}
            <div className="lg:col-span-7 editorial-surface rounded-2xl p-7 flex flex-col justify-between editorial-surface-hover">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>04. Incident Response</span>
                  <span className="text-rose-400 font-semibold">Golden 2-Hour Window</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  What to Do Within 120 Minutes of a Breach
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  If you inadvertently shared credentials or authorized an unauthorized debit, funds are held in interbank transit for up to 2 hours. Swift action can recover up to 80% of diverted assets.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-rose-300">National Helpline</span>
                      <span className="text-white font-bold">Dial 1930</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Indian Cyber Crime Coordination Centre (I4C). Freezes scammer bank wallets instantly before cash-out.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-cyan-300">Global Portal</span>
                      <span className="text-white font-bold">cybercrime.gov.in</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      File a formal digital grievance. For USA and international residents, report directly to <strong>IC3.gov</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Immediate escalation</span>
                <button
                  onClick={() => onNavigate('report')}
                  className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Access Incident Reporting Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
