import { Spinner } from '@/components/spinner';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import AuthRoutes from './auth-routes';
import useGoals from '@/hooks/fetch-goal';
import { useIdleTimer } from 'react-idle-timer';
import { useQueryClient } from '@tanstack/react-query';
import { useMessagesStore } from '@/store/messages';
import { Message } from '../auth/components/error';
import { useLocation, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../auth/components/auth-layout';
import { QatarCampaign } from '../dashboard/components/qatar';
import { BezoPin } from '../dashboard/home/bezo-pin/bezo-pin';
import { UpgradeAlert } from '../dashboard/components/upgrade-alert';
import DashboardRoutes from './dashboard-routes';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import { useWallets } from '@/hooks/use-wallets';
import { useUser } from '@/hooks/useUser';
import { FirstDeposit } from '../dashboard/savings/create-savings-form/first-deposit';
import { MobileAppAlert } from '../mobile-app-alert';
import MobileAppDownload from '../mobile-app-download';

// Routes that should never be accessed by logged in users
export const noAuthRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/register/verify',
  '/auth/login/password',
  '/auth/login/verify',
  '/auth/register/personal-details',
  '/auth/verify',
];

declare global {
  interface Window {
    intercomSettings: any;
    Intercom: any;
  }
}

const noBezoPinPromptRoutes = [...noAuthRoutes, '/auth/register/password', '/auth/success', '/survey', '/terms'];

const idleEvents = [
  'mousemove',
  'keydown',
  'wheel',
  'DOMMouseScroll',
  'mousewheel',
  'mousedown',
  'touchstart',
  'touchmove',
  'MSPointerDown',
  'MSPointerMove',
  'visibilitychange',
];

export const App = () => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const { message } = useMessagesStore();
  const { wallets, fetchWallets } = useWallets();
  const [mobileAlert, setMobileAlert] = useState(true);
  const { refetchGoals: fetchGoals, goals } = useGoals();
  const { data: paymentMethods, refetchMethods: fetchPaymentMethods } = usePaymentMethods();
  const { userData, fetchUserData, isError, isFetched: userDataDoneFetching } = useUser();
  const [openFirstDeposit, setOpenFirstDeposit] = useState(false);
  const [showMobileAppDownload, setShowMobileAppDownload] = useState(false); // New state
  const [loadingComplete, setLoadingComplete] = useState(false); // New state

  const { accessToken, pinSet, loading, stats, userProfile, saveUserData, isAuthenticated, logout } = useAuthStore();

  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: () => {
      logout();
      queryClient.clear();
    },
  });

  const defaultPaymentMethod = paymentMethods?.filter((method) => method.default)[0] || paymentMethods?.[0];

  const totalSavingsBalance = goals
    ?.map((goal) => {
      return Number(goal?.account?.balance);
    })
    .reduce((total, num) => total + num, 0);

  const totalPrimaryBalance = userProfile?.balance ? Number(userProfile?.balance) : 0;

  const totalDeposits = totalSavingsBalance + totalPrimaryBalance;

  useEffect(() => {
    useAuthStore.setState({
      stats: {
        ...stats,
        totalDeposits,
        totalPrimaryBalance,
        totalSavingsBalance,
        totalAccounts: goals?.length,
      },
    });
  }, [userProfile, goals]);

  useEffect(() => {
    useAuthStore.setState({
      selectedWallet: wallets?.[0],
    });
  }, [wallets]);

  useEffect(() => {
    if (userData) {
      saveUserData?.(userData);
      useAuthStore.setState({
        userProfile: userData,
        pinSet: userData?.pinCreated,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (isError) {
      useAuthStore.setState({
        loading: false,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (userProfile && defaultPaymentMethod) {
      useAuthStore.setState({
        defaultPaymentMethod,
        loading: false,
      });
    }
  }, [userProfile, defaultPaymentMethod]);

  useEffect(() => {
    if (accessToken) {
      if (!userProfile?.id) {
        fetchUserData();
      }
      fetchWallets();
      fetchGoals();
      fetchPaymentMethods();

      // window.Intercom('boot', {
      //   app_id: 'f8z01q2i',
      // });
    } else {
      useAuthStore.setState({
        loading: false,
      });
    }
  }, [accessToken, userProfile]);

  useEffect(() => {
    setOpenFirstDeposit(
      (userProfile && stats?.totalDeposits === 0 && pinSet && !noBezoPinPromptRoutes?.includes(pathname)) || false
    );
  }, [stats, pinSet, userProfile, noBezoPinPromptRoutes]);

  // including the Zendesk

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'ze-snippet';
    script.src = 'https://static.zdassets.com/ekr/snippet.js?key=dd2e8f50-4b38-4685-b27a-5902e8c4335c';
    script.async = true;
    script.onload = () => {};

    document.body.appendChild(script);

    return () => {
      // Clean up the script tag when component unmounts
      const snippet = document.getElementById('ze-snippet');
      if (snippet) {
        snippet.remove();
      }
    };
  }, []);

  const handleLoadEvent = () => {
    // window.zE("webWidget:on", "close", function() {
    //   console.log("Widget closed!");
    // });
    // console.log("setting suggestion...");
    // window.zE("webWidget", "helpCenter:setSuggestions", {
    //   search: "student success app"
    // });
  };

  const fetchingUserData = !userDataDoneFetching && !noAuthRoutes.includes(location.pathname) && isAuthenticated();

  useEffect(() => {
    if (!loading && !fetchingUserData) {
      // Spinning is done, show the MobileAppDownload modal
      setMobileAlert(true);
    }
  }, [loading, fetchingUserData]);

  return (
    <>
      {loading || fetchingUserData ? (
        <div className="w-full h-screen flex items-center justify-center">
          {location.pathname === '/dashboard/home' || location.pathname === '/dashboard/welcome' ? (
            <MobileAppDownload />
          ) : (
            <Spinner />
          )}
        </div>
      ) : (
        <>
          {import.meta.env.VITE_APP_DOWN ? (
            <AuthLayout className="flex items-center justify-center h-screen">
              <div className="">
                <h1 className="mt-24 font-sans font-extrabold text-5.5 leading-14 text-neutral-500">
                  Oops! We&rsquo;re down for maintenance.
                </h1>
                <p className="mt-6">
                  We are currently working on a system upgrade and should be back in a few hours. Thanks for your
                  patience.
                </p>
              </div>
            </AuthLayout>
          ) : (
            <>
              <div className="absolute sm:text-right text-center sm:mx-0 mx-auto sm:right-2 right-0 sm:left-[72%] left-0 top-11 z-50 sm:w-1/4 w-[90%]">
                <UpgradeAlert />
              </div>

              {noBezoPinPromptRoutes?.includes(pathname) ? null : (
                <div className="absolute sm:right-2 top-11 z-50 sm:w-1/4">
                  <QatarCampaign />
                </div>
              )}

              <FirstDeposit open={openFirstDeposit} setOpen={setOpenFirstDeposit} />

              <BezoPin open={pinSet === false && !noBezoPinPromptRoutes.includes(pathname)} />

              {message ? (
                <div className="absolute mx-2.5 lg:mx-0 lg:right-20 top-9 z-[100]">
                  <Message title={message?.title} description={message?.description} variant={message.variant} />
                </div>
              ) : null}
              <AuthRoutes />
              <DashboardRoutes />
            </>
          )}
        </>
      )}
      {<MobileAppDownload onClose={() => setMobileAlert(false)} />}
    </>
  );
};

export default App;
