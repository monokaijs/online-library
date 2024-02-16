import {NODE_ENV} from "@/lib/configs/env";

export const sessionConfig = {
  cookieName: "ONLINE_LIBRARY",
  password: process.env.COOKIE_PASSWORD || "SAMPLE_PASSWORD_@()JIOFSDJIFJ91081920F()DJVXI:10~()#*!@)(*#)!@",
};

export enum SystemRole {
  ADMIN = 'admin',
}

