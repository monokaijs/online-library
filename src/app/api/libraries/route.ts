import { dbService } from "@/lib/services/db.service";
import { libraryService } from "@/lib/services/library.service";

export async function GET(req: Request, res: Response) {
  await dbService.connect();
  // TODO: Temporary fix for builds
  if (!dbService.connected) return Response.json([]);
  const data = await libraryService.get();
  return Response.json(data);
}
