import { IProduct, IProductResponse } from "../../data/types/product.types";
import { apiConfig } from "../../config/apiConfig";
import { RequestApi } from "../../utils/apiClients/request";

class ProductsApiClient {
  constructor(private request = new RequestApi()) {}

  async create(body: IProduct, token: string) {
    return await this.request.send<IProductResponse>({
      url: apiConfig.endpoints.Products,
      method: "post",
      data: body,
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    });
  }
}

export default new ProductsApiClient();
