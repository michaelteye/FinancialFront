import { createContext, useContext } from 'react';
import { InvestContextValues, InvestSteps } from './types';

export const InvestContext = createContext<InvestContextValues>({
  form: {},
  setForm() {},
  setError() {},
  setStep() {},
  setSubmitting() {},
  step: InvestSteps.SELECT_PACKAGE,
});

export const useInvestContext = () => useContext(InvestContext);
