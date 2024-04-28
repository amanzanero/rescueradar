"use server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { logger } from "@/server/logger";
import { GmailSender, makeConfirmationEmail } from "@/server/email";

const createNewUserSchema = z.object({
  email: z.string().email(),
});

interface CreateNewUserState {
  errors?: {
    email?: string[];
    server?: string;
  };
  message?: string;
}

export const createNewUser: (
  _prevState: CreateNewUserState,
  formData: FormData,
) => Promise<CreateNewUserState> = async (
  _prevState: CreateNewUserState,
  formData: FormData,
) => {
  const parsedData = createNewUserSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  let insertedUser;
  const verificationToken = nanoid();
  try {
    const user = await db
      .insert(users)
      .values({
        email: parsedData.data.email,
        verificationToken,
      })
      .onConflictDoNothing({ target: users.email })
      .returning({
        id: users.id,
        email: users.email,
        isEmailVerified: users.isEmailVerified,
        verificationToken: users.verificationToken,
      });
    if (user.length > 1) {
      const userEmailAndIds = user.map((u) => ({ email: u.email, id: u.id }));
      logger.warn("Users with duplicate emails found", { userEmailAndIds });
    }
    [insertedUser] = user;
  } catch (e) {
    console.error(e);
    return {
      errors: {
        server: "An error occurred",
      },
    };
  }
  if (insertedUser && insertedUser.isEmailVerified === false) {
    // send email
    const emailSender = new GmailSender();
    const html = makeConfirmationEmail({
      code: verificationToken,
    });
    await emailSender.send({
      to: parsedData.data.email,
      subject: "Confirm your email",
      html,
    });
  }
  return {
    message:
      "A confirmation email has been sent. You'll start receiving notifications once you confirm your email.",
  };
};
