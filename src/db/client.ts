import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export type DrizzleClient = DrizzleD1Database<typeof schema>

export const createDb = async (d1: D1Database): Promise<DrizzleClient> => {
    return await drizzle(d1, { schema });
};

export interface Env {
    DB: D1Database;
}
