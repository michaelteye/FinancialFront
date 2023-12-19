export const resolveTransactionType = (transactionType: any) => {
  if (transactionType === 'debit') {
    return 'Deposit';
  }
  if (transactionType === 'direct debit') {
    return 'Auto Deposit';
  }
  if (transactionType === 'credit') {
    return 'Withdrawal';
  }
};

export const resolveBezoTransactionType = (transactionType: any) => {
  if (transactionType === 'debit') {
    return 'Deposit';
  }
  if (transactionType === 'direct debit') {
    return 'Auto Deposit';
  }
  if (transactionType === 'credit') {
    return 'Withdraw';
  }
};

export const resolveTransactionStatus = (status?: string) => {
  if (status === 'pending') {
    return 'pending';
  }

  if (status?.toLowerCase() === 'success' || status?.toLowerCase() === 'successful') {
    return 'success';
  }

  return 'failure';
};

export function resolveTypeName(tabType: 'all' | 'debit' | 'credit') {
  if (tabType === 'all') {
    return 'transactions';
  }

  if (tabType === 'credit') {
    return 'withdrawals';
  }

  if (tabType === 'debit') {
    return 'deposits';
  }
}
