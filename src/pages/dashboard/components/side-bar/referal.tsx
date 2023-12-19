import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import ReferalUrl from '@assets/images/dashboard-images/referal.png';
import { Link } from 'react-router-dom';

export const Referal = () => {
  return (
    <div className="flex flex-col bg-neutral-100 lg:py-5 py-3 items-center lg:mx-4 mx-6 rounded-xl">
      <img className="lg:w-40 lg:h-28 h-20" src={ReferalUrl} alt="image" />
      <p className="font-sans-body text-sm leading-5 text-neutral-400 text-center pt-3">
        Save and grow with your family and friends
      </p>

      <Spacer />
      <Link to="/dashboard/referrals">
        <Button className="py-2 px-4 text-sm" variant="primary">
          Refer a friend
        </Button>
      </Link>
    </div>
  );
};
