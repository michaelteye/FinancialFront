import SvgArrowLeftBig from '@/components/icons/ArrowLeftBig';
import { Spacer } from '@/components/spacer';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from '@/pages/dashboard/components/title';
import { MemberList } from '../components/member-list';
import { GroupSavingDetails } from '../components/group-savings-details';
import { Arrow } from '@/components/icons';
import SvgReceipt2 from '@/components/icons/Receipt2';
import { Button } from '@/components/button';
import SvgSmallPlus from '@/components/icons/SmallPlus';
import { GroupActionButtons } from '../components/group-action-buttons';
import { GroupGoalsData } from '../components/types';
import { GroupGoalPages } from '../lib/types';

export const SplitPayInfo: React.FC<{ goalDetails: GroupGoalsData }> = () => {
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
        <Title title="School gate renovations" />
      </div>

      <Spacer className="h-8" />

      <div className="w-full">
        <GroupActionButtons goalPage={GroupGoalPages.SPLIT_AND_PAY} />
      </div>

      <Spacer className="h-5" />

      <div className="bg-[#FFF0ED] rounded-2xl py-8 px-12 flex flex-col savingsGoalFull">
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-0 ">
          <GroupSavingDetails title="Target Amount" description={`GHS 500`} />
          <GroupSavingDetails title="No. of group member" description={`4`} />
        </div>

        <Spacer className="h-10" />

        <div className=" flex flex-col space-y-2">
          <div className="flex lg:items-end flex-col lg:flex-row lg:space-x-2">
            <p className=" font-sans font-medium  text-3xl text-neutral-400">GHS 0.00</p>
            <p className=" font-sans font-medium text-neutral-400">(0/4 members Paid)</p>
          </div>

          <div className=" w-full h-[6px] rounded-full bg-white">
            <div className={` bg-green w-full h-full rounded-full`} style={{ width: `10px` }}></div>
          </div>
        </div>
      </div>

      <Spacer className="h-12" />

      <div className="flex flex-col lg:flex-row w-full rounded-xl px-4 py-2 bg-[#F3F2F8] border border-[#F3F2F8] lg:items-center lg:justify-between space-y-3 lg:space-y-0">
        <div className="flex space-x-3 items-center">
          <div>
            <SvgReceipt2 />
          </div>

          <p className="text-neutral-400 font-sans-body text-sm">
            Add your payment of <span className="font-semibold text-primary-400"> GHS60.00</span>
          </p>
        </div>

        <button onClick={() => {}} className="flex space-x-3">
          <p className="underline text-sm">Make payment</p>
          <Arrow />
        </button>
      </div>

      <Spacer className="h-12" />

      <h3 className="font-sans text-nuetral-400 text-xl font-medium">Goal Member List</h3>

      <Spacer className="h-4" />

      <div className="flex flex-col space-y-8 bg-[#F3F2F84D] bg-opacity-30 rounded-2xl border border-[#F3F2F8] p-8">
        <div className="flex justify-between items-center">
          <h4 className="text-[#000] font-sans text-sm">MEMBER LIST</h4>
          <Button onClick={() => {}} variant="secondary">
            <span className="flex lg:justify-between justify-center space-x-2 items-center">
              <SvgSmallPlus />

              <p className="">Add Members</p>
            </span>
          </Button>
        </div>

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="flex flex-col space-y-4  overflow-x-scroll lg:overflow-x-auto w-[800px] lg:w-full">
            <MemberList />
          </div>
        </div>
      </div>

      <Spacer className="h-8" />
    </>
  );
};
