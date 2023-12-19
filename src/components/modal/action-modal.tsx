import { Button } from '@/components/button';
import { ButtonProps } from '@/components/button/button';
import SvgClose from '@/components/icons/Close';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import SvgArrowRight from '../icons/ArrowRight';

interface ActionModalProps {
  heading?: string | ReactNode;
  open?: boolean;
  action?: string;
  loading?: boolean;
  className?: string;
  titleStyles?: string;
  hideCancel?: boolean;
  hideContinue?: boolean;
  modalWidth?: string;
  buttonposition?: string;
  goBackActionName?: string;
  spacerClass?: string;
  showGoBack?: boolean;
  hideHeader?: boolean;
  goBackChildren?: JSX.Element;
  actionButtonProps?: ButtonProps;
  goBackButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  setOpen?: (open: boolean) => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  open,
  action = 'Continue',
  setOpen,
  heading,
  children,
  className,
  goBackChildren,
  hideCancel,
  goBackActionName = 'go back',
  hideContinue,
  showGoBack,
  modalWidth = 'sm:max-w-[43.75rem] w-[95vw] sm:min-w-[34.37rem] ',
  loading,
  titleStyles,
  hideHeader,
  spacerClass,
  buttonposition = 'text-right',
  goBackButtonProps,
  actionButtonProps,
  cancelButtonProps,
}) => {
  const loadingStyles = (
    <div className="inline-flex  items-center">
      <div className=" h-4 w-4 rounded-full border border-t-white border-r-white border-primary-200 animate-spin mr-3"></div>
      <p> Loading ...</p>
    </div>
  );

  return (
    <Modal open={open} setOpen={setOpen} className={classNames(className, `rounded-2xl ${modalWidth}`)}>
      {hideHeader ? null : (
        <>
          <div
            className={`px-7 py-6 bg-neutral-100 lg:bg-opacity-50 flex lg:items-center items-start justify-between rounded-t-2xl`}
          >
            <p className={`lg:w-full w-5/6 text-left ${titleStyles}`}>{heading}</p>

            <button onClick={() => setOpen?.(false)}>
              <SvgClose />
            </button>
          </div>

          <Spacer className={classNames(spacerClass, '')} />
        </>
      )}

      <div className="lg:mt-0 mt-2 max-h-[420px] overflow-y-auto">{children}</div>

      <Spacer className="lg:h-7 h-5" />

      <div className={`${showGoBack ? `flex justify-between pl-7` : ''}`}>
        {showGoBack ? (
          <Button variant="secondary" className="px-4 py-3 text-left" {...goBackButtonProps}>
            {goBackChildren ? (
              goBackChildren
            ) : (
              <span className="flex">
                <SvgArrowRight className="mr-2" />
                {goBackActionName}
              </span>
            )}
          </Button>
        ) : null}

        <div className={`${buttonposition} px-7`}>
          <div className="inline-flex space-x-3">
            {hideCancel ? null : (
              <Button
                variant="secondary"
                className="px-4 py-3"
                onClick={() => {
                  setOpen?.(false);
                }}
                {...cancelButtonProps}
              >
                Cancel
              </Button>
            )}

            {hideContinue ? null : (
              <Button variant="primary" className="px-4 py-3" {...actionButtonProps}>
                {loading ? loadingStyles : action}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Spacer className="lg:h-7 h-5" />
    </Modal>
  );
};
