// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `rescueradar_${name}`);

export const pets = createTable(
  "pets",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    permalink: varchar("permalink", { length: 256 }),
    thumbnail: varchar("thumbnail", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (table) => ({
    permaLinkIndex: index("permalink_idx").on(table.permalink),
  }),
);

export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    isEmailVerified: boolean("is_email_verified").default(false).notNull(),
    verificationToken: varchar("verification_token", { length: 256 })
      .unique()
      .notNull(),
  },
  (table) => ({
    emailIndex: index("email_idx").on(table.email),
  }),
);
