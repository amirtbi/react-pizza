import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
import { IMenu } from "./types";
function MenuItem(props:{pizza:IMenu}) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = props.pizza;
  
    return (
      <li>
        <img src={imageUrl} alt={name} />
        <div>
          <p>{name}</p>
          <p>{ingredients.join(', ')}</p>
          <div>
            {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          </div>
          <Link to={`/order/${id}`}>Order</Link>
        </div>
      </li>
    );
  }
  
  export  {MenuItem};