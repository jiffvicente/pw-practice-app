import { test, expect } from '@playwright/test';


test('radio buttons test', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });

    await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({force: true})
    const radioStatus = await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked();
    expect(radioStatus).toBeTruthy();
    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked();

   await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({force: true});
   await expect(usingTheGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked();
   await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).not.toBeChecked();
});
