import { Hono } from 'hono';
import { appRouter } from './trpc/router';
import { honoTRPCServer } from './trpc/hono-adapter';

const TRPC_ENTRYPOINT_ROUTE = '/trpc';

const worker = new Hono();

worker.use(
	`${TRPC_ENTRYPOINT_ROUTE}/*`,
	honoTRPCServer({
		router: appRouter,
		endpoint: TRPC_ENTRYPOINT_ROUTE,
	})
);

// Not needed to listen to a port because that is managed by wrangler

export default worker;
