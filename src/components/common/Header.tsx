import React from 'react';
import { useTeam } from '../../context/TeamContext';
import { LogOut, ShieldCheck, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentTeam, isAdmin, logout } = useTeam();

  if (!currentTeam) return null;

  return (
    <header className="border-b border-slate-800/80 bg-[#070b16]/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-bold text-xs tracking-wider">
            AF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-base tracking-tight">API Fusion</span>
              {isAdmin && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-400 text-slate-950 uppercase tracking-wide">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
              INFORMATYCA × IEEE CS CUSAT SB
            </p>
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-3">
          {/* Token / Admin badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono">
            {isAdmin ? (
              <>
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-400 font-bold">ADMIN-ROOT</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentTeam.token}</span>
              </>
            )}
          </div>


          {/* Log Out Button */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 text-sm font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
