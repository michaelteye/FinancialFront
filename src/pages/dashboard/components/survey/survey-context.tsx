import { createContext, useContext } from 'react';
export enum SurveySteps {
  SURVEY_1 = 1,
  SURVEY_2 = 2,
  SURVEY_3 = 3,
  SURVEY_4 = 4,
}

export interface SurveyFormData {
  overallRating?: 'Not satisfied' | 'Somewhat satisfied' | 'Very Satisfied';
  recommendRating?: number;
  feedback?: string;
}
interface SurveyContextValue {
  step?: SurveySteps;
  form: SurveyFormData;
  setStep?: (step: SurveySteps) => void;
  setForm: (form: SurveyFormData) => void;
  selectedRate: string;
  setSelectedRate: (selectedRate: string) => void;
}
export const SurveyContext = createContext<SurveyContextValue>({
  step: SurveySteps.SURVEY_1,
  setStep: () => {},
  form: {},
  setForm: () => {},
  selectedRate: '',
  setSelectedRate: () => {},
});

export const useSurveyContext = () => useContext(SurveyContext);
