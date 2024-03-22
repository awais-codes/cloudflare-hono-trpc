import { mergeRouters } from '../t';
import { helloWorldRouter } from './helloWorld.router';

export const appRouter = mergeRouters(helloWorldRouter);
