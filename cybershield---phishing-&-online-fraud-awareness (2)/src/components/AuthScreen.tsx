import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  User, 
  KeyRound, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Info,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NavTab } from '../types';

interface AuthScreenProps {
  onNavigate?: (tab: NavTab) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onNavigate }) => {
  const { login, register, guestLogin, currentUser, isAuthenticated, logout, rememberMe, setRememberMe } = useAuth();
  
  // 'login' | 'register'
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState<string | null>(null);

  // Switch between Login and Register
  const toggleMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // Quick fill demo user credentials (username, email, password)
  const fillDemoAccount = (demoUser: string, demoEmail: string, demoPass: string) => {
    setUsername(demoUser);
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg(null);
    setSuccessMsg(`Demo credentials filled for "${demoUser}"! Click "Sign In".`);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!username.trim() || !email.trim() || !password) {
      setErrorMsg('Please enter your username, email address, and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(username, email, password);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message + ' Entering Phishing Learning...');
        setTimeout(() => {
          onNavigate?.('learn');
        }, 400);
      }
    }, 350);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!username.trim()) {
      setErrorMsg('Please enter your username / full name.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('You must agree to the CyberShield Safety & Ethics pledge.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = register(username, email, password);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSuccessMsg(res.message + ' Account registered! Proceeding to Phishing Learning...');
        setTimeout(() => {
          onNavigate?.('learn');
        }, 400);
      }
    }, 400);
  };

  const handleGuestEntry = () => {
    guestLogin();
    onNavigate?.('learn');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotMsg('Please provide your email address.');
      return;
    }
    setForgotMsg('Password reset instructions & temporary PIN sent! (Demo mode: Use "Password@123")');
    setTimeout(() => {
      setShowForgotModal(false);
      setEmail(forgotEmail);
      setPassword('Password@123');
      setForgotMsg(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Background Cyber Glow & Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.18),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Banner with Alert / Visual Studio info */}
      <header className="relative z-10 border-b border-cyan-500/20 bg-slate-950/70 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-md shadow-cyan-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                CYBER<span className="text-white">SHIELD</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                AUTH PORTAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Anti-Phishing & Online Fraud Awareness Training Hub
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Standalone HTML link */}
          <a
            href="/cyber-shield.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors"
            title="Open pure HTML/JS version for Visual Studio"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Visual Studio Mode
          </a>

          {/* Guest Access button */}
          <button
            onClick={handleGuestEntry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/90 border border-slate-700 hover:border-slate-500 hover:text-white transition-colors cursor-pointer"
          >
            <span>Skip as Guest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">

          {/* If already authenticated, show active session card */}
          {isAuthenticated && currentUser ? (
            <div className="bg-slate-900/85 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  USER AUTHENTICATION // ACTIVE SESSION
                </span>
                <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
                <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
                <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono">
                  Role: {currentUser.role || 'Security Trainee'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                <p>You are signed in to the CyberShield Security Awareness Platform.</p>
                <p className="text-[11px] text-slate-400">Ready to begin your training?</p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => onNavigate?.('learn')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm cursor-pointer shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <span>Continue to Phishing Learning &rarr;</span>
                </button>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => logout()}
                    className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs cursor-pointer font-medium"
                  >
                    Sign Out
                  </button>
                  <button
                    onClick={() => onNavigate?.('scam-types')}
                    className="flex-1 py-2 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-900/50 text-xs cursor-pointer font-medium"
                  >
                    Jump to KYC Scams
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Form Card */
            <div className="bg-slate-900/85 backdrop-blur-2xl border border-cyan-500/25 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 relative">
              
              {/* Top Security Shield Badge */}
              <div className="flex justify-center -mt-12 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/40">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Lock className="w-7 h-7 text-cyan-400" />
                  </div>
                </div>
              </div>

              <div className="text-center mb-5">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold">
                  USER AUTHENTICATION
                </span>
                <h2 className="text-xl font-bold text-white mt-1">Login &amp; Registration Portal</h2>
                <p className="text-xs text-slate-400 mt-1">Sign in to access the Phishing Learning curriculum and threat simulations</p>
              </div>

            {/* Mode Toggle Switch: Login vs Register */}
            <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800 mb-6 text-sm font-medium">
              <button
                type="button"
                onClick={() => toggleMode('login')}
                className={`py-2 px-3 rounded-lg text-center transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => toggleMode('register')}
                className={`py-2 px-3 rounded-lg text-center transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Register
              </button>
            </div>

            {/* Title & Description */}
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {mode === 'login' ? 'Welcome Back to CyberShield' : 'Create Your Security Account'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {mode === 'login' 
                  ? 'Access your phishing tests, scam detection lab & security scores'
                  : 'Start your cybersecurity awareness & online fraud defense journey'}
              </p>
            </div>

            {/* Alert Messages */}
            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-300 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. cyberguardian or Alex Johnson"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@cybershield.org or user@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-950"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="text-slate-500 font-mono text-[11px]">256-bit Secure</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to CyberShield</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Demo Accounts Quick-Fill Box */}
                <div className="pt-3 border-t border-slate-800">
                  <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quick One-Click Demo Logins:</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => fillDemoAccount('Cyber Guardian', 'admin@cybershield.org', 'Password@123')}
                      className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 text-left transition text-slate-300 hover:text-cyan-300 cursor-pointer"
                    >
                      <div className="font-semibold text-white truncate">Cyber Guardian</div>
                      <div className="text-[10px] text-slate-500 truncate">admin@cybershield.org</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoAccount('Alex Johnson', 'user@example.com', 'Password@123')}
                      className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 text-left transition text-slate-300 hover:text-cyan-300 cursor-pointer"
                    >
                      <div className="font-semibold text-white truncate">Alex Johnson</div>
                      <div className="text-[10px] text-slate-500 truncate">user@example.com</div>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Username / Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Sarah Connor or cyberdef"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Create Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-950"
                    />
                    <span className="text-slate-400 leading-relaxed">
                      I pledge to use the cybersecurity tools & phishing detection skills solely for education, self-defense, and ethical awareness.
                    </span>
                  </label>
                </div>

                {/* Register submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Switcher */}
            <div className="mt-6 text-center text-xs text-slate-400">
              {mode === 'login' ? (
                <p>
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => toggleMode('register')}
                    className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline cursor-pointer"
                  >
                    Register free now
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => toggleMode('login')}
                    className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>

          </div>
          )}

          {/* Educational Security Note under the card */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real cybersecurity awareness • Never share your OTP with anyone</span>
            </div>
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
            <div className="flex items-center gap-2.5 text-cyan-400 font-bold mb-2">
              <KeyRound className="w-5 h-5" />
              <span>Reset Password</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Enter your registered email address to receive password reset instructions.
            </p>

            {forgotMsg && (
              <div className="mb-4 p-2.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-xs text-cyan-200">
                {forgotMsg}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg border border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-cyan-500 text-slate-950 rounded-lg hover:bg-cyan-400 cursor-pointer"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Footer on Auth page */}
      <footer className="relative z-10 py-4 text-center text-xs text-slate-500 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} CyberShield Awareness Platform. Public Cyber Defense Initiative.</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>National Cyber Crime Helpline: <strong className="text-cyan-400">1930</strong></span>
            <span>•</span>
            <span>FBI IC3: <strong className="text-cyan-400">ic3.gov</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
};
