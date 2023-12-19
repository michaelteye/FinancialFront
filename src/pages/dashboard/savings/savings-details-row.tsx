import ReactTooltip from 'react-tooltip';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { Spacer } from '@/components/spacer';
import SvgStar from '@/components/icons/Star';
import { RequestMethod, useApi } from '@/helpers/api';
import SvgComputer from '@/components/icons/Computer';
import SvgStarYellow from '@/components/icons/StarYellow';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailProps, SavingGoal } from './helpers/types';
import { GroupGoalsData, Members } from '../groups/components/types';
import { GroupSavingsDetailsRatingsRowProps } from '../groups/lib/types';
import { ActivateSetup } from '../groups/activate-emergency-goal/activate-setup';
import { NotActivated } from '../groups/activate-emergency-goal/Not-activated';
import { NotAGoalMember } from '../groups/components/modals/not-goal-member';
import { WithdrawalSlots } from '../groups/components/modals/withdrawal-slots';
import { LockTypes } from '../tools/types';

export const Detail: React.FunctionComponent<DetailProps> = ({ label, value, labelStyle, valueStyle }) => {
  return (
    <div className="flex flex-col items-start space-y-1">
      <p className={`font-sans-body sm:text-sm text-xs text-[#AAB0C6] ${labelStyle}`}>{label}</p>
      <p className={`font-sans-body sm:text-sm text-xs font-semibold text-[#252525] ${valueStyle}`}>{value}</p>
    </div>
  );
};

export const SavingsDetailsType: React.FC<{ TransactionType?: string; account?: number | string }> = ({
  TransactionType,
  account,
}) => {
  return (
    <div className=" flex flex-col lg:items-start">
      <p className="text-left sm:text-base text-xs font-sans font-semibold text-[#000] capitalize">{TransactionType}</p>
      <p className="text-left font-sans-body text-[#000] text-xs sm:text-sm">#Account: {account}</p>
    </div>
  );
};

export const SavingsDetailsRatingsRow: React.FC<{ savingGoal: SavingGoal; onFavorite?: () => void }> = ({
  savingGoal,
  onFavorite,
}) => {
  const navigate = useNavigate();
  const { submit: makeFavorite } = useApi(`/users/saving-goals/favourite/${savingGoal.id}`, {
    method: RequestMethod.PATCH,
  });

  const handleFavoriteClick = () => {
    makeFavorite({
      isFavorite: !savingGoal.isFavorite,
    });

    onFavorite!();
  };

  return (
    <div className="relative mt-4">
      <div className="sm:flex hidden  space-x-20 hover:bg-neutral-100 mb-5 hover:rounded-xl hover:bg-opacity-40 items-start">
        <button
          onClick={() => {
            navigate(`/dashboard/savings/${savingGoal.id}`);
          }}
          className="w-full flex items-start justify-between"
        >
          <div className="flex space-x-4 w-full">
            <div className="text-3xl w-12 h-12 flex items-center justify-center">
              {savingGoal.emoji ? savingGoal.emoji : '✨'}
            </div>

            <div className="flex ">
              <SavingsDetailsType
                TransactionType={`${savingGoal.name} ${
                  savingGoal?.accountTypeName === LockTypes.BEZO_LOCK ? '🔒' : ''
                }`}
                account={`${savingGoal?.accountId?.substring(1, 8)}...`}
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <Detail label="Type of account" value={savingGoal?.accountTypeName} />
          </div>

          <div className="w-full flex justify-center">
            <Detail label="Amount Saved" value={parseFloat(savingGoal.account?.balance!).toFixed(2)} />
          </div>

          <div className="w-full flex justify-center">
            <Detail label="Target Amount" value={savingGoal.amountToRaise} />
          </div>
        </button>

        <div className="flex items-center mt-1">
          <button
            data-tip
            className="rounded-full py-2 px-5 bg-neutral-100 hover:shadow-md transition duration-75 ease-linear"
            onClick={() => handleFavoriteClick()}
          >
            {savingGoal?.isFavorite ? <SvgStarYellow /> : <SvgStar />}
          </button>
          <ReactTooltip place="right" delayHide={200} type="warning" effect="float">
            Make saving goal a Favourite
          </ReactTooltip>
        </div>
      </div>

      <div className="flex sm:hidden mb-5 items-start w-full">
        <button
          onClick={() => {
            navigate(`/dashboard/savings/${savingGoal.id}`);
          }}
          className="w-[95%] space-x-3 flex items-start justify-between"
        >
          <div className="flex space-x-3 w-1/2">
            <div className="text-xl w-6 h-6 flex items-center justify-center">
              {savingGoal.emoji ? savingGoal.emoji : '✨'}
            </div>

            <SavingsDetailsType
              TransactionType={`${savingGoal.name} ${savingGoal?.accountTypeName === LockTypes.BEZO_LOCK ? '🔒' : ''}`}
              account={`${savingGoal?.accountId?.substring(1, 8)}...`}
            />
          </div>

          <div className="w-1/2 flex text-left">
            <Detail label="Amount Saved" value={savingGoal?.account?.balance} />
          </div>
        </button>

        <div className="flex items-center mt-1">
          <button
            data-tip
            className="rounded-full py-2 px-5 bg-neutral-100 hover:shadow-md transition duration-75 ease-linear"
            onClick={() => handleFavoriteClick()}
          >
            {savingGoal?.isFavorite ? <SvgStarYellow /> : <SvgStar />}
          </button>
          <ReactTooltip place="top" delayHide={200} type="warning" effect="float">
            Make saving goal a Favourite
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
};

export const GroupSavingsDetailsRatingsRow: React.FC<GroupSavingsDetailsRatingsRowProps> = ({
  groupGoal,
  isFavorite,
  onFavorite,
  groupRefId,
  isAdmin,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();
  const [openSlots, setOpenSlots] = useState(false);
  const [activateGoal, setActivateGoal] = useState(false);
  const [notActivated, setNotActivated] = useState(false);
  const [openNotMemberModal, setOpenNotMemberModal] = useState(false);
  const [rotationalGoalDetails, setRotationalGoalDetails] = useState<GroupGoalsData>({});

  const { submit: fetchSavingGoalDetails } = useApi(`/group/saving-goals?id=${groupGoal?._id}`, {
    onSuccess(response) {
      setRotationalGoalDetails(response.data?.data?.savingGoal);
    },
    method: RequestMethod.GET,
  });

  function handleClick() {
    onFavorite?.({
      goal: groupGoal._id,
      ref: params.refId,
    });
  }

  useEffect(() => {
    if (groupGoal?.nature === 'Rotational') {
      fetchSavingGoalDetails();
    }
  }, []);

  const takenSlots = rotationalGoalDetails?.rotationalSlots?.filter((slots) => {
    return slots?.user_id === userProfile?.id;
  });

  return (
    <>
      <ActivateSetup open={activateGoal} setOpen={setActivateGoal} goalId={groupGoal?._id} />

      <NotActivated open={notActivated} setOpen={setNotActivated} />

      <NotAGoalMember open={openNotMemberModal} setOpen={setOpenNotMemberModal} goalDetails={groupGoal} />
      <WithdrawalSlots
        open={openSlots}
        setOpen={setOpenSlots}
        roatationalGoalDetails={rotationalGoalDetails}
        fetchGoalDetails={fetchSavingGoalDetails}
      />

      <Spacer className="h-4" />

      <div className="flex hover:bg-neutral-100 hover:rounded-xl hover:bg-opacity-40 px-2">
        <button
          className="w-full flex items-start justify-between py-5"
          onClick={() => {
            if (groupGoal?.isMember === false) {
              setOpenNotMemberModal(true);
            } else {
              if (groupGoal?.nature === 'Rotational' && takenSlots?.length! === 0) {
                setOpenSlots(true);
              } else if (isAdmin && groupGoal?.nature === 'Emergency' && groupGoal?.status === 'pending') {
                setActivateGoal(true);
              } else if (!isAdmin && groupGoal?.nature === 'Emergency' && groupGoal?.status === 'pending') {
                setNotActivated(true);
              } else {
                navigate(`/dashboard/groups/${groupRefId ? groupRefId : ''}/${groupGoal ? groupGoal?._id : ''}`);
              }
            }
          }}
        >
          <div className="w-full flex space-x-4 text-left">
            <div className="text-3xl w-12 h-12 flex items-center justify-center">
              {groupGoal?.emoji ? groupGoal?.emoji : <SvgComputer />}
            </div>

            <SavingsDetailsType
              TransactionType={
                groupGoal?.goalName?.length! > 17 ? `${groupGoal?.goalName?.substring(0, 17)} ...` : groupGoal?.goalName
              }
              account={`${groupGoal?.group_id?.substring(0, 8)}...`}
            />
          </div>

          <div className="w-full flex">
            <Detail label="Type of account" value={groupGoal?.nature} />
          </div>
          <div className="w-full flex">
            <Detail label="Amount Saved" value={groupGoal?.amountToSave} />
          </div>

          <div className="w-full flex">
            <Detail label="Target Amount" value={groupGoal?.amountToRaise} />
          </div>
        </button>

        <div className="flex items-center">
          <button
            data-tip
            className="rounded-full py-2 px-5 bg-neutral-100 hover:shadow-md transition duration-75 ease-linear"
            onClick={() => handleClick()}
          >
            {isFavorite ? <SvgStarYellow /> : <SvgStar />}
          </button>
          <ReactTooltip place="right" delayHide={200} type="warning" effect="float">
            Make saving goal a Favourite
          </ReactTooltip>
        </div>
      </div>
    </>
  );
};
