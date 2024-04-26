import { z } from "zod";

const expectedSchema = z.object({
  pagination: z.object({
    currentPage: z.number(),
    maxPages: z.number(),
  }),
  items: z.array(
    z.object({
      title: z.string(),
      permalink: z.string(),
      thumb: z.string(),
    }),
  ),
});

export const fetchCatData = async ({
  count,
  page,
}: {
  count: number;
  page: number;
}) => {
  const res = await fetch(
    `https://www.sfspca.org/wp-json/sfspca/v1/adoption?per_page=${count}&page=${page}&orderby=date&order=ASC&ignored-terms%5Bsfspca-adoption-species%5D%5B%5D=148&ignored-terms%5Bsfspca-adoption-site%5D%5B%5D=59`,
  );
  const data = expectedSchema.safeParse(await res.json());
  if (!data.success) {
    throw new Error("Failed to parse data");
  }
  return data.data;
};
