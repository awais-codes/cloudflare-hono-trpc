import { publicProcedure, router } from '../t';

export const helloWorldRouter = router({
	hello: publicProcedure.query((opts) => {
		console.log('from route - hello:', opts)	
		return 'Hello, World!'
	}),
});
