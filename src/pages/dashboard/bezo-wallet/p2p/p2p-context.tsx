import { createContext, useContext } from 'react';
import { P2pContextValues, P2pSteps } from '../lib/types';

export const P2pContext = createContext<P2pContextValues>({
  form: {},
  errorMessage: '',
  setOpen: () => {},
  setForm: () => {},
  setStep: () => {},
  setValue: () => {},
  setError: () => {},
  setErrorMessage: () => {},
  step: P2pSteps.FORM_DETAILS,
});

export const useP2pContext = () => useContext(P2pContext);
