import { env } from 'cloudflare:test';
import { describe, it, expect, beforeAll } from 'vitest';
import { setupTest, type trpcCaller } from '../testHelpers';

describe('User Routes', () => {
    let caller: trpcCaller;

    beforeAll(async () => {
        caller = await setupTest(env)
    })

    describe('signup', () => {

        const userToCreate = {
            email: 'abc@abc.com',
            name: 'abc'
        }

        it('creates a user', async () => {
            const createdUser = await caller.signup(userToCreate)
            expect(createdUser.email).toEqual(userToCreate.email);
        })

        it('throws error "user already exists"', async () => {
            await caller.signup(userToCreate)

            try {
                await caller.signup(userToCreate)
            } catch (error: any) {
                expect(error.message).toEqual("User already exists")
            }

        })
    })



});
