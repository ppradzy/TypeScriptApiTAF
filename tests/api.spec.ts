import { test, expect } from '@playwright/test';
import { getAccessToken } from '../utils/auth';

let accessToken: string;

test.beforeAll(async () => {
    accessToken = await getAccessToken();
    console.log('Access Token:', accessToken);
});

let response: any

test.describe('API tests', () => {
    test('Test GET', async ({request}) => {
        await test.step('Getting one object', async () => {
            response = await request.get('/products/7')})

        await test.step('Validate response code', async ()=> {
            expect(response.ok()).toBeTruthy();
            console.log(await response.json());
        })
    })

    test('Test2: GET', async ({request}) => {
        await test.step('Test2: Getting one object', async ()=> {
            response = await request.get('/products/5')
        })

        await test.step('Test2: Validate response code', async ()=> {
            expect(response.ok()).toBeTruthy();
            console.log(await response.json());
        })

        await test.step('Validate content', async ()=> {
            const content = await response.json()
            expect(content.id).toBe(5)
            expect(content.title).toBe('Red Nail Polish')
        })
    })
})