import React, { useState } from 'react';
import { CHITCHAT_LOGO_URL } from '../data/mockData';

interface AuthScreenProps {
  onSuccessLogin: (name?: string, email?: string) => void;
  onCancel: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccessLogin, onCancel }) => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleDemoAccount = () => {
    setIdentity('alex@chitchat.com');
    setPassword('ChitChat2026!Secure');
    setErrorMsg('');
    triggerLogin('Alex Morgan', 'alex@chitchat.com');
  };

  const triggerLogin = (name: string, email: string) => {
    setIsSubmitting(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccessLogin(name, email);
      }, 700);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.trim()) {
      setErrorMsg('Please enter your email or username.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please provide your password.');
      return;
    }
    triggerLogin(
      identity.includes('@') ? identity.split('@')[0] : identity,
      identity.includes('@') ? identity : `${identity}@chitchat.io`
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-surface font-body-md text-on-surface antialiased flex flex-col items-center justify-center py-12 px-4 sm:px-6 overflow-hidden">
      {/* Top back button to workspace */}
      <button
        onClick={onCancel}
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface transition-colors shadow-xs"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        <span>Return to Workspace</span>
      </button>

      {/* Subtle Ambient Glow and Floating Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary-fixed-dim/40 to-secondary-container/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-36 -right-24 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tl from-tertiary-fixed/30 via-primary/10 to-transparent blur-3xl pointer-events-none"></div>

      {/* Decorative Floating Abstract Chat Bubbles matching screenshot */}
      <div className="absolute top-20 left-[10%] hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md text-on-surface transform -rotate-6 animate-pulse border border-outline-variant/20">
        <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
        <span className="text-xs text-on-surface-variant font-medium">Elena is typing...</span>
      </div>

      <div className="absolute bottom-24 left-[12%] hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md transform rotate-3 border border-outline-variant/20">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-[16px]">chat</span>
        </div>
        <div>
          <p className="text-xs text-on-surface font-semibold">New conversation</p>
          <p className="text-[11px] text-outline">Design Systems Sync</p>
        </div>
      </div>

      <div className="absolute top-32 right-[12%] hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-md transform rotate-6 border border-outline-variant/20">
        <span
          className="material-symbols-outlined text-secondary text-[18px] fill-1"
        >
          mark_chat_unread
        </span>
        <span className="text-xs text-on-surface font-medium">3 unread notifications</span>
      </div>

      {/* Centered Glassmorphism Card Container */}
      <div className="relative w-full max-w-md bg-surface-container-lowest/95 backdrop-blur-xl rounded-3xl shadow-xl p-8 sm:p-10 z-10 border border-outline-variant/30 transition-all duration-300">
        {/* Top Branding */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-low shadow-sm mb-3 group transition-transform duration-300 hover:scale-105">
            <img
              alt="ChitChat Brand Logo"
              className="w-12 h-12 rounded-full object-cover"
              src={CHITCHAT_LOGO_URL}
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-tertiary shadow-sm ring-2 ring-surface-container-lowest"></span>
          </div>
          <h2 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
            ChitChat
          </h2>
          <p className="font-label-md text-xs text-primary font-bold tracking-wider uppercase mt-0.5">
            CONNECT. CHAT. CHITCHAT.
          </p>
        </div>

        {/* Header Section */}
        <div className="mt-6 text-center">
          <h1 className="font-title-md text-lg text-on-surface font-bold">
            {isSignUp ? 'Create your ChitChat account' : 'Welcome back to ChitChat'}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            {isSignUp
              ? 'Join your team workspace and start collaborating'
              : 'Sign in to jump back into your conversations'}
          </p>
        </div>

        {/* Demo Account Quick Pill */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDemoAccount}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-container text-secondary hover:bg-surface-container-high transition-colors text-xs font-bold shadow-xs active:scale-95 duration-150 border border-outline-variant/20"
            type="button"
          >
            <span>Try Demo Account</span>
            <span>🚀</span>
          </button>
        </div>

        {/* Form Error Banner */}
        {errorMsg && (
          <div className="mt-3 p-2.5 rounded-xl bg-error-container text-on-error-container text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          {/* Email or Username Field */}
          <div className="relative">
            <label className="block text-xs text-on-surface-variant font-semibold mb-1 ml-1">
              Email or Username
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                alternate_email
              </span>
              <input
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                autoComplete="username"
                className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low rounded-xl text-sm font-medium text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-outline-variant/20 transition-all"
                placeholder="alex@chitchat.com"
                type="text"
                required
              />
            </div>
          </div>

          {/* Password Field with Show/Hide */}
          <div className="relative">
            <label className="block text-xs text-on-surface-variant font-semibold mb-1 ml-1">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                lock
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full pl-11 pr-11 py-2.5 bg-surface-container-low rounded-xl text-sm font-medium text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-outline-variant/20 transition-all"
                placeholder="••••••••••••"
                type={showPassword ? 'text' : 'password'}
                required
              />
              <button
                aria-label="Toggle password visibility"
                className="absolute right-3 p-1 rounded-full text-outline hover:text-on-surface focus:outline-none transition-colors"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-primary cursor-pointer"
                type="checkbox"
              />
              <span className="text-xs text-on-surface-variant font-medium">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Password reset instructions sent to your registered email.')}
              className="text-xs text-primary hover:text-secondary font-semibold transition-colors hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Submit CTA Button */}
          <div className="pt-2">
            <button
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-full text-on-primary text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 ${
                isSuccess
                  ? 'bg-tertiary'
                  : 'bg-primary hover:bg-secondary'
              }`}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  <span>Signing in...</span>
                </>
              ) : isSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Welcome Back!</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In to ChitChat'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Visual Divider with 'OR' Badge */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-px bg-outline-variant/30"></div>
          <span className="absolute px-3 bg-surface-container-lowest text-[10px] font-bold uppercase text-outline tracking-widest">
            OR
          </span>
        </div>

        {/* Social Google Button */}
        <div>
          <button
            onClick={() => triggerLogin('Google Workspace User', 'workspace.user@chitchat.com')}
            className="w-full py-2.5 px-4 bg-surface-container-low hover:bg-surface-container rounded-full text-on-surface text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-3 shadow-xs border border-outline-variant/20 active:scale-[0.99]"
            type="button"
          >
            {/* Official Multicolor Google SVG */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                fill="#34A853"
              ></path>
              <path
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                fill="#EA4335"
              ></path>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Sign-up Switcher Footer */}
        <div className="mt-6 text-center pt-1">
          <p className="text-xs text-on-surface-variant">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-primary hover:text-secondary transition-colors underline-offset-4 hover:underline"
            >
              {isSignUp ? 'Sign in instead' : 'Create an account'}
            </button>
          </p>
        </div>

        {/* Security Micro-indicator */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-outline text-[11px]">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span>End-to-end encrypted messaging gateway</span>
        </div>
      </div>

      {/* Minimalist Footer Meta */}
      <div className="mt-8 flex items-center gap-5 text-on-surface-variant/70 text-xs z-10">
        <a className="hover:text-on-surface transition-colors" href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy policy: All messages end-to-end encrypted.'); }}>
          Privacy Policy
        </a>
        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
        <a className="hover:text-on-surface transition-colors" href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of service: ChitChat Enterprise.'); }}>
          Terms of Service
        </a>
        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
        <a className="hover:text-on-surface transition-colors" href="#help" onClick={(e) => { e.preventDefault(); alert('Support center: help@chitchat.io'); }}>
          Support Center
        </a>
      </div>
    </div>
  );
};
