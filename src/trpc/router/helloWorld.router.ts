import { publicProcedure, router } from '../t';

export const helloWorldRouter = router({
	hello: publicProcedure.query(() => 'Hello, World!'),
});
