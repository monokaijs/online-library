import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export function GET() {
  const reqCookies = cookies();

  return NextResponse.json({
    data: reqCookies.toString(),
  })
}
