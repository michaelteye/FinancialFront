import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import { useState } from 'react';
import { Title } from '../components/title';
import { NoCouponsIlustration } from '@/components/icons';
import { ActionModal } from '@/components/modal/action-modal';
import { Input } from '@/components/input/input';
import { Message } from '@/pages/auth/components/error';
import { useApi } from '@/helpers/api';
import { useMessagesStore } from '@/store/messages';

export const Coupon = () => {
  const { displayMessage } = useMessagesStore();
  const [openApplyCouponModal, setOpenApplyCouponModal] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [coupon, setCoupon] = useState('');

  const { submit: redeemCoupon, isLoading: isRedeemingCoupon } = useApi('/coupons/redeem', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Coupon redeemed Successfully',
        variant: 'success',
      });
    },
    onError(error) {
      const Error = error?.response?.data.message;
      setCouponError(Error);
    },
  });

  return (
    <>
      <ActionModal
        open={openApplyCouponModal}
        setOpen={() => {
          setOpenApplyCouponModal(false);
          setCouponError('');
        }}
        modalWidth="max-w-[700px]"
        action="Redeem coupon"
        heading="Apply a coupon code"
        actionButtonProps={{
          onClick: () => {
            redeemCoupon({
              code: coupon,
            });
          },
          loading: isRedeemingCoupon,
        }}
      >
        <div className="text-left border-b border-b-[#ECF1F4] pb-10 mx-auto">
          <div className="px-7">
            {couponError ? (
              <>
                <Message emoji="😥" title={couponError} description="Please try again with an active and new coupon" />

                <Spacer className="h-4" />
              </>
            ) : null}

            <Input
              error={couponError}
              label="Coupon Code"
              placeholder="Enter coupon code here"
              onChange={(event) => {
                setCoupon(event.target.value);
                setCouponError('');
              }}
            />
          </div>
        </div>
      </ActionModal>

      <Title title="Coupon" />

      <Spacer className="h-6" />

      <div className="px-8 py-7 rounded-2xl bg-[#F3F2F8] sm:flex justify-between items-center">
        <div className="flex flex-col space-y-2 text-left">
          <p className="font-sans font-normal text-lg text-neutral-400">Coupons 🎉</p>
          <p className="font-sans font-normal text-sm text-neutral-400">Enjoy benefits from BezoSusu.</p>
        </div>

        <Button
          variant="primary"
          className="w-full sm:w-auto mt-5 sm:mt-auto"
          onClick={() => {
            setOpenApplyCouponModal(true);
          }}
        >
          Apply a coupon
        </Button>
      </div>

      <Spacer className="h-12" />

      <div className="flex flex-col justify-center items-center">
        <NoCouponsIlustration />

        <Spacer className="h-4" />

        <div className="flex flex-col space-y-3 items-center justify-center">
          <p className="font-sans text-[#000] text-sm font-bold">No applied coupons</p>
          <p className="font-sans-body text-[#000] text-sm text-center">
            Apply a coupon you’ve received to enjoy <br /> benefits from BezoSusu
          </p>

          <Button variant="tertiary" onClick={() => setOpenApplyCouponModal(true)}>
            Apply a coupon
          </Button>
        </div>

        <Spacer className="sm:hidden h-24" />
        <Spacer className="sm:hidden h-10" />
      </div>
    </>
  );
};
