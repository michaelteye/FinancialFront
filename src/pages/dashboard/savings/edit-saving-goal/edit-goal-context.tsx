import { createContext } from 'react';
import { editSavingGoalSteps, EditSavingsGoalFormContextValue } from '../helpers/types';

export const editSavingsGoalFormContext = createContext<EditSavingsGoalFormContextValue>({
  form: {},
  step: editSavingGoalSteps.GOAL_DETAILS,
  setForm: () => {},
  setStep: () => {},
  showNextStep: () => {},
  showPrevStep: () => {},
  setValue: () => {},
});
