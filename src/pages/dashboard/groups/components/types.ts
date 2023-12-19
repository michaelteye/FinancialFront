import { GroupSavingsType } from '../lib/types';

interface userProfile {
  _id?: string;
  user_id?: string;
  fullName?: string;
  momo?: string;
  gender?: string;
  username?: string;
  ref?: string;
  region?: string;
  level?: string;
  withdrawalLimit?: string;
  agree?: boolean;
  status?: string;
  network?: string;
  profilePic?: string;
  dateOfBirth?: string;
  gpsAddress?: string;
  homeAddress?: string;
  occupation?: string;
  depositLimit?: string;
  idNumber?: string;
  idPicture?: string;
  idType?: string;
  userPicture?: string;
}

export interface Members {
  _id?: string;
  group_id?: string;
  goal_id?: string;
  user_id?: string;
  admin_id?: string;
  createdAt?: string;
  role?: string;
  isCreator?: boolean;
  isSignatory?: boolean;
  user?: userProfile;
}

export interface GroupDetails {
  group: {
    creator_id: string;
    description: string;
    groupName: string;
    ref_id: string;
    status: string;
    updatedAt: string;
    _id: string;
  };
  isAdmin: boolean;
  totalGroupGoals: string;
  totalMembers: string;
  totalSavings: string;
  totalGroupBalance: string;
  totalWithdrawal: string;
}

export interface userGroup {
  goals?: string;
  totalBalance?: string;
  group?: {
    _id: string;
    groupName: string;
    createdAt: string;
    ref_id: string;
    status: string;
    description: string;
  };
  details?: {
    creator_id: string;
    description: string;
    groupName: string;
    ref_id: string;
    status: string;
    updatedAt: string;
    _id?: string;
  };
  members?: Members[];
  _id?: string;
}

export interface Transactions {
  _id?: string;
  responseCode?: string;
  transactionId?: string;
  responseMessage?: string;
  refNo?: string;
  amount?: string;
  transaction_type?: string;
  user_id?: string;
  group_id?: string;
  goal_id?: string;
  phoneNumber?: string;
  createdAt?: string;
}

export interface GroupTransactions {
  amount?: string;
  commission?: string;
  createdAt?: string;
  expectedGroupBalance?: string;
  expectedUserBalance?: string;
  group_id?: string;
  netAmount?: string;
  networkTransactionId?: string;
  oldGroupBalance?: string;
  oldUserBalance?: string;
  phoneNumber?: string;
  refNo?: string;
  responseCode?: string;
  responseMessage?: string;
  transactionId?: string;
  transaction_type?: string;
  updatedAt?: string;
  userProfile?: userProfile;
  user_id?: string;
  _id?: string;
}
export interface primaryDetails {
  accountName: string;
  accountNumber: string;
  account_type_id: string;
  balance: string;
  createdAt: string;
  status: string;
  updatedAt: string;
  user_id: string;
  _id: string;
}
export interface GroupGoalsData {
  account?: {
    accountName: string;
    accountNumber: string;
    accountType: string;
    balance: string;
    createdAt: string;
    goal_id: string;
    group_id: string;
    status: string;
    totalSavings: string;
    totalWithdrawal: string;
    updatedAt: string;
    _id: string;
  };
  details?: {
    _id: string;
    nature: string;
    goalName: string;
    frequency: string;
    group_id: string;
    lockSavings: boolean;
    amountToSave: string;
    amountToRaise: string;
    slots: string;
    startDate: string;
    started: boolean;
    status: string;
    emoji: string;
    subscriptionType: string;
    withdrawalFrequency: string;
    withdrawalPreference: string;
  };
  rotationalSlots?: [
    {
      _id?: string;
      position?: number;
      status?: string;
      group_id?: string;
      goal_id?: string;
      paid?: boolean;
      user_id?: string;
      payoutDate?: Date;
      amountToRaise?: number;
    }
  ];
  primaryAccount?: {
    accountName: string;
    accountNumber: string;
    account_type_id: string;
    balance: string;
    createdAt: string;
    status: string;
    updatedAt: string;
    user_id: string;
    _id: string;
  };
  amountToRaise?: string;
  amountToSave?: string;
  createdAt?: string;
  creator_id?: string;
  frequency?: string;
  goalName?: string;
  goalPeriod?: string;
  group_id?: string;
  lockSavings?: boolean;
  nature?: string;
  startDate?: string;
  status?: string;
  emoji?: string;
  isMember?: boolean;
  isCreator?: boolean;
  isSignatory?: boolean;
  signatories?: string;
  personalSavings?: {
    accountNumber: string;
    balance: string;
    createdAt: string;
  };
  subscriptionType?: string;
  totalMembers?: string;
  updatedAt?: string;
  _id?: string;
}
export interface CreateGroupSavingsForm {
  goalName?: string;
  accountType?: string;
  lockSavings?: boolean;
  goalPeriod?: string;
  description?: string;
  amountToSave?: string;
  frequency?: string;
  startDate?: Date;
  endDate?: Date;
  emoji?: string;
  nature?: GroupSavingsType;
  refId?: string;
  signatories?: number;
  slots?: number;
  subscriptionType?: 'general' | 'custom';
  withdrawalFrequency?: string;
  rotationalRefId?: string;
}

export interface WithdrawalRequests {
  amount?: string;
  approvalsLeft?: string;
  createdAt?: Date;
  creator_id?: string;
  goal_id?: string;
  group_id?: string;
  reason?: string;
  receiver_id?: string;
  status?: 'pending' | 'approved' | 'canceled' | 'completed';
  updatedAt?: string;
  _id?: string;
  receiverProfile?: userProfile;
}

export interface GroupModalLayoutprops {
  open?: boolean;
  action?: string;
  action2?: string;
  hideCancel?: boolean;
  bgColorStyle?: string;
  actionClick?: () => void;
  cancelAction?: () => void;
  headerText?: string | JSX.Element;
  setOpen?: (open: boolean) => void;
  isLoading?: boolean;
  buttonStyle?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface SettingMemberProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  memberInfo?: Members;
}
export interface ViewGroupModalProps {
  open?: boolean;
  bgColorStyle?: string;
  actionClick?: () => void;
  cancelAction?: () => void;
  setOpen?: (open: boolean) => void;
  isLoading?: boolean;
  buttonStyle?: string;
  invite: any;
}

export interface PayoutModalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  cancelAction?: () => void;
  selectedSlot?: SlotDetails;
  closeMainModal?: () => void;
}

export interface SlotDetails {
  _id?: string;
  position?: number;
  status?: string;
  group_id?: string;
  goal_id?: string;
  paid?: boolean;
  payoutDate?: Date;
  amountToRaise?: number;
  user_id?: string;
}

export interface WithdrawalRequestDetailProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  requestDetails?: WithdrawalRequests;
  signatories?: string;
  memberList: Members[];
}

export interface WithdrawalSlotProps {
  open?: boolean;
  fetchGoalDetails?: () => void;
  setOpen?: (open: boolean) => void;
  roatationalGoalDetails?: GroupGoalsData;
}
