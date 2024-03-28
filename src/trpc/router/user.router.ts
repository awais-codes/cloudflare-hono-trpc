import { User } from '../../drizzle/methods/User';
import { publicProcedure, router } from '../t';
import { insertUserSchema } from '../../db/schema';
import { TRPCError } from '@trpc/server';

const userInputSchemas = {
    signup: insertUserSchema.omit({ id: true })
}

export const userRouter = router({
    signup: publicProcedure.input(userInputSchemas.signup).mutation(async (opts) => {
        const { input, ctx } = opts
        const userClass = new User(ctx.db)
        const existingUser = await userClass.findUser({ email: input.email })
        if (!existingUser) {
            return userClass.create(input)
        }
        else throw new TRPCError({
            message: "User already exists",
            code: 'CONFLICT'
        })

    }),
});
