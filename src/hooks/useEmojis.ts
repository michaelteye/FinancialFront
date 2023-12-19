import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Emoji } from 'unicode-emoji';

const useEmojis = () => {
  const {
    data: emojis,
    isFetching: isFetchingEmojis,
    refetch: refetchEmojis,
    isError,
  } = useQuery<Emoji[]>(
    ['emojis'],
    async () => {
      const response = await axios.get(
        `https://emoji-api.com/emojis?access_key=24630984f5fc288dcc7fa55613d24806db202fdf`
      );

      return response?.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
    }
  );

  emojis ? localStorage.setItem('EMOJIS', JSON.stringify(emojis)) : null;

  return { emojis, isFetchingEmojis, refetchEmojis, isError };
};

export default useEmojis;
