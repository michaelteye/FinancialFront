import { Networks, PaymentMethod } from '@/store/types';

export enum paymentMethodTypes {
  MOMO = 'momo',
  BANK = 'bank',
  CARD = 'card',
}

export type IDTypes = 'GHANA_CARD' | 'VOTERS_ID' | 'DRIVERS_LICENSE' | 'PASSPORT' | 'NONE';

export interface verifyData {
  idType?: string;
  idNumber?: string;
  idPicture?: File;
  userPicture?: File;
}

export interface AddPaymentMethodProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  paymentOption?: PaymentMethod;
}

export interface OtpVerificationProps {
  open?: boolean;
  action?: string;
  setOpen: (prop?: any) => void;
  error?: string;
  value?: any;
  phone?: string;
  otpStatus?: 'sending' | 'failed' | 'success';
  disabled?: boolean;
  onChange?: (prop?: any) => void;
  onClick?: () => void;
  loading?: boolean;
}

export interface PaymentMethodProps {
  paymentMethod?: PaymentMethod;
  onClick: () => void;
}

export interface paymentMethodForm {
  id?: string;
  pin?: string;
  phoneNumber: string;
  network?: Networks;
  default: boolean;
  type: paymentMethodTypes;
}

export interface UserKYC {
  id: string;
  createdAt: string;
  name: string | null;
  url: string[];
  idType: IDTypes;
  idNumber: string;
  type: string;
  appType: 'ID_CARD' | 'SELFIE';
  userId: string;
}

export enum ApplicationStatus {
  INCOMPLETE = 'INCOMPLETE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const IdOptions = [
  {
    label: 'Ghana Card',
    value: 'GHANA_CARD',
  },
  {
    label: "Voter's Id",
    value: 'VOTERS_ID',
  },
  {
    label: "Driver's License",
    value: 'DRIVER_LICENSE',
  },
  {
    label: 'Passport',
    value: 'PASSPORT',
  },
];
