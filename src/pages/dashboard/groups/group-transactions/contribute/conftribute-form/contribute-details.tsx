import { useState } from 'react';
import classNames from 'classnames';
import SvgMtn from '@/components/icons/Mtn';
import { Spacer } from '@/components/spacer';
import { useParams } from 'react-router-dom';
import { Input } from '@/components/input/input';
import SvgWallet from '@/components/icons/Wallet';
import SvgSmallPlus from '@/components/icons/SmallPlus';
import { primaryDetails } from '../../../components/types';
import { useContributeContext } from '../contribute-context';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { useAuthStore } from '@/store/auth';
import { getImageFromNetwork } from '@/pages/dashboard/settings/lib/index.t';
import { getPrimaryGoalTopupError } from '../../../lib';
import { ContributeSteps } from '../../../lib/types';
import { ComingSoon } from '@/components/coming-soon';

export const ContributeDetails: React.FC<{ primaryGoalBalance?: string; goalPrimaryDetails?: primaryDetails }> = ({
  primaryGoalBalance,
  goalPrimaryDetails,
}) => {
  const params = useParams();
  const { defaultPaymentMethod } = useAuthStore();
  const [addPaymentMethod, setAddPaymentMethod] = useState(false);
  const { step, form, setForm, selectedGroupGoal, action, errorMessage, setErrorMessage } = useContributeContext();
  const network = defaultPaymentMethod?.network;

  const primaryGoalTopUpError = getPrimaryGoalTopupError(
    form?.amount!,
    params.goalId ? goalPrimaryDetails?.balance! : primaryGoalBalance!,
    form.paymentType!
  );

  const amountToBalanceDifference = parseFloat(goalPrimaryDetails?.balance!) - parseFloat(form.amount!);

  if (step !== ContributeSteps.FORM_DETAILS) {
    return null;
  }

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <div
        className={classNames('px-7 border-b border-neutral-100 lg:pb-11', {
          // 'pb-5': action === 'withdraw',
          // 'pb-11': action === 'topup',
        })}
      >
        <div className=" text-left">
          <p className=" font-sans lg:text-lg text-base text-neutral-500 font-medium">Amount to {action}</p>

          <Spacer className=" h-1" />

          <p className="lg:text-base text-sm font-sans-body text-[#4F4F4F]">
            This is the amount you want to contribute into {selectedGroupGoal?.goalName} account{' '}
            <span className="lg:text-sm font-sans-body text-yellow ">(Max, GHS 200)</span>
          </p>

          <Spacer className=" h-2" />

          <Input
            prefix="GHS "
            placeholder="eg. 20,000"
            value={form?.amount}
            error={errorMessage}
            onChange={(event) => {
              const inputValue = event?.target?.value;
              if (inputValue.includes('.')) {
                const [firstValue, secondValue] = inputValue.split('.');
                if (secondValue.length > 2) {
                  return inputValue;
                }
              }
              if (parseFloat(inputValue) <= 0 || isNaN(parseFloat(inputValue))) {
                setErrorMessage?.('Invalid Amount');
              } else {
                setErrorMessage?.(undefined);
              }
              setForm?.({ ...form, amount: inputValue });
            }}
          />
        </div>

        <Spacer className=" h-3" />

        <div className=" text-left">
          <p className=" font-sans lg:text-lg text-base text-neutral-500 font-medium">Payment Source</p>

          <Spacer className=" h-1" />

          <p className=" font-sans-body text-[#4F4F4F] lg:text-base text-sm">
            Where would you like to contribute from?
          </p>
        </div>

        <Spacer className=" h-3" />

        <>
          <div className="border-b-2 border-b-neutral-100">
            <label
              htmlFor="primary-wallet"
              className="lg:w-1/2 p-3 lg:text-base text-sm bg-neutral-100 rounded-full flex space-x-2 items-center"
            >
              <input
                type="radio"
                id="primary-wallet"
                name="payment-type"
                value="primary-wallet"
                checked={form?.paymentType === 'primary'}
                onChange={() => {
                  setForm?.({ ...form, paymentType: 'primary' });
                }}
              />

              <SvgWallet className="text-[#3B6096]" />

              <div className="flex space-x-3 items-center">
                <p className="font-sans-body text-lg text-neutral-900">Primary Wallet </p>
                <p className="text-green text-sm font-sans-body ">
                  GHS{' '}
                  {params.goalId
                    ? goalPrimaryDetails
                      ? parseFloat(goalPrimaryDetails?.balance!).toFixed(2)
                      : parseFloat('0').toFixed(2)
                    : goalPrimaryDetails?.balance
                    ? parseFloat(goalPrimaryDetails?.balance!).toFixed(2)
                    : parseFloat('0').toFixed(2)}
                </p>
              </div>
            </label>

            {form.amount && primaryGoalTopUpError ? (
              <div className="flex text-left">
                <ErrorText>{primaryGoalTopUpError}</ErrorText>
              </div>
            ) : null}

            {form.amount && amountToBalanceDifference > 10 && form.paymentType === 'primary' ? (
              <div>
                <Spacer className="h-3" />
                <p className="font-sans-body text-[#EC9E00] text-left">
                  GHS {form?.amount} will be deducted from your primary wallet
                </p>
              </div>
            ) : null}
            <Spacer className="h-4" />
          </div>

          <Spacer className="h-4" />
        </>

        <div className=" flex lg:flex-row flex-col lg:space-x-2 lg:space-y-0 space-y-3 w-full">
          <label
            htmlFor="mtn-input"
            className="lg:w-1/2 p-3 lg:text-base text-sm bg-neutral-100 rounded-full flex space-x-2 items-center"
          >
            <input
              type="radio"
              id="mtn-input"
              name="payment-type"
              value="mtn"
              onChange={() => setForm?.({ ...form, paymentType: 'mtn' })}
            />

            <div>
              <img className="w-8 h-6" src={getImageFromNetwork(network?.toLowerCase())} />
            </div>

            <p className="font-sans-body text-neutral-900">Momo</p>
          </label>

          <label
            htmlFor="visa-input"
            className="lg:w-1/2 p-3 lg:text-base text-sm bg-neutral-100 rounded-full flex justify-evenly space-x-2 items-center"
          >
            <p className="lg:text-base text-sm font-sans-body text-neutral-900 ml-5">Visa Card </p>

            <ComingSoon />
          </label>
        </div>

        <Spacer className="h-3" />
        <div className="flex lg:flex-row flex-col lg:space-x-2 lg:space-y-0 space-y-3 w-full">
          <label
            htmlFor="visa-input"
            className="lg:w-1/2 p-3 lg:text-base text-sm bg-neutral-100 rounded-full flex justify-evenly  space-x-2 items-center"
          >
            <p className="lg:text-base text-sm font-sans-body text-neutral-900">Bank Account </p>
            <ComingSoon />
          </label>

          <div
            onClick={() => setAddPaymentMethod(true)}
            className="flex  justify-center p-3 bg-neutral-100 lg:w-1/2 w-full rounded-full"
          >
            <div className=" flex space-x-2 items-center">
              <SvgSmallPlus />

              <span className="lg:text-base text-sm mr-4 font-sans-body text-neutral-900">Add a payment method</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
