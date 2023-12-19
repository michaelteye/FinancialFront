import { Spacer } from '@/components/spacer';
import WelcomeImage from '@assets/images/dashboard-images/welcome.png';

export const WelcomeDisplay = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={ WelcomeImage } alt="person standing on the mountain with a flag" />

      <Spacer className="mt-2" />

      <h1 className="font-sans text-neutral-700 text-3xl font-bold text-center" >Welcome to BezoSusu!</h1>

      <Spacer className="h-5" />

      <p className="text-neutral-600 text-center max-w-2xl font-sans-body">
        It’s great to have you here. We are Ghana’s premiere digital finance platform for the young at heart excited
        about saving and making smart money moves. Sounds like your kinda party? Complete the tasks below and we will
        set you up real quick.
      </p>
    </div>
  );
};
