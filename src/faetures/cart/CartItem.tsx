import { formatCurrency } from "../../utils/helper";
import { ICart } from "./types";
function CartItem({ pizzaId, name, quantity, totalPrice }:ICart) {
    return (
      <li>
        <p>
          {quantity}&times; {name}
        </p>
        <div>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </li>
    );
  }
  
  export  {CartItem};