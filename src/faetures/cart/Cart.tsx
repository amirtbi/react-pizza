import { Link } from "react-router-dom";
import { LinkButton } from "../../ui/LinkButton";
import { Button } from "../../ui/Button";
import { CartItem } from "./CartItem";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="px-2 py-4">
      <LinkButton
        path="/menu"
      >
        &larr; Back to menu
      </LinkButton>

      <h2 className="mt-2 font-semibold">Your cart, %NAME%</h2>
      <ul className="divide-y divide-stone-200 border-b mt-3">
        {fakeCart.map(cart=><CartItem key={cart.pizzaId}
         name={cart.name}
         pizzaId={cart.pizzaId}
          quantity={cart.quantity} totalPrice={cart.totalPrice} unitPrice={cart.unitPrice}/>)}
      </ul>
      <div className="mt-6 space-x-2">
        <Button variant="solid" to="/order/new">Order pizzas</Button>
        <Button variant="outline">Clear cart</Button>
      </div>
    </div>
  );
}

export { Cart };
