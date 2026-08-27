import { test, expect } from '@playwright/test';

test('authenticated session lands on the app', async ({ page }) => {
  await page.goto('/work-order/list-work-orders');
  await expect(page).toHaveURL('/work-order/list-work-orders');
});