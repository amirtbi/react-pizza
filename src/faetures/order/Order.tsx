// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helper";
import { IOrder } from "./types";
import { getOrder } from "../../services/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";
import { OrderItem } from "./OrderItem";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData() as IOrder;
  const fetcher =useFetcher();


  useEffect(()=>{
    if(fetcher.state =="idle" && !fetcher.data){
      fetcher.load("/menu")
    }
  },[])

  console.log("fetcher",fetcher.data)

  const deliveryIn = calcMinutesLeft(order.estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{order.id} status</h2>

        <div className="space-x-2">
          {order.priority && <span className="rounded-full tracking-wide font-semibold  text-red-50 uppercase text-xs bg-red-500 px-4 py-2 ">Priority</span>}
          <span className="rounded-full tracking-wide font-semibold  text-green-50 uppercase text-xs bg-green-500 px-4 py-2 ">{order.status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap bg-stone-200 px-6 py-5  items-center justify-between gap-2">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(order.estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(order.estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b">
        {order.cart.map(item => <OrderItem item={item} key={item.pizzaId} isLoadingIngredients={fetcher.state==="loading"}
         ingredients={fetcher.data?.find((el:any)=>el.id===item.pizzaId).ingredients}/>)}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 p-2">
        <p className="font-medium text-sm text-stone-600">Price pizza: {formatCurrency(order.orderPrice)}</p>
        {order.priority && <p className="font-medium text-sm text-stone-600">Price priority: {formatCurrency(order.priorityPrice)}</p>}
        <p className="font-bold text-sm text-stone-600">To pay on delivery: {formatCurrency(order.orderPrice + order.priorityPrice)}</p>
      </div>
    </div>
  );
}

async function OrderLoader(props: { params: { [key: string]: number } }) {
  const { orderId } = props.params as { orderId: number };
  const order = await getOrder(orderId);
  return order;
}


export { Order, OrderLoader };