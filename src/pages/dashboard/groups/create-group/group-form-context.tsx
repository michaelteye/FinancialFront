import { createContext } from 'react';
import { CreateGroupFormContextSteps, CreateGroupFormContextValue } from '../lib/types';

export const CreateGroupFormContext = createContext<CreateGroupFormContextValue>({
  step: CreateGroupFormContextSteps.ABOUT_GROUP,
  setStep: () => {},
  form: {},
  showNextStep: () => {},
  showPrevStep: () => {},
  setForm: () => {},
  setValue: () => {},
});
