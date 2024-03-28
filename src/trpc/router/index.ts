import { mergeRouters } from '../t';
import { helloWorldRouter } from './helloWorld.router';
import { useRouter } from './user.router';

export const appRouter = mergeRouters(helloWorldRouter, useRouter);

export type AppRouter = typeof appRouter