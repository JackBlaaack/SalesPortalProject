import { ORDER_STATUS } from "data/orders/orderStatus";
import { IResponseFields } from "./api.types";
import { ICustomer } from "./customers.types";
import { IProduct } from "./product.types";

export interface IOrder {
	customer: ICustomer;
	products: IProduct[];
	delivery: string;
	status: ORDER_STATUS;
	total_price: number;
	comments?: string;
}

export interface IOrderFromResponse extends IOrder {
	_id: string;
	createdOn: string;
}

export interface IOrderResponse extends IResponseFields {
	Orders: IOrderFromResponse;
}

export interface IOrdersResponse extends IResponseFields {
	Orders: IOrderFromResponse[];
}

export interface IOrderInTable {
	id: string;
	name: string;
	email: string;
	delivery: string;
	status: string;
	price: number;
}