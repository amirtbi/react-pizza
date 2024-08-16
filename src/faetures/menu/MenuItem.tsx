import { formatCurrency } from "../../utils/helper";
import { IMenu } from "./types";
import { Button } from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
interface IMenuItem {
  pizza:IMenu,
}
function MenuItem(props:IMenuItem) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = props.pizza;
    const dispatch =useDispatch();

    const onAddToCart = ()=>{
        const item = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice:unitPrice * 1
        }
        dispatch(addItem(item));
    }
  
    return (
      <li className="flex gap-4 py-2 px-2">
        <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-50 grayscale' :''}`} />
        <div className="flex flex-col grow">
          <p className="font-medium text-sm ">{name}</p>
          <p className="capitalize italic text-stone-500">{ingredients.join(', ')}</p>
          <div className="mt-auto flex items-center justify-between">
            {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
           {!soldOut && <Button onClick={onAddToCart} variant="solid" iconName="material-symbols:garden-cart-outline"></Button>}
          </div>
        </div>
      </li>
    );
  }
  
  export  {MenuItem};