import { useAuthStore } from '@/store/auth';
import { Spacer } from '@/components/spacer';
import { WelcomeDisplay, Card } from '@pages/dashboard/components';
import { CompleteVerification, FirstTopup, SavingsPlan } from '@/components/icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const Welcome = () => {
  const { stats, userProfile } = useAuthStore();

  return (
    <>
   
      <WelcomeDisplay />

      <Spacer className="h-8" />

      <div className="flex flex-col lg:flex-row justify-center lg:space-x-7 lg:space-y-0 space-y-7  ">
        <Card
          icon={CompleteVerification}
          title={
            <>
              Complete your account
              <br /> verification
            </>
          }
          description=" Verify your ID to upgrade your account and gain access to more features."
          link={
            { 
              href: '/dashboard/settings', 
              title: 'Verify account' 
            }
          }
          completed={['advance'].includes(userProfile?.user?.level!)}
        />
        <Card
          icon={SavingsPlan}
          title={
            <>
              Create your first <br /> saving goal
            </>
          }
          description="A goal without a plan is just a wish. Here we enable you to bring your goals to life."
          link={{ href: '/dashboard/savings?create=true', title: 'Create goal' }}
          completed={stats?.totalAccounts ? stats?.totalAccounts > 1 : false}
        />
        <Card
          icon={FirstTopup}
          title={
            <>
              Make your first <br /> deposit
            </>
          }
          description="Begin achieving your life goals by making your first deposit into your savings goal."
          link={{ href: '/dashboard/savings?topUp=true', title: 'Make deposit' }}
          completed={stats?.totalDeposits ? stats?.totalDeposits > 0 : false}
        />
      </div>

      <Spacer className="h-32 lg:h-0" />
    </>
  );
};
