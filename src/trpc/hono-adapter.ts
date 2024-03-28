import type { AnyRouter } from '@trpc/server';
import type { FetchCreateContextFnOptions, FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { MiddlewareHandler, Context } from 'hono';
import { extractTokenAndGetUser } from './utils/auth';
import { Bindings } from 'hono/types';
import { DrizzleClient, createDb } from '../db/client';
import type { User } from '../db/schema';

type tRPCOptions = Omit<FetchHandlerRequestOptions<AnyRouter>, 'req' | 'createContext'>;

export type ExtendedContext = {
	env: Bindings
	db: DrizzleClient
	user?: User | null
}

let DB: any;

/**
 * Create a context object that will be passed to all resolvers
 */
const createContext = (honoContext: Context) => async (opts: FetchCreateContextFnOptions): Promise<ExtendedContext> => {
	const { env, req } = honoContext;
	const { DB: dbBinding, ...rest } = env;
	DB = dbBinding
	const dbClient = await createDb(dbBinding)
	const user = await extractTokenAndGetUser(req.raw, env.JWT_SECRET, dbClient);
	return {
		env: rest,
		user,
		db: dbClient
	};
};


const honoTRPCServer = (opts: tRPCOptions): MiddlewareHandler => {
	return async (honoCTX: Context, next) => {
		return fetchRequestHandler({
			...opts,
			req: honoCTX.req.raw,
			createContext: createContext(honoCTX),
		});
	};
};

const getDB = () => DB;

export { honoTRPCServer, getDB };
