import { createContext, useContext } from 'react';
import { GroupGoalsData, userGroup } from '../../components/types';
import { ContributeContextValue, ContributeSteps } from '../../lib/types';

export const ContributeContext = createContext<ContributeContextValue>({
  step: ContributeSteps.SELECT_GOAL,
  groupGoals: [],
  selectedGroupGoal: {},
  setStep() {},
  form: {},
  groups: [],
  setOpen() {},
  setForm() {},
  setError() {},
  setErrorMessage() {},
  setSelectedGroupGoal() {},
});

export const useContributeContext = () => useContext(ContributeContext);
