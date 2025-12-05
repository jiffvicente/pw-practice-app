import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    [
      '@argos-ci/playwright/reporter',
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
      },
    ],
    //['junit', { outputFile: 'test-results/junit.xml'}],
    //['allure-playwright'],
    ['html'],

  ],

  use: {

    baseURL: 'http://localhost:4200/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    },
  },

  projects: [
   {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
      }
    },

  {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'mobile',
      testMatch: 'tests/testMobile.spec.ts',
      use: { ...devices['iPhone 13 Pro'] },
    }
  ],

    webServer: {
      command: 'npm run start',
      url: 'http://localhost:4200/',
      reuseExistingServer: true,
  },
});
