import * as yup from 'yup';
import { createContext } from 'react';
import { CreateGroupSavingsForm } from '../components/types';
import { CreateGroupSavingsAccountFormContextValue } from '../lib/types';

export const GroupSavingsGoalSchema = yup.object().shape({
  goalName: yup.string().required('This field is required'),
  goalPeriod: yup
    .string()
    .required('This field is required')
    .oneOf(['9 months', '6 months', '3 months', '1 year', 'custom'], 'Please select your goal period'),
  frequency: yup
    .string()
    .required('this field is required')
    .oneOf(['daily', 'weekly', 'monthly'], 'Please select your saving frequency'),
  amountToSave: yup.string().required('This field cannot be left empty'),
});

export const defaultFirstStep = 0;

export const CreateGroupSavingsGoalFormContext = createContext<CreateGroupSavingsAccountFormContextValue>({
  form: {},
  setStep: () => {},
  setForm: () => {},
  stepChange: false,
  setStepChange: () => {},
  setValue: () => {},
  showPrevStep: () => {},
  showNextStep: () => {},
  step: defaultFirstStep,
});
