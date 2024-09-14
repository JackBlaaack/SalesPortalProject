import { test as servicesTest } from "../../fixtures/services.fixture";
import { test as mockTest } from "../../fixtures/mock.fixture";
import { mergeTests } from "@playwright/test";
import { apiConfig } from "../../config/apiConfig";
import { STATUS_CODES } from "../../data/types/api.types";
import { EMPTY_TABLE_MOCK } from "../../data/orders/mocks";
import { MODULE } from "../../data/moduleName";

const test = mergeTests(mockTest, servicesTest);

test.describe("[Visual] [Orders table]", async function () {
  test.beforeEach(async function ({ signInPageService }) {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

	test("Validate empty table", async function ({
		homePageService,
		ordersListService,
		mock,
	}) {
		const getOrdersUrl = apiConfig.baseUrl + apiConfig.endpoints.Orders;
		await mock.modifyReponse(getOrdersUrl, EMPTY_TABLE_MOCK, STATUS_CODES.OK);
		await homePageService.openModulePage(MODULE.ORDERS);
		await ordersListService.validateEmptyTable();
	});
});