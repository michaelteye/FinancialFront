import { createContext } from 'react';
import { CreateSavingsAccountFormContextValue, CreateSavingsAccountFormSteps } from '../helpers/types';

export const CreateSavingsAccountFormContext = createContext<CreateSavingsAccountFormContextValue>({
  form: {},
  setOpen() {},
  setForm() {},
  setValue() {},
  submitting: false,
  setSubmitting() {},
  step: CreateSavingsAccountFormSteps.SELECT_GOAL_TYPE,
  setStep() {},
  showNextStep() {},
  showPreviousStep() {},
});
