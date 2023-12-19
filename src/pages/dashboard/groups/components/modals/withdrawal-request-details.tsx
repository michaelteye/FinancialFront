import React, { useState } from 'react';
import { format } from 'date-fns';
import { useApi } from '@/helpers/api';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { useAuthStore } from '@/store/auth';
import Modal from '@/components/modal/modal';
import SvgClose from '@/components/icons/Close';
import { useMessagesStore } from '@/store/messages';
import { Members, WithdrawalRequestDetailProps, WithdrawalRequests } from '../types';
import { GroupTransactionStatus } from '../group-transaction-row';
import SvgWithdrawReceipt3 from '@/components/icons/WithdrawReceipt3';
import { Detail } from '@/pages/dashboard/transactions/transactions-table/transaction-row';
import { WithdrawalSetup } from '../../group-transactions/withdrawal/withdrawal-setup';

enum WithdrawalRequestResponse {
  APPROVE = 'approve',
  DISAPPROVE = 'disapprove',
}

export const WithdrawalRequestDetails: React.FC<WithdrawalRequestDetailProps> = ({
  open,
  setOpen,
  requestDetails,
  signatories,
  memberList,
}) => {
  const { userProfile } = useAuthStore();
  const { displayMessage } = useMessagesStore();
  const [showPinStep, setShowPinStep] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const { submit: disapproveWithdrawalRequest, isLoading: isDisapprovingToRequest } = useApi(
    '/group/goal/withdrawal/request/approval',
    {
      onSuccess() {
        displayMessage({
          title: 'Success',
          description: 'You have approved this request',
          variant: 'success',
        });

        setOpen?.(false);
      },
      onError(response) {
        displayMessage({
          title: 'Failed',
          description: response?.response?.data.message,
          variant: 'error',
        });
        setOpen?.(false);
      },
    }
  );
  const { submit: approveWithdrawalRequest, isLoading: isApprovingRequest } = useApi(
    '/group/goal/withdrawal/request/approval',
    {
      onSuccess() {
        displayMessage({
          title: 'Success',
          description: 'You have approved this request',
          variant: 'success',
        });
        setOpen?.(false);
      },
      onError(response) {
        displayMessage({
          title: 'Failed',
          description: response?.response?.data.message,
          variant: 'error',
        });
        setOpen?.(false);
      },
    }
  );

  function approveRequest() {
    approveWithdrawalRequest({
      action: WithdrawalRequestResponse.APPROVE,
      reason: requestDetails?.reason,
      request: requestDetails?._id,
    });
  }

  function disApproveRequest() {
    disapproveWithdrawalRequest({
      action: WithdrawalRequestResponse.DISAPPROVE,
      reason: requestDetails?.reason,
      request: requestDetails?._id,
    });
  }

  const SignatoryProfile = memberList?.filter((member) => {
    return member.isSignatory;
  });

  const signatoriesIds = SignatoryProfile?.map((profile) => {
    return profile.user?._id;
  });

  const signatoriesToApprove = parseFloat(signatories!) - parseFloat(requestDetails?.approvalsLeft!);

  return (
    <>
      <WithdrawalSetup
        setPinStep={showPinStep}
        open={openWithdrawModal}
        setOpen={setOpenWithdrawModal}
        requestData={requestDetails}
      />

      <Modal className="max-w-[532px] rounded-2xl" open={open} setOpen={setOpen}>
        <div className="rounded-2xl flex flex-col w-full">
          <div className="rounded-t-2xl flex flex-col items-center bg-neutral-100 bg-opacity-60 py-9 relative">
            <div className="rounded-2xl flex flex-col items-center justify-center ">
              <button>
                <SvgClose className="absolute top-6 left-[475px]" onClick={() => setOpen?.(false)} />
              </button>

              <div className="text-center">
                <SvgWithdrawReceipt3 />
              </div>

              <Spacer className="h-2" />

              <p className=" text-[#FF6644] font-semibold text-3xl">{`- GHS ${requestDetails?.amount}`}</p>

              <Spacer className="h-2" />

              <p className=" font-sans font-medium text-sm text-neutral-400 mb-2">
                Withdrawal request from{' '}
                <span className="font-bold">{`${requestDetails?.receiverProfile?.fullName}`}</span>
              </p>

              <Spacer className="h-2" />
            </div>
            <div>
              <GroupTransactionStatus state={requestDetails?.status} />
            </div>
          </div>

          <div className="border-b border-neutral-100 flex flex-col  py-6 px-7">
            <div className=" flex lg:flex-row flex-col items-start lg:space-x-20 lg:space-y-0 space-y-3">
              <div className=" w-full lg:w-1/2">
                <Detail
                  label="Date of transactions"
                  value={requestDetails ? format(new Date(requestDetails?.createdAt!), 'dd/MMM/yyyy') : ''}
                />
              </div>

              <div className="  w-full lg:w-1/2">
                <Detail label="Reference number" value={'-'} />
              </div>
            </div>

            {requestDetails?.approvalsLeft ? (
              <>
                <Spacer className=" lg:h-6 h-3" />

                <div className=" flex lg:flex-row flex-col items-start lg:space-x-20 lg:space-y-0 space-y-3">
                  <div className=" w-full lg:w-1/2">
                    <Detail
                      label="No. of approved signatory(ies)"
                      value={
                        <p className="font-light">
                          <span className="font-bold">{signatoriesToApprove}</span> out of{' '}
                          <span className="font-bold">{signatories}</span> approved
                        </p>
                      }
                    />
                  </div>
                </div>
              </>
            ) : null}

            <Spacer className="h-4" />

            <div className=" w-full lg:w-1/2">
              <Detail label="Withdrawal Reason" value={requestDetails?.reason} />
            </div>
          </div>

          <Spacer className="h-8" />

          {signatoriesIds.includes(userProfile?.id) ? (
            <div className=" flex justify-end mx-8">
              <div className=" flex lg:flex-row fex-col lg:space-y-0 space-y-2  lg:space-x-4">
                <Button
                  onClick={() => disApproveRequest()}
                  loading={isDisapprovingToRequest}
                  className="bg-white border border-secondary-100 text-secondary-100 text-sm"
                >
                  Deny Request
                </Button>
                <Button className="text-sm" loading={isApprovingRequest} onClick={() => approveRequest()}>
                  Approve Request
                </Button>
              </div>
            </div>
          ) : requestDetails?.creator_id === userProfile?.id ? (
            <div className="text-right px-7">
              <Button
                disabled={parseFloat(requestDetails?.approvalsLeft!) !== 0}
                onClick={() => {
                  setOpen?.(false);
                  setOpenWithdrawModal(true);
                  setShowPinStep(true);
                }}
              >
                Withdraw
              </Button>
            </div>
          ) : null}

          <Spacer className="h-8" />
        </div>
      </Modal>
    </>
  );
};
