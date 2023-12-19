import create, { State } from 'zustand';

interface SavingsStoreState extends State {
  savingsGoalType: string;
}

interface SavingsStoreMethods extends State {
  setSavingsGoalType: (savingsGoalType: string) => void;
}

export const useSavingsStore = create<SavingsStoreState & SavingsStoreMethods>((set, get) => ({
  savingsGoalType: '',
  setSavingsGoalType(savingsGoalType: string) {
    set({
      savingsGoalType,
    });
  },
}));
