import React, { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { UserPlus, AlertCircle } from 'lucide-react';

interface SignUpProps {
  onSuccess?: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess }) => {
  const { signUp } = useTeam();
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = signUp(teamName, leaderName, password);
      setIsLoading(false);
      if (res.success) {
        if (onSuccess) onSuccess();
      } else {
        setError(res.error || 'Failed to create team. Please try another team name.');
      }
    }, 400);
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
          placeholder="Enter your team name"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#0f172a]/80 border border-slate-700/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Team Leader Name
        </label>
        <input
          type="text"
          value={leaderName}
          onChange={(e) => setLeaderName(e.target.value)}
          placeholder="Enter your name"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#0f172a]/80 border border-slate-700/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
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
          placeholder="At least 6 characters"
          required
          className="w-full px-4 py-3 rounded-lg bg-[#0f172a]/80 border border-slate-700/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold shadow-lg shadow-cyan-400/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2 cursor-pointer"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
            <span>Creating Team...</span>
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            <span>Create Team</span>
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate-400 pt-2">
        You'll get a unique team token after signing up.
      </p>
    </form>
  );
};
