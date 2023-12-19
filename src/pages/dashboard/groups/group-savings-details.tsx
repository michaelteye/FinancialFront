import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/spinner';
import { RequestMethod, useApi } from '@/helpers/api';
import { GroupGoalsData, Members, primaryDetails, Transactions } from './components/types';
import { SplitPayInfo } from './split-and-make-payment/split-pay-info';
import { DefaultInfo } from './create-goal/default-group-saving/default-info';
import { RotationalInfo } from './create-goal/rotational-group-saving/rotational-info';
import { SplitShareInfo } from './create-goal/split-pay-group-saving/split-share-info';
import { GroupGoalReview } from './create-goal/organisational-group-saving/group-goal-review';
import usePagination from 'headless-pagination-react';
import { Pagination } from './lib/types';

export const GroupSavingsDetails: React.FC<{ groupGoalType?: string }> = () => {
  const params = useParams();
  const [paginationDetails, setPaginationDetails] = useState<Pagination>({
    total: 100,
  });
  const [primaryDetails, setPrimaryDetails] = useState<primaryDetails>();
  const [goalDetails, setGoalDetails] = useState<GroupGoalsData>({});
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [goalMembers, setGoalMembers] = useState<Members[]>([]);

  const LIMIT = 4;

  const paginator = usePagination({
    totalItems: paginationDetails.total!,
    perPage: LIMIT,
    maxLinks: 6,
    initialPage: 1,
  });

  const { submit: fetchSavingGoalDetails, isLoading: isFetchingSavingGoalDetails } = useApi(
    `/group/saving-goals?id=${params.goalId}`,
    {
      onSuccess(response) {
        setGoalDetails(response.data?.data?.savingGoal);
        setPrimaryDetails(response?.data?.data?.primaryAccount);
      },
      method: RequestMethod.GET,
    }
  );

  const { submit: fetchGoalMembers } = useApi(`/group/subscriptions/users?goal=${params.goalId}`, {
    onSuccess(response) {
      setGoalMembers(response.data.data.subscriptions);
    },
    method: RequestMethod.GET,
  });

  const { submit: fetchTransactions, isLoading: isFetchingTransactions } = useApi(
    `/group/transactions/goal?goal=${params.goalId}&limit=${LIMIT}&page=${paginator.page}`,
    {
      onSuccess(response) {
        setTransactions(response.data.data.transactions);
        setPaginationDetails(response.data.data.pagination);
      },
      method: RequestMethod.GET,
    }
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchGoalMembers();
  }, []);

  useEffect(() => {
    fetchSavingGoalDetails();
  }, []);

  const groupGoalType = goalDetails?.nature;

  if (isFetchingSavingGoalDetails) {
    return (
      <div className="flex flex-col space-y-4 items-center justify-center  top-1/2 -translate-y-2/3 relative">
        <Spinner />
      </div>
    );
  } else {
    if (groupGoalType === 'Organizational') {
      return <GroupGoalReview />;
    }
    // return <OrganizationalInfo />;
    if (groupGoalType === 'SplitAndShare') {
      return (
        <SplitShareInfo
          paginator={paginator}
          goalMembers={goalMembers}
          goalDetails={goalDetails}
          transactions={transactions}
          primaryDetails={primaryDetails}
          isGettingTransactions={isFetchingTransactions}
        />
      );
    }
    if (groupGoalType === 'Rotational') {
      return (
        <RotationalInfo
          paginator={paginator}
          goalDetails={goalDetails}
          transactions={transactions}
          goalMembers={goalMembers}
          primaryDetails={primaryDetails}
          isGettingTransactions={isFetchingTransactions}
        />
      );
    }
    if (groupGoalType === 'split-pay') {
      return <SplitPayInfo goalDetails={goalDetails} />;
    }

    return (
      <DefaultInfo
        paginator={paginator}
        goalDetails={goalDetails}
        goalMembers={goalMembers}
        transactions={transactions}
        primaryDetails={primaryDetails}
        isGettingTransactions={isFetchingTransactions}
      />
    );
  }
};
