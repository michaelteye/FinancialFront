import { Tab } from '@headlessui/react';
import { Spacer } from '@/components/spacer';
import { useNavigate } from 'react-router-dom';
import { MemberList } from '../../components/member-list';
import { Title } from '@/pages/dashboard/components/title';
import SvgArrowLeftBig from '@/components/icons/ArrowLeftBig';
import { GroupGoalsData, Transactions } from '../../components/types';
import { TabHeader } from '@/pages/dashboard/transactions/transactions';
import { GroupSavingDetails } from '../../components/group-savings-details';
import { GroupActionButtons } from '../../components/group-action-buttons';
import { GroupGoalPages } from '../../lib/types';

export const OrganizationalInfo: React.FC<{ goalDetails: GroupGoalsData; transactions: Transactions }> = ({
  goalDetails,
  transactions,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Spacer className="h-4" />

      <div className="flex space-x-4">
        <button
          onClick={() => {
            navigate('/dashboard/groups/groupData');
          }}
        >
          <SvgArrowLeftBig />
          ``
        </button>
        <Title title={`${goalDetails?.goalName}`} />
      </div>

      <Spacer className="h-8" />

      <div>
        <GroupActionButtons
          goalPage={GroupGoalPages.ORGANIZATIONAL}
          editGroupName={goalDetails?.goalName}
          goalData={goalDetails}
        />
      </div>

      <Spacer className="h-5" />

      <div className="bg-[#FFF0ED] rounded-2xl py-8 px-12 grid lg:grid-cols-3 gap-4 lg:gap-0 savingsGoalFull">
        <GroupSavingDetails title="Group contributions" description={`GHS ${goalDetails?.account?.totalSavings}`} />
        <GroupSavingDetails
          title="Personal contribution"
          description={`GHS ${goalDetails?.personalSavings?.balance}`}
        />
        <GroupSavingDetails title="No. of saving goals members" description={`${goalDetails?.totalMembers} `} />
      </div>

      <Spacer className="h-12" />

      <Tab.Group>
        <div className="relative flex justify-between">
          <div className="border-b border-neutral-100 overflow-x-scroll lg:overflow-x-hidden w-[800px] lg:w-full">
            <Tab.List className="space-x-8 lg:space-x-16 flex w-[800px] lg:w-full">
              <Tab className=" border-transparent">
                {({ selected }) => <TabHeader selected={selected}>All transactions</TabHeader>}
              </Tab>
              <Tab>{({ selected }) => <TabHeader selected={selected}>Deposits</TabHeader>}</Tab>
              <Tab>{({ selected }) => <TabHeader selected={selected}>Withdrawals</TabHeader>}</Tab>
            </Tab.List>
          </div>
        </div>

        <Spacer className="h-12" />

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="overflow-x-scroll lg:overflow-x-auto w-[800px] lg:w-full">
            <Tab.Panels>
              <Tab.Panel className=" flex flex-col space-y-4">{/* <TransactionRow transaction={{}} /> */}</Tab.Panel>
              <Tab.Panel className=" flex flex-col space-y-4">{/* <TransactionRow transaction={{}} /> */}</Tab.Panel>
              <Tab.Panel className=" flex flex-col space-y-4">{/* <TransactionRow transaction={{}} /> */}</Tab.Panel>
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>

      <Spacer className="h-12" />

      <h3 className="font-sans text-nuetral-400 text-xl font-medium">Goal Member List</h3>

      <Spacer className="h-4" />

      <div className="flex flex-col space-y-8 bg-[#F3F2F84D] bg-opacity-30 rounded-2xl border border-[#F3F2F8] p-8">
        <h4 className="text-[#000] font-sans text-sm">MEMBER LIST</h4>

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="flex flex-col space-y-4  overflow-x-scroll lg:overflow-x-auto w-[800px] lg:w-full">
            <MemberList />
          </div>
        </div>
      </div>

      <Spacer className="h-8" />
    </>
  );
};
