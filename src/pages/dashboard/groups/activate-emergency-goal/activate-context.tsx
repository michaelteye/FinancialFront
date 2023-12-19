import { createContext, useContext } from 'react';

export interface activateFormData {
  signatories?: string;
  goalId?: string;
}

export enum activateSteps {
  STEP_1 = 1,
  STEP_2 = 2,
  ADD_SIGNATORIES = 3,
}

interface ActivateContextValue {
  form: activateFormData;
  step: activateSteps;
  setForm: (form: activateFormData) => void;
  setStep: (step: activateSteps) => void;
}

export const ActivateContext = createContext<ActivateContextValue>({
  form: {},
  step: activateSteps.STEP_1,
  setForm: () => {},
  setStep: () => {},
});

export const useActivateContext = () => useContext(ActivateContext);
