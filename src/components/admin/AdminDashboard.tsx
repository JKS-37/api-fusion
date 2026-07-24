import React, { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { API_LIST } from '../../data/apis';
import { ApiItem, Team } from '../../types';
import { Shield, Users, RotateCcw, Trash2, Edit3, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { teamsList, adminResetTeamSpin, adminDeleteTeam, adminAssignApis } = useTeam();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [api1Selection, setApi1Selection] = useState<string>('');
  const [api2Selection, setApi2Selection] = useState<string>('');
  const [assignError, setAssignError] = useState<string>('');

  const totalTeams = teamsList.length;
  const completedSpins = teamsList.filter((t) => t.spinStatus === 'completed').length;
  const pendingSpins = totalTeams - completedSpins;

  const handleOpenAssignModal = (team: Team) => {
    setSelectedTeam(team);
    setApi1Selection(team.api1?.id || '');
    setApi2Selection(team.api2?.id || '');
    setAssignError('');
  };

  const handleSaveAssign = () => {
    if (!selectedTeam) return;
    if (!api1Selection || !api2Selection) {
      setAssignError('Please select both API #1 and API #2.');
      return;
    }
    if (api1Selection === api2Selection) {
      setAssignError('API #1 and API #2 must be different.');
      return;
    }

    const api1Obj = API_LIST.find((a) => a.id === api1Selection);
    const api2Obj = API_LIST.find((a) => a.id === api2Selection);

    if (api1Obj && api2Obj) {
      adminAssignApis(selectedTeam.teamName, api1Obj, api2Obj);
      setSelectedTeam(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Admin Title Banner */}
      <div className="glass-panel-glow rounded-2xl p-6 md:p-8 border border-cyan-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100">
                  Admin Command Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-400 text-slate-950">
                  ROOT ADMIN
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Manage registered hackathon teams, oversee live wheel assignments, and manually override API allocations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Total Registered Teams
            </span>
            <span className="text-2xl font-bold text-slate-100">{totalTeams}</span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              APIs Locked In
            </span>
            <span className="text-2xl font-bold text-emerald-400">{completedSpins}</span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Pending Wheel Spins
            </span>
            <span className="text-2xl font-bold text-amber-400">{pendingSpins}</span>
          </div>
        </div>
      </div>

      {/* Teams Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800/80">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-100">
            Registered Teams ({teamsList.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-mono uppercase text-slate-400 bg-slate-900/50">
                <th className="p-3.5">Team Name</th>
                <th className="p-3.5">Leader</th>
                <th className="p-3.5">Token</th>
                <th className="p-3.5">Assigned API #1</th>
                <th className="p-3.5">Assigned API #2</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {teamsList.map((team) => (
                <tr key={team.teamName} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3.5 font-bold text-slate-100">
                    {team.teamName}
                  </td>
                  <td className="p-3.5 text-slate-300">{team.leaderName}</td>
                  <td className="p-3.5 font-mono text-xs text-cyan-400">{team.token}</td>
                  <td className="p-3.5">
                    {team.api1 ? (
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-white shadow-sm"
                        style={{ backgroundColor: team.api1.color }}
                      >
                        {team.api1.name}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Not spun</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {team.api2 ? (
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-white shadow-sm"
                        style={{ backgroundColor: team.api2.color }}
                      >
                        {team.api2.name}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Not spun</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {team.spinStatus === 'completed' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Locked (2/2)
                      </span>
                    ) : team.spinStatus === 'spun_one' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        Spun (1/2)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                        Not Started
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenAssignModal(team)}
                      title="Manually assign APIs"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => adminResetTeamSpin(team.teamName)}
                      title="Reset Team Spins"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => adminDeleteTeam(team.teamName)}
                      title="Delete Team"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/50 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Override API Allocation Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
            <button
              onClick={() => setSelectedTeam(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-100 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Manual API Allocation
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Overriding APIs for team: <strong className="text-slate-200">{selectedTeam.teamName}</strong>
            </p>

            {assignError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {assignError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  API #1
                </label>
                <select
                  value={api1Selection}
                  onChange={(e) => setApi1Selection(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 text-sm"
                >
                  <option value="">-- Select API #1 --</option>
                  {API_LIST.map((api) => (
                    <option key={api.id} value={api.id}>
                      {api.name} ({api.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  API #2
                </label>
                <select
                  value={api2Selection}
                  onChange={(e) => setApi2Selection(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-slate-700 text-slate-100 text-sm"
                >
                  <option value="">-- Select API #2 --</option>
                  {API_LIST.map((api) => (
                    <option key={api.id} value={api.id}>
                      {api.name} ({api.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssign}
                  className="px-5 py-2 rounded-lg bg-cyan-400 text-slate-950 text-sm font-bold shadow-lg shadow-cyan-400/20 hover:bg-cyan-300"
                >
                  Save Allocation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
