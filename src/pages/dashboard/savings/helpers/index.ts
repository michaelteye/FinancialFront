import { add, addDays, differenceInHours } from 'date-fns';
import { CONST } from '../../tools/constants';
import { ActionTypes, OperationsError, OperationsSteps, SavingGoal, SavingsGoalForm } from './types';

//  **************************** Masked displayPhoneNumber ************************************

export const maskedDisplayPhoneNum = (phoneNumber: string) => {
  let subNum = phoneNumber?.substring(8);
  subNum = '*** *** ' + subNum;
  return subNum;
};

//  **************************** Resolve Amount To Save ************************************

const resolveSavingPeriod = (savingPeriod: string | number, endDate: Date) => {
  if (savingPeriod == '1 month') {
    return 28;
  }
  if (savingPeriod == '3 months') {
    return 84;
  }
  if (savingPeriod == '6 months') {
    return 168;
  }
  if (savingPeriod == '9 months') {
    return 252;
  }
  if (savingPeriod == '1 year') {
    return 336;
  }

  if (savingPeriod === 'custom') {
    const plus1Day = addDays(endDate, 2);
    const data = differenceInHours(plus1Day, new Date(), { roundingMethod: 'ceil' });

    return data / 24;
  }
};

const resolveSavingFrequency = (savingFrequency: string) => {
  if (savingFrequency === 'Daily') {
    return 1;
  }
  if (savingFrequency === 'Weekly') {
    return 7;
  }
  if (savingFrequency === 'Monthly') {
    return 28;
  }
};

export function computeAmountToSave(form: SavingsGoalForm) {
  const targetAmountVal = parseFloat(form.amountToRaise!);
  const savingFrequequencyValue = resolveSavingFrequency(form?.frequency!);
  const savingPeriodValue = resolveSavingPeriod(form?.goalPeriod!, form?.endDate!);
  const computeValue = (targetAmountVal * savingFrequequencyValue!) / savingPeriodValue!;

  return computeValue;
}

export function resolveExampleGoalTitle(chosenGoalType?: string) {
  if (chosenGoalType === 'Other') {
    return 'Eg. Car Repairs, Home Improvement, etc';
  }
  if (chosenGoalType === 'Business') {
    return 'eg. Clothing Biz, Make-up side gig, etc';
  }
  if (chosenGoalType === 'Emergency') {
    return 'eg. Health fund, clothing, home fixes, etc';
  }
  if (chosenGoalType === 'Rent') {
    return 'eg. house rent, shop rent, etc';
  }
  if (chosenGoalType === 'RichFluencer') {
    return 'Eg. Skin care gigs, Promo gigs, etc.';
  }
  if (chosenGoalType === 'Fees') {
    return 'Eg. Masters Program, Short Course, etc.';
  }
  if (chosenGoalType === 'Beneficiary') {
    return 'Eg. My Kid’s fees, Kwame’s Healthcare, etc.';
  }
  if (chosenGoalType === 'Travel & Vacation') {
    return 'Eg. Dubai tour, Vaca in Ibiza, etc.';
  }
  if (chosenGoalType === 'Halal') {
    return 'eg. Health, Vacation, car repairs, etc';
  }
  if (chosenGoalType === '90 Days Challenge') {
    return 'Discipline yourself and embark on a 90 days savings journey';
  }
}

export function resolveOperationsErrorType(message: string) {
  if (message === 'Verification Failed') {
    return OperationsError.PIN;
  }

  return OperationsError.UNKNOWN;
}

export function getPrimaryGoalTopupError(amount: string, balance: number, paymentType: string, action?: ActionTypes) {
  if (paymentType === 'primary' && action !== ActionTypes.WITHDRAW) {
    const amountToBalanceDifference = balance - parseFloat(amount);

    if (
      (action === ActionTypes.BEZOWALLETWITHDRAW && parseFloat(amount) === balance) ||
      balance <= CONST.MINIMUM_ACCOUNT_BALANCE ||
      (amountToBalanceDifference < CONST.MINIMUM_ACCOUNT_BALANCE && amountToBalanceDifference >= 0)
    ) {
      return `You have to leave a miminum of GHS ${CONST.MINIMUM_ACCOUNT_BALANCE} in your BezoWallet.`;
    }
    if (balance < parseFloat(amount)) {
      return 'Insufficient funds in your BezoWallet.';
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

export function resolveEndDate(goalPeriod?: string) {
  let result;
  const date = new Date();

  if (goalPeriod === '1 month') {
    result = add(date, {
      months: 1,
    });
  }

  if (goalPeriod === '3 months') {
    result = add(date, {
      months: 3,
    });
  }

  if (goalPeriod === '6 months') {
    result = add(date, {
      months: 6,
    });
  }

  if (goalPeriod === '9 months') {
    result = add(date, {
      months: 9,
    });
  }

  if (goalPeriod === '1 year') {
    result = add(date, {
      months: 12,
    });
  }

  return result;
}

export function computePercentageSaved(savingGoal?: SavingGoal) {
  if (!savingGoal) {
    return 0;
  }

  const amountSaved = parseFloat(savingGoal?.account?.balance!);
  const amountToRaise =
    Number(savingGoal?.amountToRaise) === 0
      ? parseFloat(savingGoal?.amountToSave)
      : parseFloat(savingGoal?.amountToRaise);

  let width = (amountSaved / amountToRaise) * 100;

  if (Math.round(width) >= 100) {
    return 100;
  }

  return width.toFixed(2);
}

export function getGoBackName(params: any, step: OperationsSteps) {
  if (params.savingsId && step === OperationsSteps.FORM_DETAILS) {
    return 'All Goals';
  }
  if (params.goalId && step === OperationsSteps.PIN) {
    return 'go back';
  }
  return 'go back';
}
