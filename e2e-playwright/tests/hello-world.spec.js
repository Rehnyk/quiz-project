const { test, expect } = require("@playwright/test");

test("Unauthorized user is redirected to login page.", async ({ page }) => {
    await page.goto("/topics");
    const currentURL = page.url();
    const urlObj = new URL(currentURL);
    await expect(urlObj.pathname).toBe('/auth/login');
});

test('Register and log in user.', async ({ page }) => {
    await page.goto('/auth/register');
    const email = 'test_user@example.com';
    const password = 'password';
    await page.locator('input[type="email"]').type(email);
    await page.locator('input[type="password"]').type(password);
    await page.click('input[type="submit"]:has-text("Register")');

 //   await page.waitForNavigation({ timeout: 30000 });
    const currentURL = page.url();
    const urlObj = new URL(currentURL);

    await expect(urlObj.pathname).toBe('/auth/login');

//    await page.waitForSelector('input[type="email"]');

 /*   // Log in the registered user
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').type(email);
    await page.locator('input[type="password"]').type(password);
    await page.click('input[type="submit"]:has-text("Login")');

    await expect(urlObj.pathname).toBe('/topics');*/


});

test('Log in user.', async ({ page }) => {


    // Log in the registered user
    await page.goto('/auth/login');
    const email = 'test_user@example.com';
    const password = 'password';
    await page.locator('input[type="email"]').type(email);
    await page.locator('input[type="password"]').type(password);
    await page.click('input[type="submit"]:has-text("Login")');

    const currentURL = page.url();
    const urlObj = new URL(currentURL);

    await expect(urlObj.pathname).toBe('/topics');
});