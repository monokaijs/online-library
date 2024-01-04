import 'iron-session';
import { AccountDocument } from '@/lib/models/account.model';

declare module 'iron-session' {
  interface IronSessionData {
    isLoggedIn?: boolean;
    account?: AccountDocument;
  }
}

