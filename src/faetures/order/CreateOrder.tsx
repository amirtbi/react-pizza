import { useState } from "react";
import { ICart } from "../cart/types";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { IOrder } from "./types";
import { Button } from "../../ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
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
  const username = useSelector((state:RootState)=>state.user.username);
  // const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData() as { [key: string]: string };
  const cart: ICart[] = fakeCart;

  return (
    <div className="shadow-md m-4 p-2" >
      <h2 className="p-2 font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" className="p-4">
        <div className="form-field">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="form-field mb-2">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow mt-2">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && <p className="rounded-md text-red-500 bg-red-100 mt-2 p-2 text-xs">{formError.phone} </p>}
          </div>
        </div>

        <div className="form-field mb-2">
          <label className="sm:basis-40">Address</label>
          <div className="grow mt-2">
            <input type="text" className="input w-full" name="address" required />
          </div>
        </div>

        <div className="flex items-center gap-4 my-4">
          <input
            className="mr-2 accent-yellow-400 h-6 w-6"
            type="checkbox"
            name="priority"
            id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-8">
          <Button variant="solid" disabled={isSubmitting}
          >
            {isSubmitting ? "Placing order here..." : "Order now"}
          </Button>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order: IOrder = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors: { [key: string]: string } = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please check your phone number, It has wrong format.";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
export { CreateOrder };
