import { SalesPortalPage } from "../salesPortal.page";

export class OrdersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Orders List "]';

  readonly "Create Order button" = "button.page-title-header";
  private readonly 'Table row selector' = (order: string) => `//tr[./td[text()="${order}"]]`;
  private readonly 'ID by table row' = (order: string) => `${this['Table row selector'](order)}/td[1]`;
  private readonly 'Name by table row' = (order: string) => `${this['Table row selector'](order)}/td[2]`;
  private readonly 'Email by table row' = (order: string) => `${this['Table row selector'](order)}/td[3]`;
  private readonly 'Price by table row' = (order: string) => `${this['Table row selector'](order)}/td[4]`;
  private readonly 'Delivery by table row' = (order: string) => `${this['Table row selector'](order)}/td[5]`;
  private readonly 'Status by table row' = (order: string) => `${this['Table row selector'](order)}/td[6]`;
  readonly "Details button by table row" = (order: string) =>
    `${this["Table row selector"](order)}//button[@title="Details"]`;
  readonly "Empty table message" = "td.fs-italic";
  
  async clickOnCreateOrder() {
    await this.click(this["Create Order button"]);
  }

  async getDataByCustomerName(name: string) {
    const [id, email, price, delivery, status] = await Promise.all([
      this.getText(this['ID by table row'](name)),
      this.getText(this['Email by table row'](name)),
      this.getText(this['Price by table row'](name)),
      this.getText(this['Delivery by table row'](name)),
      this.getText(this['Status by table row'](name)),
    ]);
    return { id, name, email, price: +price.replace('$', ''), delivery, status };
  }

  async getEmptyTableMessage() {
		return this.getText(this["Empty table message"]);
	}
}
