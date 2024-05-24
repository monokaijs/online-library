import type { NextRequest } from "next/server";
import { getSession } from "./lib/utils/getSession";
import { RoleEnum } from "./lib/models/account.model";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (request.nextUrl.pathname.startsWith("/dashboard") && !session.signedIn) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard/manage") &&
    session.account?.role === RoleEnum.USER
  ) {
    return Response.redirect(new URL("/dashboard/forbidden", request.url));
  }
}
