import { useDispatch } from "react-redux";
import { Button } from "../../ui/Button";
import { formatCurrency } from "../../utils/helper";
import { ICart } from "./types";
import { deleteItem } from "./cartSlice";
function CartItem({ pizzaId, name, quantity, totalPrice }:ICart) {
  const dispatch = useDispatch();

  const onRemoveItem = ()=>{
    dispatch(deleteItem(pizzaId));
  }
    return (
      <li className="py-3 sm:flex sm:items-center sm:justify-between">
        <p>
          {quantity}&times; {name}
        </p>
        <div className="flex justify-between items-center gap-2">
          <p className="font-semibold text-sm">{formatCurrency(totalPrice)}</p>
          <Button onClick={onRemoveItem} iconName="mingcute:delete-2-line" variant="solid"></Button>
        </div>
      </li>
    );
  }
  
  export  {CartItem};