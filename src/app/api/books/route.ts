import { bookService } from "@/lib/services/book.service";
import { dbService } from "@/lib/services/db.service";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbService.connect();
  const { searchParams } = new URL(req.url ?? "");
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 1);
  const library = searchParams.get("library");
  const type = searchParams.get("type");
  const query = searchParams.get("query");

  const filter = { library, type, query };

  const data = await bookService.get(page, limit, filter);
  return Response.json(data);
}
