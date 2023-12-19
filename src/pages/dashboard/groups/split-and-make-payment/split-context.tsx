import { createContext } from 'react';
import { CreateSplitFormContextValue, CreateSplitFormSteps } from '../lib/types';

export const CreateSplitFormContext = createContext<CreateSplitFormContextValue>({
  step: CreateSplitFormSteps.STEP_1,
  setStep: () => {},
  form: {},
  showNextStep: () => {},
  showPrevStep: () => {},
  setForm: () => {},
  setValue: () => {},
});
