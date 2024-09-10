import { generateNewProduct } from "../../data/products/generateProduct";
import { STATUS_CODES } from "../../data/types/api.types";
import { IProduct } from "../../data/types/product.types";
import { validateResponse } from "../../utils/validation/response";
import productsApiClient from "../clients/products.client";
import signInApi from "./signIn.api";

export class ProductsApiService {
  constructor(private productsClient = productsApiClient, private signInService = signInApi) {}

  async create(productData?: Partial<IProduct>) {
    const response = await this.productsClient.create(generateNewProduct(productData), await this.signInService.getToken());
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Product;
  }
}