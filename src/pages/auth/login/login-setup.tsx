import Login from './login';
import { useState } from 'react';
import { LoginPassword } from './login-password';
import { AuthLayout } from '../components/auth-layout';
import { LoginContext, LoginSteps } from './login-context';
import LoginVerification from './login-verification';
import { ResetPassword } from './reset-password';

export const LoginSetup = () => {
  const [step, setStep] = useState<LoginSteps>(LoginSteps.PHONE);

  function resolveText(step: LoginSteps) {
    if (step === LoginSteps.PHONE) {
      return {
        title: 'Watch your Money Grow',
        description:
          'Earn the best interest rates on your savings on a monthly basis and explore investment products to further grow your savings.',
      };
    }
    if (step === LoginSteps.PASSWORD) {
      return {
        title: 'Track your Transactions in real - time.',
        description: 'See all your money moves every step of the way as you reach your savings goals.',
      };
    }
    if (step === LoginSteps.VERIFY) {
      return {
        title: 'Build a Great Savings Habit',
        description:
          'Auto - lock enables you to keep your savings locked whilst savings to avoid impulsive withdrawals. Track your transactions in real - time.',
      };
    }
    if (step === LoginSteps.RESET) {
      return {
        title: 'Send Money and Make Payments with Ease ',
        description:
          'Use cool usernames to send money to your family and friends  and split payment with them at your favorite hangout spot.',
      };
    }
  }

  return (
    <LoginContext.Provider value={{ step, setStep }}>
      <AuthLayout illustrationDescription={resolveText(step)?.description} illustrationTitle={resolveText(step)?.title}>
        <Login />
        <LoginPassword />
        <LoginVerification />
        <ResetPassword />
      </AuthLayout>
    </LoginContext.Provider>
  );
};
