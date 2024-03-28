import { mergeRouters } from '../t';
import { helloWorldRouter } from './helloWorld.router';
import { userRouter } from './user.router';

export const appRouter = mergeRouters(helloWorldRouter, userRouter);

export type AppRouter = typeof appRouter