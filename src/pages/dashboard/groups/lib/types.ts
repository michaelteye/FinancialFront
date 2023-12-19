import { NewUserProfile } from '@/store/types';
import { PendingInvites } from '../../tools/types';
import {
  CreateGroupSavingsForm,
  GroupDetails,
  GroupGoalsData,
  GroupTransactions,
  Members,
  primaryDetails,
  userGroup,
  WithdrawalRequests,
} from '../components/types';

export enum CreateSplitFormSteps {
  STEP_1 = 1,
  STEP_2 = 2,
}

export enum CreateGroupFormContextSteps {
  ABOUT_GROUP = 1,
  ADD_MEMBERS = 2,
}

export enum GroupSavingsType {
  DEFAULT = 'Default',
  SPLIT_AND_SHARE = 'SplitAndShare',
  ROTATIONAL = 'rotational',
  ORGANIZATIONAL = 'Organizational',
}

export enum GroupGoalPages {
  DEFAULT = 'default',
  SPLIT_AND_SHARE = 'splitShare',
  ROTATIONAL = 'rotational',
  SPLIT_AND_PAY = 'splitPay',
  ORGANIZATIONAL = 'organizational',
}
export enum GroupDetailsPage {
  ADMIN = 'Admin',
  DEFAULT = 'defaultGoal',
  SPLIT_AND_PAY = 'splitPay',
}

export enum ContributeSteps {
  SELECT_GOAL = 'SELECT_GOAL',
  FORM_DETAILS = 'FORM_DETAILS',
  PIN = 'PIN',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export enum withdrawalSteps {
  WITHDRAWAL_REQUEST = 1,
  WITHDRAWAL_DETAILS = 2,
  WITHDRAWAL_PIN = 3,
  LOADING = 4,
  ERROR = 5,
}

export enum withdrawalError {
  PIN = 'PIN',
  AMOUNT = 'AMOUNT',
  UNKNOWN = 'UNKOWN',
}

export enum ContributeError {
  PIN = 'PIN',
  AMOUNT = 'AMOUNT',
  UNKNOWN = 'UNKOWN',
}

export enum DefaultGroupSavingsSteps {
  SAVING_GOALS_DETAILS = 1,
  SAVINGS_DURATION = 2,
  SELECT_EMOJI = 3,
}

export enum SplitandShareGroupSavingsSteps {
  SAVING_GOALS_DETAILS = 1,
  SAVINGS_DURATION = 2,
  SELECT_EMOJI = 3,
}

export enum RotationalGroupSavingsSteps {
  SAVING_GOALS_DETAILS = 1,
  SAVINGS_DURATION = 2,
  SELECT_EMOJI = 3,
  SELECT_WITHDRAWAL_DATE = 4,
}
export enum OrganizationalGroupSavingsSteps {
  SAVING_GOALS_DETAILS = 1,
  SAVINGS_DURATION = 2,
  ADVANCE_OPTION = 3,
  SELECT_EMOJI = 4,
}

export interface ContributeFormContext {
  pin?: string;
  amount?: string;
  goalId?: string;
  groupRefId?: string;
  paymentType?: 'mtn' | 'primary';
}

export interface GroupSavingsDetailsRatingsRowProps {
  groupGoal: GroupGoalsData;
  isFavorite?: boolean;
  groupRefId?: string;
  members?: Members[];
  isAdmin?: boolean;
  onFavorite?: (paramaters: any) => void;
}

export interface WithdrawalSetupProps {
  open?: boolean;
  requestData?: WithdrawalRequests;
  goalData?: GroupGoalsData;
  setPinStep?: boolean;
  fetchPayouts?: () => void;
  setOpen?: (open: boolean) => void;
}

export interface ContributeProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  groups?: userGroup[];
  groupGoals?: GroupGoalsData[];
  goalPrimaryDetails?: primaryDetails;
  goalDetails?: GroupGoalsData;
}

export interface Pagination {
  page?: number | string;
  total?: number;
  totalPages?: number | string;
}
export interface ContributeContextValue {
  errorMessage?: string;
  step: ContributeSteps;
  error?: ContributeError;
  form: ContributeFormContext;
  action?: 'contribute';
  groups?: userGroup[];
  groupGoals: GroupGoalsData[];
  selectedGroupGoal?: GroupGoalsData;
  setOpen?: (open: boolean) => void;
  setStep: (step: ContributeSteps) => void;
  setError?: (error?: ContributeError) => void;
  setErrorMessage?: (message?: string) => void;
  setForm: (form: ContributeFormContext) => void;
  setSelectedGroupGoal?: (selectedGroupGoal?: GroupGoalsData) => void;
}

export interface CreateSplitForm {}

export interface CreateSplitFormContextValue {
  step?: number;
  setStep?: (step: number) => void;
  form?: CreateSplitForm;
  setForm?: (form: CreateSplitForm) => void;
  showNextStep: () => void;
  showPrevStep: () => void;
  setValue?: (key: keyof CreateSplitForm, value: any) => void;
}

export interface WithdrawalFormData {
  goal?: string;
  group?: string;
  amount?: string;
  pin?: string;
  reason?: string;
  receiver?: string;
}

export interface withdrawalContextValue {
  error?: withdrawalError | string;
  step: withdrawalSteps;
  form: WithdrawalFormData;
  setPinStep?: boolean;
  setOpen?: (open: boolean) => void;
  setError?: (error?: withdrawalError | string) => void;
  setStep?: (step: withdrawalSteps) => void;
  setForm: (form: WithdrawalFormData) => void;
}

export interface createGroupForm {
  groupName?: string;
  description?: string;
  phoneNumbers?: string[];
}

export interface groupData {
  _id: string;
  creator_id: string;
  groupName: string;
  ref_id: string;
  status: string;
  description: string;
}

export interface CreateGroupFormContextValue {
  step?: number;
  setStep?: (step: number) => void;
  form?: createGroupForm;
  setForm?: (form: createGroupForm) => void;
  showNextStep: () => void;
  showPrevStep: () => void;
  setValue?: (key: keyof createGroupForm, value: any) => void;
}

export interface CreateGroupProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onSave?: () => void;
}

export interface AddMembersProps {
  groupName?: string;
  closeModal?: () => void;
  fetchInvites?: () => void;
}

export interface GoalTypeProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
  onClick?: () => void;
  description?: string;
}

export interface CreateGroupSavingsAccountFormContextValue {
  step?: number;
  stepChange?: boolean;
  showNextStep: () => void;
  showPrevStep: () => void;
  setStepChange?: (stepChange: boolean) => void;
  form?: CreateGroupSavingsForm;
  setStep?: (step: number) => void;
  setForm?: (form: CreateGroupSavingsForm) => void;
  setValue: (key: keyof CreateGroupSavingsForm, value: any) => void;
}

export interface CreateSavingGoalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  fetchSavingGoals?: () => void;
}

export interface AllGroupsRowProps {
  group?: userGroup;
  groupMembers?: groupMembers[];
  onFavorite?: (data: any) => void;
  isFavorite?: boolean;
}

export interface TransactionButtonProps {
  state?: 'pending' | 'approved' | 'canceled' | 'completed' | 'success' | 'failed' | '';
  isSignatory?: boolean;
}
export interface GroupTransactionDetailsProps {
  open?: boolean;
  transaction?: GroupTransactions;
  setOpen?: (open: boolean) => void;
}

export interface GroupInvitesRowProps {
  pendingInvite?: PendingInvites;
  fetchInvites?: () => void;
  fetchGroups?: () => void;
  groupMembers?: groupMembers[];
}
export interface DropDownProps {
  id?: string;
  open?: boolean;
  label?: string;
  subLabel?: string;
  setOpen?: (open: boolean) => void;
  onChange?: (selectedName?: string[]) => void;
  names?: string[];
  noIcon?: boolean;
}

export interface EditGroupProps {
  open?: boolean;
  groupName?: string;
  fetchGroupDetails?: () => void;
  setOpen?: (open: boolean) => void;
}

export interface GroupActionButtonsProps {
  disabled?: boolean;
  editGroupName?: string;
  isAdmin?: boolean;
  goalPage?: GroupGoalPages;
  groupDetails?: GroupDetails;
  groupPage?: GroupDetailsPage;
  fetchGroupDetails?: () => void;
  infoClick?: () => void;
  userGroups?: userGroup[];
  goalData?: GroupGoalsData;
  fetchPayouts?: () => void;
  goalPrimaryDetails?: primaryDetails;
  groupGoals?: GroupGoalsData[];
}
export interface groupMembers {
  _id?: string;
  group_id?: string;
  user_id?: string;
  admin_id?: string;
  createdAt?: string;
  profile?: NewUserProfile;
}
export interface SavingsListCardsProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  userGroupData?: userGroup;
  className?: string;
  groupMembers?: groupMembers[];
}

export interface WithdrawalRequestRowProps {
  request?: WithdrawalRequests;
  signatories?: string;
  memberList: Members[];
  isSignatory?: boolean;
}

export interface MemberListProps {
  memberInfo?: Members;
  groupName?: string;
  goalName?: string;
  fetchPendingInvites?: () => void;
  isAdmin?: boolean;
  isCreator?: boolean;
}
export interface GroupMemberDetailsProps {
  title?: string;
  description?: string;
  status?: boolean;
}
