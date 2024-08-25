import { formatCurrency } from "../../utils/helper";
import { IMenu } from "./types";
import { Button } from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getQuantityById } from "../cart/cartSlice";
import { UpdateItemQuantity } from "../../ui/UpdateItemQuantity";
import DeleteItem  from "../../ui/DeleteItem";

function MenuItem(props: {pizza:IMenu}) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = props.pizza;
  const dispatch = useDispatch();

  const quantity = useSelector(getQuantityById(id));
  const inCart = useSelector(getQuantityById(id)) > 0;
  const onAddToCart = () => {
    const item = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }
    dispatch(addItem(item));
  }


  return (
    <li className="flex gap-4 py-2 px-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-50 grayscale' : ''}`} />
      <div className="flex flex-col grow">
        <p className="font-medium text-sm ">{name}</p>
        <p className="capitalize italic text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {!soldOut && <>
              {inCart ?
                  <>
                  <div className="flex space-x-4 items-center">
                    <UpdateItemQuantity pizzaId={id} quantity={quantity}/>
                  </div>
                  <DeleteItem pizzaId={id}/>
                  </>
                : 
                <div><Button onClick={onAddToCart} variant="solid" iconName="material-symbols:garden-cart-outline"></Button></div>
                }
          </>
          }
        </div>
      </div>
    </li>
  );
}

export { MenuItem };