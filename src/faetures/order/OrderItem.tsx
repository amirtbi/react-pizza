import { formatCurrency } from "../../utils/helper";
import { ICart } from "../cart/types";

interface OrderItem{
  item:ICart;
}

function OrderItem({item}:OrderItem) {

  return (
    <li className="p-4">
      <div className="flex justify-between">
        <p className="font-medium text-md">
          <span>{item.quantity}&times;</span> {item.name}
        </p>
        <p className="font-bold text-sm">{formatCurrency(item.totalPrice)}</p>
      </div>
    </li>
  );
}

export { OrderItem };
