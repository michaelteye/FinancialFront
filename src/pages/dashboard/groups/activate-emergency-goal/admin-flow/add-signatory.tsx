import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import SvgWarningCircle from '@/components/icons/WarningCircle';
import { activateSteps, useActivateContext } from '../activate-context';

export const AddSignatory = () => {
  const { step, setForm, form } = useActivateContext();

  if (step !== activateSteps.ADD_SIGNATORIES) {
    return null;
  }

  return (
    <div className="px-7">
      {form.signatories ? (
        <div className="p-3 bg-yellow bg-opacity-10 rounded-xl flex space-x-3 items-center">
          <div>
            <SvgWarningCircle className="text-yellow" />
          </div>

          <p className="font-sans-body font-semibold lg:text-sm text-xs text-neutral-400 text-left">
            Inorder to contribute to this goal you have to activate it by adding signatories.
          </p>
        </div>
      ) : null}

      <Spacer className="h-4" />

      <div className="flex flex-col text-left space-y-2">
        <p className="font-sans text-sm font-medium text-neutral-400">
          Add number of signatories you want for this goal
        </p>

        <p className="font-sans text-xs text-neutral-400">Please note that you cannot change this after now.</p>

        <Input
          placeholder="number of signatories: eg 3"
          mask="99"
          onChange={(event) => setForm({ ...form, signatories: event.target.value })}
        />
      </div>
    </div>
  );
};
