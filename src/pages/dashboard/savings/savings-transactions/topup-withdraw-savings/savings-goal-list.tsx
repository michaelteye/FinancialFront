import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { useParams } from 'react-router-dom';
import { RadioInput } from '@/components/input/radio-input';
import { useOperationsCtx } from './operations-context';
import { ActionTypes, OperationsSteps, SavingGoal } from '../../helpers/types';
import { streakData } from '@/pages/dashboard/components/helpers/types';
import { LockTypes } from '@/pages/dashboard/tools/types';

export const SavingsGoalList: React.FC<{ streakValues?: streakData[] }> = ({ streakValues }) => {
  const params = useParams();
  const [savingGoalSearch, setSavingGoalSearch] = useState('');
  const [filteredSavingGoals, setFilteredSavingGoals] = useState<SavingGoal[]>([]);
  const { savingGoals, selectedGoal, setSelectedGoal, step, setStep, action, streak, form, setForm } =
    useOperationsCtx();

  // const homePage = location.pathname.split('/')[2] === 'home';

  const streakDates = streakValues?.map((streak) => new Date(streak.fullDate));

  const months = streakDates?.map((month) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(month));
  const days = streakDates?.map((day) => new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day));
  const dates = streakDates?.map((date) => new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date));
  const years = streakDates?.map((date) => date.getFullYear());

  useEffect(() => {
    if (
      !streak &&
      savingGoals?.length === 1 &&
      action !== ActionTypes.BEZOWALLETTOPUP &&
      action !== ActionTypes.BEZOWALLETWITHDRAW
    ) {
      setSelectedGoal?.(savingGoals[0]);
      setStep(OperationsSteps.FORM_DETAILS);
    }
    if (savingGoals?.length === 0) {
      setStep(OperationsSteps.FORM_DETAILS);
    }
    if (params.savingsId) {
      setSelectedGoal?.(savingGoals?.find((goal) => goal.id === params.savingsId));
      setStep(OperationsSteps.FORM_DETAILS);
    }
  }, [savingGoals, params]);

  if (step !== OperationsSteps.SELECT_GOAL) {
    return null;
  }

  return (
    <div className="sm:w-[35rem]">
      {streak ? (
        <>
          <div className="mx-7 flex flex-col border-b-2 border-neutral-100 items-start">
            <p className="font-sans font-semibold text-neutral-400">Select a day</p>
            <p className="font-sans text-xs text-[#4F4F4F]">Your streak will light up based on the day selected</p>

            <Spacer className="h-3" />

            <div className="w-[85%] mx-auto flex flex-col items-start">
              <p className="font-sans text-sm text-neutral-900 font-medium">
                {months?.[0]} {years?.[0]}
              </p>

              <Spacer className="h-2" />

              <div className="flex items-center justify-between w-full">
                {days?.map((day, idx) => (
                  <button key={idx} className="flex items-center justify-center w-9 h-9 font-sans text-sm">
                    {day.substring(0, 2)}
                  </button>
                ))}
              </div>

              <Spacer className="h-2" />

              <div className="flex items-center justify-between w-full">
                {streakValues
                  ?.map((streak) => {
                    return streak;
                  })
                  ?.map((streak, idx) => {
                    const date = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(new Date(streak.fullDate));
                    const today = new Date();
                    var nextDay = new Date(today);
                    nextDay.setDate(today.getDate() - 1);
                    const beforeToday = new Date(streak.fullDate) < nextDay;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (streak.status || !beforeToday) {
                            return;
                          }
                          setForm({ ...form, streakDay: streak.fullDate });
                        }}
                        className={classNames('flex items-center justify-center w-9 h-9 font-sans text-sm', {
                          'bg-[#FF9314] rounded-full': streak.fullDate === form.streakDay,
                          'text-[#C6D5DE] cursor-not-allowed': streak.status || !beforeToday,
                        })}
                      >
                        {date}
                      </button>
                    );
                  })}
              </div>
            </div>

            <Spacer className="h-3" />
          </div>

          <Spacer className="h-2" />
        </>
      ) : null}

      <div className="relative">
        <div
          className={classNames('absolute top-0 bg-neutral-200 bg-opacity-40 z-20 w-full h-full', {
            hidden: !streak || form.streakDay,
          })}
        ></div>

        <div className="px-7">
          <Input
            className="w-full rounded-lg pl-14 pr-7 py-4 focus:outline-none border border-neutral-200"
            type="search"
            placeholder="Search for saving account here.."
            onChange={(event) => {
              setSavingGoalSearch(event.target.value);
            }}
          />
        </div>

        <Spacer className=" h-4" />

        <div className="flex flex-col border-b border-neutral-100 h-[220px] overflow-y-auto">
          {(savingGoalSearch ? filteredSavingGoals : savingGoals)?.map((savingGoal) => {
            const lockedGoal = savingGoal?.accountTypeName === LockTypes.BEZO_LOCK;

            return (
              <div
                className={classNames('w-full px-7 rounded-none transition ease-linear', {
                  'bg-neutral-100': selectedGoal?.id === savingGoal?.id,
                  'bg-white': selectedGoal?.id !== savingGoal?.id,
                })}
                key={savingGoal?.id}
              >
                <RadioInput
                  id={savingGoal?.id!}
                  prefix={savingGoal?.emoji || '✨'}
                  text={`${savingGoal?.name!} ${lockedGoal ? '🔒' : ''}`}
                  value={savingGoal?.name}
                  name="saving-goal"
                  className={classNames('w-full rounded-none transition ease-linear', {
                    'bg-transparent': selectedGoal?.id === savingGoal?.id,
                    'bg-white': selectedGoal?.id !== savingGoal?.id,
                  })}
                  checked={selectedGoal?.id === savingGoal?.id}
                  onChange={() => {
                    setSelectedGoal?.(savingGoal);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
