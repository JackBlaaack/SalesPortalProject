import { expect, Page } from "@playwright/test";
import { logStep } from "../../../utils/report/logStep.js";
import { CreateOrderPopUpPage } from "ui/pages/orders/createOrderPopUp.page";

export class CreateOrderPopUpService {
  private createOrderPopUp: CreateOrderPopUpPage;
  constructor(protected page: Page) {
    this.createOrderPopUp = new CreateOrderPopUpPage(page);
  }

  @logStep()
  async selectCustomer(name: string) {
    await this.createOrderPopUp.selectCustomerFromDropdown(name)
  }

  @logStep()
  async selectProduct(name: string) {
    await this.createOrderPopUp.selectProductFromDropdown(name)
  }

  @logStep()
  async checkTotalPrice(price: number) {
    const actualPrice = await this.createOrderPopUp.getTotalPrice()
    expect(+(actualPrice.slice(1))).toEqual(price)
  }

  @logStep()
  async createOrder() {
    await this.createOrderPopUp.clickOnCreateOrderButton();
  }

}