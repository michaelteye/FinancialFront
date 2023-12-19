import { AuthLayout } from '../../components/auth-layout';
import { PersonalDetails } from './personal-details';
import { AddressInformation, getValidDateOfBirth } from './address-information';
import { useState } from 'react';
import { ProfileForm, ProfileDetailContext } from './profile-context';
import { Survey } from './survey';
import { SetPassword } from '../set-password';
import { Terms } from './terms';

export const ProfileSetup = () => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<ProfileForm>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    occupation: '',
    homeAddress: '',
    gpsAddress: '',
    country: '',
  });

  const setValue = (key: keyof ProfileForm, value: any) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const showNextStep = () => {
    step < 4 ? setStep(step + 1) : null;
  };
  const showPrevStep = () => {
    setStep(step - 1);
  };

  return (
    <ProfileDetailContext.Provider
      value={{
        step,
        setStep,
        showNextStep,
        showPrevStep,
        form,
        setForm,
        setValue,
      }}
    >
      <AuthLayout
        className={`lg:pr-28 lg:pl-24 ${step === 3 || step === 4 ? 'login-main' : ''}`}
        illustrationTitle={step === 1 ? 'Save when you Spend ' : 'Send Money and Make Payments with Ease '}
        illustrationDescription={
          step === 1
            ? 'Get jaw-dropping discounts on purchases you spend your money at our partner brands.'
            : 'Use cool usernames to send money to your family and friends  and split payment with them at your favorite hangout spot.'
        }
      >
        <PersonalDetails />
        <AddressInformation />
        <Survey />
        <Terms />
        <SetPassword />
      </AuthLayout>
    </ProfileDetailContext.Provider>
  );
};
