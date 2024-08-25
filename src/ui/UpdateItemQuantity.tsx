import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "../faetures/cart/cartSlice";
import { Button } from "./Button";
export const UpdateItemQuantity = (props: { pizzaId: number, quantity: number }) => {
    const { pizzaId, quantity } = props;
    const dispatch = useDispatch();

    return <>
        <Button onClick={() => dispatch(decreaseItemQuantity(pizzaId))} variant="round">-</Button>
        <span className="text-sm font-medium">{quantity}</span>
        <Button onClick={() => dispatch(increaseItemQuantity(pizzaId))} variant="round">+</Button>
    </>
}