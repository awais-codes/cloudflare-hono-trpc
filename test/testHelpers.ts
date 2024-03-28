import { appRouter } from '../src/trpc/router';
import { createCallerFactory } from '../src/trpc/t';
import { User } from '../src/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { createDb } from '../src/db/client';



const TEST_USER: User = {
  email: 'test@test.com',
  name: 'test',
  id: createId()
}


const createCaller = createCallerFactory(appRouter)


export async function setupTest(env: Record<string, any>) {
  const { DB, ...rest } = env
  const db = await createDb(env.DB)

  const ctx = {
    user: TEST_USER,
    env: rest,
    db
  }

  const caller = createCaller(ctx)
  return caller;
}

export type trpcCaller = Awaited<ReturnType<typeof setupTest>>
