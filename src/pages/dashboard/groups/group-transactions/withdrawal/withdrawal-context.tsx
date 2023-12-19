import { createContext, useContext } from 'react';
import { withdrawalContextValue, withdrawalSteps } from '../../lib/types';

export const WithdrawalContext = createContext<withdrawalContextValue>({
  step: withdrawalSteps.WITHDRAWAL_REQUEST,
  form: {},
  setPinStep: false,
  setOpen: () => {},
  setError: () => {},
  setForm: () => {},
  setStep: () => {},
});

export const useWithdrawalContext = () => useContext(WithdrawalContext);
