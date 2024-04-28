"use server";
import { z } from "zod";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const unsubscribeUserSchema = z.object({
  email: z.string().email(),
});

interface UnsubscribeUserState {
  errors?: {
    email?: string[];
    server?: string;
  };
  message?: string;
}

export const unsubscribeUser: (
  _prevState: UnsubscribeUserState,
  formData: FormData,
) => Promise<UnsubscribeUserState> = async (_prevState, formData) => {
  const parsedData = unsubscribeUserSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }
  try {
    await db.delete(users).where(eq(users.email, parsedData.data.email));
  } catch (e) {
    console.error(e);
    return {
      errors: {
        server: "An error occurred",
      },
    };
  }

  return { message: "If your email was registered, it has been unsubscribed." };
};
