import { INOTIFICATION } from "../../../data/textNotification";
import { test } from "../../../fixtures/services.fixture";
import { expect } from "@playwright/test";
import { ORDER_STATUS } from "data/orders/orderStatus";

test.describe('[E2E][Create order]', async function () {
    
    test.beforeEach(async function ({ signInPageService }) {
        await signInPageService.openSalesPortal();
        await signInPageService.loginAsAdmin();
    });

    test('Create order with Draft status for one product', async function ({ 
        customersApiService,
        productsApiService,
        homePageService,
        ordersListService,
        createOrderPopUpService,
        salesPortalService,
        }) {
        const createdCustomer = await customersApiService.create();
        const createdProduct = await productsApiService.create();
        await homePageService.openOrdersPage();

        await ordersListService.openCreateOrderPopUp();
        await createOrderPopUpService.selectCustomer(createdCustomer.name);
        await createOrderPopUpService.selectProduct(createdProduct.name);
        await createOrderPopUpService.checkTotalPrice(createdProduct.price);
        await createOrderPopUpService.createOrder();
        await salesPortalService.checkNotificationText(INOTIFICATION.CREATE_ORDER);

        const createdOrder = await ordersListService.getCreatedOrderData(createdCustomer.name);
        
        expect(createdOrder.name).toEqual(createdCustomer.name);
        expect(createdOrder.email).toEqual(createdCustomer.email);
        expect(createdOrder.price).toEqual(createdProduct.price)
        expect(createdOrder.status).toEqual(ORDER_STATUS.DRAFT);
    });
    
});