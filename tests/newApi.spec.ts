import { test, expect } from '@playwright/test';

let apiContext;
test.beforeAll(async({playwright})=>{
    apiContext= await playwright.request.newContext({
        baseURL:'https://nominatim.openstreetmap.org'
    })
})

test.describe("Check the countries name public api",()=>{
    test('Validate countries name api',async () => {
        await test.step(`Validate the country name api`, async ()=>{
                const response = await apiContext.get(`/search.php?q=Poland&format=jsonv2`)
                expect(response.ok()).toBeTruthy();
                const data = await response.json();
                expect(data[0].name).toEqual("Polska");
        })
    })

})


test.afterAll(async()=>{
    await apiContext.dispose();
})