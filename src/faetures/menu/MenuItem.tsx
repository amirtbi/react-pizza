import { Icon } from '@iconify/react';
import { formatCurrency } from "../../utils/helper";
import { IMenu } from "./types";
import { Button } from "../../ui/Button";
function MenuItem(props:{pizza:IMenu}) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = props.pizza;
  
    return (
      <li className="flex gap-4 py-2">
        <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-50 grayscale' :''}`} />
        <div className="flex flex-col grow">
          <p className="font-medium text-sm ">{name}</p>
          <p className="capitalize italic text-stone-500">{ingredients.join(', ')}</p>
          <div className="mt-auto flex items-center justify-between">
            {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
           <Button variant="solid" iconName="material-symbols:garden-cart-outline"></Button>
          </div>
        </div>
      </li>
    );
  }
  
  export  {MenuItem};