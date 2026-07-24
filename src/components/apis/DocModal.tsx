import React from 'react';
import { ApiItem } from '../../types';
import { X, ExternalLink, Code, CheckCircle, Terminal } from 'lucide-react';

interface DocModalProps {
  api: ApiItem | null;
  onClose: () => void;
}

export const DocModal: React.FC<DocModalProps> = ({ api, onClose }) => {
  if (!api) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 md:p-8 border border-slate-700/80 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
            style={{ backgroundColor: api.color }}
          >
            {api.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-slate-100">{api.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-cyan-400 border border-slate-700">
                {api.category}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">{api.description}</p>
          </div>
        </div>

        {/* Endpoints */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            Key API Endpoints
          </h4>
          <div className="space-y-2">
            {api.endpoints.map((ep, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-lg bg-[#0b101e] border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between"
              >
                <span>{ep}</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Code className="w-4 h-4 text-cyan-400" />
            Quickstart Code Example
          </h4>
          <pre className="p-4 rounded-xl bg-[#090d18] border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
            {api.sampleCode}
          </pre>
        </div>

        {/* Official Documentation Link */}
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <a
            href={api.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors flex items-center gap-2"
          >
            <span>Official Documentation</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
