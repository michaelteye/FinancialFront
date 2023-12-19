import { Fragment, useEffect, useMemo, useState } from 'react';
import { NotificationLayout } from '.';
import { RequestMethod, useApi } from '@/helpers/api';
import { Spacer } from '@/components/spacer';
import { NotificationBell } from '@/components/icons';
import SvgNotifications from '@/components/icons/Notifications';
import { QueryCache, QueryClient, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetch } from '@/helpers/fetch';
import { useAuthStore } from '@/store/auth';
import { NotificationsData } from './helpers/types';
import SvgCheckCircle from '@/components/icons/CheckCircle';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/button';
// import { useNotification } from '@/hooks/useNotifications';
import { client } from '@/helpers/axios';
import axios from 'axios';
import { useNotification } from '@/hooks/useNotifications';

export interface Notification {
  createdAt: string;
  message: string;
  title: string;
  type: string;
  _id: string;
  status: 'read' | 'unread';
}

export const Notifications: React.FC = () => {
  const { userProfile } = useAuthStore();

  const userId = useMemo(() => userProfile?.user?.id, [userProfile]);

  const [openNotifications, setOpenNotifications] = useState(false);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch: refetchNotifications } = useNotification();

  const notifications: NotificationsData[] = data?.pages[0]?.data?.notifications || [];

  const { submit: markNotificationsAsRead } = useApi(`/users/notification/${userId}/read`, {
    onSuccess() {
      refetchNotifications();
    },
  });

  function closeNotifications() {
    setOpenNotifications?.(false);

    markNotificationsAsRead();
  }

  //@ts-ignore
  const unreadNotifications = notifications ? notifications?.filter((notification) => !notification.isRead) : [];

  return (
    <>
      <button
        className="relative"
        onClick={() => {
          setOpenNotifications(true);
        }}
      >
        <NotificationBell />

        {unreadNotifications.length > 0 ? (
          <div className="text-white top-[-10px] right-[-5px] w-6 h-6 absolute bg-secondary-200 rounded-full flex items-center justify-center font-bold">
            {unreadNotifications?.length}
          </div>
        ) : null}
      </button>
      <NotificationLayout open={openNotifications} onClose={closeNotifications} title="Notifications">
        {/* ******************************* MAIN CONTENT **************************** */}

        {notifications?.length === 0 ? (
          <div className="flex items-center justify-center  top-1/2 translate-y-2/3 ">
            <div className="flex flex-col items-center justify-center">
              <SvgNotifications />

              <Spacer className="h-4" />

              <div className=" flex flex-col items-center">
                <p className="font-sans text-2xl font-extrabold">No notifications</p>

                <Spacer className="h-3" />

                <p className="text-center font-sans-body text-neutral-500">
                  You have no notifications yet. <br /> Please check back again.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Spacer className=" h-11" />

            <div className="flex flex-col space-y-4">
              {data?.pages?.map((group, idx) => {
                return (
                  <Fragment key={idx}>
                    {/* @ts-ignore */}

                    {group?.data?.notifications?.map((notification, idx) => {
                      return (
                        <div key={notification?.id + idx} className="flex space-x-4">
                          <div>
                            <SvgCheckCircle />
                          </div>

                          <div className="flex flex-col items-start">
                            <p className="font-sans-body text-sm text-neutral-400 font-semibold">
                              {notification.title}
                            </p>
                            <p className="font-sans-body text-xs text-neutral-400 max-w-[360px]">
                              {notification?.message}
                            </p>
                            <p className="text-[#A5ACB8] font-semibold text-xs mt-2 font-sans-body ">
                              {formatDistanceToNow(new Date(notification.createdAt))} ago
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </Fragment>
                );
              })}
            </div>
          </>
        )}

        <Spacer className="h-5" />

        {hasNextPage && (
          <button
            onClick={() => {
              fetchNextPage();
            }}
            className="w-full text-sm text-[#A5ACB8]"
          >
            {isFetchingNextPage ? 'Loading ... ' : 'Load more'}
          </button>
        )}
      </NotificationLayout>
    </>
  );
};
