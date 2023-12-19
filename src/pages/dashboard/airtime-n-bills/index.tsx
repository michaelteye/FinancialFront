import { Title } from '../components/title';
import { VasCard } from './components/vas-card';
import { Spacer } from '@/components/spacer';
import classNames from 'classnames';
import { VasSetup } from './vas-setup';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Tab } from '@headlessui/react';
import { Notice } from '@/components/flash/flash';
import { useQuery } from '@tanstack/react-query';
import { fetch } from '@/helpers/fetch';
import { Spinner } from '@/components/spinner';
import { VasData } from './lib/types';
import { useState } from 'react';

const vasNavOptions: { title: string; type: string }[] = [
  {
    title: 'Show all',
    type: 'ALL',
  },
  {
    title: 'Airtime',
    type: 'AIRTIME',
  },
  // {
  //   title: 'Data',
  //   type: 'DATA',
  // },
  // {
  //   title: 'Fixed BroadBroadband ',
  //   type: 'BROADBAND',
  // },
  {
    title: 'Utilities ',
    type: 'UTILITY',
  },
];

export const VAS = () => {
  const [parent] = useAutoAnimate({ duration: 500, easing: 'linear' });
  const [openVasSetup, setOpenVasSetup] = useState(false);
  const [selectedBiller, setSelectedBiller] = useState<VasData>();
  const [filterNavType, setFilterNavType] = useState<string>('ALL');

  const { data: billers, isLoading } = useQuery<VasData[]>(
    ['billers'],
    async () => {
      const response = await fetch('/users/vas/getBillers');
      return response?.data;
    },
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const displayCards = billers?.filter((option) => option.category === filterNavType);

  return (
    <>
      <VasSetup open={openVasSetup} onClose={() => setOpenVasSetup(false)} selectedBiller={selectedBiller} />

      <Title title="Airtime & Bills" />

      <Spacer className="h-8" />

      <Tab.Group
        onChange={(idx) => {
          switch (idx) {
            case 0:
              setFilterNavType('ALL');
              break;
            case 1:
              setFilterNavType('AIRTIME');
              break;
            case 2:
              setFilterNavType('UTILITY');
              break;
            // case 3:
            //   setFilterNavType('BROADBAND');
            //   break;
            // case 4:
            //   setFilterNavType('UTILITY');
            //   break;
          }
        }}
      >
        <div className="relative flex justify-between">
          <div className="overflow-x-scroll lg:overflow-x-hidden w-[700px] lg:w-full">
            <Tab.List className="sm:space-x-8 space-x-4 flex w-[700px] lg:w-full">
              {vasNavOptions.map((option) => {
                return (
                  <Tab
                    className={classNames('border border-neutral-100 py-3 px-4 rounded-xl hover:text-white', {
                      'hover:bg-primary-400': option.type !== filterNavType,
                      'bg-primary-400 text-white': option.type === filterNavType,
                    })}
                  >
                    {option.title}
                  </Tab>
                );
              })}
            </Tab.List>
          </div>
        </div>
      </Tab.Group>

      {isLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <>
          <Spacer className="h-8" />

          {displayCards?.length === 0 && filterNavType !== 'ALL' ? (
            <Notice className="capitalize" text={`No ${filterNavType.toLowerCase()} packages available yet.`} />
          ) : null}

          <div ref={parent} className="flex items-center justify-between flex-wrap">
            {(filterNavType === 'ALL' ? billers : displayCards)?.map((option, idx) => {
              return (
                <VasCard
                  key={option.category + idx}
                  onClick={() => {
                    setOpenVasSetup(true);
                    setSelectedBiller(option);
                  }}
                  img={option.imageIcon}
                  name={option.name}
                />
              );
            })}
          </div>
        </>
      )}

      <Spacer className="h-8" />
    </>
  );
};
