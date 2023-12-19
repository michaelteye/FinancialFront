import { IDTypes } from '@/pages/dashboard/settings/lib/types';

interface File {
  url: string[];
  appType: string;
  idType: IDTypes;
  idNumber: string;
}

export enum Networks {
  MTN = 'mtn',
  PRIMARY = 'primary',
  VODAFONE = 'vodafone',
  AIRTELTIGO = 'airteltigo',
}
export interface PaymentMethod {
  id: string;
  createdAt: string;
  phoneNumber: string;
  default: boolean;
  updatedAt: string;
  phoneId: string;
  userId: string;
  accountNumber: string | null;
  bank: string | null;
  status: string;
  paymentType: string;
  network: Networks;
}
interface Account {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  accountTypeId: string;
  account_id: string;
  allowWithdrawal: boolean;
  accountNumber: string;
  balance: string;
  userId: string;
  walletId: string;
}

interface Address {
  country: string | null;
  gpsAddress: string | null;
  homeAddress: string;
  region: Regions;
}

export interface NewUserProfile {
  id?: string;
  roles?: string[];
  password?: string | null;
  createdAt?: string;
  pinCreated?: boolean;
  updatedAt?: string;
  email?: string;
  address?: Address;
  fullName?: string;
  balance?: string;
  phone?: string;
  userId?: string;
  paymentMethods?: PaymentMethod[];
  adminId?: string | null;
  account?: Account;
  referral?: {
    id: string;
    code: string;
  };
  emailIdentity?: { email: string } | null;
  firstName?: string;
  lastName?: string;
  userName?: string;

  user?: {
    id: string;
    createdAt: string;
    updatedAt: string;
    user_id: string;
    firstName: string;
    lastName: string;
    files: File[] | null;
    otherName: string | null;
    userName: string;
    userPaymentMethods?: PaymentMethod[];
    referralCode: string | null;
    deviceId: string | null;
    country: string | null;
    pin: {
      pin: string;
    };
    dateOfBirth: string;
    gender: 'male' | 'female' | null;
    level?: 'beginner' | 'intermediate' | 'advance';
    bezoSource: string | null;
    occupation: string | null;
    levelId: string;
    agreeToTerms: true;
    profilePic: string;
    homeAddress: string;
    gpsAddress: string;
    region?: Regions;
  };
}

export interface WalletValue {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  currency?: string;
}

export interface Notification {
  createdAt?: string;
  message?: string;
  title?: string;
  type?: string;
  _id?: string;
  status?: 'read' | 'unread';
}

export type Regions =
  | 'northern-region'
  | 'ashanti-region'
  | 'western-region'
  | 'volta-region'
  | 'eastern-region'
  | 'upper-west-region'
  | 'upper-east-region'
  | 'central-region'
  | 'great-accra-region'
  | 'savannah-region'
  | 'north-east-region'
  | 'bono-east-region'
  | 'oti-region'
  | 'ahafo-region'
  | 'bono-region'
  | 'western-north-region';
