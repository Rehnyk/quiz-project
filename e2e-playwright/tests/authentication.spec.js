const { test, expect } = require("@playwright/test");

let registerUser = {email: 'test_user@example.com', password: 'password'};

test.beforeEach(async ({ page }) => {
    await page.goto('about:blank');
});

test("Unauthorized user is redirected to login page.", async ({ page }) => {
    await page.goto("/topics");
    const currentURL = page.url();
    const urlObj = new URL(currentURL);
    await expect(urlObj.pathname).toBe('/auth/login');
});

test('Registering user was successful and user is redirected to login page.', async ({ page }) => {
    await page.goto('/auth/register');
    await page.locator('input[type="email"]').type(registerUser.email);
    await page.locator('input[type="password"]').type(registerUser.password);
    await page.click('input[type="submit"]:has-text("Register")');

    await page.waitForURL('/auth/login', { timeout: 20000 });

    const currentURL = page.url();
    const urlObj = new URL(currentURL);
    await expect(urlObj.pathname).toBe('/auth/login');

});

test('User is already registered.', async ({ page }) => {
    await page.goto('/auth/register');
    await page.locator('input[type="email"]').type(registerUser.email);
    await page.locator('input[type="password"]').type(registerUser.password);
    await page.click('input[type="submit"]:has-text("Register")');

    await page.waitForSelector('.error-message', { state: 'visible' }, { timeout: 20000 });
    await expect(page.locator('.error-message')).toContainText('User already exists.');
});

test('Log in user.', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').type(registerUser.email);
    await page.locator('input[type="password"]').type(registerUser.password);
    await page.click('input[type="submit"]:has-text("Login")');

    const currentURL = page.url();
    const urlObj = new URL(currentURL);

    await expect(urlObj.pathname).toBe('/topics');
});

test('Invalid login attempt shows error message.', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').type('invalid@example.com');
    await page.locator('input[type="password"]').type('invalidpassword');
    await page.click('input[type="submit"]:has-text("Login")');

    await page.waitForSelector('.error-message', { state: 'visible' }, { timeout: 20000 });
    await expect(page.locator('.error-message')).toContainText('Wrong email or password.');
});