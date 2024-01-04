import { withSessionSsr } from '@/lib/middlewares/withSession';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { SystemRole } from '@/lib/configs/auth.config';

type SsrHandler = (
  ctx: GetServerSidePropsContext
) => GetServerSidePropsResult<any> | Promise<GetServerSidePropsResult<any>>;

export const withAuthSsr = (fn: SsrHandler, roles: SystemRole[] = []) => {
  return withSessionSsr((ctx: GetServerSidePropsContext) => {
    if (roles.length > 0 && !ctx.req.session.isLoggedIn) {
      return {
        redirect: {
          permanent: false,
          destination: '/auth/login',
        },
      };
    }
    return fn(ctx);
  });
};

