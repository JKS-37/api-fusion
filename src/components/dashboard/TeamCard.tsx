import React, { useState, useEffect } from 'react';
import { useTeam } from '../../context/TeamContext';

export const TeamCard: React.FC = () => {
  const { currentTeam } = useTeam();

  // Target deadline: July 27, 23:59:59
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 0,
    minutes: 33,
    seconds: 41
  });

  useEffect(() => {
    // Target date set to 4 days from now for live countdown feel
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    targetDate.setHours(23, 59, 59);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!currentTeam) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 mb-8 border border-slate-800/80 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Team Details */}
        <div>
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-1 block">
            TEAM
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-1">
            {currentTeam.teamName}
          </h2>
          <p className="text-slate-400 text-sm">
            Led by {currentTeam.leaderName}
          </p>
        </div>

        {/* Right Countdown Timer */}
        <div className="flex flex-col items-start md:items-end">
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
            SUBMISSION DEADLINE · 27 JUL 11:59 PM
          </span>

          <div className="grid grid-cols-4 gap-2.5">
            {/* Days */}
            <div className="bg-[#0b101d] border border-slate-800/90 rounded-xl p-3 text-center min-w-[62px]">
              <span className="font-mono text-2xl font-bold text-slate-100 block">
                {pad(timeLeft.days)}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">
                DAYS
              </span>
            </div>

            {/* Hours */}
            <div className="bg-[#0b101d] border border-slate-800/90 rounded-xl p-3 text-center min-w-[62px]">
              <span className="font-mono text-2xl font-bold text-slate-100 block">
                {pad(timeLeft.hours)}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">
                HRS
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-[#0b101d] border border-slate-800/90 rounded-xl p-3 text-center min-w-[62px]">
              <span className="font-mono text-2xl font-bold text-slate-100 block">
                {pad(timeLeft.minutes)}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">
                MIN
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-[#0b101d] border border-slate-800/90 rounded-xl p-3 text-center min-w-[62px]">
              <span className="font-mono text-2xl font-bold text-cyan-400 block animate-pulse">
                {pad(timeLeft.seconds)}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">
                SEC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
