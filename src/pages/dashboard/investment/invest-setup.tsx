import { Spacer } from '@/components/spacer';
import { SuccesModal } from '@/components/success-modal';
import { RequestMethod, useApi } from '@/helpers/api';
import React, { useEffect, useState } from 'react';
import { CreateSavingsGoalLayout } from '../savings/components/create-savings-goal-layout';
import { InvestContext } from './invest-ctx';
import { InvestAmount } from './invest-form/invest-amount';
import { InvestTypes } from './invest-form/invest-types';
import { InvestPin } from './invest-form/invest-pin';
import { InvestReview } from './invest-form/invest-review';
import { InvestErrorMessage } from './invest-form/invest-error';
import { ProgressBar } from './invest-form/progress-bar';
import { InvestLoading } from './invest-form/InvestLoading';
import { InvestPackages } from './invest-form/invest-packages';
import { useSearchParams } from 'react-router-dom';
import {
  InvestError,
  InvestFormValues,
  InvestmentData,
  InvestPackageValues,
  InvestSetupProps,
  InvestSteps,
} from './types';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/helpers/axios';
import { useAuthStore } from '@/store/auth';

export function resolveInvestErrorType(message: string) {
  if (message.match(/pin/)) {
    return InvestError.PIN;
  }

  return InvestError.UNKNOWN;
}

export const InvestSetup: React.FC<InvestSetupProps> = ({ open, setOpen, onSave }) => {
  const { accessToken } = useAuthStore();
  const [openPin, setOpenPin] = useState(false);
  const [error, setError] = useState<InvestError>();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [form, setForm] = useState<InvestFormValues>({});
  const [openInvestErr, setOpenInvestErr] = useState(false);
  const [step, setStep] = useState(InvestSteps.SELECT_TYPE);
  const [, setSearchParams] = useSearchParams();
  const [investTypes, setInvestTypes] = useState<InvestmentData[]>([]);
  const [investPackage, setInvestPackage] = useState<InvestPackageValues[]>([]);

  const { submit: fetchInvestTypes } = useApi('/investment-type', {
    onSuccess(response) {
      setInvestTypes(response.data.data.investmentType);
    },
    method: RequestMethod.GET,
  });

  const { data, isFetching: isFetchingPackages } = useQuery(
    ['packages', form.type?._id],
    () =>
      client.get(`/investment-packages?active=true&investmentType=${form.type?._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (step === InvestSteps.SELECT_TYPE) {
      fetchInvestTypes();
    }
    // if (step === InvestSteps.SELECT_PACKAGE && form.type?._id) {
    //   refetch();
    // }
  }, [step]);

  useEffect(() => {
    if (data) {
      setInvestPackage(data?.data.data.investmentPackages);
    }
  }, [data]);

  const { submit: InvestData, isLoading: investing } = useApi('/investment', {
    onSuccess() {
      setOpenSuccess(true);
      setOpenPin(false);
      onSave?.();
    },
    onError(error) {
      const message = error?.response?.data?.message;
      const errorType = resolveInvestErrorType(message);

      if (errorType === InvestError.PIN) {
        setStep(InvestSteps.PIN);
        setError(message);
        return;
      }

      setError(message);
      setOpenPin(false);
      setOpenPin(false);
      setOpenInvestErr(true);
    },
  });

  function onClose() {
    setOpen(false);
    setError(undefined);
    setForm({});
    setStep(InvestSteps.SELECT_TYPE);
    setSearchParams({});
  }

  function Invest() {
    InvestData({
      packageId: form.package?._id,
      amount: form.amount,
      pin: form.pin,
    });
  }

  return (
    <InvestContext.Provider value={{ step, setStep, form, setForm, setError, error, setOpen }}>
      <InvestLoading open={investing} />

      <InvestErrorMessage openErr={openInvestErr} setOpenErr={setOpenInvestErr} />

      <SuccesModal
        open={openSuccess}
        setOpen={setOpenSuccess}
        actionButtonProps={{
          children: 'View Investment',
          onClick() {
            setOpen(false);
            onSave?.();
          },
        }}
        message={`Your Bond investment payment of GHS ${form.amount} has been successfully processed. `}
        closeButtonProps={{
          onClick() {
            setOpenSuccess(false);
          },
          children: 'Done',
          variant: 'primary',
        }}
      />

      <InvestPin
        openPinModal={openPin}
        setOpenPinModal={setOpenPin}
        hideCancel
        onSubmit={Invest}
        submitting={investing}
      />

      <CreateSavingsGoalLayout
        open={open}
        hideGoBack={step === InvestSteps.SELECT_TYPE}
        closeModal={onClose}
        buttonPosition="sm:pb-16 py-0 sm:pb-0"
        title={form.package ? form.package.name : 'Start Investing'}
        showActionButtons={!!form.type}
        onNext={() => {
          if (step === InvestSteps.SELECT_TYPE) {
            setStep(InvestSteps.SELECT_PACKAGE);
          }

          if (step === InvestSteps.SELECT_PACKAGE) {
            setStep(InvestSteps.AMOUNT);
          }

          if (step === InvestSteps.AMOUNT) {
            setStep(InvestSteps.REVIEW);
          }
          if (step === InvestSteps.REVIEW) {
            setOpenPin(true);
            setOpen(false);
          }
        }}
        onNextProps={{
          disabled: (() => {
            if (step === InvestSteps.SELECT_TYPE) {
              return !form.type;
            }
            if (step === InvestSteps.SELECT_PACKAGE) {
              return !form.package;
            }
            if (step === InvestSteps.AMOUNT) {
              return !form.amount || !!error;
            }
          })(),
          children: 'Invest',
        }}
        onPrevious={() => {
          if (step === InvestSteps.SELECT_PACKAGE) {
            setStep(InvestSteps.SELECT_TYPE);
          }
          if (step === InvestSteps.REVIEW) {
            setStep(InvestSteps.AMOUNT);
          }
          if (step === InvestSteps.AMOUNT) {
            setStep(InvestSteps.SELECT_PACKAGE);
          }
        }}
      >
        <Spacer className="h-10" />
        <ProgressBar />
        <InvestPackages packages={investPackage} isfetching={isFetchingPackages} />
        <InvestAmount />
        <InvestReview />
        <InvestTypes investTypes={investTypes} />
      </CreateSavingsGoalLayout>
    </InvestContext.Provider>
  );
};
