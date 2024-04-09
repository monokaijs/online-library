import {NextRequest} from "next/server";
import {createLibraryValidationSchema} from "@/lib/common/validations/library.validation";
import httpStatus from "http-status";
import {LibraryModel} from "@/lib/models/library.model";

export async function POST(req: NextRequest, res: NextRequest) {
  const data = await req.json();
  const validate = createLibraryValidationSchema.safeParse(data);
  if (validate.success) {
    const newLibrary = await LibraryModel.create(data);
    return Response.json({
      message: "Created new Library",
      data: newLibrary.toJSON(),
    })
  } else {
    return Response.json({
      message: "Invalid data",
    }, {
      status: httpStatus.BAD_REQUEST,
    })
  }
}
