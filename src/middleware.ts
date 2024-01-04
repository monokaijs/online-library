import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getIronSession} from 'iron-session/edge';
import {sessionConfig} from '@/lib/configs/auth.config';

export const middleware = async (request: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(request, res, sessionConfig);
  const {isLoggedIn} = session;
  const currentRoute = request.nextUrl.pathname;
  if (
    currentRoute.startsWith('/_next') ||
    currentRoute.startsWith('/api') ||
    currentRoute.startsWith('/favicon.ico')
  ) return res;

  if (
    currentRoute.startsWith('/auth/login') ||
    currentRoute.startsWith('/auth/register')
  ) {
    if (isLoggedIn) {
      // when logged in, redirect to dashboard page
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } else {
    if (isLoggedIn) {
      if (!currentRoute.startsWith('/dashboard/create-profile')) {
        // when user does not have a profile, redirect them to create a new profile
        return NextResponse.redirect(
          new URL('/dashboard/create-profile', request.url)
        );
      }
    }
  }
  return res;
};
