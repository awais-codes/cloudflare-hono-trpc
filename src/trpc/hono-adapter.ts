import type { AnyRouter } from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { MiddlewareHandler, Context } from 'hono';
import { createContext } from './context';

type tRPCOptions = Omit<FetchHandlerRequestOptions<AnyRouter>, 'req' | 'createContext'>;



export const honoTRPCServer = (opts: tRPCOptions): MiddlewareHandler => {
	return async (honoCTX: Context, next) => {
		return fetchRequestHandler({
			...opts,
			req: honoCTX.req.raw,
			createContext: createContext(honoCTX),
		});
	};
};


