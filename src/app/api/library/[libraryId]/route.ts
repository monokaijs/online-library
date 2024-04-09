import {NextRequest} from "next/server";
import {LibraryModel} from "@/lib/models/library.model";
import httpStatus from "http-status";

export async function GET(
  req: NextRequest,
  { params }: { params: { libraryId: string } }
) {
  // Get library info
  const { libraryId } = params;
  const library = await LibraryModel.findOne({
    _id: libraryId
  });
  if (!library) return Response.json({
    message: "Library not found"
  }, {
    status: httpStatus.NOT_FOUND,
  });
  return Response.json({
    data: library.toJSON(),
  })
}
