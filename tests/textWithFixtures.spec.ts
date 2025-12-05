import {test, expect} from '@playwright/test';
import { FormsLayOutFillFirst } from '../functions/formsLayoutFillFirst';

test.beforeEach(async ({page}) => {
    await page.goto('/')

})
test.describe('Forms Layout Page', () => {

test('parametrized methods', async ({page}) => {
    const formsLayoutFillFirst = new FormsLayOutFillFirst(page);
    await formsLayoutFillFirst.fillFormLayoutsFirst();
});
});