import { apiConfig } from "../../config/apiConfig";
import { IRequestOptions } from "../../data/types/api.types";
import { IProduct, IProductResponse, IProductsResponse } from "../../data/types/product.types";
import { RequestApi } from "../../utils/apiClients/request";

export class ProductsApiClient {
	constructor(private request = new RequestApi()) {}

	async create(product: IProduct, token: string) {
		const options: IRequestOptions = {
			method: "post",
			url: apiConfig.endpoints.Products,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: product,
		};
		return this.request.send<IProductResponse>(options);
	}

	async deleteProductbyId(id: string, token: string) {
		const options: IRequestOptions = {
			method: "delete",
			url: apiConfig.endpoints.Products + `${id}/`,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		};
		return this.request.send<IProductResponse>(options);
	}

	async viewProductbyId(id: string, token: string) {
		const options: IRequestOptions = {
			method: "get",
			url: apiConfig.endpoints.Products + `${id}/`,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		};
		return this.request.send<IProductResponse>(options);
	}

	async getAllProducts(token: string) {
		const options: IRequestOptions = {
			method: "get",
			url: apiConfig.endpoints.Products,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		};
		return this.request.send<IProductsResponse>(options);
	}

	async updateProductById(id: string, updatedproductData: IProduct, token: string) {
		const options: IRequestOptions = {
			method: "put",
			url: apiConfig.endpoints.Products,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: updatedproductData,
		};
		return this.request.send<IProductResponse>(options);
	}
}

export default new ProductsApiClient();
