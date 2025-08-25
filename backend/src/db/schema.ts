import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const linksTable = pgTable("links", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), // id (FROM POSTGRES)
  hash: varchar({ length: 255 }).notNull().unique(), // hash of the link (FROM SERVER)
  link: varchar({ length: 255 }).notNull(), // the link (FROM USER)
  clerkUserId: varchar({ length: 255 }).notNull().unique(), // the user id from clerk (FROM SERVER)
  lifeTime: integer().notNull(), // the life time of the link (FROM USER)
  createdAt: timestamp().notNull().defaultNow(), // the date and time the link was created (FROM POSTGRES)
  numberOfClicks: integer().notNull().default(0), // the number of clicks on the link (FROM SERVER)
});

/*
NOTES:
- length is passed as an object to the varchar function
- generatedAlwaysAsIdentity is used to generate a unique id for each user
- primaryKey is used to make the id the primary key
- notNull is used to make the column not null
- unique is used to make the column unique
*/
