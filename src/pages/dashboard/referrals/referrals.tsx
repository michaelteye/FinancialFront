import SvgCopy from '@/components/icons/Copy';
import { Spacer } from '@/components/spacer';
import { fetch } from '@/helpers/fetch';
import { useAuthStore } from '@/store/auth';
import { useMessagesStore } from '@/store/messages';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Title } from '../components/title';
import { ReferralDetail } from './types';

export const Referrals = () => {
  const { userProfile } = useAuthStore();
  const { displayMessage } = useMessagesStore();
  const [copied, setCopied] = useState(false);
  // const [referralData, setReferralData] = useState<ReferralDetail>({
  //   incompleteProfiles: 0,
  //   completedProfiles: 0,
  //   referredUsers: 0,
  //   pointsEarned: 0,
  //   pointsToEarn: 0,
  // });

  const refId = userProfile?.referral?.id || '';
  const refCode = userProfile?.referral?.code || '';
  const referralUrl = `${window.location.origin}/auth/register?ref=${refCode}`;

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  const { data } = useQuery(['referrals'], () => fetch(`/users/referrals/${refId}`));

  const referralData: ReferralDetail[] = data?.data;

  return (
    <div>
      <Title title="Referrals" />

      <Spacer className=" h-2" />

      <div className=" flex flex-col py-7 px-10 bg-[#F2ECF6] rounded-xl w-full">
        <p className=" font-sans text-sm text-[#878FAB]">use Referral code</p>
        {refCode ? (
          <div className="flex space-x-3 items-start">
            <p className=" font-sans font-extrabold text-neutral-400 text-3xl">{refCode}</p>
            <button
              className="text-neutral-400"
              onClick={() => {
                navigator.clipboard.writeText(`${refCode}`);
                setCopied(true);
              }}
            >
              <SvgCopy />
            </button>
            {copied ? <p className="text-sm text-neutral-400 font-bold">copied!</p> : null}
          </div>
        ) : null}

        <Spacer className=" lg:h-2 h-4" />

        <div className=" flex flex-col lg:flex-row justify-between lg:items-center space-y-8 lg:space-y-0">
          <p className=" font-sans font-medium text-lg text-neutral-400">
            share this link:{' '}
            {refCode ? (
              <span className="overflow-x-scroll sm:overflow-auto max-w-full bg-[#C6D5DE] px-2 py-1 bg-opacity-80 rounded-xl text-sm font-sans text-neutral-400 inline-flex">
                {referralUrl}
              </span>
            ) : null}
          </p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`${referralUrl}`);

              displayMessage({
                title: 'Link Copied!',
                description: 'You can share and invite your family and friends to sign up with this link',
                variant: 'success',
              });
            }}
            className=" bg-white px-3 py-4 rounded-xl text-neutral-700 hover:shadow-md transition duration-75 ease-linear"
          >
            Copy link
          </button>
        </div>
      </div>

      <Spacer className=" h-10" />

      <h4 className=" flex sm:justify-center lg:justify-start font-sans font-medium text-neutral-400 text-2xl">
        Referral Stats
      </h4>

      <Spacer className=" h-4" />

      <div className=" grid grid-cols-2 lg:grid-cols-3 items-center lg:justify-between flex-col lg:flex-row gap-6">
        {/* <div className=" flex flex-col">
          <p className=" font-sans text-[#878FAB] text-sm">Points earned</p>
          <p className=" font-sans font-medium text-lg text-neutral-400">{referralData?.pointsEarned} pts</p>
        </div> */}
        <div className=" flex flex-col">
          <p className=" font-sans text-[#878FAB] text-sm">Number of referrals</p>
          <p className=" font-sans font-medium text-lg text-neutral-400">{referralData?.length}</p>
        </div>
        {/* <div className=" flex flex-col">
          <p className=" font-sans text-[#878FAB] text-sm">Current signups</p>
          <p className=" font-sans font-medium text-lg text-neutral-400">{referralData?.completedProfiles}</p>
        </div> */}
      </div>

      <Spacer className=" h-10" />

      {/* 
      <h4 className=" flex sm:justify-center lg:justify-start font-sans font-medium text-neutral-400 text-2xl">
        Referrals
      </h4>

      <Spacer className=" h-10" />
   
      <div className="flex flex-col space-y-3">
        {referralData?.map((data, idx) => {
          const { user, id } = data;
          return (
            <div key={id} className="flex items-center space-x-4 rounded-xl px-3 py-2 bg-neutral-300">
              <p className="font-medium">{idx + 1} -</p>
              <p className="font-medium">{user?.firstName + ' ' + user?.lastName}</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};
