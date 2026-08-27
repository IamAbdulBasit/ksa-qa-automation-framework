import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginWithADButton: Locator;
    readonly emailInput: Locator;
    readonly nextButton: Locator;
    readonly passwordInput: Locator;
    readonly signinButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginWithADButton = page.getByRole('button', { name: 'Login with AD' });
        this.emailInput = page.getByRole('textbox', { name: 'Enter your email, phone, or' });
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.passwordInput = page.getByRole('textbox', { name: 'Enter the password for basit.' });
        this.signinButton = page.getByRole('button', { name: 'Sign in' });
    }

    async goto(): Promise<void> {
        await this.page.goto('/auth/login');
    }

    async login(email: string, password: string): Promise<void> {
        await this.loginWithADButton.click();
        await this.emailInput.fill(email);
        await this.nextButton.click();
        await this.passwordInput.fill(password);
        await this.signinButton.click();
    }
}