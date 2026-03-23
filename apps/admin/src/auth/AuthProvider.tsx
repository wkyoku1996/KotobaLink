import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import {
  fetchCurrentUser,
  loginAdmin,
  logoutAdmin,
  type AuthUser,
  type LoginResult,
} from '../lib/api';


type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AUTH_STORAGE_KEY = 'kotobalink_admin_auth';
const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredAuth(): { token: string | null; user: AuthUser | null } {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return { token: null, user: null };
    }

    const parsed = JSON.parse(raw) as { token?: string; user?: AuthUser };
    return {
      token: parsed.token ?? null,
      user: parsed.user ?? null,
    };
  } catch {
    return { token: null, user: null };
  }
}

function persistAuth(result: LoginResult | null) {
  if (!result) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token: result.access_token,
      user: result.user,
    }),
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = loadStoredAuth();
  const [user, setUser] = useState<AuthUser | null>(initial.user);
  const [token, setToken] = useState<string | null>(initial.token);
  const [loading, setLoading] = useState<boolean>(Boolean(initial.token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let active = true;

    setLoading(true);

    fetchCurrentUser(token)
      .then((currentUser) => {
        if (active) {
          setUser(currentUser);
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
          setToken(null);
          persistAuth(null);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      async login(username: string, password: string) {
        const result = await loginAdmin(username, password);
        setUser(result.user);
        setToken(result.access_token);
        persistAuth(result);
        return result.user;
      },
      async logout() {
        try {
          await logoutAdmin();
        } finally {
          setUser(null);
          setToken(null);
          persistAuth(null);
        }
      },
    }),
    [loading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
