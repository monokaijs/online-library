import { bookService } from "@/lib/services/book.service";
import { dbService } from "@/lib/services/db.service";

export async function GET(req: Request, res: Response) {
  await dbService.connect();
  const { searchParams } = new URL(req.url ?? "");
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 20);
  const library = searchParams.get("library");
  const type = searchParams.get("type");
  const query = searchParams.get("query");

  const filter = { library, type, query };

  const data = await bookService.get(page, limit, filter);
  return Response.json(data);
}
