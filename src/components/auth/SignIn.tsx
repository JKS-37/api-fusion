import React, { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { LogIn, AlertCircle } from 'lucide-react';

interface SignInProps {
  onSuccess?: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSuccess }) => {
  const { signIn } = useTeam();
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = signIn(teamName, password);
      setIsLoading(false);
      if (success) {
        if (onSuccess) onSuccess();
      } else {
        setError('Invalid team name or password.');
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Team Name
        </label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Name of your team"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#0f172a]/80 border border-slate-700/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-sans"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#0f172a]/80 border border-slate-700/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-slate-900 font-semibold shadow-lg shadow-cyan-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2 cursor-pointer"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate-400 pt-2">
        Use your team name and password to continue.
      </p>
    </form>
  );
};
