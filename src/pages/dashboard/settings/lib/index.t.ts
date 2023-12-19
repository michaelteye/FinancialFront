import * as yup from 'yup';
import { Networks } from '@/store/types';
import mtnLogo from '@assets/images/dashboard-images/mtn-mobile-money.png';
import vodafoneCash from '@assets/images/dashboard-images/vodafone-cash.png';
import airtelTigoCash from '@assets/images/dashboard-images/airtel-tigo-cash.png';
import { CONST } from '../../tools/constants';
import { IDTypes } from './types';

export const resolveNetworkLogo = (network?: Networks) => {
  if (network === Networks.AIRTELTIGO) {
    return 'airtel-tigo-cash.png';
  }
  if (network === Networks.VODAFONE) {
    return 'vodafone-cash.png';
  }
  if (network === Networks.MTN) {
    return 'mtn-mobile-money.png';
  }
};

export function getImageFromNetwork(network?: string) {
  if (network === 'vodafone') {
    return vodafoneCash;
  }

  if (network === 'airteltigo') {
    return airtelTigoCash;
  }

  return mtnLogo;
}

export const resolvePaymentType = (paymentType?: string) => {
  if (paymentType === 'mobile_money') {
    return 'Mobile Money account';
  }
};

export function convertToBaseNumber(momo: string) {
  if (!momo?.startsWith('233')) {
    return momo;
  }

  return '0' + momo?.substring(3);
}

export function convertToCodeNumber(momo: string) {
  if (!momo?.startsWith('0')) {
    return momo;
  }

  return '233' + momo?.substring(1);
}

function parseErrorsToMap(errors: { inner: yup.ValidationError[] }) {
  let errorsMap: any = {};

  errors.inner.forEach((validationError: yup.ValidationError) => {
    errorsMap[validationError.path!] = validationError.message;
  });

  if (errors?.inner.length === 0) {
    return undefined;
  }

  return errorsMap;
}

export function resolveWithdrawalLimit(level: 'beginner' | 'intermediate' | 'advance') {
  if (level?.toLowerCase() === 'beginner') {
    return CONST.BEGINNER_ACCOUNT_LIMIT;
  }
  if (level?.toLowerCase() === 'advance') {
    return CONST.ADVANCE_ACCOUNT_LIMIT;
  }

  return CONST.INTERMEDIATE_ACCOUNT_LIMIT;
}
