import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { fetch } from '@/helpers/fetch';
import useGoals from '@/hooks/fetch-goal';
import { useAuthStore } from '@/store/auth';
import { Spacer } from '@/components/spacer';
import SvgFire from '@/components/icons/Fire';
import { useQuery } from '@tanstack/react-query';
import SvgStreak from '@/components/icons/Streak';
import { ActionTypes } from '../savings/helpers/types';
import { streakData, streakValues } from './helpers/types';
import streakMoon from '@assets/images/dashboard-images/streak.png';
import streakMoon2 from '@assets/images/dashboard-images/streak3.png';
import streakIllus from '@assets/images/dashboard-images/streak-illus.png';
import { SavingsOperations } from '../savings/savings-transactions/topup-withdraw-savings/operations-setup';

export const Streak = () => {
  const { userProfile } = useAuthStore();
  const [openDeposit, setOpenDeposit] = useState<boolean>(false);
  const { goals } = useGoals();
  const userId = userProfile?.user?.id;

  const { data, refetch } = useQuery(['streak'], () => fetch(`/users/streak/${userId}`), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: false,
  });

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId]);

  const streaks: streakValues = data?.data;

  const points = 2;
  const days = streaks ? Object.keys(streaks) : [];
  const streakValues: streakData[] = streaks ? Object.values(streaks) : [];
  const falseStatus = streakValues.filter((value) => value.status === false);
  const beforeToday = falseStatus.filter((value) => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() - 1);

    const beforeToday = new Date(value.fullDate) < nextDay;

    return beforeToday;
  });

  // useEffect(() => {
  //   fetchStreak();
  // }, []);

  return (
    <>
      <SavingsOperations
        open={openDeposit}
        setOpen={setOpenDeposit}
        action={ActionTypes.TOPUP}
        savingGoals={goals}
        streak
        streakValues={streakValues}
        // fetchStreakData={fetchStreak}
      />

      <div
        style={{ boxShadow: '1px 2px px rgba(0, 0, 0, 0.08)' }}
        className={classNames(
          'flex lg:flex-row flex-col-reverse lg:space-y-0 sm:pb-0 pb-6 -space-y-4 items-center justify-between w-full border-2 border-[#F3F2F8] bg-[#FBFBFD] px-8 rounded-lg',
          {
            ' py-4': !points,
          }
        )}
      >
        <div className="flex flex-col sm:mt-0 mt-4">
          <p className="font-sans text-neutral-400">Introducing Saving Streaks✨</p>

          <Spacer className="h-1" />

          <p className="font-sans text-xs text-[#7A85A7] text-opacity-[58%]">
            Make a top-up everyday to light up your streak. Every blaze is a step towards achieving your savings goal
          </p>

          <Spacer className="h-5" />

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:items-center sm:space-x-10">
            <div className="grid w-1/2 gap-y-2">
              <div className="flex items-center space-x-3">
                {streakValues.map((value, idx) => {
                  return (
                    <button className="flex justify-center w-1/6 text-center" key={idx}>
                      <SvgFire
                        className={classNames('', {
                          'text-[#878FAB]': value.status === false,
                          'text-[#FF9314]': value.status,
                        })}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center space-x-3">
                {days.map((day, idx) => {
                  return (
                    <p
                      key={idx}
                      className="flex font-sans text-xs justify-center w-1/6 text-[#7A85A7] text-opacity-[58%]"
                    >
                      {day.substring(0, 3)}
                    </p>
                  );
                })}
              </div>
            </div>

            {streaks ? (
              <button
                onClick={() => {
                  setOpenDeposit(true);
                }}
                className={classNames('flex items-center space-x-2', {
                  hidden: falseStatus.length > 0 && beforeToday.length === 0,
                })}
              >
                <SvgStreak />

                <span className="font-sans text-sm text-[#7A85A7]">Fix Streak</span>
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col space-y-4 items-center">
          <div className="lg:mt-0 mt-4">
            {'' ? <img src={streakMoon} /> : null}
            {'' ? <img src={streakMoon2} /> : null}
            {points ? <img className="w-[380px] h-[180px]" src={streakIllus} /> : null}
          </div>

          {points ? null : (
            <div className="bg-green">
              <p className="font-sans text-xs text-[#7A85A7] text-opacity-[58%]">Total points: 20</p>
              <Spacer className="lg:hidden" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
