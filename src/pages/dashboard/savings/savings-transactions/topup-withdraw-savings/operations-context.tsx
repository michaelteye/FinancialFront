import { createContext, useContext } from 'react';
import { OperationsContextValue, OperationsSteps, SavingGoal } from '../../helpers/types';

// context is created to enable the sharing of props and state
// state what needs to be shared through the different steps ( selectedGoalName, )

export const OperationsContext = createContext<OperationsContextValue>({
  step: OperationsSteps.SELECT_GOAL,
  savingGoals: [],
  setStep() {},
  form: { amount: '', paymentType: 'momo' },
  setOpen() {},
  setForm() {},
  newUserTopUp: false,
  setError() {},
  setErrorMessage() {},
});

export const useOperationsCtx = () => useContext(OperationsContext);
