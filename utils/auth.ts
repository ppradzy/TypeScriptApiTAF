import { request } from '@playwright/test';

export async function getAccessToken(): Promise<string> {
    const baseURL = 'https://dummyjson.com';
    const apiContext = await request.newContext();
    const response = await apiContext.post(`${baseURL}/auth/login`, {
        data: {
            username: 'lilyb',
            password: 'lilybpass',
            expiresInMins: '360'
        }
    });

    if (!response.ok()) {
        throw new Error(`Failed to fetch access token: ${response.status()} - ${await response.text()}`);
    }

    const responseBody = await response.json();
    return responseBody.accessToken;
}
