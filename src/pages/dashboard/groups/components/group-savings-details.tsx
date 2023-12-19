export const GroupSavingDetails: React.FC<{ title?: string; description?: string }> = ({ title, description }) => {
  return (
    <div className=" flex flex-col space-y-2">
      <p className=" font-sans text-[#878FAB] text-sm">{title}</p>
      <p className=" font-sans font-medium text-lg text-neutral-400">{description}</p>
    </div>
  );
};
