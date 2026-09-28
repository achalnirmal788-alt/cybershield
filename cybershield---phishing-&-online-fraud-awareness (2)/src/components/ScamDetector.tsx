import React, { useState } from 'react';
import { 
  Search, AlertTriangle, CheckCircle2, XCircle, Sparkles, 
  HelpCircle, Eye, ShieldAlert, ArrowRight, RotateCcw, CheckSquare, Square
} from 'lucide-react';
import { DETECT_SCENARIOS } from '../data/detectScamData';
import { NavTab } from '../types';

interface ScamDetectorProps {
  onNavigate: (tab: NavTab) => void;
}

export const ScamDetector: React.FC<ScamDetectorProps> = ({ onNavigate }) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedClueIndex, setSelectedClueIndex] = useState<number | null>(null);

  const scenario = DETECT_SCENARIOS[activeScenarioIndex];

  const handleToggleOption = (id: string) => {
    if (submitted) return;
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(o => o !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIndex(idx);
    setSelectedOptions([]);
    setSubmitted(false);
    setSelectedClueIndex(null);
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setSubmitted(false);
    setSelectedClueIndex(null);
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;
    setSubmitted(true);
  };

  // Calculate score
  const correctCount = scenario.allOptions.filter(opt => opt.isCorrect && selectedOptions.includes(opt.id)).length;
  const totalCorrectOptions = scenario.allOptions.filter(opt => opt.isCorrect).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
          <Search className="w-3.5 h-3.5" />
          <span>INTERACTIVE FORENSICS LAB // IS THIS A SCAM?</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Interactive Scam Detection Lab
        </h1>
        <p className="mt-3 text-slate-300 text-base">
          Analyze suspicious messages in a safe environment. Inspect headers, test your threat detection instincts, and uncover disguised traps.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {DETECT_SCENARIOS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleSelectScenario(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeScenarioIndex === idx
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>Scenario 0{idx + 1}: {item.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono">
              {item.channel}
            </span>
          </button>
        ))}
      </div>

      {/* Main Detection Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sample Message Display Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 space-y-4 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Sample {scenario.channel} Inspection Box
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                Threat Lab
              </span>
            </div>

            {/* Sender and metadata */}
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-xs space-y-1 font-mono text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">From / Sender:</span>
                <span className="text-rose-300 font-semibold">{scenario.senderInfo}</span>
              </div>
              {scenario.subjectOrHeader && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span className="text-slate-500">Subject:</span>
                  <span className="text-white font-semibold">{scenario.subjectOrHeader}</span>
                </div>
              )}
            </div>

            {/* The Message Content Canvas */}
            <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 relative">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>Message Content:</span>
                <span className="text-[10px] text-cyan-400 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Tap highlighted clues to inspect</span>
                </span>
              </div>

              {/* Message text with clickable clues */}
              <div className="text-sm sm:text-base font-sans text-slate-200 leading-relaxed space-y-2">
                <p>
                  &ldquo;{scenario.messageContent}&rdquo;
                </p>
              </div>

              {/* Clue Highlights List */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 block font-semibold">
                  Detected Evidence Markers ({scenario.highlightClues.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scenario.highlightClues.map((clue, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedClueIndex(selectedClueIndex === idx ? null : idx)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                        selectedClueIndex === idx
                          ? 'bg-rose-500/30 text-rose-200 border-rose-400 shadow-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300'
                      }`}
                    >
                      &ldquo;{clue.text.length > 25 ? clue.text.substring(0, 25) + '...' : clue.text}&rdquo;
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Clue Tooltip */}
              {selectedClueIndex !== null && (
                <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-rose-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Forensic Note on: &ldquo;{scenario.highlightClues[selectedClueIndex].text}&rdquo;</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {scenario.highlightClues[selectedClueIndex].explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Safe alternative recommendation */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-white block mb-0.5">What a security expert would do:</span>
              <span className="text-slate-400">{scenario.safeAlternative}</span>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Checklist & Questions */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 space-y-5">
            
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1 font-semibold uppercase">
                <HelpCircle className="w-4 h-4" />
                <span>Forensic Threat Evaluation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                What warning signs do you notice?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select all the red flags present in this message, then submit your evaluation.
              </p>
            </div>

            {/* The 4+ Warning Signs Options */}
            <div className="space-y-2.5">
              {scenario.allOptions.map((opt) => {
                const isSelected = selectedOptions.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleOption(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      submitted
                        ? opt.isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                          : isSelected
                            ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-60'
                        : isSelected
                          ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-sm'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-cyan-400">
                      {submitted ? (
                        opt.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600" />
                        )
                      ) : isSelected ? (
                        <CheckSquare className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {opt.label}
                      </div>
                      {submitted && (
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {opt.explanation}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOptions.length === 0}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze & Check Warning Signs</span>
                </button>
              ) : (
                <div className="w-full space-y-4">
                  {/* Results banner */}
                  <div className={`p-4 rounded-xl border ${
                    correctCount === totalCorrectOptions
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-sm mb-1">
                      {correctCount === totalCorrectOptions ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span>Outstanding Detection! ({correctCount}/{totalCorrectOptions} flags spotted)</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-5 h-5 text-amber-400" />
                          <span>Spotted {correctCount} of {totalCorrectOptions} warning flags.</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {scenario.explanationSummary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try Again</span>
                    </button>
                    {activeScenarioIndex < DETECT_SCENARIOS.length - 1 ? (
                      <button
                        onClick={() => handleSelectScenario(activeScenarioIndex + 1)}
                        className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Next Scenario ({activeScenarioIndex + 2}/{DETECT_SCENARIOS.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('challenge')}
                        className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Go to Phishing Challenge</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
