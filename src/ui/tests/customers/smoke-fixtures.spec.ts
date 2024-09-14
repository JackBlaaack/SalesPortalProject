import { MODULE } from "data/moduleName";
import { test } from "../../../fixtures/services.fixture";

test.describe.skip("[UI] [Customers] Smoke with fixtures", async function () {
  test.beforeEach(async function ({ signInPageService }) {
    await signInPageService.openSalesPortal();
    //await signInPageService.loginAsAdmin();
  });

	test.afterEach(async function ({ page }) {
		//TODO: delete customer
	});

	test("Create customer with valid data with fixture", async function ({
		homePageService,
		customersPageService,
		addNewCustomerPageService,
	}) {
		await homePageService.openModulePage(MODULE.CUSTOMERS);
		await customersPageService.openAddNewCustomerPage();
		await addNewCustomerPageService.create();
		//TODO: check customer in table
	});

	test("Validate created customer", async function ({
		homePageService,
		customersPageService,
		customersApiService,
		page,
	}) {
		const createdCustomer = customersApiService.create();
		await homePageService.openModulePage(MODULE.CUSTOMERS);
		// await page.pause();
	});
});
