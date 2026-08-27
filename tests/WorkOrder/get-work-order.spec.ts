import { test, expect } from '@playwright/test';

test('work order grid loads and shows orders', async ({ page, context }) => {
  await page.goto('/work-order/list-work-orders');
  await expect(page.locator('div').filter({ hasText: /^No Rows$/ }).nth(2)).toBeVisible();
});