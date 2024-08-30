import { formatCurrency } from "../../utils/helper";
import { ICart } from "../cart/types";

interface OrderItem{
  item:ICart;
  ingredients:string[],
isLoadingIngredients:boolean
}

function OrderItem({item,ingredients,isLoadingIngredients}:OrderItem) {
  return (
    <li className="p-4">
      <div className="flex justify-between">
        <p className="font-medium text-md">
          <span>{item.quantity}&times;</span> {item.name}
        </p>
        <p className="font-bold text-sm">{formatCurrency(item.totalPrice)}</p>
      </div>
      <p className="text-sm capitalize text-stone-500 italic">{isLoadingIngredients ? "loading..." :  ingredients?.join(",")}</p>
    </li>
  );
}

export { OrderItem };
