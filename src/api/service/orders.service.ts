import ordersApiClient from "../clients/orders.client";
import signInApi from "./signIn.api";

export class OrdersApiService {
	constructor(private ordersClient = ordersApiClient, private signInService = signInApi) {}

    async delete(id: string) {
		const response = await this.ordersClient.deleteOrderbyId(id, await signInApi.getToken());
		return response;
	}
}