import { generateNewCustomer } from "../../data/customers/generateCustomer";
import { STATUS_CODES } from "../../data/types/api.types";
import { ICustomer } from "../../data/types/customers.types";
import { validateResponse } from "../../utils/validation/response";
import customersApiClient from "../clients/customers.client";

import signInApi from "./signIn.api";

export class CustomersApiService {
	constructor(private customersClient = customersApiClient, private signInService = signInApi) {}

	async create(customerData?: Partial<ICustomer>) {
		const response = await this.customersClient.create(
			generateNewCustomer(customerData),
			await signInApi.getToken()
		);
		validateResponse(response, STATUS_CODES.CREATED, true, null);
		return response.body.Customer;
	}
	async viewAllCustomers() {
		const response = await this.customersClient.getAllCustomers(await signInApi.getToken());
		validateResponse(response, STATUS_CODES.OK, true, null);
		return response.body.Customers;
	}

	async viewCustomerById(id: string) {
		const response = await this.customersClient.viewCustomerbyId(id, await signInApi.getToken());
		validateResponse(response, STATUS_CODES.OK, true, null);
		return response.body.Customer;
	}

	async delete(id: string) {
		const response = await this.customersClient.deleteCustomerbyId(id, await signInApi.getToken());
		return response;
	}

	async updatedCustomerByID(id: string, data: ICustomer) {
		const response = await this.customersClient.updateCustomerById(
			id,
			data,
			await signInApi.getToken()
		);
		validateResponse(response, STATUS_CODES.OK, true, null);
		return response;
	}

}
