import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "data/types/api.types";
import { IOrderResponse } from "data/types/orders.types";
import { RequestApi } from "utils/apiClients/request";

class OrdersApiClient {
	constructor(private request = new RequestApi()) {}
	
	async deleteOrderbyId(id: string, token: string) {
		const options: IRequestOptions = {
			method: "delete",
			url: apiConfig.endpoints["Get Order By Id"](id),
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		};
		return this.request.send<IOrderResponse>(options);
	}
}

export default new OrdersApiClient();
