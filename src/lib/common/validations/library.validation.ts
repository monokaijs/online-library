import {z} from "zod";
import {LibraryStatus} from "@/lib/models/library.model";

export const createLibraryValidationSchema = z.object({
  name: z.string(),
  estDate: z.date(),
  openingTime: z.string(),
  closingTime: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  status: z.enum(Object.values(LibraryStatus) as any),
})
