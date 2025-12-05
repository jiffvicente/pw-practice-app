import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Modal & Overlays' }).click();
  await page.getByRole('link', { name: 'Window' }).click();
  await page.getByRole('button', { name: 'Open window form' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
});