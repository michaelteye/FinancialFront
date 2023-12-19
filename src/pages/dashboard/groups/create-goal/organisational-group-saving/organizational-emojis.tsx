import classNames from 'classnames';
import { useContext, useState, useEffect } from 'react';

import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';

import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/spinner';
import { RequestMethod, useApi } from '@/helpers/api';
import { CreateGroupSavingsGoalFormContext } from '../create-group-goal-context';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { GroupSavingsType, OrganizationalGroupSavingsSteps } from '../../lib/types';

interface Emoji {
  character: string;
  codePoint: string;
  group: string;
  slug: string;
  subGroup: string;
  unicodeName: string;
}

export const OrganizationalGoalEmojis: React.FC<{
  setOpenVerifymodal?: (open: boolean) => void;
  onNextClick?: () => void;
}> = ({ setOpenVerifymodal, onNextClick }) => {
  const navigate = useNavigate();
  const [emojiSearch, setEmojiSearch] = useState('');
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const { step, showPrevStep, showNextStep, setValue, form } = useContext(CreateGroupSavingsGoalFormContext);
  const { submit: getEmojis, isLoading: isGettingEmojis } = useApi(
    'https://emoji-api.com/emojis?access_key=24630984f5fc288dcc7fa55613d24806db202fdf',
    {
      method: RequestMethod.GET,
      onSuccess(response) {
        setEmojis(response.data);
      },
    }
  );

  useEffect(() => {
    getEmojis();
  }, []);

  useEffect(() => {
    setFilteredEmojis(
      emojis.filter((emoji) => {
        return [emoji.slug, emoji.codePoint, emoji.subGroup, emoji.group, emoji.unicodeName]
          .join('-')
          .match(emojiSearch);
      })
    );
  }, [emojiSearch]);

  if (step !== OrganizationalGroupSavingsSteps.SELECT_EMOJI || form?.nature !== GroupSavingsType.ORGANIZATIONAL) {
    return null;
  }

  return (
    <div>
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px]">Select a goal emoji</h1>

      <Spacer className="h-1" />

      <p className="font-sans text-[#000]">Please tell us how long you will like have this goal.</p>

      <Spacer className="h-4" />

      {selectedEmoji ? (
        <div>
          <p className="font-sans text-2xl text-neutral-900 ">{`Your goal Emoji is: ${selectedEmoji}`}</p>

          <Spacer className=" h-4" />
        </div>
      ) : null}

      <Input
        type="search"
        placeholder="Search an emoji"
        onChange={(event) => {
          setEmojiSearch(event.target.value);
        }}
      />

      <Spacer className="h-4" />

      {isGettingEmojis ? (
        <div className="flex items-center justify-center my-auto">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap h-[450px] overflow-y-auto ">
          {(emojiSearch ? filteredEmojis : emojis).map((emoji) => (
            <button
              key={emoji.unicodeName}
              className={classNames('w-10 h-10 rounded-2xl transition ease-linear hover:bg-neutral-200 mx-2', {
                'bg-neutral-200': selectedEmoji === emoji.character,
              })}
              onClick={() => {
                setSelectedEmoji(emoji.character);
                setValue('emoji', emoji.character);
              }}
            >
              {emoji.character}
            </button>
          ))}
        </div>
      )}

      <Spacer className="h-8" />

      <ActionButtons
        onNext={onNextClick}
        onPrevious={() => {
          showPrevStep();
        }}
      />
    </div>
  );
};
