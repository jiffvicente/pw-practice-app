import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';

export class FormsLayOutFillFirst {
    readonly page;

    constructor(page) {
        this.page = page;
    }

    async fillFormLayoutsFirst() {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(/ /g, '')}${faker.number.int(100)}@test.com`;
    await this.page.getByText('Forms').click();
    await this.page.getByText('Form Layouts').click();
    await this.page.getByPlaceholder('Jane Doe').click();
    await this.page.getByPlaceholder('Jane Doe').fill(randomFullName);
    await this.page.getByPlaceholder('Email').first().click();
    await this.page.getByPlaceholder('Email').first().fill(randomEmail);
    
    await expect(this.page.getByPlaceholder('Jane Doe')).toHaveValue(randomFullName);
    await expect(this.page.getByPlaceholder('Email').first()).toHaveValue(randomEmail);

    const buffer = await this.page.screenshot();
    console.log(buffer.toString('base64'));
    await this.page.screenshot({ path: 'tests/screenshots/formsLayoutFillFirst.png' });
    await this.page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'tests/screenshots/formsLayoutFillFirst_card.png' });

}
}