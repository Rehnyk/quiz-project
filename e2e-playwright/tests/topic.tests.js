const { test, expect } = require("@playwright/test");

const adminUser = { id: 998, username: 'admin', admin: true };
const regularUser = { id: 999, username: 'user', admin: false };
test("Admin can create topic.", async ({ page }) => {
    const mockUser = adminUser;

    await page.goto("/topics");

    const createTopicFormExists = await page.isVisible('form.add-new-element');
    expect(createTopicFormExists).toBe(true);

    // Fill and submit the form
    await page.fill('input[name=name]', 'New Topic');
    await page.click('input[type=submit]');

});



/*
test("Admin can delete topic.", async ({ page }) => {
 const mockUser = adminUser;

  // Navigate to the topics page
  await page.goto("/topics");

  // Check if the delete buttons are present for admin users
  const deleteButtonsExist = await page.isVisible('form[action*="/topics/"] input[type=submit]');
  expect(deleteButtonsExist).toBe(true);

});
*/


/*
test("User can create question", async ({ page }) => {

});
*/


/*
test("User can delete question", async ({ page }) => {

});
*/

/*
test("User can create answer", async ({ page }) => {

});
*/


/*
test("User can delete answer", async ({ page }) => {

});
*/

