export interface ApiItem {
  id: string;
  name: string;
  shortName?: string;
  color: string;
  iconName: string;
  category: string;
  description: string;
  docUrl: string;
  sampleCode: string;
  endpoints: string[];
}

export interface Team {
  teamName: string;
  leaderName: string;
  token: string;
  api1: ApiItem | null;
  api2: ApiItem | null;
  spinStatus: 'not_started' | 'spun_one' | 'completed';
  createdAt: string;
  isAdmin?: boolean;
}

export interface AuthState {
  currentTeam: Team | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
