import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button/index';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SvgTickSquare from '@/components/icons/TickSquare';
import SvgNotifyClose from '@/components/icons/NotifyClose';
import { Title } from '@/pages/dashboard/components/title';
import { NoSavingsCard } from './saving-details/no-savings-card';
import SvgAccountBalance from '@/components/icons/AccountBalance';
import SvgAccountDeposit from '@/components/icons/AccountDeposit';
import { RecentTransactions } from './transaction-details/recent-transactions';
import { TopupWithdrawButtons } from '@pages/dashboard/savings/components/action-buttons';
import { Streak } from '../components/streak';
import SvgCloseEye from '@/components/icons/CloseEye';
import SvgTotal from '@/components/icons/Total';
import SvgPeopleGroup from '@/components/icons/PeopleGroup';
import { GroupModalLayout } from '../groups/components/modals/modal-layout';
import SvgSuccess from '@/components/icons/Success';
import { FinanceDetailProps, PendingInviteProps } from './lib/types';
import { SurveyNotice } from '../components/survey/survey-notice';

const FinancialDetails: React.FC<FinanceDetailProps> = ({ icon: Icon, amountDescription, amount }) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="flex flex-col items-start ">
      <Icon />
      <p className=" text-[#808192] font-medium font-sans leading-5 pt-2">{amountDescription}</p>
      <div className="pt-2 w-full">
        {!showBalance ? (
          <button className="flex text-[#808192] items-center w-full space-x-2" onClick={() => setShowBalance(true)}>
            {' '}
            <span className="font-medium text-lg">view</span>
            <SvgCloseEye />
          </button>
        ) : (
          <button className="flex items-center justify-center space-x-3" onClick={() => setShowBalance(false)}>
            {' '}
            <span className="text-neutral-700 font-extrabold text-3xl"> GHS {amount}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const PendingInviteComp: React.FC<PendingInviteProps> = ({ setOpen, open, pendingInvites }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPendingInvitesModal, setShowPendingInvitesModal] = useState(false);
  if (open === false) {
    return null;
  }

  return (
    <>
      <GroupModalLayout
        open={showPendingInvitesModal}
        setOpen={setShowPendingInvitesModal}
        icon={SvgSuccess}
        action2="Not Now"
        action="View group(s) Invite"
        actionClick={() => {
          navigate('/dashboard/groups');
        }}
        headerText={
          <p className="font-sans-body text-neutral-400 font-semibold">
            {pendingInvites?.length} Pending group invitation
          </p>
        }
      >
        <p className="text-[#252525] font-sans-body text-center px-7">
          You have {pendingInvites?.length} new group invitations. Please click view invitations to view this.
        </p>
      </GroupModalLayout>

      <div className=" w-full bg-[#F3F2F8] border border-[#F3F2F8] py-4 px-4 flex justify-between rounded-xl">
        <div className="flex items-center">
          <SvgPeopleGroup />
          <p className=" font-semibold text-sm font-sans-body text-neutral-400 ml-4">
            {pendingInvites?.length} pending group invite(s)
          </p>
        </div>
        <div className="flex items-center">
          {location.pathname.includes('groups') ? (
            <p className=" font-sans-body text-neutral-700 text-sm mr-6 ">view below</p>
          ) : (
            <button
              className=" font-sans-body text-neutral-700 text-sm mr-6 underline"
              onClick={() => {
                setShowPendingInvitesModal(true);
              }}
            >
              view all
            </button>
          )}

          <button
            onClick={() => {
              setOpen?.(false);
            }}
          >
            <SvgNotifyClose />
          </button>
        </div>
      </div>
    </>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const { userProfile, stats } = useAuthStore();
  const [showToolTip, setShowToolTip] = useState(false);
  // const [campaign, setCampaign] = useState<MarketingCampaign[]>();
  const [campaignOpen, setCampaignOpen] = useState(() => !JSON.parse(localStorage.getItem('XMAS_CAMPAIGN')!));

  // window.Intercom('update', {
  //   app_id: 'f8z01q2i',
  //   name: userProfile?.user?.firstName,
  //   email: userProfile?.emailIdentity?.email || '',
  //   phone: userProfile?.phone,
  //   user_id: userProfile?.id,
  //   created_at: userProfile?.createdAt,
  // });

  const AdvancedlevelBenefits = [
    'Account limit of GHS100,000',
    'Unlimited daily deposits',
    'Withdrawal limits of up to GHS 5000',
  ];

  const [surveyTaken, setSurveyTaken] = useState(() => localStorage.getItem('SURVEY'));

  return (
    <>
      <div className="flex lg:space-x-4">
        <Title title={`Hello, ${userProfile?.user?.firstName || ''}`} />

        <div onMouseLeave={() => setShowToolTip(false)} className="flex items-center relative">
          <button
            onMouseEnter={() => setShowToolTip(true)}
            className="px-6 py-2 -mt-4 text-sm border-2 border-neutral-100 bg-neutral-100 bg-opacity-50 text-primary-100 text-opacity-70 rounded-md font-sans-body capitalize"
          >
            {userProfile?.user?.level} Account
          </button>

          <div
            className={classNames(
              'absolute bg-white lg:min-w-[360px] lg:top-[95%] top-[70%] lg:left-0 right-[2%] min-w-[270px] rounded-lg border-2 border-neutral-100 px-4 py-2 z-10',
              {
                hidden: showToolTip === false,
              }
            )}
          >
            <div className="-mt-5 md:ml-[20%] ml-[80%] triangle"></div>

            <div className="flex items-start justify-between border-b-2 pt-4 border-neutral-100">
              <p className="w-3/4 font-sans text-sm pb-3">
                <span className="">
                  {' '}
                  {userProfile?.user?.level === 'advance' || userProfile?.user?.level === 'intermediate'
                    ? 'You’ve got some awesome benefits with an '
                    : 'You will enjoy additional benefits by upgrading your account to an '}
                  <span className="font-medium">advance account</span>
                </span>
              </p>
              <button onClick={() => setShowToolTip(false)} className="flex mt-1">
                <SvgNotifyClose />
              </button>
            </div>

            <Spacer className="h-4" />

            <div className="flex flex-col space-y-3">
              {AdvancedlevelBenefits?.map((benefit, idx) => {
                return (
                  <div key={idx} className="flex space-x-3 items-center text-xs">
                    <SvgTickSquare />
                    <p className="capitalize">{benefit}</p>
                  </div>
                );
              })}
            </div>
            <Spacer className="h-5" />

            {userProfile?.user?.level === 'beginner' || userProfile?.user?.level === 'intermediate' ? (
              <div className="flex flex-col lg:w-[75%] w-full mx-auto">
                <button
                  onClick={() => navigate('/dashboard/settings?tab=4')}
                  className="bg-primary-400 text-white px-6 py-1 rounded-xl leading-6 font-medium  transition duration-75 ease-linear font-sans"
                >
                  Upgrade account
                </button>
                <Spacer className="h-3" />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Spacer className="h-7" />

      <Streak />

      <Spacer className="h-7" />

      <div className="flex lg:flex-row justify-between lg:space-y-0 items-center">
        <Link to="/dashboard/savings?create=true">
          <Button variant="secondary">Create a savings goal</Button>
        </Link>
        <TopupWithdrawButtons />
      </div>

      <Spacer className=" h-11" />

      <div className="flex lg:flex-row flex-col items-start lg:space-x-24 lg:space-y-0 space-y-10 ">
        <FinancialDetails
          icon={SvgAccountBalance}
          amountDescription="Total BezoWallet Balance"
          amount={stats ? stats.totalPrimaryBalance?.toFixed(2) : '0.00'}
        />

        <FinancialDetails
          icon={SvgAccountDeposit}
          amountDescription="Total Savings Balance"
          amount={stats?.totalSavingsBalance?.toFixed(2) || '0.00'}
        />

        <div className="pt-[6px]">
          <FinancialDetails
            icon={SvgTotal}
            amountDescription="Total Balance"
            amount={stats?.totalDeposits?.toFixed(2) || '0.00'}
          />
        </div>
      </div>

      <Spacer className=" h-11" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NoSavingsCard />
        <RecentTransactions />
      </div>

      <Spacer className="sm:hidden h-20" />
    </>
  );
};
