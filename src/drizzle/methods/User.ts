import { eq, or } from 'drizzle-orm';
import { DrizzleClient, createDb } from '../../db/client';
import {
    InsertUser,
    users as UserTable,
} from '../../db/schema';
import { getDB } from '../../trpc/context';

export class User {
    private db: DrizzleClient;

    constructor(db: DrizzleClient) {
        this.db = db;
    }

    async createInstance() {
        if (!this.db) {
            this.db = await createDb(getDB());
        }
        return this.db;
    }

    async findUser({
        userId,
        email
    }: {
        userId?: string;
        email?: string
    }) {
        try {
            const user = (await this.createInstance()).query.users.findFirst({
                where: or(eq(UserTable.id, userId || ''), eq(UserTable.email, email || ''))
            });
            return user;
        } catch (error: any) {
            throw new Error(`Failed finding user: ${error.message}`);
        }
    }

    async create(user: InsertUser) {
        try {
            const createdUser = (await this.createInstance())
                .insert(UserTable)
                .values(user)
                .returning()
                .get();
            return createdUser;
        } catch (error: any) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async all() {
        return this.db.query.users.findMany()
    }
}