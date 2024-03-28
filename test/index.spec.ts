import { env } from 'cloudflare:test';
import { describe, it, expect, beforeAll } from 'vitest';
import { setupTest, type trpcCaller } from './testHelpers';

describe('Hello World worker', () => {
	let caller: trpcCaller;
	beforeAll(async () => {
		caller = await setupTest(env)
	})
	it('responds with Hello World!', async () => {
		const response = await caller.hello()
		expect(response).toEqual("Hello, World!");
	});
});
