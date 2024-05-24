import type { NextRequest } from "next/server";
// import { RoleEnum } from "./lib/models/account.model";
// import { getSession } from "./lib/utils/getSession";

export async function middleware(request: NextRequest) {
  // const session = await getSession();
  //   if (request.nextUrl.pathname.startsWith("/dashboard") && !session.signedIn) {
  //     return Response.redirect(new URL("/auth/login", request.url));
  //   }
  //   if (
  //     request.nextUrl.pathname.startsWith("/dashboard/manage") &&
  //     session.account?.role === RoleEnum.USER
  //   ) {
  //     return Response.redirect(new URL("/dashboard/forbidden", request.url));
  //   }
}
