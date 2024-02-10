
type AccountStatus = 'not_verified' | 'verified' | 'banned';
interface Account {
  username: string;
  birthday: Date;
  role: import('@/lib/models/account.model').RoleEnum;
  googleId?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  identityNumber: string;
  password: string;
  gender: string;
  joinDate: Date;
  profilePicture: string;
  balance: number;
  address: string;
  status: AccountStatus;
}