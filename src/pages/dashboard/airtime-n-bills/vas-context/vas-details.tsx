import { fetch } from '@/helpers/fetch';
import { Spacer } from '@/components/spacer';
import { useVasContext } from './vas-context';
import { Input } from '@/components/input/input';
import { useQuery } from '@tanstack/react-query';
import { VasSteps, VasTypes } from '../lib/types';
import { Select, SelectOption } from '@/components/input/select';
import { PhoneNumberInput } from '@/components/input/phone-number-input';
import { Spinner } from '@/components/spinner';
import { getValidPhoneNumberFromMask } from '@/pages/auth/login/login';
import { useAuthStore } from '@/store/auth';

const dataOptions: SelectOption[] = [
  {
    label: '48.10 MB ( GHS 1 )',
    value: '48.10 MB ( GHS 1 )',
  },
  {
    label: '471.70 MB ( GHS 3 )',
    value: '471.70 MB ( GHS 3 )',
  },
  {
    label: '971.82 MB ( GHS 10 )',
    value: '971.82 MB ( GHS 10 )',
  },
];

const dataPackage = [
  {
    label: ' Data',
    value: ' Data',
  },
  {
    label: 'Flexy Data',
    value: 'Flexy Data',
  },
  {
    label: 'Social media bundle',
    value: 'Social media bundle',
  },
];

interface VasFormFields {
  fieldLabel: string;
  fieldName: string;
  fieldType: string;
  selectOptions?: {};
}

export const VasDetails = () => {
  const { step, selectedBiller, setValue, form } = useVasContext();

  const { data: billerForm, isLoading: isFetchingForm } = useQuery<VasFormFields[]>(
    ['billers-form-details', selectedBiller?.id],
    async () => {
      const response = await fetch(`/users/vas/getFormFields/${selectedBiller?.id}`);
      return response?.data;
    },
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  // function DataTypeDetails() {
  //   return (
  //     <>
  //       <PhoneNumberInput
  //         label="Recipient phone number"
  //         labelClassName="text-sm font-medium"
  //         onChange={(event) => console.log(event.target.value)}
  //       />

  //       <Spacer className="h-6" />

  //       <Select label="Select A Package" options={dataPackage} placeholder="select a package" />

  //       <Spacer className="h-6" />

  //       <Select label="Select amount" options={dataOptions} placeholder="select an amount" />
  //     </>
  //   );
  // }

  // function UtitityTypeDetails() {
  //   return (
  //     <>
  //       <Spacer className="h-6" />

  //       <Input label="Enter account number" />

  //       <Spacer className="h-6" />

  //       <Input label="Enter amount to pay for" prefix="GHS" placeholder="eg. 10.00" />
  //     </>
  //   );
  // }

  const phoneInput = billerForm?.filter((form) => form.fieldLabel === 'Phone Number') || [];
  const notPhoneInput = billerForm?.filter((form) => form.fieldLabel !== 'Phone Number') || [];

  // set phone Input as the first displaying input

  const billerFormOrder = new Array(...phoneInput!, ...notPhoneInput!);

  if (isFetchingForm) {
    return (
      <div className="flex items-center justify-center h-3/5">
        <Spinner />
      </div>
    );
  }

  if (step !== VasSteps.DETAILS) {
    return null;
  }

  return (
    <div>
      <Spacer className="h-8" />

      <p className="text-neutral-400 font-sans text-3xl">Enter the data purchase details</p>

      <Spacer className="h-8" />

      {billerFormOrder?.map((billerForm, idx) => {
        if (billerForm.fieldLabel === 'Phone Number') {
          return (
            <div key={idx}>
              <PhoneNumberInput
                //@ts-ignore
                // value={form?.[billerForm.fieldName]}
                // value={form?.[billerForm?.fieldName] ? form[billerForm.fieldName] : userProfile.phone}
                value={form?.[billerForm?.fieldName]}
                onChange={(e) => setValue?.(billerForm.fieldName, getValidPhoneNumberFromMask(e.target.value))}
              />
              <Spacer className="h-5" />
            </div>
          );
        }

        if (billerForm.fieldLabel === 'Network') {
          return (
            <div key={'Network: ' + idx}>
              <Input
                label={billerForm.fieldLabel}
                //@ts-ignore
                type={billerForm.fieldType}
                readOnly
                value={selectedBiller?.name}
              />
              <Spacer className="h-5" />
            </div>
          );
        }

        if (billerForm.fieldLabel === 'Amount') {
          return (
            <div key={'Amout: ' + idx}>
              <Input
                label={billerForm.fieldLabel}
                //@ts-ignore
                type={billerForm.fieldType}
                onChange={(e) => setValue?.('amount', Number(e.target.value))}
              />
              <Spacer className="h-5" />
            </div>
          );
        }

        return (
          <div key={billerForm.fieldLabel + idx}>
            <Input
              label={billerForm.fieldLabel}
              //@ts-ignore
              type={billerForm.fieldType}
              onChange={(e) => setValue?.(billerForm.fieldName, e.target.value)}
            />

            <Spacer className="h-5" />
          </div>
        );
      })}
    </div>
  );
};
