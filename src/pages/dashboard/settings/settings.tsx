import { Tab } from '@headlessui/react';

import { Spacer } from '@/components/spacer';
import { Title } from '@/pages/dashboard/components/title';
import { TabHeader } from '@/pages/dashboard/transactions/transactions';

import { MyProfile } from './my-profile';
import { NextOfKins } from './next-of-kins';
import { PaymentMethods } from './payment-methods';
import { Security } from './security';
import { IdVerification } from './id-verify';
import { useSearchParams } from 'react-router-dom';

export const Settings = () => {
  const [searchParams] = useSearchParams();
  const tabIndex = Number(searchParams.get('tab'));

  return (
    <>
      <Title title="Settings" />

      <Spacer className=" h-7" />

      <Tab.Group defaultIndex={tabIndex}>
        <div>
          <div className=" flex justify-between">
            <div className="border-b border-neutral-100 overflow-x-scroll lg:overflow-x-hidden w-[800px] lg:w-full">
              <Tab.List className="space-x-8 lg:space-x-16 flex w-[800px] lg:w-full">
                <Tab>{({ selected }) => <TabHeader selected={selected}>My profile</TabHeader>}</Tab>
                <Tab>{({ selected }) => <TabHeader selected={selected}>Next-of-Kin Details</TabHeader>}</Tab>
                <Tab className="">{({ selected }) => <TabHeader selected={selected}>Payment methods</TabHeader>}</Tab>
                <Tab className="">{({ selected }) => <TabHeader selected={selected}>Security</TabHeader>}</Tab>
                <Tab className="">{({ selected }) => <TabHeader selected={selected}>ID verification</TabHeader>}</Tab>
              </Tab.List>
            </div>
          </div>
        </div>

        <Tab.Panels>
          <Tab.Panel>
            <MyProfile />
          </Tab.Panel>
          <Tab.Panel>
            <NextOfKins />
          </Tab.Panel>
          <Tab.Panel>
            <PaymentMethods />
          </Tab.Panel>
          <Tab.Panel>
            <Security />
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panel>
          <IdVerification />
        </Tab.Panel>
      </Tab.Group>
    </>
  );
};
