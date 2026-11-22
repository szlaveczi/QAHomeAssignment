import { test, expect } from '@playwright/test';
import { LoginPage } from '../support/LoginSupport';

test.describe('TASK_2: Testing login options for an Angular web application', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('LOGIN_TEST_1: Successful login with valid credentials', async ({ page }) => {
    await loginPage.login('test.user@testemail.com', 'TestPassword123@');
    // Verify redirect to the dashboard/home
    //await expect(page).toHaveURL(/.*\/(dashboard|home)/);

    //Verify that the user is successfully logged in
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
  });

  test('LOGIN_TEST_2: Failed login with invalid password', async ({ page }) => {
    await loginPage.login('test.user@testemail.com', 'WrongPassword999');
    // Verify user stays on the login page and sees an error message
    await expect(page).toHaveURL(/.*\/login/);
    await expect(loginPage.errorMessage).toContainText(/credentials invalid|incorrect password/i);
  });

  test('LOGIN_TEST_3: Validation error when submitting empty fields', async () => {
    // Verify that the Login button is disabled when login credentials are not filled
    await expect(loginPage.loginButton).toBeDisabled();
    await loginPage.fillLoginField('test.user@testemail.com','');
    await expect(loginPage.loginButton).toBeDisabled();
    await loginPage.fillLoginField('','TestPassword123@');
    await expect(loginPage.loginButton).toBeDisabled();
  });
});