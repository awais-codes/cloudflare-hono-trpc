import { publicProcedure, router } from '../trpc';

export const helloWorldRouter = router({
	hello: publicProcedure.query(() => 'Hello, World!'),
});
