import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useTeam } from '../../context/TeamContext';

export const AssignedAPIsView: React.FC = () => {
  const { currentTeam } = useTeam();

  // Trigger confetti burst on component mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#ec4899', '#3b82f6', '#eab308']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!currentTeam || !currentTeam.api1 || !currentTeam.api2) return null;

  const apis = [
    { label: 'API #1', item: currentTeam.api1 },
    { label: 'API #2', item: currentTeam.api2 },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-slate-100 mb-1">
          Your assigned APIs
        </h2>
        <p className="text-slate-400 text-sm">
          Locked in. Now go build.
        </p>
      </div>

      {/* Grid of Assigned Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apis.map(({ label, item }) => (
          <div
            key={label}
            className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group min-h-[220px]"
          >
            {/* Ambient background glow */}
            <div
              className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: item.color }}
            />

            <div>
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {label}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  Locked In
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4 z-10 relative">
                {/* Icon Box */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {item.name.charAt(0)}
                </div>

                {/* API Name */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pt-3 border-t border-slate-800/60 z-10 relative">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
