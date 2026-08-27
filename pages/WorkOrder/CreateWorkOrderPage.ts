import { Page, Locator} from '@playwright/test';

export class CreateWorkOrderPage {

    readonly page: Page;
    readonly clientDropdown: Locator;
    readonly locationDropdown: Locator;
    readonly categoryDropdown: Locator;
    readonly orderTypeDropdown: Locator;
    readonly otDescriptionDropdown: Locator;
    readonly priorityDropdown: Locator;
    readonly billTypeDropdown: Locator;
    readonly saveButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.clientDropdown = page.getByRole('combobox', { name: 'Client Code Location ID' });
        this.locationDropdown = page.locator('input[name="locationId"]');
        this.categoryDropdown = page.locator('input[name="category"]');
        this.orderTypeDropdown = page.locator('input[name="orderType"]');
        this.otDescriptionDropdown = page.locator('input[name="otDesc"]');
        this.priorityDropdown = page.locator('input[name="priority"]');
        this.billTypeDropdown = page.locator('#commonAutoCompleteField').nth(6);
        this.saveButton = page.getByTestId('save-button');
    }

    async goto() {
        await this.page.goto('/work-order/add-work-order', { timeout: 60_000 });
    }

    /** Open a MUI autocomplete, optionally type to filter, then pick an option by name. */
  private async selectOption(field: Locator, optionName: string, filterText?: string) {
    await field.click();
    if (filterText) await field.fill(filterText);
    await this.page.getByRole('option', { name: optionName }).click();
  }

  /** Fills the form in CASCADE ORDER (client first — dependents rely on it). */
  async createWorkOrder(data: {
    client: string; clientFilter?: string;
    location: string;
    category: string; categoryFilter?: string;
    orderType: string;
    otDesc: string;
    priority: string; priorityFilter?: string;
    billType: string;
  }) {
    await this.selectOption(this.clientDropdown, data.client, data.clientFilter);
    await this.selectOption(this.locationDropdown, data.location);
    await this.selectOption(this.categoryDropdown, data.category, data.categoryFilter);
    await this.selectOption(this.orderTypeDropdown, data.orderType);
    await this.selectOption(this.otDescriptionDropdown, data.otDesc);
    await this.selectOption(this.priorityDropdown, data.priority, data.priorityFilter);
    await this.selectOption(this.billTypeDropdown, data.billType);
    await this.saveButton.click();
  }
    
}