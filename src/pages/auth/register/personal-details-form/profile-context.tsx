import { NewUserProfile, Regions } from '@/store/types';
import { Dispatch, SetStateAction, createContext } from 'react';
export interface ProfileForm {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  fullName?: string;
  occupation?: string | null;
  referralCode?: string;
  gender?: 'male' | 'female' | null;
  homeAddress?: string;
  gpsAddress?: string;
  password?: string;
  country?: string;
  social?: string;
  campaignSocial?: string;
  momo?: string;
  withdrawalLimit?: string;
  depositLimit?: string;
  level?: 'beginner' | 'intermediate' | 'advance';
  email?: string;
  region?: Regions;
  username?: string;
  phone?: string;
  relationship?: string;
  accountPhoneNumber?: string;
}

export interface ProfileDetailContextValue {
  step: number;
  setStep: (step: number) => void;
  showNextStep: () => void;
  showPrevStep: () => void;
  form: ProfileForm;
  setForm: Dispatch<SetStateAction<ProfileForm>>;
  setValue: (key: keyof ProfileForm, value: any) => void;
}

export const ProfileDetailContext = createContext<ProfileDetailContextValue>({
  step: 1,

  setStep: () => {},
  showNextStep: () => {},
  showPrevStep: () => {},
  form: {},
  setForm: () => {},
  setValue: () => {},
});
