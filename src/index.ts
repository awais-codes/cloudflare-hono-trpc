// import { Hono } from 'hono';
// import { appRouter } from './router';
// import { honoTRPCServer } from './trpc/hono-adapter';

// const TRPC_ENTRYPOINT_ROUTE = '/trpc';

// const worker = new Hono();

// worker.use(
// 	`${TRPC_ENTRYPOINT_ROUTE}/*`,
// 	honoTRPCServer({
// 		router: appRouter,
// 		endpoint: TRPC_ENTRYPOINT_ROUTE,
// 	})
// );

// Not needed to listen to a port because that is managed by wrangler

export default {
	async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
		console.log('request', request);
		// return worker.fetch(request, env, ctx);
		return new Response('Hello World!');
	},
};
