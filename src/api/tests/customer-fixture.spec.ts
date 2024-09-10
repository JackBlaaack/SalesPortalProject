import { expect } from "@playwright/test";
import { STATUS_CODES } from "../../data/types/api.types";
import { test } from "../../fixtures/services.fixture";
import _ from "lodash";
import { getRandomItemIndex } from "../../utils/enums/getRandomValue";
import { generateNewCustomer } from "../../data/customers/generateCustomer";

test.describe("[API] [Customers] Smoke with fixtures", async function () {
	test("Create Customer with valid data with fixture", async function ({ customersApiService }) {
		const customerData = generateNewCustomer();
		const response = await customersApiService.create(customerData);
	});

	test("Create Customer with valid data with fixture and delete it", async function ({
		customersApiService,
	}) {
		const customerData = generateNewCustomer();
		const response = await customersApiService.create(customerData);
		const id = response._id;
		const responseDeleted = await customersApiService.delete(id);
		expect(responseDeleted.status).toBe(STATUS_CODES.DELETED);
	});

	test("View list of Customers with fixture", async function ({ customersApiService }) {
		await customersApiService.viewAllCustomers();
	});

	test("View list of Customers and delete latest Customer with fixture", async function ({
		customersApiService,
	}) {
		const customersList = await customersApiService.viewAllCustomers();
		const id = customersList[0]._id;
		await customersApiService.delete(id);
	});

	test("View list of Customers and delete random Customer by id with fixture", async function ({
		customersApiService,
	}) {
		const customersList = await customersApiService.viewAllCustomers();
		const listLength = customersList.length;
		const randomCustomerIndex = getRandomItemIndex(listLength);
		const id = customersList[randomCustomerIndex]._id;
		await customersApiService.delete(id);
	});

	test("View list of Customers and update latest Customer with fixture", async function ({
		customersApiService,
	}) {
		const customersList = await customersApiService.viewAllCustomers();
		const id = customersList[0]._id;
		console.log(id);
		const updateCustomerData = {
			_id: id,
			...generateNewCustomer(),
		};
		await customersApiService.updatedCustomerByID(id, updateCustomerData);
	});
});
