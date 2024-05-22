import { dbService } from "@/lib/services/db.service";
import { libraryService } from "@/lib/services/library.service";

export async function GET(req: Request, res: Response) {
  await dbService.connect();
  const data = await libraryService.get()
  return Response.json(data);
}
