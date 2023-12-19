import create, { SetState, State } from 'zustand';
import { Networks, NewUserProfile, PaymentMethod, WalletValue } from './types';

export const ACCESS_TOKEN_KEY = 'token';
const USER_DATA_KEY = 'user';
const LEGACY_AUTH_KEY = 'glassx';
export const REFRESH_TOKEN = 'refresh-token';

// export interface UserProfile {
//   firstName?: string;
//   lastName?: string;
//   fullName?: string;
//   dateOfBirth?: string;
//   occupation?: string;
//   createdAt?: string;
//   gender?: 'male' | 'female';
//   region?: Regions;x
//   ref?: string;
//   momo?: string;
//   profilePic?: string;
//   network?: string;
//   homeAddress?: string;
//   gpsAddress?: string;
//   depositLimit?: string;
//   rated?: boolean;
//   withdrawalLimit?: string;
//   social?: string;
//   status?: string;
//   updatedAt?: string;
//   userName?: string;
//   level?: 'beginner' | 'intermediate' | 'advance';
//   user_id?: string;
//   _id?: string;
// }

interface AuthStoreState extends State {
  phoneNumber: string;
  userId: string;
  userProfile: NewUserProfile;
  referralCode?: string;
  loggedIn?: boolean;
  defaultPaymentMethod?: PaymentMethod;
  accessToken?: string;
  selectedWallet: WalletValue;
  refreshToken?: string | null;
  pinSet?: boolean;
  stats?: {
    totalPrimaryBalance?: number;
    totalAccounts?: number;
    totalBalance?: number;
    totalDeposits?: number;
    totalSavingsBalance?: number;
    totalTransactions?: number;
    totalWithdrawals?: number;
  };
  notification: Notification[];
  notificationsOpen?: boolean;
}

interface AuthStoreStateMethods extends State {
  setUserId: (userId: string) => void;
  loading?: boolean;
  settingPassword?: boolean;
  noInitDeposit?: boolean;
  setReferralCode?: (referralCode: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setDefaultPaymentMethod?: (paymentMethod: PaymentMethod) => void;
  saveUserData?: (user: AuthStoreState['userProfile']) => void;
  authenticateUser: (accessToken: string, refreshToken: string, settingPassword?: boolean) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
  setNotification: (notification: Notification[]) => void;
  setUpdateProfile: (profileDetails: NewUserProfile) => void;
}

const getDefaultAuthState = () => {
  const legacyAuth = localStorage.getItem(LEGACY_AUTH_KEY);

  if (legacyAuth) {
    const { user, token } = JSON.parse(legacyAuth);

    if (user && token) {
      return { user, token };
    }
  }

  const userData = localStorage.getItem(USER_DATA_KEY);
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  console.log('the main userData is >>', userData);

  // if (userData && token) {
  //   return {
  //     user: JSON.parse(userData),
  //     token,
  //   };
  // }

  if (token) {
    return {
      token,
    };
  }

  return {};
};
// JSON.parse(localStorage.getItem(USER_DATA_KEY) || '{}')

async function removeUserDetails(set: SetState<AuthStoreState & AuthStoreStateMethods>) {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);

  set({
    accessToken: undefined,
    userProfile: {},
  });
}

const defaultAuthState = getDefaultAuthState();

export const useAuthStore = create<AuthStoreState & AuthStoreStateMethods>((set, get) => ({
  phoneNumber: '',
  notification: [],
  userId: '',
  loading: true,
  settingPassword: false,
  selectedWallet: {},
  userProfile: defaultAuthState.user,
  accessToken: defaultAuthState.token,
  refreshToken: localStorage.getItem(REFRESH_TOKEN),
  setNotification(notification: Notification[]) {
    set({
      notification,
    });
  },
  setUserId(userId: string) {
    set({
      userId,
    });
  },
  setReferralCode(referralCode: string) {
    set({
      referralCode,
    });
  },
  setPhoneNumber(phoneNumber: string) {
    set({
      phoneNumber,
    });
  },
  setUpdateProfile(profileDetails: AuthStoreState['userProfile']) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(profileDetails));
    set({
      userProfile: profileDetails,
    });
  },

  setDefaultPaymentMethod(paymentMethod: PaymentMethod) {
    set({
      defaultPaymentMethod: paymentMethod,
    });
  },
  saveUserData(user: AuthStoreState['userProfile']) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    set({
      userProfile: user,
    });
  },

  authenticateUser(accessToken: string, refreshToken: string, settingPassword?: boolean) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    set({
      accessToken,
      refreshToken,
      settingPassword,
    });
  },

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem('closeUpgrade');

    set({
      accessToken: undefined,
      userProfile: {},
    });
  },

  isAuthenticated() {
    return !!get().accessToken && !get().settingPassword;
  },
}));
