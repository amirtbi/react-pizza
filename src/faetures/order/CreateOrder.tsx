import { ICart } from "../cart/types";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearCart, getCart } from "../cart/cartSlice";
import { EmptyCart } from "../cart/EmptyCart";
import { useRef } from "react";

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


interface CreateOrder {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;

}

function CreateOrder() {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateOrder>();
  const username = useSelector((state: RootState) => state.user.username);
  // const [withPriority, setWithPriority] = useState(false);
  // const isSubmitting = navigation.state === "submitting";
  const isSubmitting = useRef(false);
  const cart = useSelector(getCart);

  const submitForm: SubmitHandler<CreateOrder> = async (data) => {
    const order: IOrder = {
      ...data,
      cart,
      priority: data.priority
    };
    try {
      isSubmitting.current = true;
      const newOrder = await createOrder(order);
      navigate(`/order/${newOrder.id}`);

    }
    catch (e) {

    } finally {
      isSubmitting.current = false;
      reset();
      dispatch(clearCart(""));
    }
  }

  if (!cart.length) return <EmptyCart />

  return (
    <div className="shadow-md m-4 p-2" >
      <h2 className="p-2 font-semibold">Ready to order? Let's go!</h2>

      <form className="p-4" onSubmit={handleSubmit(submitForm)}>
        <div className="form-field">
          <label className="sm:basis-40">userName</label>
          <div className="grow">
            <input className="input w-full" type="text" defaultValue={username} {...register("customer", { required: true })} />
            {errors?.customer && <p className="rounded-md text-red-500 bg-red-100 mt-2 p-2 text-xs ">username is required!</p>}
          </div>
        </div>

        <div className="form-field mb-2">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow mt-2">
            <input className="input w-full" type="tel" {...register("phone", { required: true })} />
            {errors?.phone && <p className="rounded-md text-red-500 bg-red-100 mt-2 p-2 text-xs">Phone number is required </p>}
          </div>
        </div>

        <div className="form-field mb-2">
          <label className="sm:basis-40">Address</label>
          <div className="grow mt-2">
            <input type="text" className="input w-full" {...register("address", { required: true })} />
            {errors.address && <p className="rounded-md text-red-500 bg-red-100 mt-2 p-2 text-xs ">address is required!</p>}
          </div>
        </div>

        <div className="flex items-center gap-4 my-4">
          <input
            className="mr-2 accent-yellow-400 h-6 w-6"
            type="checkbox"
            id="priority"
            {...register("priority", { required: true })}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-8">
          <Button type="submit" variant="solid" disabled={isSubmitting.current}
          >
            {isSubmitting ? "Placing order here..." : "Order now"}
          </Button>
        </div>
        {/* <input type="hidden" value={JSON.stringify(cart)} name="cart" /> */}
      </form>
    </div>
  );
}

// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   const order: IOrder = {
//     ...data,
//     cart: JSON.parse(data.cart),
//     priority: data.priority === "on",
//   };

//   const errors: { [key: string]: string } = {};

//   if (!isValidPhone(order.phone)) {
//     errors.phone = "Please check your phone number, It has wrong format.";
//   }
//   if (Object.keys(errors).length > 0) return errors;

//   const newOrder = await createOrder(order);

//   return redirect(`/order/${newOrder.id}`);
// }
export { CreateOrder };
