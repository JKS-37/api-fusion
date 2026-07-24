import React, { createContext, useContext, useState, useEffect } from 'react';
import { Team, ApiItem } from '../types';

interface TeamContextType {
  currentTeam: Team | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  teamsList: Team[];
  signUp: (teamName: string, leaderName: string, password: string) => { success: boolean; error?: string };
  signIn: (teamName: string, password: string) => boolean;
  logout: () => void;
  recordSpin: (api: ApiItem) => void;
  resetTeamSpin: () => void;
  // Admin functions
  adminResetTeamSpin: (teamNameKey: string) => void;
  adminDeleteTeam: (teamNameKey: string) => void;
  adminAssignApis: (teamNameKey: string, api1: ApiItem, api2: ApiItem) => void;
}

const STORAGE_KEY_TEAMS = 'api_fusion_teams_db';
const STORAGE_KEY_SESSION = 'api_fusion_session_token';

const ADMIN_TEAM_OBJ: Team = {
  teamName: 'System Administrator',
  leaderName: 'JK Admin',
  token: 'ADMIN-ROOT',
  api1: null,
  api2: null,
  spinStatus: 'completed',
  createdAt: new Date().toISOString(),
  isAdmin: true,
};

// Initial demo teams if local storage is empty
const DEMO_TEAMS: Record<string, Team & { password: string }> = {
  'byte me': {
    teamName: 'byte me',
    leaderName: 'hannah',
    token: 'FUSION-CF2A68',
    password: 'password123',
    api1: null,
    api2: null,
    spinStatus: 'not_started',
    createdAt: new Date().toISOString()
  },
  'The Debuggers': {
    teamName: 'The Debuggers',
    leaderName: 'Ada Lovelace',
    token: 'FUSION-ADA99',
    password: 'password123',
    api1: null,
    api2: null,
    spinStatus: 'not_started',
    createdAt: new Date().toISOString()
  }
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamsDb, setTeamsDb] = useState<Record<string, Team & { password: string }>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TEAMS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse teams DB', e);
      }
    }
    return DEMO_TEAMS;
  });

  const [currentTeam, setCurrentTeam] = useState<Team | null>(() => {
    const savedToken = localStorage.getItem(STORAGE_KEY_SESSION);
    if (savedToken === 'ADMIN-ROOT') {
      return ADMIN_TEAM_OBJ;
    }
    if (savedToken) {
      const savedTeams = localStorage.getItem(STORAGE_KEY_TEAMS);
      const db: Record<string, Team & { password: string }> = savedTeams ? JSON.parse(savedTeams) : DEMO_TEAMS;
      const found = Object.values(db).find((t) => t.token === savedToken);
      if (found) {
        const { password, ...teamData } = found;
        return teamData;
      }
    }
    return null;
  });

  // Save teams DB updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(teamsDb));
  }, [teamsDb]);

  const generateToken = () => {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `FUSION-${randomHex}`;
  };

  const signUp = (teamName: string, leaderName: string, password: string): { success: boolean; error?: string } => {
    const trimmed = teamName.trim();
    if (!trimmed) {
      return { success: false, error: 'Team name is required.' };
    }
    if (!password) {
      return { success: false, error: 'Password is required.' };
    }

    const trimmedKey = trimmed.toLowerCase();

    // Check reserved names
    if (trimmedKey === 'jkadmin' || trimmedKey === 'system administrator') {
      return { success: false, error: 'This team name is reserved.' };
    }

    // Check if team already exists (case-insensitive)
    if (teamsDb[trimmedKey]) {
      return {
        success: false,
        error: `Team name "${trimmed}" is already registered. Please choose a different team name.`
      };
    }

    const token = generateToken();
    const newTeamEntry = {
      teamName: trimmed,
      leaderName: leaderName.trim() || 'Team Leader',
      token,
      password,
      api1: null,
      api2: null,
      spinStatus: 'not_started' as const,
      createdAt: new Date().toISOString()
    };

    setTeamsDb((prev) => ({
      ...prev,
      [trimmedKey]: newTeamEntry
    }));

    const { password: _, ...teamWithoutPassword } = newTeamEntry;
    setCurrentTeam(teamWithoutPassword);
    localStorage.setItem(STORAGE_KEY_SESSION, token);
    return { success: true };
  };

  const signIn = (teamName: string, password: string): boolean => {
    const trimmedKey = teamName.trim().toLowerCase();

    // Check for Admin Credentials
    if (trimmedKey === 'jkadmin' && password === 'jk123') {
      setCurrentTeam(ADMIN_TEAM_OBJ);
      localStorage.setItem(STORAGE_KEY_SESSION, 'ADMIN-ROOT');
      return true;
    }

    const found = teamsDb[trimmedKey];
    if (found && found.password === password) {
      const { password: _, ...teamWithoutPassword } = found;
      setCurrentTeam(teamWithoutPassword);
      localStorage.setItem(STORAGE_KEY_SESSION, found.token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentTeam(null);
    localStorage.removeItem(STORAGE_KEY_SESSION);
  };

  const recordSpin = (api: ApiItem) => {
    if (!currentTeam || currentTeam.isAdmin) return;

    setTeamsDb((prev) => {
      const key = currentTeam.teamName.toLowerCase();
      const existing = prev[key];
      if (!existing) return prev;

      let updatedTeam = { ...existing };
      if (!updatedTeam.api1) {
        updatedTeam.api1 = api;
        updatedTeam.spinStatus = 'spun_one';
      } else if (!updatedTeam.api2) {
        updatedTeam.api2 = api;
        updatedTeam.spinStatus = 'completed';
      }

      // Sync current team state
      const { password: _, ...teamWithoutPassword } = updatedTeam;
      setCurrentTeam(teamWithoutPassword);

      return {
        ...prev,
        [key]: updatedTeam
      };
    });
  };

  const resetTeamSpin = () => {
    if (!currentTeam || currentTeam.isAdmin) return;

    setTeamsDb((prev) => {
      const key = currentTeam.teamName.toLowerCase();
      const existing = prev[key];
      if (!existing) return prev;

      const reseted = {
        ...existing,
        api1: null,
        api2: null,
        spinStatus: 'not_started' as const
      };

      const { password: _, ...teamWithoutPassword } = reseted;
      setCurrentTeam(teamWithoutPassword);

      return {
        ...prev,
        [key]: reseted
      };
    });
  };

  // Admin capabilities
  const adminResetTeamSpin = (teamNameKey: string) => {
    setTeamsDb((prev) => {
      const key = teamNameKey.toLowerCase();
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          api1: null,
          api2: null,
          spinStatus: 'not_started'
        }
      };
    });
  };

  const adminDeleteTeam = (teamNameKey: string) => {
    setTeamsDb((prev) => {
      const copy = { ...prev };
      delete copy[teamNameKey.toLowerCase()];
      return copy;
    });
  };

  const adminAssignApis = (teamNameKey: string, api1: ApiItem, api2: ApiItem) => {
    setTeamsDb((prev) => {
      const key = teamNameKey.toLowerCase();
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          api1,
          api2,
          spinStatus: 'completed'
        }
      };
    });
  };

  const teamsList: Team[] = Object.values(teamsDb).map(({ password, ...t }) => t);

  return (
    <TeamContext.Provider
      value={{
        currentTeam,
        isAuthenticated: !!currentTeam,
        isAdmin: !!currentTeam?.isAdmin,
        teamsList,
        signUp,
        signIn,
        logout,
        recordSpin,
        resetTeamSpin,
        adminResetTeamSpin,
        adminDeleteTeam,
        adminAssignApis
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};
