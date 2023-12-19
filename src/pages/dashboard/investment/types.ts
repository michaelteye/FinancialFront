export enum InvestSteps {
  SELECT_TYPE = 1,
  SELECT_PACKAGE = 2,
  AMOUNT = 3,
  REVIEW = 4,
  PIN = 5,
}

export enum InvestError {
  PIN = 'PIN',
  AMOUNT = 'AMOUNT',
  UNKNOWN = 'UNKOWN',
}

interface InvestSetupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave?: () => void;
}

interface InvestmentDetailValues {
  account?: object;
  amount?: number;
  createdAt?: string;
  endDate?: string;
  status?: string;
  investment_account_id?: 'debit' | 'credit';
  period?: number;
  ref?: string;
  startDate?: string;
  package?: InvestPackageValues;
  type?: InvestmentData;
  updatedAt?: string;
  user_id?: string;
  _id?: string;
}

export interface InvestmentData {
  admin_id?: string;
  createdAt?: string;
  description?: string;
  brief?: string;
  title?: string;
  name?: string;
  status?: 'inactive' | 'active';
  updatedAt?: string;
  _id?: string;
}

interface InvestTransactionValues {
  amount?: string;
  commission?: string;
  createdAt?: string;
  expectedBalance?: string;
  investmentAccount_id?: string;
  investment_id?: string;
  netAmount?: string;
  oldBalance?: string;
  phoneNumber?: string;
  refNo?: string;
  responseMessage?: string;
  status?: string;
  transaction_type?: 'debit' | 'credit';
  updatedAt?: string;
  user_id?: string;
  _id?: string;
}

interface InvestFormValues {
  type?: InvestmentData;
  amount?: string | number;
  pin?: string;
  package?: InvestPackageValues;
}
interface InvestContextValues {
  step: InvestSteps;
  setStep: (step: number) => void;
  form: InvestFormValues;
  setForm: (form: InvestFormValues) => void;
  error?: InvestError;
  setError: (error?: any) => void;
  setSubmitting?: (submitting: boolean) => void;
  setOpen?: (open: boolean) => void;
  submitting?: boolean;
}

interface InvestPackageValues {
  description?: string;
  duration?: number;
  brief?: string;
  title?: string;
  paymentSchedule?: string;
  investmentType?: string;
  minAmount?: number;
  name?: string;
  rate?: string;
  status?: 'active' | 'Inactive';
  _id?: string;
}

export type {
  InvestSetupProps,
  InvestTransactionValues,
  InvestmentDetailValues,
  InvestContextValues,
  InvestFormValues,
  InvestPackageValues,
};
