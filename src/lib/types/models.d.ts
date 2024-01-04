interface Account {
  username: string;
  email: string;
  password?: string;
  birthday: string;
  joinDate?: Date;
  role: import('@/lib/models/account.model').RoleEnum;
  googleId?: string;
}
