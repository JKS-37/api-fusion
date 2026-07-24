import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-bold text-slate-100 mb-6">
          How it works
        </h3>

        <ol className="space-y-5 text-sm text-slate-300">
          <li className="flex gap-3 items-start">
            <span className="font-semibold text-slate-200">1.</span>
            <p>
              <strong className="text-slate-100">Spin the wheel</strong> — your first API gets locked in.
            </p>
          </li>

          <li className="flex gap-3 items-start">
            <span className="font-semibold text-slate-200">2.</span>
            <p>
              <strong className="text-slate-100">Spin again</strong> — your second API is chosen (no duplicates).
            </p>
          </li>

          <li className="flex gap-3 items-start">
            <span className="font-semibold text-slate-200">3.</span>
            <p>
              Your two APIs are <strong className="text-slate-100">saved permanently</strong> to your team profile.
            </p>
          </li>

          <li className="flex gap-3 items-start">
            <span className="font-semibold text-slate-200">4.</span>
            <p>
              <strong className="text-slate-100">Build something wild</strong> with both APIs in 48 hours.
            </p>
          </li>
        </ol>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-800/60">
        <p className="text-xs text-slate-400 leading-relaxed">
          Once you spin twice, your APIs are locked. Choose wisely — or trust the wheel ⚙️
        </p>
      </div>
    </div>
  );
};
