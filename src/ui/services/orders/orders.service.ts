import { OrdersListPage } from "../../pages/orders/orders.page";
import { Page } from "@playwright/test";
import { logStep } from "../../../utils/report/logStep.js";
import { CreateOrderPopUpPage } from "ui/pages/orders/createOrderPopUp.page";

export class OrdersListService {
  private ordersPage: OrdersListPage;
  private createOrderPopUp: CreateOrderPopUpPage;
  constructor(protected page: Page) {
    this.ordersPage = new OrdersListPage(page);
    this.createOrderPopUp = new CreateOrderPopUpPage(page);
  }

  @logStep()
  async openCreateOrderPopUp() {
    await this.ordersPage.clickOnCreateOrder()
    await this.ordersPage.waitForSpinnerToHide();
    await this.createOrderPopUp.waitForOpened();
  }

  async getCreatedOrderData(customerName: string) {
    const createdOrderData = await this.ordersPage.getDataByCustomerName(customerName);
    return createdOrderData;
  }

}