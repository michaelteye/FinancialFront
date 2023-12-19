import { useContext } from 'react';
import classNames from 'classnames';
import { Spacer } from '@/components/spacer';
import { LockTypes } from '../../tools/types';
import check from '@assets/images/check.png';
import { Spinner } from '@/components/spinner';
import { useAccountTypes } from '@/hooks/useAccountTypes';
import { ActionButtons } from '../components/action-buttons';
import { CreateSavingsAccountFormSteps } from '../helpers/types';
import { CreateSavingsAccountFormContext } from '../components/form-context';
import { CONST } from '../../tools/constants';

export const LockType: React.FC = ({}) => {
  const { data: accountTypes, isLoading } = useAccountTypes();
  const { step, setValue, form, showPreviousStep, showNextStep } = useContext(CreateSavingsAccountFormContext);

  if (step !== CreateSavingsAccountFormSteps.LOCK_TYPE) {
    return null;
  }

  const accountTypeId = form?.accountType?.id;


  const selectedAccountType = accountTypes?.find((accountType) => accountType.id === accountTypeId);
  // const desc = selectedAccountType?.description?.split('!');

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center my-auto">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h1 className=" font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        Select a Lock Option for your goal
      </h1>

      <p>This will influence how and when you will withdraw from your goal</p>

      <Spacer className="h-8" />

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
        {accountTypes?.map((option) => {
          return (
            <button
              key={option.id}
              onClick={() => {
                setValue('accountType', option);
                showNextStep();
              }}
              className={classNames(`px-6 py-4 flex flex-col text-left rounded-xl hover:shadow-md lockCard`, {
                'bg-primary-100 bg-opacity-20': option.id === form.accountType?.id,
                'bg-[#EBF3F5] hover:bg-primary-100 hover:bg-opacity-10': option.id !== accountTypeId,
              })}
            >
              <div className=" flex flex-col w-full text-neutral-400">
                <div className="flex items-center justify-between">
                  <label className=" font-sans font-semibold text-2xl ">
                    {option.name === LockTypes.BEZO_LOCK ? option.name?.replace(/\s/g, '') : 'BezoFlex'}
                  </label>
                  {option.id === form.accountType?.id ? (
                    <div className="sm:w-7 w-6 h-6 sm:h-7">
                      <img src={check} alt="" />
                    </div>
                  ) : null}
                </div>

                <Spacer className="h-2" />

                {option.name === LockTypes.BEZO_LOCK ? (
                  <span className="text-sm">Save long - term without breaking into your goals.</span>
                ) : (
                  <span className="text-sm">Make withdrawals at anytime with flexible savings goals.</span>
                )}

                <Spacer className="h-4" />

                <p className="flex justify-between w-full font-sans">
                  <span className="font-light">Interest per year: </span>
                  <span className="font-medium text-xl">
                    {option.name === LockTypes.BEZO_LOCK ? CONST.BEZO_LOCK_INTEREST : CONST.BEZO_FLEX_INTEREST}
                  </span>
                </p>

                <Spacer className="h-4" />

                {/* 
                <p className="flex justify-between w-full font-sans text-sm">
                  <span className="font-light">Early Withdrawal Fees: </span>
                  <span className="font-medium">
                    {option.name === LockTypes.BEZO_LOCK ? CONST.BEZO_LOCK_CHARGES : CONST.BEZO_FLEX_CHARGES}
                  </span>
                </p> */}
                <p className="flex justify-between w-full font-sans text-xs text-neutral-400 text-opacity-75">
                  This goal attracts an early withdrawal fee of{' '}
                  {option.name === LockTypes.BEZO_LOCK ? CONST.BEZO_LOCK_CHARGES : CONST.BEZO_FLEX_CHARGES}.{' '}
                  {option.name === LockTypes.BEZO_LOCK ? 'You cannot access your money for the first month.' : null}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <Spacer className="h-8" />

      {/* {desc && (
        <>
          <span className="text-neutral-400 sm:text-base text-sm">{desc[0]?.trim()}!</span>{' '}
          <span className="text-neutral-400 sm:text-base text-sm">{desc[1]?.trim()}.</span>
          <Spacer className="h-3" />
          <span className="text-neutral-400 sm:text-base text-sm">{desc[2]?.trim()}</span>
        </>
      )} */}

      {/* <Spacer className="h-20" /> */}

      <div className="w-full">
        <ActionButtons
          onNextProps={{ disabled: !accountTypeId }}
          // onNext={() => {}}
          hideContinue
          onPrevious={() => showPreviousStep()}
        />
      </div>
    </>
  );
};
