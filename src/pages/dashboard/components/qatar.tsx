import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import SvgCloseIcon from '@/components/icons/CloseIcon';
import Success from '@/assets/images/success.png';
import { useAuthStore } from '@/store/auth';
import { RequestMethod, useApi } from '@/helpers/api';
import { AxiosResponse } from 'axios';
import { Notification } from './notifications';

export const QatarCampaign = () => {
  const { userProfile, notification } = useAuthStore();
  const firstName = userProfile?.user?.firstName;
  const [open, setOpen] = useState(false);

  // const campaign = notification?.find(
  //   (notification) => notification.type === 'campaign' && notification.status === 'unread'
  // );

  const { submit: markNotificationsAsRead } = useApi('/notifications/read', {
    onSuccess() {
      setOpen(false);
    },
  });

  // useEffect(() => {
  //   if (campaign) {
  //     setOpen(true);
  //   }
  // }, [campaign]);

  function close() {
    setOpen(false);
    // markNotificationsAsRead({
    //   id: campaign?._id,
    // });
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
        style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)' }}
        className="transition-all transform overflow-auto text-neutral-400 z-40 w-full bg-[#FFF7E8] rounded-lg qatar-card"
      >
        <div className=" relative py-3 flex">
          <button className="absolute left-2" onClick={close}>
            <SvgCloseIcon />
          </button>
          <div className="flex items-start sm:px-8 py-6 space-x-3">
            <img className="w-6 h-6" src={Success} alt="qatar participant" />
            <p className="font-sans text-center">Hello {firstName} , you have been subscribed to the qatar campaign.</p>
            <img className="w-6 h-6" src={Success} alt="qatar participant" />
          </div>
        </div>
      </div>
    </Transition>
  );
};
