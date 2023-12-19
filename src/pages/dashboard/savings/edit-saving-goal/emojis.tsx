import classNames from 'classnames';
import { useContext, useState, useEffect } from 'react';

import useEmojis from '@/hooks/useEmojis';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import * as unicodeEmoji from 'unicode-emoji';
import { ActionButtons } from '../components/action-buttons';
import { editSavingsGoalFormContext } from './edit-goal-context';
import { editSavingGoalSteps, Emoji } from '../helpers/types';

export const Emojis = () => {
  const { refetchEmojis } = useEmojis();
  // const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [emojiSearch, setEmojiSearch] = useState('');
  const emojis: Emoji[] = unicodeEmoji.getEmojis() || [];
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>([]);
  const { step, showPrevStep, showNextStep, setValue, form } = useContext(editSavingsGoalFormContext);

  // function getEmojis() {
  //   const cachedEmojis = localStorage.getItem('EMOJIS');

  //   if (cachedEmojis) {
  //     setEmojis(JSON.parse(cachedEmojis));

  //     return;
  //   }

  //   refetchEmojis();
  // }

  // useEffect(() => {
  //   getEmojis();
  // }, []);

  useEffect(() => {
    setFilteredEmojis(
      emojis.filter((emoji) => {
        return [emoji.category, emoji.description].join('-').match(emojiSearch);
      })
    );
  }, [emojiSearch]);

  return (
    <div
      className={classNames({
        hidden: step !== editSavingGoalSteps.EMOJI,
        '': step === editSavingGoalSteps.EMOJI,
      })}
    >
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">Emojis</h1>

      {form.emoji ? (
        <div>
          <p className="font-sans text-2xl text-neutral-900 ">{`Your goal Emoji is: ${form.emoji}`}</p>

          <Spacer className=" h-4" />
        </div>
      ) : null}

      {emojis.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center">
          <video width={300} height={300} autoPlay loop>
            <source src="/src/assets/videos/sad-emoji.mp4" />
          </video>

          <p className="text-center text-neutral-400 text-sm sm:w-3/4 w-full">
            Oops, no emojis at the moment. Please proceed, but you can edit the goal and select your preferred emoji
            later.
          </p>
        </div>
      ) : (
        <div className="">
          <Input
            type="search"
            // value={selectedEmoji}
            placeholder="Search an emoji"
            onChange={(event) => {
              setEmojiSearch(event.target.value);
            }}
          />

          <Spacer className="h-4" />

          <div className="flex flex-wrap max-h-[28.13rem] overflow-y-auto ">
            {(emojiSearch ? filteredEmojis : emojis).map(({ emoji, category }, idx) => (
              <button
                key={category + idx}
                className={classNames('w-10 h-10 rounded-2xl transition ease-linear hover:bg-neutral-200 mx-2', {
                  'bg-neutral-200': form.emoji === emoji,
                })}
                onClick={() => {
                  setValue('emoji', emoji);
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
        }}
        onPrevious={() => showPrevStep()}
      />
    </div>
  );
};
