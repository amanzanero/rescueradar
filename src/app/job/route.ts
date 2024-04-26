import { type NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { env } from "@/env";
import { fetchCatData } from "@/server/scraper";
import { EmailSender, makeNewAnimalsEmail } from "@/server/email";
import { db } from "@/server/db";
import { pets } from "@/server/db/schema";

async function handler(_req: NextRequest) {
  const catData = await fetchCatData({ count: 20, page: 1 });
  let items = [...catData.items];
  // keep fetching until no more pages
  for (let i = 2; i <= catData.pagination.maxPages; i++) {
    const data = await fetchCatData({ count: 20, page: i });
    items = [...items, ...data.items];
  }
  console.log(`Fetched ${items.length} cats`);

  const catPermalinks = catData.items.map((item) => item.permalink);
  // check if all cats exist in DB
  const cats = await db.query.pets.findMany({
    where: (pets, { inArray }) => inArray(pets.permalink, catPermalinks),
  });
  // filter out cats that already exist
  const newCats = catData.items.filter(
    (cat) =>
      !cats.some((existingCat) => existingCat.permalink === cat.permalink),
  );

  if (newCats.length > 0) {
    const emailSender = new EmailSender();
    const html = makeNewAnimalsEmail({ items: newCats });
    const promises: Promise<unknown>[] = [];
    ["info@amanzanero.com", "isabella9923@gmail.com"].forEach((email) => {
      promises.push(
        emailSender.send({
          to: email,
          subject: "New kitties! 🐱",
          html,
        }),
      );
    });
    promises.push(
      db
        .insert(pets)
        .values(
          newCats.map((data) => ({
            name: data.title,
            permalink: data.permalink,
            thumbnail: data.thumb,
          })),
        )
        .onConflictDoNothing(),
    );
    await Promise.allSettled(promises);
    console.log(`found ${newCats.length} new cats and sent emails`);
  } else {
    console.log(`no new cats found`);
  }

  return NextResponse.json({ message: "ok" });
}

export const POST =
  env.NODE_ENV === "development" ? handler : verifySignatureAppRouter(handler);
