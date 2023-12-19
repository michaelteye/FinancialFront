import SvgArrowLeftBig from '@/components/icons/ArrowLeftBig';
import SvgGoalReview from '@/components/icons/GoalReview';
import { Spacer } from '@/components/spacer';
import { Title } from '@/pages/dashboard/components/title';
import { useNavigate, useParams } from 'react-router-dom';

export const GroupGoalReview = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <Spacer className="h-4" />

      <div className="flex space-x-4">
        <button
          onClick={() => {
            navigate(`/dashboard/groups/${params.refId}`);
          }}
        >
          <SvgArrowLeftBig />
        </button>
        <Title title="Bezo group susu" />
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center  top-1/2 -translate-y-2/3 relative">
        <SvgGoalReview />
        <p className="font-bold text-sm font-sans text-[#000]">Organizational goal under review</p>

        <p className="text-sm font-sans-body text-[#000] text-center">
          Your goal is being reviewed by BezoSusu admins. <br />
          You will hear from us shortly.
        </p>
      </div>
    </>
  );
};
