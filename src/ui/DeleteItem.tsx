import { useDispatch } from "react-redux"
import { Button } from "./Button"
import { deleteItem } from "../faetures/cart/cartSlice";
import { memo } from "react";
const DeleteItem = (props:{pizzaId:number})=>{
    const dispatch = useDispatch();
    return <>
        <div>
        <Button onClick={()=>dispatch(deleteItem(props.pizzaId))} iconName="mingcute:delete-2-line" variant="solid"></Button>
        </div>
        </>
};


export  default memo(DeleteItem);