import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/button';
import { Transition } from '@headlessui/react';
import SvgClose from '@/components/icons/Close';
import { noAuthRoutes } from '@/pages/routes/app';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const UpgradeAlert = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useAuthStore();
  const [open, setOpen] = useState(false);
  const firstName = userProfile?.user?.firstName;

  useEffect(() => {
    if (localStorage.getItem('closeUpgrade')) return;

    setOpen(userProfile?.user?.level === 'beginner' && !noAuthRoutes.includes(location.pathname));
  }, [location]);

  function close() {
    setOpen(false);
    localStorage.setItem('closeUpgrade', 'true');
  }

  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transition ease-in-out duration-200 transform"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div
        style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)' }}
        className="transition-all transform overflow-auto bg-[#FBFCFD] text-neutral-400 z-40 w-full rounded-lg"
      >
        <div className=" relative py-3 flex">
          <button className="absolute left-2 w-6 h-6 flex items-center justify-center" onClick={close}>
            <SvgClose />
          </button>
          <div className="flex flex-col items-center space-y-2 sm:px-8 py-6 space-x-3">
            <p className="flex items-end">
              <span className="text-[6px]">((</span> <span className="text-xl"> 🔔</span>{' '}
              <span className="text-[6px]">))</span>
            </p>
            <p className="font-sans text-center text-xs">
              Hello {firstName} , Upgrade your account to an Advanced Bezo account by uploading a picture of yourself
              and your Ghana Card{' '}
            </p>
            <Button
              className="lg:py-1"
              onClick={() => {
                close();
                navigate('/dashboard/settings?tab=4');
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  );
};
