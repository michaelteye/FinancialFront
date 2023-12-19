import React, { Fragment, useEffect, useState } from 'react';

import { SavingGoalInfo } from './goal-info';
import { Title } from '../components/title';
import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import { useWidth } from '@/hooks/use-width';
import SvgEdit from '@/components/icons/Edit';
import SvgDots from '@/components/icons/Dots';
import SvgInfo from '@/components/icons/Info';
import { Spinner } from '@/components/spinner';
import { Menu, Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';

import { fetch } from '@/helpers/fetch';
import { useQuery } from '@tanstack/react-query';
import { computePercentageSaved } from './helpers';
import { ActionTypes, SavingGoal } from './helpers/types';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import { Transactions } from '../transactions/transactions';
import { TopupWithdrawButtons } from './components/action-buttons';
import { EditSavingsGoalForm } from './edit-saving-goal/edit-saving-goal-form';
import { CreateSavingsGoalLayout } from './components/create-savings-goal-layout';
import { SavingsOperations } from './savings-transactions/topup-withdraw-savings/operations-setup';
import { LockTypes } from '../tools/types';

const Details: React.FC<{ title: string; description?: string }> = ({ title, description }) => {
  return (
    <div>
      <p className=" font-sans text-[#878FAB] text-sm capitalize">{title}</p>
      <p className=" font-sans font-medium text-lg text-neutral-400 ">{description}</p>
    </div>
  );
};

const LIMIT = 6;

export const SavingsGoalFull = () => {
  const width = useWidth();
  const params = useParams();
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [showGoalInfo, setShowGoalInfo] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [savingGoal, setSavingGoal] = useState<SavingGoal>();
  const [editSavingsGoal, setEditSavingsGoal] = useState(false);

  const { data, isLoading: isFetchingSavingGoal } = useQuery(
    ['saving-goals-details', params.savingsId],
    async () => {
      const response = await fetch(`/users/saving-goals/${params.savingsId}`);

      return response?.data
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const savingGoal = data;
    setSavingGoal({
      ...savingGoal,
      account: data?.account,
      // interest: data?.data?.interest,
    });
  }, [data]);

  const percentageSaved = computePercentageSaved(savingGoal);

  return (
    <>
      <CreateSavingsGoalLayout
        title="View Your Saving Goal Info"
        open={showGoalInfo}
        closeModal={() => {
          setShowGoalInfo(false);
        }}
      >
        <Spacer className=" h-9" />
        <SavingGoalInfo savingGoalReview={savingGoal!} />
      </CreateSavingsGoalLayout>

      {savingGoal ? (
        <EditSavingsGoalForm open={editSavingsGoal} setOpen={setEditSavingsGoal} savingGoalData={savingGoal} />
      ) : null}
      {savingGoal ? (
        <SavingsOperations
          open={topUpOpen}
          setOpen={setTopUpOpen}
          action={ActionTypes.TOPUP}
          savingGoals={[savingGoal]}
        />
      ) : null}
      {savingGoal ? (
        <SavingsOperations
          open={withdrawOpen}
          setOpen={setWithdrawOpen}
          action={ActionTypes.WITHDRAW}
          savingGoals={[savingGoal]}
        />
      ) : null}

      <Title
        title={savingGoal?.accountTypeName === LockTypes.BEZO_LOCK ? savingGoal?.name + ' ' + '🔒' : savingGoal?.name!}
      />

      <Spacer className=" h-5" />

      <div className=" flex justify-between">
        <TopupWithdrawButtons noMobileChange />

        {width >= EScreenBreakpoints.LG ? (
          <div className=" flex space-x-3">
            <Button
              disabled={isFetchingSavingGoal}
              variant="secondary"
              onClick={() => {
                setEditSavingsGoal(true);
              }}
            >
              <span className=" flex space-x-2">
                <SvgEdit />
                <p className=" text-sm text-neutral-700 font-sans">Edit</p>
              </span>
            </Button>

            <Button
              onClick={() => {
                setShowGoalInfo(true);
              }}
              variant="secondary"
            >
              <SvgInfo />
            </Button>
          </div>
        ) : (
          <div className=" relative ">
            <Menu as="div">
              <Menu.Button className="flex font-sans py-3 border border-[#161617] border-opacity-5 p-2 rounded-xl text-sm text-neutral-500 items-center bg-none ml-2">
                {() => <SvgDots />}
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="flex flex-col space-y-2 px-6 py-6 absolute -right-2 w-40 origin-top-right bg-white rounded-md shadow-xl ">
                  <Menu.Item>
                    {() => (
                      <Button
                        disabled={isFetchingSavingGoal}
                        variant="secondary"
                        onClick={() => {
                          setEditSavingsGoal(true);
                        }}
                      >
                        <span className=" flex space-x-2">
                          <SvgEdit />
                          <p className=" text-sm text-neutral-700 font-sans">Edit</p>
                        </span>
                      </Button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {() => (
                      <Button
                        onClick={() => {
                          setShowGoalInfo(true);
                        }}
                        variant="secondary"
                      >
                        <span className=" flex space-x-2">
                          <SvgInfo />

                          <p className="lg:hidden text-sm text-neutral-700 font-sans">info</p>
                        </span>
                      </Button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>

      <Spacer className=" h-5" />

      {isFetchingSavingGoal ? (
        <div className="w-full flex justify-center my-6">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col py-7 lg:px-6 px-3 bg-[#FFF0ED] rounded-xl space-y-8 lg:savingsGoalFull">
          <div className=" grid lg:grid-cols-3 grid-cols-2 lg:gap-x-3 gap-x-1 gap-y-3 lg:text-left">
            <Details
              title="Current balance"
              description={`GHS ${parseFloat(savingGoal?.account?.balance!)?.toFixed(2)}`}
            />
            <Details
              title="Amount To save"
              description={`GHS ${parseFloat(savingGoal?.amountToSave!)?.toFixed(2) || 0.0}`}
            />
            {/* <Details title="Interest earned" description={`GHS ${savingGoal?.interest?.interest || '-'}`} /> */}
            <Details title="Account type" description={savingGoal?.accountTypeName || '-'} />
          </div>
          <div className=" flex flex-col space-y-2">
            <div className="flex lg:items-end flex-col lg:flex-row lg:space-x-2">
              <p className=" font-sans font-medium  text-3xl text-neutral-400">
                GHS {parseFloat(savingGoal?.account?.balance!).toFixed(2)}{' '}
              </p>
              <p className="font-sans font-medium text-neutral-400">({percentageSaved}% saved so far)</p>
            </div>

            <div className=" w-full h-[6px] rounded-full bg-white">
              <div className={` bg-green w-full h-full rounded-full`} style={{ width: `${percentageSaved}%` }}></div>
            </div>
          </div>
        </div>
      )}

      <Spacer className=" h-15" />

      {isFetchingSavingGoal ? null : <Transactions savingsId={params.savingsId} />}
    </>
  );
};
