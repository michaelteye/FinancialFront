import { NotificationBell, Text } from '@/components/icons';
import SvgClose from '@/components/icons/Close';
import SvgNotifications from '@/components/icons/Notifications';
import { Spacer } from '@/components/spacer';
import { useApi } from '@/helpers/api';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { NotificationLayout } from '.';

export interface Notification {
  createdAt: string;
  message: string;
  title: string;
  type: string;
  _id: string;
  status: 'read' | 'unread';
}

export const Campaigns: React.FC = () => {
  const [openCampaigns, setOpenCampaigns] = useState(false);

  // const { data } = useQuery(['notifications'], () => fetch('/users/send/notification'), {});

  // const { submit: getNotifications, data } = useApi<{}, { notifications: Notification[] }>(
  //   '/users/send/notifications',
  //   {
  //     method: RequestMethod.GET,
  //     onSuccess(response: AxiosResponse) {
  //       useAuthStore.setState({
  //         notification: response.data.data.notifications,
  //       });
  //     },
  //   }
  // );

  const { submit: markNotificationsAsRead } = useApi('/notifications/read', {
    onSuccess() {
      // getNotifications();
    },
  });

  // useEffect(() => {
  //   getNotifications();

  //   const timeout = setInterval(() => {
  //     getNotifications();
  //   }, 20000);

  //   return () => clearInterval(timeout);
  // }, []);

  function closeCampaigns() {
    setOpenCampaigns?.(false);

    markNotificationsAsRead();
  }

  const unreadNotifications = [];

  return (
    <>
      <button
        className="relative"
        onClick={() => {
          setOpenCampaigns(true);
        }}
      >
        <Text />

        {/* {unreadNotifications.length > 0 ? (
          <div className="text-white top-[-10px] right-[-5px] w-6 h-6 absolute bg-secondary-200 rounded-full flex items-center justify-center font-bold">
            {unreadNotifications?.length}
          </div>
        ) : null} */}
      </button>
      <NotificationLayout open={openCampaigns} onClose={closeCampaigns} title="Campaigns">
        <div className="flex items-center justify-center overflow-y-auto h-full">
          <div className="flex flex-col items-center justify-center">
            <SvgNotifications />

            <Spacer className="h-4" />

            <div className=" flex flex-col items-center">
              <p className="font-sans text-2xl font-extrabold">Campaigns</p>

              <Spacer className="h-3" />

              <p className="text-center font-sans-body text-neutral-500">No Campaigns are the moment</p>
            </div>
          </div>
        </div>
      </NotificationLayout>
    </>
  );
};
