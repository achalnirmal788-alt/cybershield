import React, { useState } from 'react';
import { 
  Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Sparkles, HelpCircle, Trophy, BarChart2, ShieldCheck
} from 'lucide-react';
import { AWARENESS_QUIZ_QUESTIONS } from '../data/quizData';
import { useProgress } from '../context/ProgressContext';
import { NavTab } from '../types';

interface QuizSectionProps {
  onNavigate: (tab: NavTab) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onNavigate }) => {
  const { recordQuizResult } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const totalQuestions = AWARENESS_QUIZ_QUESTIONS.length;
  const currentQ = AWARENESS_QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(selectedAnswers[currentIndex + 1] !== undefined);
    } else {
      // Calculate final score
      let score = 0;
      AWARENESS_QUIZ_QUESTIONS.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          score += 1;
        }
      });
      recordQuizResult(score, totalQuestions);
      setQuizFinished(true);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
    setReviewMode(false);
  };

  // Compute final score
  const finalScore = AWARENESS_QUIZ_QUESTIONS.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Quiz Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>CYBER MASTERY ASSESSMENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cyber Awareness MCQ Quiz
        </h1>
        <p className="text-sm text-slate-300">
          Test your fraud detection readiness. Answer 10 core questions covering phishing, OTP hygiene, website inspection, and threat response.
        </p>
      </div>

      {!quizFinished ? (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/30 space-y-6 shadow-2xl">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-4">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Question {currentIndex + 1} of {totalQuestions}</span>
            </span>
            <span className="text-cyan-400 font-semibold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              {currentQ.category}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentIndex] === idx;
              const isCorrect = currentQ.correctIndex === idx;

              let style = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/80';
              if (showExplanation) {
                if (isCorrect) {
                  style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm shadow-emerald-500/20';
                } else if (isSelected) {
                  style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                } else {
                  style = 'bg-slate-950/50 border-slate-800/60 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                style = 'bg-cyan-950/70 border-cyan-400 text-white';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${style}`}
                >
                  <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    showExplanation && isCorrect 
                      ? 'bg-emerald-500 text-slate-950'
                      : showExplanation && isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-medium leading-relaxed flex-1">
                    {option}
                  </span>
                  {showExplanation && (
                    <span className="shrink-0 mt-0.5">
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className={`p-4 rounded-xl border space-y-1.5 animate-fadeIn ${
              selectedAnswers[currentIndex] === currentQ.correctIndex
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider font-mono">
                {selectedAnswers[currentIndex] === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Correct Answer!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span className="text-rose-300">Incorrect Choice</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Bottom Next Question Button */}
          {showExplanation && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
              >
                <span>{currentIndex === totalQuestions - 1 ? 'View Final Score' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Finished Screen: Score: 8/10 🎉 */
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border-cyan-500/30 text-center space-y-6 shadow-2xl">
          
          <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-300 shadow-lg shadow-cyan-500/30">
            <Trophy className="w-10 h-10 text-cyan-400 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              Assessment Completed
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Score: {finalScore}/{totalQuestions} 🎉
            </h2>
            <p className="text-slate-300 text-base max-w-md mx-auto">
              {finalScore >= 8 
                ? "Outstanding awareness! You demonstrate sharp instincts against social engineering and fraud tricks."
                : finalScore >= 5
                  ? "Good baseline security knowledge, with room to sharpen detection of subtle lookalike domains and OTP scams."
                  : "We recommend reviewing the Learn and Safety sections to reinforce core protection habits."}
            </p>
          </div>

          {/* Quick Score Breakdown Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Questions</div>
              <div className="text-lg font-bold font-mono text-white">{totalQuestions}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30">
              <div className="text-xs text-slate-400">Correct Answers</div>
              <div className="text-lg font-bold font-mono text-emerald-400">{finalScore}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 col-span-2 sm:col-span-1">
              <div className="text-xs text-slate-400">Accuracy Rate</div>
              <div className="text-lg font-bold font-mono text-cyan-300">
                {Math.round((finalScore / totalQuestions) * 100)}%
              </div>
            </div>
          </div>

          {/* Review Question Answers Mode */}
          {reviewMode && (
            <div className="mt-8 text-left space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Detailed Question Review</span>
              </h3>
              <div className="space-y-3">
                {AWARENESS_QUIZ_QUESTIONS.map((q, idx) => {
                  const userChoice = selectedAnswers[idx];
                  const isCorrect = userChoice === q.correctIndex;
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-white">Q{idx + 1}: {q.question}</span>
                        {isCorrect ? (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            CORRECT
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            MISSED
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div>
                          <span className="text-slate-500">Your Answer: </span>
                          <span className={isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400'}>
                            {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div>
                            <span className="text-slate-500">Correct Answer: </span>
                            <span className="text-emerald-400 font-semibold">{q.options[q.correctIndex]}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => setReviewMode(!reviewMode)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{reviewMode ? 'Hide Review' : 'Review Answers'}</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-cyan-500/30 flex items-center gap-2 cursor-pointer"
            >
              <BarChart2 className="w-4 h-4" />
              <span>View in Dashboard</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
