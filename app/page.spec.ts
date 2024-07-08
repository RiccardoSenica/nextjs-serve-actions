import { expect, test } from '@playwright/test';
import 'dotenv/config';

test.describe('Home component tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:${process.env.PORT}/`);
  });

  test('should display Dashboard content by default', async ({ page }) => {
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should switch to Dashboard content when Dashboard tab is clicked', async ({
    page
  }) => {
    await page.click('text=Settings');
    await page.click('text=Dashboard');

    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should switch to Settings content when Settings tab is clicked', async ({
    page
  }) => {
    await page.click('text=Settings');

    await expect(page.locator('text=Settings')).toBeVisible();
  });
});
