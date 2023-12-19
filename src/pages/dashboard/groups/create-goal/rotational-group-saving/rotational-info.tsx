import { Tab } from '@headlessui/react';
import { Spacer } from '@/components/spacer';
import { useNavigate, useParams } from 'react-router-dom';
import { MemberList } from '../../components/member-list';
import { Title } from '@/pages/dashboard/components/title';
import SvgArrowLeftBig from '@/components/icons/ArrowLeftBig';
import { TabHeader } from '@/pages/dashboard/transactions/transactions';
import { GroupSavingDetails } from '../../components/group-savings-details';
import { GroupGoalsData, Members, primaryDetails, Transactions } from '../../components/types';
import { GroupActionButtons } from '../../components/group-action-buttons';
import { GroupTransactionRow } from '../../components/group-transaction-row';
import { Paginator } from '@/pages/dashboard/transactions/transactions-table/paginator';
import { Flash } from '@/components/flash/flash';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/button';
import { GroupGoalPages } from '../../lib/types';

export const RotationalInfo: React.FC<{
  goalDetails: GroupGoalsData;
  transactions: Transactions[];
  goalMembers?: Members[];
  isGettingTransactions?: boolean;
  paginator?: any;
  primaryDetails?: primaryDetails;
}> = ({ goalDetails, goalMembers, primaryDetails, transactions, isGettingTransactions, paginator }) => {
  const params = useParams();
  const navigate = useNavigate();

  const loader = (
    <div className="w-full flex justify-center my-6 animate-spin">
      <Spinner />
    </div>
  );

  const renderTransactions = (
    <>
      {isGettingTransactions
        ? loader
        : transactions.map((transaction, idx) => {
            return (
              <div>
                <GroupTransactionRow key={idx} transaction={transaction} />
              </div>
            );
          })}
      {isGettingTransactions ? null : transactions.length === 0 ? <Flash>No Transactions found.</Flash> : null}
    </>
  );

  return (
    <>
      <Spacer className="h-4" />

      <div className="flex space-x-4">
        <button
          onClick={() => {
            navigate(`/dashboard/groups/${params.refId}`);
          }}
        >
          <SvgArrowLeftBig />
        </button>
        <Title title={`${goalDetails?.goalName}`} />
      </div>

      <div className="flex items-end justify-end">
        <Button children="Start Goal" />
      </div>

      <Spacer className="h-2" />

      <div>
        <GroupActionButtons
          goalPage={GroupGoalPages.ROTATIONAL}
          editGroupName={goalDetails?.goalName}
          goalData={goalDetails}
          goalPrimaryDetails={primaryDetails}
        />
      </div>

      <Spacer className="h-5" />

      <div className="bg-[#FFF0ED] rounded-2xl py-8 px-12 grid lg:grid-cols-5 gap-4 lg:gap-0 savingsGoalFull">
        <GroupSavingDetails title="Group contributions" description={`GHS ${'-'}`} />
        <GroupSavingDetails title="Balance" description={`GHS ${goalDetails ? goalDetails.account?.balance : '--'}`} />
        <GroupSavingDetails title="Personal contribution" description={`GHS ${'-'}`} />
        <GroupSavingDetails title="No. of saving goals members" description={`${goalDetails?.totalMembers}`} />
        <GroupSavingDetails title="Interest" description={'0.00'} />
      </div>

      <Spacer className="h-12" />

      <Tab.Group>
        <div className="relative flex justify-between">
          <div className="border-b border-neutral-100 overflow-x-scroll lg:overflow-x-hidden w-[800px] lg:w-full">
            <Tab.List className="space-x-8 lg:space-x-16 flex w-[800px] lg:w-full">
              <Tab className=" border-transparent">
                {({ selected }) => <TabHeader selected={selected}>All transactions</TabHeader>}
              </Tab>
              <Tab>{({ selected }) => <TabHeader selected={selected}>Goal Payout</TabHeader>}</Tab>
              <Tab>{({ selected }) => <TabHeader selected={selected}>Upcoming Payouts</TabHeader>}</Tab>
            </Tab.List>
          </div>
        </div>

        <Spacer className="h-12" />

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="overflow-x-scroll lg:overflow-x-auto w-[800px] lg:w-full">
            <Tab.Panels>
              <Tab.Panel className=" flex flex-col space-y-4">
                {
                  <>
                    {renderTransactions}
                    {isGettingTransactions || transactions.length === 0 ? null : (
                      <div className="w-full flex justify-end">
                        <Paginator
                          paginator={{
                            ...paginator,
                            setPage(page) {
                              paginator.setPage(page);
                            },
                            onNext() {
                              paginator.onNext();
                            },
                            onPrevious() {
                              paginator.onPrevious();
                            },
                          }}
                        />
                      </div>
                    )}
                  </>
                }
              </Tab.Panel>
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
          {goalMembers?.map((goalMember) => {
            return (
              <div className="flex flex-col space-y-4  overflow-x-scroll lg:overflow-x-auto w-[800px] lg:w-full">
                <MemberList
                  memberInfo={goalMember}
                  goalName={goalDetails?.goalName}
                  isCreator={goalDetails?.isCreator}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Spacer className="h-8" />
    </>
  );
};
