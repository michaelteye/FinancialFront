import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import { Plus } from '@/components/icons';
import 'slick-carousel/slick/slick-theme.css';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { PaymentMethod } from '@/store/types';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import { UserPaymentMethod } from './components/user-payment-method';
import { AddPaymentMethod } from './components/add-payment-methods';

// ************************** main component ************************ //

export const PaymentMethods = () => {
  const [openAddPaymentMethod, setOpenAddPaymentMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>();
  const { data: paymentMethods, isFetchingUserPaymentMethods } = usePaymentMethods();

  // const paymentMethods = userProfile?.paymentMethods;

  if (isFetchingUserPaymentMethods) {
    return (
      <div className="w-full flex flex-col transform translate-y-4 flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <AddPaymentMethod
        open={openAddPaymentMethod}
        setOpen={() => {
          setOpenAddPaymentMethod(false);
          setSelectedPaymentMethod(undefined);
        }}
        paymentOption={selectedPaymentMethod}
      />

      <Spacer className=" h-8" />

      <h2 className=" font-sans font-medium text-2xl text-neutral-400">Payment methods</h2>

      <Spacer className=" h-7" />

      <div className="relative">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
          <button
            onClick={() => setOpenAddPaymentMethod(true)}
            className="lg:px-9 border border-neutral-100 bg-neutral-100 bg-opacity-50 rounded-xl h-72 min-h-56 sm:w-56 items-center hover:shadow-md transition duration-75 ease-linear"
          >
            <div className="flex flex-col space-y-2 items-center">
              <Plus />
              <p className="font-sans text-sm text-[#000] text-center">Add Payment method</p>
            </div>
          </button>
          {paymentMethods?.map((paymentMethod) => (
            <UserPaymentMethod
              key={paymentMethod.id}
              paymentMethod={paymentMethod}
              onClick={() => {
                setSelectedPaymentMethod(paymentMethod);
                setOpenAddPaymentMethod(true);
              }}
            />
          ))}
        </div>

        <Spacer className=" h-8" />
      </div>
    </>
  );
};
