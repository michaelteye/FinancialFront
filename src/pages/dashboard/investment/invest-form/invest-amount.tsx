import { Input } from '@/components/input/input';
import { Spacer } from '@/components/spacer';
import { useApi } from '@/helpers/api';
import { useFetchInvestments } from '@/hooks/useFetchInvestments';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useInvestContext } from '../invest-ctx';
import { InvestmentDetailValues, InvestSteps } from '../types';

export const InvestAmount = () => {
  const { data } = useFetchInvestments();
  const [investedAmt, setInvestedAmt] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [investIdx, setInvestIdx] = useState([1, 2, 3]);
  const [investedPackageName, setInvestedPackage] = useState('');
  const { step, form, setForm, setError, error } = useInvestContext();

  const investments: InvestmentDetailValues[] = data?.data?.investments;

  useEffect(() => {
    investments.map((investment) => {
      const matchingTypeAndName =
        investment.type?.name === form.type?.name && investment.package?.name === form.package?.name;

      const exemptNumber = investment.amount! / investment.package?.minAmount!;

      const newInvestIdx = Array(4)
        .fill(null)
        .map((_, idx) => idx + 1)
        .filter((item) => item !== exemptNumber);

      setInvestedPackage(investment?.package?.name!);

      setInvestedAmt(investment?.amount!);

      if (matchingTypeAndName) {
        setInvestIdx(newInvestIdx);
        return;
      }
    });

    const notSelectedNorInvested = investments.filter((investmt) => investmt.package?.name === form.package?.name);

    if (notSelectedNorInvested.length === 0) {
      setInvestIdx([1, 2, 3]);
      return;
    }
  }, [form.package?.name]);

  if (step !== InvestSteps.AMOUNT) {
    return null;
  }

  return (
    <div>
      <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        Select your preferred amount
      </h1>

      <Spacer className="h-2" />

      <p className="font-sans-body text-neutral-900">
        Get up to {form.package?.rate}% interest each year for {form.package?.duration} years
      </p>

      <Spacer className="h-5" />

      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6">
        {investIdx.map((investIdx, idx) => {
          const amount = investIdx * form.package?.minAmount!;
          return (
            <button
              key={idx}
              onClick={() => {
                setForm({ ...form, amount: amount });
                setShowInput(false);
                setError(undefined);
              }}
              className={classNames('rounded-2xl px-4 py-8 flex flex-col text-left', {
                'bg-[#ECF1F4] bg-opacity-50': amount !== form.amount || showInput,
                'bg-lightgreen': amount === form.amount && !showInput,
              })}
            >
              <span
                className={classNames('font-sans text-lg font-semibold', {
                  'text-neutral-900': amount !== form.amount || showInput,
                  'text-white': amount === form.amount && !showInput,
                })}
              >
                GHS {amount.toFixed(2)}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => {
            setShowInput(true);
            setForm({ ...form, amount: '' });
          }}
          className={classNames('rounded-xl px-3 py-2 flex flex-col items-center justify-center', {
            'bg-[#ECF1F4] bg-opacity-50': !showInput,
            'bg-lightgreen': showInput,
          })}
        >
          <p
            className={classNames('font-sans-body text-sm', {
              'text-[#4F4F4F]': !showInput,
              'text-white': showInput,
            })}
          >
            Enter a custom
          </p>
          <p
            className={classNames('font-sans text-lg font-semibold', {
              'text-neutral-900': !showInput,
              'text-white': showInput,
            })}
          >
            Amount
          </p>
        </button>
      </div>

      <Spacer className="h-12" />

      {showInput ? (
        <>
          <Input
            largeLabel
            alwaysShowMask
            error={error}
            label="Enter the amount you want to invest"
            subLabel="The amount should be multiples of 1000"
            mask="GHS 9999999999999999999999999"
            onChange={(event) => {
              const inputValue = event.target.value.split(' ')[1];

              if (inputValue && parseFloat(inputValue) % form.package?.minAmount! !== 0) {
                setError(`Enter a valid amount ( amount should be multiples of ${form.package?.minAmount} )`);
                return;
              }
              if (parseFloat(inputValue) === investedAmt && form.package?.name === investedPackageName) {
                setError(`You already have a ${form.type?.name?.toLowerCase().slice(0, -1)} package of this amount`);
                return;
              }
              setForm({ ...form, amount: parseFloat(inputValue) });
              setError(undefined);
            }}
          />
        </>
      ) : null}
    </div>
  );
};
