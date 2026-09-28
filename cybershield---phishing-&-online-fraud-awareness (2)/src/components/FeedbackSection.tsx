import React, { useState } from 'react';
import { 
  MessageSquare, Star, Send, CheckCircle2, ThumbsUp, Sparkles, HeartHandshake 
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { FeedbackSubmission } from '../types';

export const FeedbackSection: React.FC = () => {
  const { submitFeedback, progress } = useProgress();

  const [wasUseful, setWasUseful] = useState<'yes' | 'somewhat' | 'no'>('yes');
  const [learnedNew, setLearnedNew] = useState<'a_lot' | 'yes' | 'already_knew'>('a_lot');
  const [mostUsefulSection, setMostUsefulSection] = useState('Scam Detection Lab');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState('');
  const [submitted, setSubmitted] = useState(progress.feedbackSubmitted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: FeedbackSubmission = {
      id: 'fb-' + Date.now(),
      date: new Date().toLocaleDateString(),
      wasUseful,
      learnedNew,
      mostUsefulSection,
      rating,
      suggestions: suggestions.trim()
    };
    submitFeedback(submission);
    setSubmitted(true);
  };

  const sectionsList = [
    'Introduction & Common Scam Examples',
    'Learn About Phishing (Attack Lifecycle & 6 Types)',
    'Common Online Frauds (Bank/KYC, UPI, Job Scams)',
    'Scam Detection Lab (Interactive Warning Signs)',
    'How to Stay Safe (7 Rules & Password/URL Tools)',
    'Awareness MCQ Quiz',
    'Phishing Challenge (Genuine vs Suspicious)',
    'User Dashboard & Certificate of Awareness',
    'Report & Help (Emergency response & Helplines)'
  ];

  const ratingDescriptions = [
    'Poor - Needs major improvements',
    'Fair - Decent basic info',
    'Good - Helpful overview',
    'Great - Very interactive and clear',
    'Outstanding - Essential cybersecurity life skill!'
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>COMMUNITY FEEDBACK & IMPACT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Help Us Improve Cyber Awareness
        </h1>
        <p className="text-sm text-slate-300">
          Your feedback directly shapes our fraud prevention modules, interactive labs, and educational simulations.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/30 space-y-6 shadow-2xl">
          
          {/* Question 1: Was the website useful? */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-white block">
              1. Was this cybersecurity awareness website useful to you?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { value: 'yes', label: 'Yes, very useful 👍' },
                { value: 'somewhat', label: 'Somewhat useful' },
                { value: 'no', label: 'Not really' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setWasUseful(opt.value as any)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    wasUseful === opt.value
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Did you learn something new? */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-white block">
              2. Did you learn something new about online scams?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { value: 'a_lot', label: 'Yes, a lot of new things 💡' },
                { value: 'yes', label: 'Yes, picked up practical tips' },
                { value: 'already_knew', label: 'I already knew most of it' }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setLearnedNew(opt.value as any)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    learnedNew === opt.value
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Which section was most useful? */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-white block">
              3. Which section did you find most useful?
            </label>
            <select
              value={mostUsefulSection}
              onChange={(e) => setMostUsefulSection(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm font-medium focus:outline-none focus:border-cyan-400"
            >
              {sectionsList.map((sec, idx) => (
                <option key={idx} value={sec} className="bg-slate-900 text-slate-200">
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Question 4: Star Rating ⭐⭐⭐⭐⭐ */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-white block">
              4. Overall Experience Rating ⭐⭐⭐⭐⭐
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const effectiveRating = hoverRating !== null ? hoverRating : rating;
                const isFilled = star <= effectiveRating;
                return (
                  <button
                    type="button"
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star 
                      className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                        isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`} 
                    />
                  </button>
                );
              })}
              <span className="text-xs font-mono text-cyan-300 ml-2 font-medium">
                {ratingDescriptions[(hoverRating ?? rating) - 1]}
              </span>
            </div>
          </div>

          {/* Question 5: Suggestions */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-white block">
              5. Suggestions & Comments (Optional)
            </label>
            <p className="text-xs text-slate-400">
              Have you encountered a new type of scam recently? Any feature or language you would like us to add?
            </p>
            <textarea
              rows={4}
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="e.g. Please add awareness about Deepfake voice cloning scams, or regional language support..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 font-sans"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Feedback</span>
          </button>

        </form>
      ) : (
        /* Submission Success Card */
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border-cyan-500/30 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-300 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Thank You for Your Feedback!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Your evaluation helps make digital education safer for everyday internet users worldwide.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-sm mx-auto space-y-1">
            <div>Your Rating: <strong className="text-amber-400">{rating} / 5 Stars ⭐</strong></div>
            <div>Most Helpful Module: <strong className="text-white">{mostUsefulSection}</strong></div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
          >
            Submit Another Response
          </button>
        </div>
      )}

    </div>
  );
};
