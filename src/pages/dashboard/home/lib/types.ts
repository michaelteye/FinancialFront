import { PendingInvites } from '../../tools/types';

export interface PendingInviteProps {
  open?: boolean;
  setOpen?: (open?: boolean) => void;
  pendingInvites?: PendingInvites[];
}

export interface FinanceDetailProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  amountDescription: string;
  amount?: number | string;
}

export interface TransactionDetails {
  icon: React.ReactNode;
  text: {
    title: string;
    transactionDate: string;
    status?: string;
  };
  amount: string;
}
