import { formatCurrency } from "../../utils/helper";
import { ICart } from "./types";
import { UpdateItemQuantity } from "../../ui/UpdateItemQuantity";
import  DeleteItem  from "../../ui/DeleteItem";
function CartItem({ pizzaId, name, quantity, totalPrice }:ICart) {

    return (
      <li className="py-3 sm:flex sm:items-center sm:justify-between">
        <p>
          {quantity}&times; {name}
        </p>
        <div className="flex justify-between items-center gap-2">
          <p className="font-semibold text-sm">{formatCurrency(totalPrice)}</p>
          <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity}/>
          <DeleteItem pizzaId={pizzaId}/>
        </div>
      </li>
    );
  }
  
  export  {CartItem};