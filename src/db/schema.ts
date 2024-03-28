import { createId } from "@paralleldrive/cuid2";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = sqliteTable('users', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text('name').notNull(),
    email: text('email').notNull(),
});


export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);