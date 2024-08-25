import { Link } from "react-router-dom";
import { getTotalPrice,getTotalQuantity } from "./cartSlice";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helper";
function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);
  if(!totalQuantity){return null}
  
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export { CartOverview };
