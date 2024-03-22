import type { AnyRouter } from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { MiddlewareHandler, Context } from 'hono';

/**
 * Create a context object that will be passed to all resolvers
 */
const contextCreater = (honoContext: Context) => async () => {
	const { env } = honoContext;
	// Add logic to get user from request
	return {
		env,
	};
};

type tRPCOptions = Omit<FetchHandlerRequestOptions<AnyRouter>, 'req'>;

const honoTRPCServer = (opts: tRPCOptions): MiddlewareHandler => {
	return async (honoCTX: Context, next) => {
		return fetchRequestHandler({
			...opts,
			req: honoCTX.req.raw,
			createContext: contextCreater(honoCTX),
		});
	};
};

export { honoTRPCServer };
