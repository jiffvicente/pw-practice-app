import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test(' locator syntax rules', async ({page}) => {
    // by tag name
    page.locator('input');

    // by id
    await page.locator('#inputEmail1').click();

    // by class name
    page.locator('.input-full-width');

    // by attribute name
    page.locator('[placeholder="Email"]');

    //byy class value full
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    page.locator('input[placeholder="Email"]');

    // by xpath (not recommended)
    page.locator('//*[@id="inputEmail1"]');

    //by partial text match
    page.locator(':text("Using")');

    //by exact text match
    page.locator(':text-is("Using the Grid")');
})

test('User facing locators', async ({page}) => {
   await page.getByRole('textbox', {name: 'Email'}).first().click();
   await page.getByRole('button', {name: 'Sign in'}).first().click();

   await page.getByLabel('Email').first().click();

   await page.getByPlaceholder('Jane Doe').click();

   await page.getByText('Using the Grid').click();

   await page.getByTitle('IoT Dashboard').click();

   await page.getByTestId('SignIn').click();

   await page.getByTitle('IoT Dashboard').click();
})

test('Locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();

    await page.locator('nb-card').getByRole('button', {name: "Sign In"}).first().click();

    await page.locator('nb-card').nth(3).getByRole('button').click();
})

test('Locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card', {hasText: "Basic form"}).getByRole('textbox', {name: 'Email'}).click();

})

test('Reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const emailField = basicForm.getByRole('textbox', {name: 'Email'});

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('Welcome123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue('test@test.com');  
})

test('extracting values', async ({page}) => {
    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.getByRole('button').textContent();
    expect(buttonText).toEqual('Submit');

    // all text values
    const allRadioLabels = await page.locator('nb-radio').allTextContents()
    expect (allRadioLabels).toContain("Option 1");
    expect(allRadioLabels).toContain("Option 2");
    expect(allRadioLabels).toContain("Disabled Option");

    //input values
    const emailField = basicForm.getByRole('textbox', {name: 'Email'});
    await emailField.fill('test@test.com');
    const inputValue = await emailField.inputValue();
    expect (inputValue).toEqual('test@test.com');

    const placeholder = await emailField.getAttribute('placeholder');
    expect (placeholder).toEqual('Email');
})

