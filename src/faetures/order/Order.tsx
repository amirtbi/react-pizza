// Test ID: IIDSAT

import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
  } from "../../utils/helper";
import { IOrder } from "./types";
import { getOrder } from "../../services/apiRestaurant";
import { useActionData, useLoaderData } from "react-router-dom";
  
  function Order() {
    const order =useLoaderData() as IOrder;
    const error = useActionData();
    console.log("action",order)

    const deliveryIn = calcMinutesLeft(order.estimatedDelivery);
  
    return (
      <div>
        <div>
          <h2>Status</h2>
  
          <div>
            {order.priority && <span>Priority</span>}
            <span>{status} order</span>
          </div>
        </div>
  
        <div>
          <p>
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(order.estimatedDelivery)} minutes left 😃`
              : "Order should have arrived"}
          </p>
          <p>(Estimated delivery: {formatDate(order.estimatedDelivery)})</p>
        </div>
  
        <div>
          <p>Price pizza: {formatCurrency(order.orderPrice)}</p>
          {order.priority && <p>Price priority: {formatCurrency(order.priorityPrice)}</p>}
          <p>To pay on delivery: {formatCurrency(order.orderPrice + order.priorityPrice)}</p>
        </div>
      </div>
    );
  }

  async function OrderLoader({params}){
    const {orderId} = params as {orderId:number}; 
    const order = await getOrder(orderId);
    return order; 
  }


  export  {Order,OrderLoader};