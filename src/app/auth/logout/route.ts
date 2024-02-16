import {getSession} from "@/lib/utils/getSession";
import {redirect} from "next/navigation";

export async function GET() {
  const session = await getSession();
  session.destroy();
  await session.save();
  return redirect('/');
}
