import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const reportItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  image: z
    .any()
    .refine((files) => !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .optional(),
});

export type ReportItemFormData = z.infer<typeof reportItemSchema>;
