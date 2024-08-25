import { ICart } from "../cart/types";

export interface IOrder {
    id?: string;
    customer: string;
    phone: string;
    address: string;
    status: string;
    priority: string;
    estimatedDelivery?: string;
    cart: ICart[];
    position: string;
    orderPrice: number;
    priorityPrice: number
}