import { generateNewProduct } from '../../data/products/generateProduct';
import { STATUS_CODES } from '../../data/types/api.types';
import { IProduct, IProductFromResponse } from '../../data/types/product.types';
import { validateResponse } from '../../utils/validation/response';
import signInApi from './signIn.api';
import { ProductsApiClient } from '../clients/products.client';
import { expect } from '@playwright/test';

export class ProductsApiService {
	constructor(
		private productsApiClient = new ProductsApiClient(),
		private signInService = signInApi
	) {}

	async create(productData?: Partial<IProduct>) {
		const response = await this.productsApiClient.create(
			generateNewProduct(productData),
			await signInApi.getToken()
		);
		validateResponse(response, STATUS_CODES.CREATED, true, null);
		return response.body.Product;
	}

	async viewAllProducts() {
		const response = await this.productsApiClient.getAllProducts(await signInApi.getToken());
		validateResponse(response, STATUS_CODES.OK, true, null);
		return response.body.Products;
	}

	async viewProductById(id: string) {
		const response = await this.productsApiClient.viewProductbyId(id, await signInApi.getToken());
		validateResponse(response, STATUS_CODES.OK, true, null);
		return response.body.Product;
	}

	async delete(id: string) {
		const response = await this.productsApiClient.deleteProductbyId(id, await signInApi.getToken());
		return response;
	}

	async updatedProductByID(id: string, data: IProduct) {
		const response = await this.productsApiClient.updateProductById(
			id,
			data,
			await signInApi.getToken()
		);
		validateResponse(response, STATUS_CODES.OK, true, null);
		return response;
	}
}

export default new ProductsApiService();
