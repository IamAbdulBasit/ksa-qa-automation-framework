import { chromium, defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,    
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testDir: './Microsoft SSO + MFA',
      testMatch: 'auth.setup.ts',
      use: {
        channel: 'chrome',
        headless: false
      }
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: './Microsoft SSO + MFA/cookies.json', headless: false },
      dependencies: ['setup']
    },

    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge'},
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // }
  ],

});
