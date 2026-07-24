import React from 'react';
import { TeamProvider, useTeam } from './context/TeamContext';
import { AuthPage } from './components/auth/AuthPage';
import { Header } from './components/common/Header';
import { TeamCard } from './components/dashboard/TeamCard';
import { SpinWheel } from './components/wheel/SpinWheel';
import { HowItWorks } from './components/dashboard/HowItWorks';
import { AssignedAPIsView } from './components/apis/AssignedAPIsView';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainDashboard: React.FC = () => {
  const { currentTeam, isAuthenticated, isAdmin } = useTeam();

  if (!isAuthenticated || !currentTeam) {
    return <AuthPage />;
  }

  const isSpinCompleted = currentTeam.spinStatus === 'completed' && currentTeam.api1 && currentTeam.api2;

  return (
    <div className="min-h-screen flex flex-col bg-[#060913] text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <>
            {/* Team Banner with Live Countdown */}
            <TeamCard />

            {/* Dynamic View: Spin Wheel vs Locked Assigned APIs */}
            {!isSpinCompleted ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <SpinWheel />
                </div>
                <div className="lg:col-span-1">
                  <HowItWorks />
                </div>
              </div>
            ) : (
              <AssignedAPIsView />
            )}
          </>
        )}
      </main>

      <footer className="py-6 border-t border-slate-850/60 text-center text-xs text-slate-500">
        <p>API Fusion Ideathon Platform · Powered by INFORMATYKA × IEEE CS CUSAT SB</p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <TeamProvider>
      <MainDashboard />
    </TeamProvider>
  );
}
