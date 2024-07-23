import { ICart } from "../cart/types";

export interface IOrder {
    id: string;
    customer: string;
    phone: string;
    address: string;
    priority: boolean;
    estimatedDelivery: string;
    cart: ICart[];
    position: string;
    orderPrice: number;
    priorityPrice: number
}