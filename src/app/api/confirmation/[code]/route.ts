import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

async function handler(
  _req: NextRequest,
  { params }: { params: { code: string } },
) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.verificationToken, params.code),
  });
  if (!user) {
    redirect("/not-found");
  } else {
    await db
      .update(users)
      .set({ isEmailVerified: true })
      .where(eq(users.verificationToken, params.code));
    redirect("/confirmed");
  }
}

export const GET = handler;
