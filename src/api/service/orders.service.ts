import { logStep } from "utils/report/logStep";
import ordersApiClient from "../clients/orders.client";
import signInApi from "./signIn.api";

export class OrdersApiService {
	constructor(private ordersClient = ordersApiClient, private signInService = signInApi) {}
    @logStep()
    async delete(id: string) {
		const response = await this.ordersClient.deleteOrderbyId(id, await signInApi.getToken());
		return response;
	}
}