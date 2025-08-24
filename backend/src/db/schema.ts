import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

/*
NOTES:
- length is passed as an object to the varchar function
- generatedAlwaysAsIdentity is used to generate a unique id for each user
- primaryKey is used to make the id the primary key
- notNull is used to make the column not null
- unique is used to make the column unique
*/
