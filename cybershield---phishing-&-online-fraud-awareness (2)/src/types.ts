export type NavTab = 
  | 'login'
  | 'home' 
  | 'learn' 
  | 'scam-types' 
  | 'detect' 
  | 'safety' 
  | 'quiz' 
  | 'challenge' 
  | 'dashboard' 
  | 'report' 
  | 'feedback';

export interface PhishingType {
  id: string;
  name: string;
  alias: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  howItWorks: string[];
  realWorldScenario: string;
  keyIndicators: string[];
  severity: 'Critical' | 'High' | 'Medium';
}

export interface ScamType {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  riskLevel: 'Severe' | 'High' | 'Moderate';
  samplePreview: {
    sender: string;
    channel: 'SMS' | 'WhatsApp' | 'Email' | 'UPI App' | 'Google Search' | 'Instagram';
    message: string;
    linkOrCallToAction?: string;
  };
  modusOperandi: string[];
  warningFlags: string[];
  immediateAction: string;
}

export interface DetectScenario {
  id: string;
  title: string;
  channel: 'SMS' | 'Email' | 'Direct Message' | 'Pop-up Alert';
  senderInfo: string;
  subjectOrHeader?: string;
  messageContent: string;
  highlightClues: {
    text: string;
    type: 'urgency' | 'link' | 'data_request' | 'grammar' | 'spoofed_identity';
    explanation: string;
  }[];
  allOptions: {
    id: 'urgent_language' | 'unknown_link' | 'data_request' | 'spelling_grammar' | 'sender_spoof';
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  explanationSummary: string;
  safeAlternative: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface PhishingChallengeItem {
  id: string;
  title: string;
  format: 'Email' | 'SMS' | 'WhatsApp' | 'Banking Portal' | 'Security Alert';
  senderDisplay: string;
  senderAddress: string;
  timestamp: string;
  subject?: string;
  body: string;
  embeddedLink?: {
    displayText: string;
    actualUrl: string;
  };
  isSuspicious: boolean;
  verdictReason: string;
  keyClues: string[];
  safetyLesson: string;
}

export interface FeedbackSubmission {
  id: string;
  date: string;
  wasUseful: 'yes' | 'somewhat' | 'no';
  learnedNew: 'yes' | 'a_lot' | 'already_knew';
  mostUsefulSection: string;
  rating: number; // 1 to 5
  suggestions: string;
}

export interface UserProgress {
  completedLessons: string[];
  quizAttempts: { score: number; total: number; date: string }[];
  highestQuizScore: number;
  completedChallenges: Record<string, { answer: 'genuine' | 'suspicious'; correct: boolean }>;
  safetyChecklist: Record<string, boolean>;
  feedbackSubmitted: boolean;
}
