import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const initialState: { cart: ICart[] } = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            if (item) {
                item.quantity += 1;
                item.totalPrice = item?.quantity * item?.unitPrice;
            }
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            if (item) {
                item.quantity -= 1;
                item.totalPrice = item?.quantity * item?.unitPrice;
            }
        },
        clearCart(state, action) {
            state.cart = [];
        }
    }
});


export const { addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart } = cartSlice.actions;


export const getTotalQuantity = (state: RootState) => {
    return state.cart.cart.reduce((sum, item) => sum = sum + item.quantity, 0);
}
export const getTotalPrice = (state: RootState) => {
    return state.cart.cart.reduce((sum, item) => sum = sum + item.totalPrice, 0);
}

export default cartSlice.reducer;