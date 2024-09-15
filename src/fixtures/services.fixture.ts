import { AddCustomerService } from "../ui/services/customers/addNewCustomer.service";
import { CustomersListService } from "../ui/services/customers/customers.service";
import { HomeService } from "../ui/services/home.service";
import { SignInService } from "../ui/services/signIn.service";
import { CustomersApiService } from "../api/service/customers.service";
import { test as base } from "@playwright/test";
import { ProductsApiService } from "../api/service/products.service";
import { OrdersListService } from "../ui/services/orders/orders.service";
import { CreateOrderPopUpService } from "../ui/services/orders/createOrderPopUp.service";
import { SalesPortalService } from "../ui/services/salesPortal.service";
import { SignInApiService } from "../api/service/signIn.api";
import { OrdersApiService } from "api/service/orders.service";

interface ISalesPortalServices {
  customersPageService: CustomersListService;
  addNewCustomerPageService: AddCustomerService;
  homePageService: HomeService;
  signInPageService: SignInService;
  customersApiService: CustomersApiService;
  productsApiService: ProductsApiService;
  ordersApiService: OrdersApiService;
  ordersListService: OrdersListService;
  createOrderPopUpService: CreateOrderPopUpService;
  salesPortalService: SalesPortalService;
  signInApiService: SignInApiService;
}

export const test = base.extend<ISalesPortalServices>({
	customersPageService: async ({ page }, use) => {
		await use(new CustomersListService(page));
	},

	homePageService: async ({ page }, use) => {
		await use(new HomeService(page));
	},

	signInPageService: async ({ page }, use) => {
		await use(new SignInService(page));
	},

	addNewCustomerPageService: async ({ page }, use) => {
		await use(new AddCustomerService(page));
	},

  customersApiService: async ({}, use) => {
    await use(new CustomersApiService());
  },

  productsApiService: async ({}, use) => {
    await use(new ProductsApiService())
  },

  ordersApiService: async ({}, use) => {
    await use(new OrdersApiService())
  },

  ordersListService: async ({ page }, use) => {
    await use(new OrdersListService(page));
  },

  createOrderPopUpService: async ({ page }, use) => {
    await use(new CreateOrderPopUpService(page));
  },

  salesPortalService: async ({ page }, use) => {
    await use(new SalesPortalService(page));
  },

  signInApiService: async ({}, use) => {
		await use(new SignInApiService());
	},
});
