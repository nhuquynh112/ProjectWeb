"use server";
import { formSchema } from "@/lib/schema";

export async function registerAction(data: unknown) {
  const result = formSchema.safeParse(data);

  if (!result.success) {
    // Zod v4: dùng .issues thay vì .errors
    return { success: false, message: result.error.issues[0].message };
  }

  const { name } = result.data;
  return { success: true, message: `Đăng ký thành công! Chào ${name} 🎉` };
}