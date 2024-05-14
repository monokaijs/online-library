
type AccountStatus = 'not_verified' | 'verified' | 'banned';
interface Account {
  _id?: any;
  username: string;
  birthday: Date;
  role: import('@/lib/models/account.model').RoleEnum;
  googleId?: string;
  fullName: string;
  email: string;
  userId: string;
  phoneNumber: string;
  identityNumber: string;
  password: string;
  gender: string;
  joinDate: Date;
  profilePicture: string;
  balance: number;
  address: string;
  status: AccountStatus;
  isDelete?: boolean;
}

interface AccountVerification {
  code: string;
  account: Account;
}
