import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';

const authFile = './Microsoft SSO + MFA/cookies.json';

setup('authenticate', async ({ page }) => {

    setup.setTimeout(0);

    if (fs.existsSync(authFile)) {
        const ageMs = Date.now() - fs.statSync(authFile).mtimeMs;
        if (ageMs < 15 * 60_000) {
            setup.skip(true, 'Reusing recent auth session');
            return;
        }
    }

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

    await page.waitForURL('**/work-order/list-work-orders', { timeout: 90_000 });

    await page.context().storageState({ path: authFile });
});