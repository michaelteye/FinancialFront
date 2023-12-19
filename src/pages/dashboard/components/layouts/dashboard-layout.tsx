import classNames from 'classnames';
import { Topbar } from '../display/topbar';
import { SideBar } from '../side-bar/side-bar';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DashboardBanner from '@/components/download/downloadbanner';


export const DashboardLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const [hideAlert, setHideAlert] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('coupon')) {
      setMobileSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="app-wrapper lg:h-full lg:fixed flex flex-wrap w-full bg-alice-blue">
      <SideBar open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      {/* including the download link in the home button */}

      {/* ends here */}

      {mobileSidebarOpen ? null : (
        <div className="lg:h-full lg:overflow-y-scroll w-full lg:w-[78%] bg-white lg:rounded-l-3xl">
          <div
            className={classNames('items-center w-full py-3 px-10 bg-LavenderGray bg-opacity-30 sm:rounded-tl-lg', {
              'sm:flex ': !hideAlert && location.pathname === '/dashboard/home',
              hidden: hideAlert || location.pathname !== '/dashboard/home',
              // 'fixed bottom-0 left-0 z-50': hideAlert && location.pathname === '/dashboard/welcome',
            })}
            // leading-6 font-semibold text-[20px] pb-1 font-sans
          > 
            <DashboardBanner />
          </div>

          {/* Path for the welcome page */}

          <div
            className={classNames('items-center w-full py-3 px-10 bg-LavenderGray bg-opacity-30 sm:rounded-tl-lg', {
              'sm:flex ': !hideAlert && location.pathname === '/dashboard/welcome',
              hidden: hideAlert || location.pathname !== '/dashboard/welcome',
              // 'fixed bottom-0 left-0 z-50': hideAlert && location.pathname === '/dashboard/welcome',
            })}
          >
            <DashboardBanner />
          </div>

          <Topbar onOpenSidebar={() => setMobileSidebarOpen(true)} />

          <div
            className={classNames('flex sm:hidden mt-[4rem] items-start w-full py-3 px-8 bg-opacity-30', {
              hidden: hideAlert || location.pathname !== '/dashboard/home',
            })}
          >
            {/* <span className="w-full font-sans text-sm font-light text-neutral-400">
              Dear {userProfile?.user?.firstName ? userProfile?.user?.firstName : 'BezoSaver'}, <br />
              To make up for the delay in system upgrades, there will be{' '}
              <span className="underline">no early withdrawal fees on savings goals till the end of December</span>.
              Thanks for sticking with us.
            </span> */}

            {/* <button onClick={() => setHideAlert(true)} className="mt-1">
              <SvgCloseIcon />
            </button> */}
          </div>
          <main
            className={classNames('sm:mt-auto px-8 lg:px-20', {
              'mt-[6.25rem]': hideAlert || location.pathname !== '/dashboard/home',
            })}
          >
            {children}
          </main>
        </div>
      )}
    </div>
  );
};