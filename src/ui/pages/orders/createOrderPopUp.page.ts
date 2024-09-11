import { SalesPortalPage } from "../salesPortal.page";

export class CreateOrderPopUpPage extends SalesPortalPage {
  uniqueElement = '//h5[text()="Create Order"]';

  readonly customerDropdown = '#inputCustomerOrder';
  readonly productDropdown = '.form-select[name="Product"]';
  readonly totalPrice = '#total-price-order-modal';
  readonly createOrderButton = '#create-order-btn';
  
  async selectCustomerFromDropdown(name:string) {
    await this.selectDropdownValue(this.customerDropdown, name);
  }

  async selectProductFromDropdown(name:string) {
    await this.selectDropdownValue(this.productDropdown, name);
  }

  async getTotalPrice() {
    return await this.getText(this.totalPrice);
  }

  async clickOnCreateOrderButton() {
    await this.click(this.createOrderButton)
  }
}