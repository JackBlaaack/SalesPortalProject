import { expect } from "@playwright/test";
import { generateNewProduct } from "../../data/products/generateProduct";
import { STATUS_CODES } from "../../data/types/api.types";
import { IProduct, IProductResponse, MANUFACTURERS } from "../../data/types/product.types";
import { test } from "../../fixtures/services.fixture";
import _ from "lodash";
import { getRandomItemIndex } from "../../utils/enums/getRandomValue";

test.describe("[API] [Products] Smoke with fixtures", async function () {
	test("Create product with valid data with fixture", async function ({ productsApiService }) {
		const productData = generateNewProduct();
		const response = await productsApiService.create(productData);
	});

	test("Create product with valid data with fixture and delete it", async function ({
		productsApiService,
	}) {
		const productData = generateNewProduct();
		const response = await productsApiService.create(productData);
		const id = response._id;
		const responseDeleted = await productsApiService.delete(id);
		expect(responseDeleted.status).toBe(STATUS_CODES.DELETED);
	});

	test("View list of products with fixture", async function ({ productsApiService }) {
		const productsList = await productsApiService.viewAllProducts();
	});

	test("View list of products and delete latest product with fixture", async function ({
		productsApiService,
	}) {
		const productsList = await productsApiService.viewAllProducts();
		const id = productsList[0]._id;
		await productsApiService.delete(id);
	});

	test("View list of products and delete random product by id with fixture", async function ({
		productsApiService,
	}) {
		const productsList = await productsApiService.viewAllProducts();
		const listLength = productsList.length;
		const randomProductIndex = getRandomItemIndex(listLength);
		const id = productsList[randomProductIndex]._id;
		await productsApiService.delete(id);
	});

	test("View list of products and update latest product name with fixture", async function ({
		productsApiService,
	}) {
		const productsList = await productsApiService.viewAllProducts();
		const id = productsList[0]._id;
		const updateProductData = {
			_id: id,
			...generateNewProduct(),
		};
		await productsApiService.updatedProductByID(id, updateProductData);
	});
});
