import create, { State } from 'zustand';

export interface Message {
  title: string;
  description?: string | JSX.Element;
  variant: 'success' | 'error' | 'danger';
}

interface MessagesStoreState extends State {
  message?: Message;
}

interface MessagesStoreMethods extends State {
  displayMessage: (message: Message) => void;
}

export const useMessagesStore = create<MessagesStoreState & MessagesStoreMethods>((set) => ({
  displayMessage(message: Message) {
    set({
      message,
    });

    setTimeout(() => {
      set({
        message: undefined,
      });
    }, 3000);
  },
}));
