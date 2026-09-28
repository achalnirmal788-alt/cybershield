/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab } from './types';
import { ProgressProvider } from './context/ProgressContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { LearnSection } from './components/LearnSection';
import { ScamAndKycSection } from './components/ScamAndKycSection';
import { ScamDetector } from './components/ScamDetector';
import { SafetyTipsSection } from './components/SafetyTipsSection';
import { QuizSection } from './components/QuizSection';
import { ChallengeSection } from './components/ChallengeSection';
import { DashboardSection } from './components/DashboardSection';
import { ReportSection } from './components/ReportSection';
import { FeedbackSection } from './components/FeedbackSection';
import { Footer } from './components/Footer';

// App content that is gated behind user login / registration
function MainAppContent() {
  const { isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState<NavTab>('learn');

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // First page is strictly Login & Registration
  if (!isAuthenticated) {
    return <AuthScreen onNavigate={setCurrentTab} />;
  }

  // Once authenticated (or signed in as guest), show full platform
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Main Navigation Bar */}
      <Navbar currentTab={currentTab} setTab={setCurrentTab} />

      {/* Content View Router */}
      <main className="flex-1">
        {currentTab === 'login' && (
          <AuthScreen onNavigate={setCurrentTab} />
        )}

        {currentTab === 'home' && (
          <HomeHero onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'learn' && (
          <LearnSection onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'scam-types' && (
          <ScamAndKycSection onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'detect' && (
          <ScamDetector onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'safety' && (
          <SafetyTipsSection onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'quiz' && (
          <QuizSection onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'challenge' && (
          <ChallengeSection onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'dashboard' && (
          <DashboardSection onNavigate={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'report' && (
          <ReportSection />
        )}

        {currentTab === 'feedback' && (
          <FeedbackSection />
        )}
      </main>

      {/* Global Footer */}
      <Footer setTab={setCurrentTab} />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <MainAppContent />
      </ProgressProvider>
    </AuthProvider>
  );
}
