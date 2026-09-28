import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, FeedbackSubmission } from '../types';

const INITIAL_PROGRESS: UserProgress = {
  completedLessons: ['intro'],
  quizAttempts: [],
  highestQuizScore: 0,
  completedChallenges: {},
  safetyChecklist: {
    'dont-click-links': true,
    'verify-sender': false,
    'never-share-otp': true,
    'check-website-address': false,
    'use-strong-passwords': true,
    'enable-2fa': true,
    'keep-devices-updated': false
  },
  feedbackSubmitted: false
};

interface ProgressContextType {
  progress: UserProgress;
  markLessonComplete: (lessonId: string) => void;
  recordQuizResult: (score: number, total: number) => void;
  recordChallengeAnswer: (challengeId: string, answer: 'genuine' | 'suspicious', isCorrect: boolean) => void;
  toggleSafetyChecklist: (key: string) => void;
  submitFeedback: (feedback: FeedbackSubmission) => void;
  resetProgress: () => void;
  overallProgressPercent: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('cybershield_progress_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('cybershield_progress_v1', JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [progress]);

  const markLessonComplete = (lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      };
    });
  };

  const recordQuizResult = (score: number, total: number) => {
    setProgress(prev => {
      const newScore = Math.max(prev.highestQuizScore, score);
      return {
        ...prev,
        highestQuizScore: newScore,
        quizAttempts: [
          ...prev.quizAttempts,
          { score, total, date: new Date().toLocaleDateString() }
        ]
      };
    });
  };

  const recordChallengeAnswer = (challengeId: string, answer: 'genuine' | 'suspicious', correct: boolean) => {
    setProgress(prev => ({
      ...prev,
      completedChallenges: {
        ...prev.completedChallenges,
        [challengeId]: { answer, correct }
      }
    }));
  };

  const toggleSafetyChecklist = (key: string) => {
    setProgress(prev => ({
      ...prev,
      safetyChecklist: {
        ...prev.safetyChecklist,
        [key]: !prev.safetyChecklist[key]
      }
    }));
  };

  const submitFeedback = (fb: FeedbackSubmission) => {
    try {
      const existing = JSON.parse(localStorage.getItem('cybershield_feedbacks') || '[]');
      existing.push(fb);
      localStorage.setItem('cybershield_feedbacks', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }
    setProgress(prev => ({ ...prev, feedbackSubmitted: true }));
  };

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    try {
      localStorage.removeItem('cybershield_progress_v1');
    } catch {}
  };

  // Calculate overall awareness %
  // 6 core lesson categories (max 30 pts)
  // 8 challenge scenarios (max 35 pts)
  // Quiz score / 10 (max 25 pts)
  // Safety checklist 7 items (max 10 pts)
  const totalLessons = 6;
  const lessonsScore = Math.min(30, (progress.completedLessons.length / totalLessons) * 30);

  const totalChallenges = 8;
  const challengesDone = Object.keys(progress.completedChallenges).length;
  const challengesScore = Math.min(35, (challengesDone / totalChallenges) * 35);

  const quizScorePoints = (progress.highestQuizScore / 10) * 25;

  const totalSafetyItems = 7;
  const safetyChecked = Object.values(progress.safetyChecklist).filter(Boolean).length;
  const safetyScore = (safetyChecked / totalSafetyItems) * 10;

  const overallProgressPercent = Math.min(100, Math.round(lessonsScore + challengesScore + quizScorePoints + safetyScore));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonComplete,
        recordQuizResult,
        recordChallengeAnswer,
        toggleSafetyChecklist,
        submitFeedback,
        resetProgress,
        overallProgressPercent
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
