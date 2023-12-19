import React, { PropsWithChildren } from 'react';
import SvgClose from '@/components/icons/Close';
import { Button } from '@/components/button';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import SvgSuccess from '@/components/icons/Success';
import { ButtonProps } from '../button/button';
import SvgRocket from '../icons/Rocket';
import classNames from 'classnames';

interface DetailsProps {
  title: string;
  description: string;
}

const Details: React.FC<DetailsProps> = ({ title, description }) => {
  return (
    <div className=" flex flex-col justify-start">
      <p className=" font-sans text-sm text-[#AAB0C6] text-left">{title}</p>
      <p className=" font-sans font-semibold text-[#252525] pt-1 text-left">{description}</p>
    </div>
  );
};

interface TransactionDetailsProps {
  open?: boolean;
  message?: string | JSX.Element;
  title?: string;
  setOpen?: (open: boolean) => void;
  p2p?: boolean;
  hideActionButton?: boolean;
  closeVariant?: 'secondary' | 'primary' | 'tertiary';
  actionButtonProps?: PropsWithChildren<ButtonProps>;
  closeButtonProps?: PropsWithChildren<ButtonProps>;
}

export const SuccesModal: React.FC<TransactionDetailsProps> = ({
  open,
  setOpen,
  message,
  title = 'Hurray!',
  p2p,
  closeVariant = 'secondary',
  hideActionButton,
  actionButtonProps,
  closeButtonProps,
}) => {
  return (
    <Modal className="lg:w-[532px] max-w-[532px] rounded-2xl" open={open} setOpen={setOpen}>
      <div className="rounded-2xl flex flex-col w-full">
        <div className="rounded-t-2xl flex flex-col items-center bg-neutral-100 bg-opacity-60 py-9 relative">
          <div className="rounded-2xl">
            <button>
              <SvgClose className="absolute top-6 left-[475px]" onClick={() => setOpen?.(false)} />
            </button>
            <div className=" flex flex-col items-center">
              {p2p ? <SvgRocket /> : <SvgSuccess />}
              <p className=" text-success-300 font-sans font-semibold text-3xl">{title}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-neutral-100 flex justify-center p-9">
          <p className=" font-sans-body text-[#252525] text-center">{message}</p>
        </div>

        <Spacer className="h-4" />

        <div
          className={classNames(' flex  mx-8', {
            'justify-center': p2p,
            'justify-end': !p2p,
          })}
        >
          <div className=" flex space-x-4">
            {hideActionButton ? null : actionButtonProps ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setOpen?.(false);
                  actionButtonProps?.onClick?.();
                }}
              >
                {actionButtonProps?.children}
              </Button>
            ) : null}
            <Button
              variant={closeVariant}
              onClick={() => {
                setOpen?.(false);
                closeButtonProps?.onClick?.();
              }}
            >
              {closeButtonProps?.children || 'Close'}
            </Button>
          </div>
        </div>

        <Spacer className="h-4" />
      </div>
    </Modal>
  );
};
