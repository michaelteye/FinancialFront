import { BezoTranzactions } from '../../bezo-wallet/lib/types';

export interface TransactionDetailsProps {
  open?: boolean;
  transaction: NewTransaction;
  setOpen?: (open: boolean) => void;
}

export interface BezoTransactionDetailsProps {
  open?: boolean;
  transaction?: NewTransaction;
  setOpen?: (open: boolean) => void;
}

export interface NewTransaction {
  id: string;
  amount: string;
  userId: string;
  transactionId: string;
  userRef?: string;
  senderPhone: string;
  recipientPhone: string | null;
  fromAccountId: string | null;
  toAccountId: string | null;
  narration: string | null;
  transactionStatus: 'pending';
  platform: string;
  transactionData: {
    status: 'PENDING';
    message: string;
    reference: string;
  };
  transactionType: 'DEPOSIT';
  accountId: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface Transaction {
  _id?: string;
  user_id?: string;
  responseCode?: string;
  responseMessage?: string;
  uniwalletTransactionId?: string;
  networkTransactionId?: string;
  merchantId?: string;
  status?: string;
  productId?: string;
  refNo?: string;
  msisdn?: string;
  amount?: string;
  balance?: string;
  createdAt?: string;
  updatedAt?: string;
  transaction_type?: string;
}
