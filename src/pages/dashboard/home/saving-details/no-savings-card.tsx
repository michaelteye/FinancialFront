import { Link } from 'react-router-dom';
import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import { useWidth } from '@/hooks/use-width';
import { Spinner } from '@/components/spinner';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import homeCreateGoalUrl from '@assets/images/dashboard-images/home-create-goal.png';
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import useGoals from '@/hooks/fetch-goal';

export const NoSavingsCard = () => {
  const width = useWidth();
  const { goals, isFetchingUserSavingsGoals } = useGoals();

  const sortData = goals?.sort((goal1, goal2) => {
    const balance1 = Number(goal1?.account?.balance!);
    const balance2 = Number(goal2?.account?.balance!);

    if (balance1 > balance2) {
      return -1;
    }
    if (balance1 < balance2) {
      return 1;
    }

    return 0;
  });

  const graphData = sortData?.slice(0, 3)?.map((goal) => ({
    name: goal.name,
    Savings: Number(goal.account?.balance!),
    amount: Number(goal?.amountToRaise),
  }));

  const small = width < EScreenBreakpoints.SM;

  return (
    <>
      {isFetchingUserSavingsGoals ? (
        <div className="flex flex-col bg-[#F3F2F8] rounded-[10px] w-full bg-opacity-30 py-7 items-center h-[355px]">
          <div className="w-full flex justify-center items-center mt-20">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-[#F3F2F8] rounded-[10px] w-full bg-opacity-30 py-7 items-center">
          {goals?.length === 0 ? (
            <div className="flex flex-col items-center">
              <img src={homeCreateGoalUrl} alt="Savings Piggy Bank" />
              <p className=" font-bold font-sans-body text-sm text-[#000]">No savings balance yet</p>
              <p className="font-sans-body text-sm text-[#000] text-center pt-1 mb-2">
                Create a savings goal today to begin your <br /> journey to financial freedom
              </p>

              <Spacer className="h-2" />

              <Link to="/dashboard/savings?create=true">
                <Button variant="tertiary">Create a saving goal</Button>
              </Link>
            </div>
          ) : (
            <>
              <h3 className="font-sans font-medium text-sm text-[#000] mb-4 text-left w-full px-6 capitalize">
                Top savings goal analytics
              </h3>

              <ResponsiveContainer width="100%" height={small ? 250 : 300}>
                <BarChart
                  data={graphData}
                  margin={{
                    right: 30,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis dataKey="amount" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Savings" stackId="a" fill="#5E74DF" barSize={small ? 75 : 100} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      )}
    </>
  );
};
