import { mergeRouters } from '../trpc';
import { helloWorldRouter } from './helloWorld.router';

export const appRouter = mergeRouters(helloWorldRouter);
