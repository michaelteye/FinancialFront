import { createContext, useContext } from 'react';
import { VasContextValues, VasSteps } from '../lib/types';

export const VasContext = createContext<VasContextValues>({
  step: VasSteps.DETAILS,
  setStep() {},
  userPin: '',
});

export const useVasContext = () => useContext(VasContext);
