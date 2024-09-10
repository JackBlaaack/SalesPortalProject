import { apiConfig } from "../../config/apiConfig";
import { IRequestOptions } from "../../data/types/api.types";
import { ICustomer, ICustomerResponse, ICustomersResponse } from "../../data/types/customers.types";
import { RequestApi } from "../../utils/apiClients/request";

class CustomerApiClient {
	constructor(private request = new RequestApi()) {}

	async create(body: ICustomer, token: string) {
		return await this.request.send<ICustomerResponse>({
			url: apiConfig.endpoints.Customers,
			method: "post",
			data: body,
			headers: {
				"content-type": "application/json",
				Authorization: token,
			},
		});
	}

	async deleteCustomerbyId(id: string, token: string) {
		const options: IRequestOptions = {
			method: "delete",
			url: apiConfig.endpoints.Customers + `${id}/`,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		};
		return this.request.send<ICustomerResponse>(options);
	}

	async viewCustomerbyId(id: string, token: string) {
		const options: IRequestOptions = {
			method: "get",
			url: apiConfig.endpoints.Customers + `${id}/`,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		};
		return this.request.send<ICustomerResponse>(options);
	}

	async getAllCustomers(token: string) {
		const options: IRequestOptions = {
			method: "get",
			url: apiConfig.endpoints.Customers,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		};
		return this.request.send<ICustomersResponse>(options);
	}

	async updateCustomerById(id: string, updatedCustomerData: ICustomer, token: string) {
		const options: IRequestOptions = {
			method: "put",
			url: apiConfig.endpoints.Customers,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: updatedCustomerData,
		};
		return this.request.send<ICustomerResponse>(options);
	}
}

export default new CustomerApiClient();
