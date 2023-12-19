import { CONST } from '../../tools/constants';
import { GroupSavingsType, withdrawalError } from './types';

export function getPrimaryGoalTopupError(amount: string, balance: string, paymentType: string) {
  if (paymentType === 'primary') {
    const amountToBalanceDifference = parseFloat(balance) - parseFloat(amount);

    if (amount === balance || (parseFloat(balance) <= CONST.MINIMUM_ACCOUNT_BALANCE && amountToBalanceDifference > 0)) {
      return `You have to leave a miminum of GHS ${CONST.MINIMUM_ACCOUNT_BALANCE} in your bezoWallet.`;
    }
    if (parseFloat(balance) < parseFloat(amount)) {
      return 'Insufficient funds in your bezoWallet.';
    }
    if (parseFloat(amount) === 0) {
      return 'Invalid Amount';
    }

    if (amount?.length === 0) {
      return undefined;
    }
  }
  return undefined;
}

export function resolveWithdrawalErrorType(message: string) {
  if (message.match(/pin/)) {
    return withdrawalError.PIN;
  }

  return withdrawalError.UNKNOWN;
}

export const resolveMaxStep = (type: string) => {
  if (type === GroupSavingsType.DEFAULT) {
    return 3;
  }
  if (type === GroupSavingsType.SPLIT_AND_SHARE) {
    return 3;
  }
  if (type === GroupSavingsType.ROTATIONAL) {
    return 4;
  }
  if (type === GroupSavingsType.ORGANIZATIONAL) {
    return 4;
  }
};

export const resolveGroupTransactionStatus = (code?: string) => {
  if (!code) {
    return 'pending';
  }

  if (code === '01') {
    return 'success';
  }

  if (code === '03') {
    return 'pending';
  }

  return 'failed';
};
