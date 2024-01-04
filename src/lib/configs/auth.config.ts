import {NODE_ENV} from "@/lib/configs/env";

export const sessionConfig = {
  cookieName: 'u2u_bio_v2',
  password: 'M@sterOkBio!#0fsda90dsfaxxjc$#@$#@$vkla23FFSDF',
  cookieOptions: {
    secure: NODE_ENV === 'production',
  },
};

export enum SystemRole {
  ADMIN = 'admin',
}

