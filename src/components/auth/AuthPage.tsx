import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signup');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3">
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-pink-500 bg-clip-text text-transparent">
            API Fusion
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-medium">
          48 hours. Two APIs. One wild idea.
        </p>
      </div>

      {/* Auth Card Container */}
      <div className="w-full max-w-md glass-panel rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-800/80 z-10">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#0b1120]/90 rounded-xl mb-6 border border-slate-800/80">
          <button
            onClick={() => setActiveTab('signin')}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'signin'
                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'signup'
                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'signin' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};
