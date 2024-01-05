const { test, expect } = require("@playwright/test");

let registerUser = {email: `user${Math.floor(Math.random() * 1000)}@test.com`, password: 'password'};

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

    const currentURL = page.url();
    const urlObj = new URL(currentURL);
    await expect(urlObj.pathname).toBe('/auth/login');

});

test('Registration attempt - user is already registered.', async ({ page }) => {

    await page.goto('/auth/register');

    await page.locator('input[type="email"]').type(registerUser.email);
    await page.locator('input[type="password"]').type(registerUser.password);
    await page.click('input[type="submit"]:has-text("Register")');

    const errorMessage = await page.textContent('.auth-error');
    expect(errorMessage).toContain('User with this email already exists.');
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

test('User logout.', async ({ page }) => {

    // First log user in
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').type(registerUser.email);
    await page.locator('input[type="password"]').type(registerUser.password);
    await page.click('input[type="submit"]:has-text("Login")');


    const currentURL = page.url();
    const urlObj = new URL(currentURL);

    await expect(urlObj.pathname).toBe('/topics');

    // Now log user out
    const userNavTextBeforeLogout = await page.textContent('.user-nav');
    expect(userNavTextBeforeLogout).toContain('Logout');

    await page.click('.user-nav a[href="/auth/logout"]');

    const redirectedURL = page.url();
    expect(redirectedURL).toContain('/auth/login');

    const userNavTextAfterLogout = await page.textContent('.user-nav');
    expect(userNavTextAfterLogout).not.toContain('Logout');
});

test('Login attempt with wrong email shows error message.', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').type('invalid@example.com');
    await page.locator('input[type="password"]').type(registerUser.password);
    await page.click('input[type="submit"]:has-text("Login")');

    const errorMessage = await page.textContent('.auth-error');
    expect(errorMessage).toContain('Wrong email or password.');
});

test('Login attempt with wrong password shows error message.', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').type(registerUser.email);
    await page.locator('input[type="password"]').type('wrongPassword');
    await page.click('input[type="submit"]:has-text("Login")');

    const errorMessage = await page.textContent('.auth-error');
    expect(errorMessage).toContain('Wrong email or password.');
});




