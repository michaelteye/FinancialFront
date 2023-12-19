import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { RequiresAuth } from './auth';
import { Home } from '@pages/dashboard/home';
import { Coupon } from '../dashboard/coupon/Coupon';
import { Groups } from '../dashboard/groups/groups';
import { Welcome } from '@/pages/dashboard/welcome';
import { Savings } from '@/pages/dashboard/savings/savings';
import { Settings } from '@/pages/dashboard/settings/settings';
import { BezoWallet } from '../dashboard/bezo-wallet/bezo-wallet';
import { Referrals } from '@/pages/dashboard/referrals/referrals';
import { SavingsGoalFull } from '../dashboard/savings/savings-goal-full';
import { TransactionsPage } from '@/pages/dashboard/transactions/transactions';
import { DashboardLayout } from '../dashboard/components';
import { Investment } from '../dashboard/investment/investment';
import { GroupsGoals } from '../dashboard/groups/group-goals';
import { GroupSavingsDetails } from '../dashboard/groups/group-savings-details';
import { showGetStarted } from '@/hooks/show-get-started';
import { VAS } from '../dashboard/airtime-n-bills';

const DashboardRoutes: React.FC = () => {
  const { pathname } = useLocation();
  const showGS = showGetStarted();
  const Wrapper = pathname.includes('dashboard') ? DashboardLayout : Fragment;

  return (
    <Wrapper>
      <Routes>
        <Route path="dashboard">
          <Route path="" element={<Navigate to="home" />} />
          <Route 
           path="welcome" 
           element={
              <RequiresAuth>
                {showGS ? <Welcome /> : null}
              </RequiresAuth>
            } 
          />
          <Route
            path="home"
            element={
              <RequiresAuth>
                <Home />
              </RequiresAuth>
            }
          />

          <Route
            path="transactions"
            element={
              <RequiresAuth>
                <TransactionsPage />
              </RequiresAuth>
            }
          />

          <Route
            path="investment"
            element={
              <RequiresAuth>
                <Investment />
              </RequiresAuth>
            }
          />

          <Route
            path="savings/:savingsId"
            element={
              <RequiresAuth>
                <SavingsGoalFull />
              </RequiresAuth>
            }
          />
          <Route
            path="savings"
            element={
              <RequiresAuth>
                <Savings />
              </RequiresAuth>
            }
          />

          <Route
            path="wallet"
            element={
              <RequiresAuth>
                <BezoWallet />
              </RequiresAuth>
            }
          />

          <Route
            path="groups/:refId"
            element={
              <RequiresAuth>
                <GroupsGoals />
              </RequiresAuth>
            }
          />

          <Route
            path="groups/:refId/:goalId"
            element={
              <RequiresAuth>
                <GroupSavingsDetails />
              </RequiresAuth>
            }
          />

          <Route
            path="groups"
            element={
              <RequiresAuth>
                <Groups />
              </RequiresAuth>
            }
          />

          <Route
            path="referrals"
            element={
              <RequiresAuth>
                <Referrals />
              </RequiresAuth>
            }
          />

          <Route
            path="airtime-&-bills"
            element={
              <RequiresAuth>
                <VAS />
              </RequiresAuth>
            }
          />

          <Route
            path="settings"
            element={
              <RequiresAuth>
                <Settings />
              </RequiresAuth>
            }
          />
          <Route
            path="coupon"
            element={
              <RequiresAuth>
                <Coupon />
              </RequiresAuth>
            }
          />
        </Route>
      </Routes>
    </Wrapper>
  );
};

export default DashboardRoutes;
