import type { ResetSession } from '../types/reset.types';

const keys = {
  current: 'sunday-reset:v0:current-session',
  history: 'sunday-reset:v0:session-history'
};

const safeRead = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const resetStorage = {
  keys,
  loadCurrent: () => safeRead<ResetSession | null>(keys.current, null),
  loadHistory: () => safeRead<ResetSession[]>(keys.history, []),
  saveCurrent: (session: ResetSession | null) => localStorage.setItem(keys.current, JSON.stringify(session)),
  saveHistory: (history: ResetSession[]) => localStorage.setItem(keys.history, JSON.stringify(history)),
  clearAll: () => {
    Object.values(keys).forEach((k) => localStorage.removeItem(k));
    localStorage.removeItem('sunday-reset:v0:preferences');
    localStorage.removeItem('sunday-reset:v0:onboarding');
  }
};
