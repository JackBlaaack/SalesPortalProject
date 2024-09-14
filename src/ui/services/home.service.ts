import { Page } from "@playwright/test";
import { HomePage } from "../pages/home.page.js";
import { CustomersListPage } from "../pages/customers/customers.page.js";
import { logStep } from "../../utils/report/logStep.js";
import { OrdersListPage } from "ui/pages/orders/orders.page.js";
import { MODULE } from "data/moduleName.js";

export class HomeService {
  private homePage: HomePage;
  private customersPage: CustomersListPage;
  private ordersPage: OrdersListPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersListPage(page);
    this.ordersPage = new OrdersListPage(page);
  }

  @logStep()
  async openModulePage(module: MODULE) {
    await this.homePage.clickOnViewDetailsButton(module);
    await this.homePage.waitForSpinnerToHide();
    await this.ordersPage.waitForOpened();
  }
}
