import { NewUserProfile } from '@/store/types';

export enum P2pSteps {
  FORM_DETAILS = 'FORM_DETAILS',
  REVIEW = 'REVIEW',
  PIN = 'PIN',
  ERROR = 'ERROR',
}

export enum P2pError {
  PIN = 'PIN',
  AMOUNT = 'AMOUNT',
  UNKNOWN = 'UNKOWN',
}

export interface P2pSetupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface BezoTranzactions {
  amount?: string;
  createdAt?: string;
  expectedBalance?: number;
  oldBalance?: number;
  platform?: string;
  receiverExpectedBalance?: number;
  receiverOldBalance?: number;
  receiverProfile?: NewUserProfile;
  receiver_id?: string;
  refNo?: string;
  type?: 'debit' | 'credit';
  status?: 'pending' | 'successful' | 'failure';
  transaction_type?: 'debit' | 'credit' | 'direct debit';
  updatedAt?: string;
  user_id?: string;
  _id?: string;
}

export interface P2pFormContext {
  pin?: string;
  amount?: string;
  username?: string;
  fullName?: string;
  transferAccountId?: string;
  phoneNumber?: string;
  profilePicture?: string;
  notes?: string;
}

export interface P2pContextValues {
  step: P2pSteps;
  error?: P2pError;
  form?: P2pFormContext;
  errorMessage?: string;
  setOpen?: (open: boolean) => void;
  setStep: (step: P2pSteps) => void;
  setError?: (error?: P2pError) => void;
  setErrorMessage?: (error: string) => void;
  setForm: (form: P2pFormContext) => void;
  setValue: (key: keyof P2pFormContext, value: any) => void;
}
