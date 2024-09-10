import { BasePage } from "./base.page.js";

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = this.findElement(".spinner-border");
  abstract readonly uniqueElement: string;
  private readonly notification = '.toast-container.notification-wrapper .toast-body';
  private readonly closeNotificationButton = '.toast-container.notification-wrapper .btn-close';

	async waitForOpened() {
		await this.waitForElement(this.uniqueElement);
	}

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, "hidden");
  }

  async getNotificationText() {
    return await this.getText(this.notification)
  }

  async closeNotificationWindow() {
    await this.click(this.closeNotificationButton)
  }
}
