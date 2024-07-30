import { useState } from "react";
import { ICart } from "../cart/types";
import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { IOrder } from "./types";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str:string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

function CreateOrder() {
  const navigation = useNavigation();
  // const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigation.state ==="submitting";
  const formError = useActionData() as {[key:string] :string};
  const cart:ICart[] = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          <small>{formError?.phone && formError.phone} </small>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <button disabled={isSubmitting}>Order now</button>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
      </Form>
    </div>
  );
}

export async function action({request}){
  debugger
  const formData  = await request.formData();
  const data = Object.fromEntries(formData)
  const order:IOrder = {
    ...data,
    cart:JSON.parse(data.cart),
    priority:data.priority ==="on"
  }

  const errors:{[key:string]:string} = {};
  
  if(!isValidPhone(order.phone)){
   errors.phone = "Please check your phone number, It has wrong format.";
  }
  if(Object.keys(errors).length > 0) return errors;
  
  const newOrder = await createOrder(order);
  
  return redirect(`/order/${newOrder.id}`)
}
export  {CreateOrder};