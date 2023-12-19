import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { Flash } from '@/components/flash/flash';
import { RequestMethod, useApi } from '@/helpers/api';
import { MemberList } from '../../components/member-list';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '@/pages/dashboard/components/title';
import SvgArrowLeftBig from '@/components/icons/ArrowLeftBig';
import { TabHeader } from '@/pages/dashboard/transactions/transactions';
import { GroupSavingDetails } from '../../components/group-savings-details';
import { GroupTransactionRow, WithdrawalRequestRow } from '../../components/group-transaction-row';
import {
  GroupGoalsData,
  GroupTransactions,
  Members,
  primaryDetails,
  Transactions,
  WithdrawalRequests,
} from '../../components/types';
import { Paginator } from '@/pages/dashboard/transactions/transactions-table/paginator';
import { GroupActionButtons } from '../../components/group-action-buttons';
import { GroupGoalPages } from '../../lib/types';

enum GoalTabs {
  ALL_TRANSACTIONS = 'ALL_TRANSACTIONS',
  CONTRIBUTIONS = 'CONTRIBUTIONS',
  PAYOUT = 'PAYOUT',
}

export const DefaultInfo: React.FC<{
  goalDetails: GroupGoalsData;
  transactions: GroupTransactions[];
  isGettingTransactions?: boolean;
  goalMembers: Members[];
  paginator: any;
  primaryDetails?: primaryDetails;
}> = ({ goalDetails, transactions, isGettingTransactions, paginator, goalMembers, primaryDetails }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequests[]>([]);

  const { submit: fetchWithdrawalRequests } = useApi(`/group/goal/withdrawal/request?goal=${params.goalId}`, {
    method: RequestMethod.GET,
    onSuccess(response) {
      setWithdrawalRequests(response.data.data.requests);
    },
  });

  useEffect(() => {
    if (goalDetails?.nature === 'Default' || goalDetails.nature === 'Emergency') {
      fetchWithdrawalRequests();
    }
  }, []);

  const loader = (
    <div className="w-full flex justify-center my-6 animate-spin">
      <Spinner />
    </div>
  );

  const renderWithdrawalRequests = withdrawalRequests?.map((withdrawalRequest, idx) => {
    return (
      <WithdrawalRequestRow
        key={idx}
        request={withdrawalRequest}
        signatories={goalDetails?.signatories}
        memberList={goalMembers}
        isSignatory={goalDetails?.isSignatory}
      />
    );
  });

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

      <Spacer className="h-8" />

      <div className="w-full">
        <GroupActionButtons
          goalPage={GroupGoalPages.DEFAULT}
          editGroupName={goalDetails?.goalName}
          goalData={goalDetails}
          fetchPayouts={fetchWithdrawalRequests}
          goalPrimaryDetails={primaryDetails}
        />
      </div>

      <Spacer className="h-5" />

      <div className="bg-[#FFF0ED] rounded-2xl py-8 px-12 grid lg:grid-cols-5 gap-4 lg:gap-0 savingsGoalFull">
        <GroupSavingDetails title="Group contributions" description={`GHS ${goalDetails?.account?.totalSavings}`} />

        <GroupSavingDetails title="Balance" description={`GHS ${goalDetails.account?.balance}`} />

        <GroupSavingDetails
          title="Personal contribution"
          description={`GHS ${goalDetails?.personalSavings?.balance}`}
        />
        <GroupSavingDetails title="Interest" description={'0.00'} />

        <GroupSavingDetails title="No. of saving goals members" description={`${goalDetails?.totalMembers}`} />
      </div>

      <Spacer className="h-12" />

      <Tab.Group>
        <div className="relative flex justify-between">
          <div className="border-b border-neutral-100 overflow-x-scroll lg:overflow-x-hidden w-[800px] lg:w-full">
            <Tab.List className="space-x-8 lg:space-x-16 flex w-[800px] lg:w-full">
              <Tab className=" border-transparent">
                {({ selected }) => <TabHeader selected={selected}>All transactions</TabHeader>}
              </Tab>

              <Tab>{({ selected }) => <TabHeader selected={selected}>Payouts</TabHeader>}</Tab>
            </Tab.List>
          </div>
        </div>

        <Spacer className="h-12" />

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="overflow-x-scroll lg:overflow-x-auto w-[950px] lg:w-full">
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
              <Tab.Panel className=" flex flex-col space-y-4">
                {withdrawalRequests.length === 0 ? <Flash>No Withdrawal Requests</Flash> : renderWithdrawalRequests}
              </Tab.Panel>
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
                  goalName={goalDetails.goalName}
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
