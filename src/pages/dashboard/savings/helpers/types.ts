import { LockTypes } from '../../tools/types';
import { ButtonProps } from '@/components/button/button';
import { streakData } from '../../components/helpers/types';
import { AccountTypesValues } from '@/hooks/useAccountTypes';
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';

export enum ActionTypes {
  BEZOWALLETWITHDRAW = 'bezoWalletWithdraw',
  BEZOWALLETTOPUP = 'bezoWalletTopup',
  TOPUP = 'topup',
  WITHDRAW = 'withdraw',
}

// export enum CreateSavingsAccountFormSteps {
//   SELECT_GOAL_TYPE = 1,
//   LOCK_TYPE = 2,
//   NAME_OF_SAVINGS_ACCOUNT = 3,
//   GOAL_TARGET_PLAN = 4,
//   DURATION = 5,
//   EMOJIS = 6,
//   REVIEW = 7,
//   USER_PIN = 8,
// }

export enum CreateSavingsAccountFormSteps {
  SELECT_GOAL_TYPE = 1,
  LOCK_TYPE = 2,
  NAME_OF_SAVINGS_ACCOUNT = 3,
  GOAL_TARGET_PLAN = 4,
  DURATION = 5,
  EMOJIS = 6,
  REVIEW = 7,
  USER_PIN = 8,
}

export enum editSavingGoalSteps {
  GOAL_DETAILS = 1,
  EMOJI = 2,
  REVIEW = 3,
}

export enum OperationsSteps {
  SELECT_GOAL = 'SELECT_GOAL',
  FORM_DETAILS = 'FORM_DETAILS',
  PIN = 'PIN',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export enum OperationsError {
  PIN = 'PIN',
  AMOUNT = 'AMOUNT',
  UNKNOWN = 'UNKOWN',
  UPGRADE_ERROR = 'Your withdrawal limit has exceeded for the day',
}

export interface SavingGoalType {
  status: boolean;
  description: string | null;
  name: string;
  type: 'account';
  id: string;
}

export interface EditSavingsGoalFormContextValue {
  step: editSavingGoalSteps;
  setStep: (step: number) => void;
  showNextStep: () => void;
  showPrevStep: () => void;

  form: SavingsGoalForm;
  setForm: Dispatch<SetStateAction<SavingsGoalForm>>;
  setValue: (key: keyof SavingsGoalForm, value: any) => void;
}

export interface UserPinProps {
  openPinModal?: boolean;
  onSubmit?: () => void;
  error?: string;
  form?: SavingsGoalForm;
  submitting?: boolean;
  message?: string;
  onChange?: (pin: string) => void;
  setOpenPinModal: (open: boolean) => void;
  hideCancel?: boolean;
}

export interface SavingsGoalTypeInterface {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface SavingGoalAccount {
  accountName: string;
  name: string;
  accountNumber: string;
  account_type_id: string;
  amountWithdrawn?: string;
  balance: string;
  createdAt: string;
  status: 'active' | 'pending';
  updatedAt: string;
  user_id: string;
  walletId: string;
  accountTypeId: string;
  id: string;
}

export interface SavingGoalInterest {
  _id: string;
  account_id: string;
  user_id: string;
  oldBalance: string;
  newBalance: string;
  interest: string;
  interestAdded: string;
}

export interface ActionButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onNextProps?: ButtonProps;
  position?: string;
  onPreviousProps?: ButtonProps;
  loading?: boolean;
  hideCancel?: boolean;
  continueText?: string;
  loadingText?: string;
  padding?: string;
  hideContinue?: boolean;
  disabledContinue?: boolean;
}

export interface CreateSavingsGoallayoutProps {
  open?: boolean;
  closeModal?: () => void;
  buttonPosition?: string;
  onNextProps?: PropsWithChildren<ButtonProps>;
  onNext?: () => void;
  onPrevious?: () => void;
  hideGoBack?: boolean;
  onPreviousProps?: PropsWithChildren<ButtonProps>;
  showActionButtons?: boolean;
  title?: string;
  width?: string;
}

export interface SavingGoal {
  id: string;
  accountId: string;
  amountToRaise: string;
  amountToSave: string;
  amount: string;
  createdAt: string;
  preference: 'manual' | 'automatic';
  goalType: SavingGoalType;
  endDate: string;
  period: number;
  frequency: string;
  goalPeriod: string;
  isFavorite: boolean;
  lockSaving: string;
  emoji: string;
  refNo: string;
  savingGoal: string;
  name: string;
  startDate: string;
  status: string;
  updatedAt: string;
  user_id: string;
  account?: SavingGoalAccount;
  interest?: SavingGoalInterest;
  accountTypeName?: LockTypes;
  accountTypeAlias?: string;
}

export interface SavingsGoalForm {
  goalType?: string;
  goalName?: string;
  savingGoalName?: string;
  lockSavings?: boolean;
  goalTypeId?: string;
  accountType?: AccountTypesValues;
  startDate?: Date;
  endDate?: Date;
  emoji?: ReactNode;
  goalPeriod?: string | number;
  amountToSave?: string;
  frequencyType?: string;
  acceptsInterest?: 'Yes' | 'No';
  frequency?: string;
  amountToRaise?: string;
  depositPreference?: 'manual' | 'automatic';
  user?: string;
  userPin?: string;
  category?: "MOMO" | "BEZOPRIMARY"
}

export interface CreateSavingsAccountFormContextValue {
  step: CreateSavingsAccountFormSteps;
  setStep: (step: number) => void;
  showNextStep: () => void;
  showPreviousStep: () => void;
  setSubmitting?: (submitting: boolean) => void;
  setOpen?: (open: boolean) => void;
  submitting?: boolean;
  form: SavingsGoalForm;
  setForm: Dispatch<SetStateAction<SavingsGoalForm>>;
  setValue: (key: keyof SavingsGoalForm, value: any) => void;
}

export interface TopupWithdrawButtonsProps {
  topUpChild?: string;
  removeWithdraw?: boolean;
  removeIcon?: boolean;
  noMobileChange?: boolean;
  bezoWalletFund?: boolean;
  fetchBezoTransactions?: () => void;
  fetchUserStats?: () => void;
}

export interface EditSavingGoalFormProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  savingGoalData?: SavingGoal;
  openCloseGoal?: (open: boolean) => void;
}

export interface Emoji {
  category: string;
  description: string;
  emoji: string;
  group: string;
  keywords: string[];
  subgroup: string;
  version: string;
}

export interface OperationsFormContext {
  pin?: string;
  amount?: string;
  streakDay?: string;
  paymentType?: 'primary' | 'momo' | 'visa';
}

export interface OperationsContextValue {
  errorMessage?: string;
  step: OperationsSteps;
  streak?: boolean;
  error?: OperationsError;
  form: OperationsFormContext;
  newUserTopUp?: boolean;
  action?: ActionTypes;
  selectedGoal?: SavingGoal;
  savingGoals?: SavingGoal[];
  setOpen?: (open: boolean) => void;
  setStep: (step: OperationsSteps) => void;
  setError: (error?: OperationsError) => void;
  setErrorMessage?: (message?: string) => void;
  setForm: (form: OperationsFormContext) => void;
  setSelectedGoal?: (selectedGoal?: SavingGoal) => void;
}

export interface OperationsForm {
  open?: boolean;
  savingGoals?: SavingGoal[];
  setOpen?: (open: boolean) => void;
  streak?: boolean;
  selectedSavingGoal?: SavingGoal;
  newUserTopUp?: boolean;
  streakValues?: streakData[];
  bezoWalletFund?: boolean;
  fetchStreakData?: () => void;

  action?: ActionTypes;
}

export interface SavingsListCardsProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  savingGoal: SavingGoal;
  className?: string;
}

export interface CreateSavingsGoalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onTopup?: () => void;
  onSave?: () => void;
  hideContinue?: boolean;
}

export interface ReviewProps {
  hideContinue?: boolean;
  savingGoalReview: SavingGoal;
  setUserPinModalOpen?: (open: boolean) => void;
}

export interface DetailProps {
  label?: string;
  value?: string;
  labelStyle?: string;
  valueStyle?: string;
}
