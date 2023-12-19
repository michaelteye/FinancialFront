import SvgNoInvites from '@/components/icons/NoInvites';

export const NoInvites = () => {
  return (
    <>
      <div className="flex flex-col space-y-2 items-center justify-center">
        <SvgNoInvites />
        <p className="font-bold text-sm font-sans text-[#000]">No pending invitations</p>

        <p className="text-sm font-sans-body text-[#000] text-center">You have no pending group invitations.</p>
      </div>
    </>
  );
};

export const NoGroups = () => {
  return (
    <>
      <div className="flex flex-col space-y-2 items-center justify-center">
        <SvgNoInvites />
        <p className="font-bold text-sm font-sans text-[#000]">No Groups Created</p>

        <p className="text-sm font-sans-body text-[#000] text-center">You have no created groups yet</p>
      </div>
    </>
  );
};
