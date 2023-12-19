export enum VasSteps {
  DETAILS = 'DETAILS',
  PIN = 'PIN',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
}

export enum VasTypes {
  BROADBAND = 'BROADBAND',
  AIRTIME = 'AIRTIME',
  DATA = 'DATA',
  UTILITIES = 'UTILITIES',
}

export interface VasSetupProps {
  open: boolean;
  onClose: () => void;
  selectedBiller?: VasData;
}

export interface VasData {
  category: string;
  id: string;
  imageIcon: null;
  name: string;
}

export interface VasFormData {
  amount?: 1000;
  verificationId?: string;
  data?: {
    billderId: string;
    billerName: string;
    amount: Number;
  };
  billerId?: string;
  channel?: string;
}
export interface VasContextValues {
  step: VasSteps;
  setStep: (step: VasSteps) => void;
  form?: VasFormData;
  selectedBiller?: VasData;
  userPin: string;
  setForm?: (form: VasFormData) => void;
  setValue?: (key: any, value: any) => void;
}
