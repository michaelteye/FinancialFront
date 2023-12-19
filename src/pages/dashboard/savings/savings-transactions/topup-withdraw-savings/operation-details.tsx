import classNames from 'classnames';
import { useAuthStore } from '@/store/auth';
import { Spacer } from '@/components/spacer';
import SvgVisa from '@/components/icons/Visa';
import { Input } from '@/components/input/input';
import SvgWallet from '@/components/icons/Wallet';
import { differenceInCalendarDays, differenceInDays } from 'date-fns';
import { useOperationsCtx } from './operations-context';
import SvgSmallPlus from '@/components/icons/SmallPlus';
import SvgWarningCircle from '@/components/icons/WarningCircle';
import { getImageFromNetwork } from '@/pages/dashboard/settings/lib/index.t';
import { getPrimaryGoalTopupError, maskedDisplayPhoneNum } from '../../helpers';
import { ActionTypes, OperationsError, OperationsSteps, SavingGoal } from '../../helpers/types';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { CONST } from '@/pages/dashboard/tools/constants';
import { useEffect } from 'react';
import { Notice } from '@/components/flash/flash';
import { LockTypes } from '@/pages/dashboard/tools/types';
import { ComingSoon } from '@/components/coming-soon';
import { useNavigate } from 'react-router-dom';

export const OperationDetails: React.FC = () => {
  const navigate = useNavigate();
  const amounts = ['5.00', '10.00', '20.00', '50.00'];
  const { userProfile, stats, defaultPaymentMethod } = useAuthStore();
  const { step, form, setForm, selectedGoal, action, errorMessage, setErrorMessage, error } = useOperationsCtx();
  const bezoWalletBalance = userProfile?.balance ? parseFloat(userProfile?.balance!) : 0;
  const noDeposits = stats?.totalDeposits! === 0;
  const network = defaultPaymentMethod?.network;
  const daysLeft = differenceInCalendarDays(new Date(selectedGoal?.endDate!), new Date());
  const lockedGoalLessThanAMonth = differenceInDays(new Date(), new Date(selectedGoal?.createdAt!)) < 31;
  const primaryGoalTopUpError = getPrimaryGoalTopupError(form?.amount!, bezoWalletBalance, form.paymentType!, action!);

  function resolveWithdrawErrorMessage(amount: string, selectedGoal?: SavingGoal) {
    const amountToBezoWalletDiff = bezoWalletBalance - parseFloat(amount);
    const balance = parseFloat(selectedGoal?.account?.balance!);
    const insufBalance = balance < parseFloat(amount);

    if (
      (action === ActionTypes.WITHDRAW || action === ActionTypes.BEZOWALLETWITHDRAW) &&
      parseFloat(amount) < 1 &&
      parseFloat(amount) > 0
    ) {
      return 'Minimum withdrawal amount is GHS 1';
    }

    if (!selectedGoal) {
      if (amountToBezoWalletDiff < 0) {
        return `Insufficient balance (BezoWallet balance: ${bezoWalletBalance.toFixed(2)})`;
      }
      if (amountToBezoWalletDiff < CONST.MINIMUM_ACCOUNT_BALANCE) {
        return `You have to leave a miminum of GHS ${CONST.MINIMUM_ACCOUNT_BALANCE} in your BezoWallet.`;
      }
    } else {
      if (insufBalance) {
        return `Insufficient balance (saving goal balance: ${balance.toFixed(2)})`;
      }
    }
  }

  useEffect(() => {
    if (selectedGoal) {
      setForm({ paymentType: 'primary', amount: '' });
    }
  }, [selectedGoal]);

  if (step !== OperationsSteps.FORM_DETAILS) {
    return null;
  }

  return (
    <>
      <div
        className={classNames('px-7 border-b border-neutral-100 lg:pb-11', {
          'pb-5': action === ActionTypes.WITHDRAW || action === ActionTypes.BEZOWALLETWITHDRAW,
          'pb-11': action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP,
        })}
      >
        {action === ActionTypes.WITHDRAW && selectedGoal && daysLeft > 0 ? (
          lockedGoalLessThanAMonth && selectedGoal.accountTypeName === LockTypes.BEZO_LOCK ? (
            <div className="p-3 mb-2 bg-yellow bg-opacity-10 rounded-xl flex space-x-3 items-center">
              <div>
                <SvgWarningCircle className="text-yellow" />
              </div>

              <p className="text-left sm:text-sm text-xs">You can't withdraw from a locked goal in the first month</p>
            </div>
          ) : (
            <>
              <div className="p-3 bg-yellow bg-opacity-10 rounded-xl flex space-x-3 items-center">
                <div>
                  <SvgWarningCircle className="text-yellow" />
                </div>

                <p className="text-left sm:text-sm text-xs">
                  You'll be charged{' '}
                  {selectedGoal.accountTypeName === LockTypes.BEZO_LOCK
                    ? CONST.BEZO_LOCK_CHARGES
                    : CONST.BEZO_FLEX_CHARGES}{' '}
                  for early withdrawals <span className="font-medium">(You are left with {daysLeft} days)</span>
                </p>
              </div>

              <Spacer className="h-4" />
            </>
          )
        ) : null}

        {/* {action === ActionTypes.BEZOWALLETWITHDRAW && (
          <Notice text="This transaction will result in a 2% withdrawal fee." />
        )} */}

        <Spacer className="h-2" />

        <div className="text-left relative">
          <p className=" font-sans lg:text-lg text-base text-neutral-500 font-medium">
            Amount to {action === ActionTypes.BEZOWALLETTOPUP || action === ActionTypes.TOPUP ? 'topup' : 'withdraw'}
          </p>

          <p className="text-sm font-sans-body text-neutral-400">
            This is the amount you want to{' '}
            {action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP ? 'topup into' : 'withdraw from'}{' '}
            your {!selectedGoal?.name ? ' BezoWallet ' : `${selectedGoal?.name} goal account`}
          </p>

          <Spacer className=" h-2" />

          <Input
            prefix="GHS"
            placeholder="eg.200"
            value={form?.amount}
            error={errorMessage}
            onChange={(event) => {
              const inputValue = event?.target?.value;

              if (inputValue.includes('.')) {
                const [, secondValue] = inputValue.split('.');
                if (secondValue.length > 2) {
                  return inputValue;
                }
              }

              if (action === ActionTypes.BEZOWALLETWITHDRAW || action === ActionTypes.WITHDRAW) {
                setErrorMessage?.(resolveWithdrawErrorMessage(inputValue, selectedGoal));
              } else if (
                form.paymentType === 'momo' &&
                parseFloat(inputValue) < Number(CONST.INIT_DEPOSIT) &&
                noDeposits
              ) {
                setErrorMessage?.(`Please make an initial deposit of Ghs ${CONST.INIT_DEPOSIT}`);
              } else if (parseFloat(inputValue) < 0 || isNaN(parseFloat(inputValue))) {
                setErrorMessage?.('Invalid Amount');
              } else {
                setErrorMessage?.(undefined);
              }
              setForm({
                ...form,
                amount: inputValue,
              });
              if (errorMessage && error === OperationsError.AMOUNT) {
                setErrorMessage?.(undefined);
              }
            }}
          />

          <p
            className={classNames('text-green sm:text-sm text-xs font-sans-body absolute right-4', {
              'bottom-5': !errorMessage,
              'sm:bottom-12 bottom-[4.2rem]': errorMessage,
            })}
          >
            {form.paymentType === 'primary'
              ? 'Balance: ₵' + ' ' + selectedGoal?.account?.balance
              : 'BezoWallet: ₵' + ' ' + bezoWalletBalance.toFixed(2)}
          </p>
        </div>

        <Spacer className="h-2" />

        {action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP ? (
          <>
            <p className="font-sans-body text-[#091E42] text-opacity-40 text-xs font-medium text-left">
              Or select amount
            </p>

            <Spacer className="h-2" />

            <div className="flex flex-col lg:flex-row">
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
                {amounts.map((amount, idx) => {
                  return (
                    <label
                      key={idx}
                      id="sendingAmount"
                      className={classNames('py-3 px-4 items-center rounded-full flex space-x-2 cursor-pointer', {
                        'bg-[#AACAF6]': amount === form?.amount,
                        'bg-neutral-100': amount !== form?.amount,
                      })}
                    >
                      <button
                        id="amount"
                        name="amount"
                        onClick={() => {
                          setForm({
                            ...form,
                            amount: amount,
                          });
                          setErrorMessage?.(undefined);
                        }}
                      />
                      <p className="font-sans text-neutral-900 font-light"> ₵ {amount}</p>
                    </label>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}

        <div className="">
          {' '}
          <Spacer className=" h-6" />
          <div className="text-left">
            <p className=" font-sans lg:text-lg text-base text-neutral-500 font-medium">
              {action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP
                ? 'Mode of payment'
                : 'My Beneficiary Account'}
            </p>
          </div>
          <Spacer className=" h-3" />
          {action === ActionTypes.BEZOWALLETWITHDRAW || !selectedGoal ? null : (
            <div>
              <label
                htmlFor="primary-wallet"
                className="lg:w-1/2 p-3 lg:text-base text-sm bg-neutral-100 rounded-full flex space-x-2 items-center"
              >
                <input
                  type="radio"
                  id="primary-wallet"
                  name="payment-type"
                  value="primary-wallet"
                  checked={form.paymentType === 'primary'}
                  onChange={() => {
                    setForm({ ...form, paymentType: 'primary' });
                  }}
                />

                <SvgWallet />

                <div className="flex space-x-3 items-center">
                  <p className="font-sans-body text-lg text-neutral-900">BezoWallet </p>
                  <p className="text-green text-sm font-sans-body ">GHS {bezoWalletBalance.toFixed(2)}</p>
                </div>
              </label>

              {form.amount && primaryGoalTopUpError && form.paymentType === 'primary' ? (
                <div className="flex text-left">
                  <ErrorText>{primaryGoalTopUpError}</ErrorText>
                </div>
              ) : null}

              {form.amount &&
              form.paymentType === 'primary' &&
              form.amount !== '0' &&
              !errorMessage &&
              !error &&
              !primaryGoalTopUpError ? (
                <div>
                  <Spacer className="h-1" />

                  <p className="font-sans-body text-[#EC9E00] text-left text-sm">
                    {`GHS ${form?.amount} will be ${
                      action !== ActionTypes.WITHDRAW ? 'deducted from ' : 'transferred to'
                    }  your BezoWallet`}
                  </p>
                </div>
              ) : null}

              <Spacer className="h-4" />
            </div>
          )}
          {action === ActionTypes.WITHDRAW || action === ActionTypes.TOPUP ? null : (
            <>
              <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
                <label
                  htmlFor={`${network}-input`}
                  className="p-3 lg:text-base text-sm bg-neutral-100 rounded-full flex space-x-2 items-center"
                >
                  <input
                    type="radio"
                    id={`${network}-input`}
                    name="payment-type"
                    value={network}
                    checked={form.paymentType === 'momo'}
                    onChange={() => {
                      setForm({ ...form, paymentType: 'momo' });
                    }}
                  />

                  <img className="w-8" alt={`${network}`} src={getImageFromNetwork(network?.toLowerCase())} />

                  <p className="font-sans-body text-neutral-900">
                    momo {maskedDisplayPhoneNum(defaultPaymentMethod?.phoneNumber!)}
                  </p>
                </label>

                {action === ActionTypes.BEZOWALLETTOPUP ? (
                  <label
                    htmlFor="visa-input"
                    className=" p-3 lg:text-base text-sm bg-neutral-100 rounded-full flex space-x-2 items-center justify-between"
                  >
                    <div className="flex items-center  space-x-2">
                      <input
                        type="radio"
                        id="visa-input"
                        name="payment-type"
                        value={'visa'}
                        checked={form.paymentType === 'visa'}
                        onChange={() => {
                          setForm({ ...form, paymentType: 'visa' });
                        }}
                      />

                      <div>
                        <SvgVisa />
                      </div>

                      <p className="sm:text-base text-sm font-sans-body text-neutral-900">Visa Card </p>
                    </div>
                  </label>
                ) : null}

                <button
                  onClick={() => navigate('/dashboard/settings?tab=2')}
                  className="flex justify-start p-3 bg-neutral-100 w-full rounded-full"
                >
                  <div className=" flex space-x-2 items-center">
                    <SvgSmallPlus />

                    <span className="lg:text-base text-sm mr-4 font-sans-body text-neutral-900">
                      Add a payment method
                    </span>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
