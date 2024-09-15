import { ICustomerFromResponse } from "data/types/customers.types";
import { INOTIFICATION } from "../../../data/textNotification";
import { test } from "../../../fixtures/services.fixture";
import { expect } from "@playwright/test";
import { ORDER_STATUS } from "data/orders/orderStatus";
import { IProductFromResponse } from "data/types/product.types";
import { STATUS_CODES } from "data/types/api.types";
import { IOrderInTable } from "data/types/orders.types";

test.describe('[E2E][Create order]', async function () {

    let createdCustomer: ICustomerFromResponse;
    let createdProduct: IProductFromResponse;
    let createdOrder: IOrderInTable;
    
    test.beforeEach(async function ({ signInPageService }) {
        await signInPageService.openSalesPortal();
        await signInPageService.loginAsAdmin();
    });

    test.afterEach(async function({
        customersApiService,
        productsApiService,
        ordersApiService,
    }) {
        const idOrder = createdOrder.id;
		const responseOrderDeleted = await ordersApiService.delete(idOrder);
		expect(responseOrderDeleted.status).toBe(STATUS_CODES.DELETED);

    	const idCustomer = createdCustomer._id;
		const responseCustomerDeleted = await customersApiService.delete(idCustomer);
		expect(responseCustomerDeleted.status).toBe(STATUS_CODES.DELETED);

        const idProduct = createdProduct._id;
		const responseProductDeleted = await productsApiService.delete(idProduct);
		expect(responseProductDeleted.status).toBe(STATUS_CODES.DELETED);
    });

    test('Create order with Draft status for one product', async function ({ 
        customersApiService,
        productsApiService,
        homePageService,
        ordersListService,
        createOrderPopUpService,
        salesPortalService,
        }) {
        createdCustomer = await customersApiService.create();
        createdProduct = await productsApiService.create();
        await homePageService.openOrdersPage();

        await ordersListService.openCreateOrderPopUp();
        await createOrderPopUpService.selectCustomer(createdCustomer.name);
        await createOrderPopUpService.selectProduct(createdProduct.name);
        await createOrderPopUpService.checkTotalPrice(createdProduct.price);
        await createOrderPopUpService.createOrder();
        await salesPortalService.checkNotificationText(INOTIFICATION.CREATE_ORDER);

        createdOrder = await ordersListService.getCreatedOrderData(createdCustomer.name);
        expect(createdOrder.name).toEqual(createdCustomer.name);
        expect(createdOrder.email).toEqual(createdCustomer.email);
        expect(createdOrder.price).toEqual(createdProduct.price)
        expect(createdOrder.status).toEqual(ORDER_STATUS.DRAFT);
    });
    
});