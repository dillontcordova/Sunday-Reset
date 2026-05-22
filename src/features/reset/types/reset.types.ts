export type ResetStep = 'brain-unload' | 'reflection' | 'recenter' | 'choose-week' | 'closure';

export interface ResetSession {
  id: string;
  createdAt: string;
  completedAt?: string;
  unload: string[];
  reflections: { mattered: string; drained: string; peace: string; avoidNextWeek: string };
  recenter: { family: string; meals: string; finances: string; faith: string; schedule: string; relationships: string };
  focuses: { topThree: string[]; simplify: string; prioritizeRelationship: string; avoid: string };
  closure: { closingThought: string; completed: boolean };
}
