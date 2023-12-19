import classNames from 'classnames';
import { useContext, useState, useEffect } from 'react';
import * as unicodeEmoji from 'unicode-emoji';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { ActionButtons } from '../components/action-buttons';
import { CreateSavingsAccountFormContext } from '../components/form-context';
import { CreateSavingsAccountFormSteps, Emoji } from '../helpers/types';

export const Emojis = () => {
  const [emojiSearch, setEmojiSearch] = useState('');
  // const [emojis, setEmojis] = useState<Emoji[]>([]);
  const emojis: Emoji[] = unicodeEmoji.getEmojis() || [];
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>([]);
  const { step, showPreviousStep, showNextStep, setValue } = useContext(CreateSavingsAccountFormContext);

  const cachedEmojis = localStorage.getItem('EMOJIS');

  // useEffect(() => {
  //   if (!cachedEmojis) {
  //     refetchEmojis();
  //     return;
  //   }

  //   setEmojis(JSON.parse(cachedEmojis));
  // }, []);

  useEffect(() => {
    setFilteredEmojis(
      emojis.filter((emoji) => {
        return [emoji.category, emoji.description].join('-').match(emojiSearch);
      })
    );
  }, [emojiSearch]);

  useEffect(() => {
    setValue('emoji', selectedEmoji);
  }, [selectedEmoji]);

  return (
    <div
      className={classNames({
        hidden: step !== CreateSavingsAccountFormSteps.EMOJIS,
        '': step === CreateSavingsAccountFormSteps.EMOJIS,
      })}
    >
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        Choose an Emoji for your goal{' '}
      </h1>

      {selectedEmoji ? (
        <div>
          <p className="font-sans text-2xl text-neutral-900 ">{`Your goal's Emoji is: ${selectedEmoji}`}</p>

          <Spacer className=" h-4" />
        </div>
      ) : null}

      {emojis.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center">
          <video width={300} height={300} autoPlay loop>
            <source src="/src/assets/videos/sad-emoji.mp4" />
          </video>

          <p className="text-center text-neutral-400 text-sm sm:w-3/4 w-full">
            Oops, no emojis at the moment, most probably due to unstable internet connections. Please proceed, but you
            can edit the goal and select your preferred emoji later.
          </p>
        </div>
      ) : (
        <div className="rounded-lg lg:border-none border-2 border-neutral-100">
          <Input
            type="search"
            placeholder="Search an emoji"
            onChange={(event) => {
              setEmojiSearch(event.target.value);
            }}
          />

          <Spacer className="h-4" />

          <div className="flex flex-wrap max-h-[28.13rem] border border-neutral-200 border-t-0 border-b-0 overflow-y-auto ">
            {(emojiSearch ? filteredEmojis : emojis)?.map(({ emoji, category }, idx) => (
              <button
                key={category + idx}
                className={classNames('w-10 h-10 rounded-2xl transition ease-linear hover:bg-neutral-200 mx-2', {
                  'bg-neutral-200': selectedEmoji === emoji,
                })}
                onClick={() => {
                  setSelectedEmoji(emoji);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      <Spacer className="h-8" />

      <ActionButtons
        onNext={() => {
          showNextStep();
          setValue('emoji', selectedEmoji);
        }}
        onPrevious={() => showPreviousStep()}
      />

      <Spacer className="h-24" />
      <Spacer className="h-10" />
    </div>
  );
};
