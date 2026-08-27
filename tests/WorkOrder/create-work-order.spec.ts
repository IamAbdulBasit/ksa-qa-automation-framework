import { test, expect } from '@playwright/test';
import { CreateWorkOrderPage } from '../../pages/WorkOrder/CreateWorkOrderPage';

test('create a work order via the UI', async ({ page }) => {
  const addPage = new CreateWorkOrderPage(page);
  await addPage.goto();

  await addPage.createWorkOrder({
    client: 'DOLLAR EXPRESS', clientFilter: 'dollar',
    location: 'DOLLAREXP00338 (DOLLAR EXPRESS)',
    category: 'Vendor Accessorial', categoryFilter: 'vendor',
    orderType: 'Late Arrival',
    otDesc: '2 Full/1 Partial',
    priority: 'High', priorityFilter: 'high',
    billType: 'Regular',
  });

  await expect(page.getByText('Work Order Added Successfully')).toBeVisible();
  await page.waitForURL(/\/update-work-order\/location\/\d+/);
  const orderNum = page.url().match(/\/location\/(\d+)/)![1];

  // ─── ACT (search) ───
  await page.goto('/work-order/list-work-orders', { timeout: 60_000});
  // await page.locator('#idList').fill(orderNum);
  await page.getByTestId('search-button').click();

  // ─── ASSERT (read-back) ───
  // await expect(page.getByRole('button', { name: orderNum })).toBeVisible();
    await expect(page.getByText(orderNum)).toBeVisible({ timeout: 10_000 });
});