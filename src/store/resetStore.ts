import { create } from 'zustand';
import type { ResetSession, ResetStep } from '../features/reset/types/reset.types';
import { resetStorage } from '../features/reset/utils/resetStorage';
import { createId } from '../lib/ids';

interface ResetState {
  currentStep: ResetStep;
  currentSession: ResetSession;
  history: ResetSession[];
  setStep: (step: ResetStep) => void;
  updateSession: (updater: (draft: ResetSession) => ResetSession) => void;
  completeSession: () => void;
  startNewSession: () => void;
  clearAll: () => void;
}

const steps: ResetStep[] = ['brain-unload', 'reflection', 'recenter', 'choose-week', 'closure'];
const emptySession = (): ResetSession => ({
  id: createId(), createdAt: new Date().toISOString(), unload: [], reflections: { mattered: '', drained: '', peace: '', avoidNextWeek: '' },
  recenter: { family: '', meals: '', finances: '', faith: '', schedule: '', relationships: '' },
  focuses: { topThree: ['', '', ''], simplify: '', prioritizeRelationship: '', avoid: '' },
  closure: { closingThought: '', completed: false }
});

export const useResetStore = create<ResetState>((set, get) => ({
  currentStep: 'brain-unload',
  currentSession: resetStorage.loadCurrent() ?? emptySession(),
  history: resetStorage.loadHistory(),
  setStep: (step) => set({ currentStep: step }),
  updateSession: (updater) => set((state) => {
    const next = updater(state.currentSession);
    resetStorage.saveCurrent(next);
    return { currentSession: next };
  }),
  completeSession: () => set((state) => {
    const complete = { ...state.currentSession, completedAt: new Date().toISOString(), closure: { ...state.currentSession.closure, completed: true } };
    const history = [complete, ...state.history].slice(0, 52);
    resetStorage.saveHistory(history);
    const fresh = emptySession();
    resetStorage.saveCurrent(fresh);
    return { history, currentSession: fresh, currentStep: steps[0] };
  }),
  startNewSession: () => set({ currentSession: emptySession(), currentStep: steps[0] }),
  clearAll: () => { resetStorage.clearAll(); set({ currentSession: emptySession(), history: [], currentStep: steps[0] }); }
}));
