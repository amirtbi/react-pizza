import { LinkButton } from "../../ui/LinkButton";
import { Button } from "../../ui/Button";
import { CartItem } from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearCart } from "./cartSlice";
import { EmptyCart } from "./EmptyCart";
function Cart() {
  const username = useSelector((state:RootState)=>state.user.username),
         carts = useSelector((state:RootState)=>state.cart.cart),
        dispatch =useDispatch();

        const clear = ()=>{
          dispatch(clearCart([]))
        }
  return (
    <div className="px-2 py-4">
     

      {carts.length ? <>
      <h2 className="mt-2 font-semibold">Your cart,{username}</h2>
        <LinkButton
        path="/menu"
      >
        &larr; Back to menu
      </LinkButton>
          <ul className="divide-y divide-stone-200 border-b mt-3">
            {carts.map(cart=><CartItem key={cart.pizzaId}
            name={cart.name}
            pizzaId={cart.pizzaId}
            quantity={cart.quantity} totalPrice={cart.totalPrice} unitPrice={cart.unitPrice}/>)}
          </ul>
          <div className="mt-6 space-x-2">
            <Button variant="solid" to="/order/new">Order pizzas</Button>
            <Button variant="outline" onClick={clear}>Clear cart</Button>
          </div> 
         </>
      : <EmptyCart/>}
    </div>
  );
}

export { Cart };
