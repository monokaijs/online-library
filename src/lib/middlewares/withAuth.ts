import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {withSessionRoute} from '@/lib/middlewares/withSession';
import {ApiError} from '@/lib/common/errors/api.error';
import httpStatus from 'http-status';
import {RoleEnum} from '@/lib/models/account.model';

export interface RequestAuthorization {
  method: string[];
  role?: RoleEnum;
}

export default function withAuth(fn: NextApiHandler, {method, role}: RequestAuthorization = {method: []}) {
  return withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = req.session;
    if (!session || !session.isLoggedIn || !session.account)
      throw new ApiError('UNAUTHORIZED', httpStatus.UNAUTHORIZED);

    if (method.includes(req.method!) && role && session.account.role !== RoleEnum.ADMIN && session.account.role !== role)
      throw new ApiError('FORBIDDEN', httpStatus.FORBIDDEN);

    return await fn(req, res);
  });
}

