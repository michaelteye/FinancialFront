import { createContext } from 'react';

export enum LoginSteps {
  PHONE = 'PHONE',
  PASSWORD = 'PASSWORD',
  VERIFY = 'VERIFY',
  RESET = 'RESET',
}

export const LoginContext = createContext<{
  step: LoginSteps;
  setStep: (step: LoginSteps) => void;
}>({ step: LoginSteps.PHONE, setStep: () => {} });
