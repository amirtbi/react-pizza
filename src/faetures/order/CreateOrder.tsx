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
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import { EmptyCart } from "../cart/EmptyCart";
import { useEffect, useRef } from "react";
import { formatCurrency } from "../../utils/helper";
import { fecthAddress } from "../user/userSlice";

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
  const username = useSelector((state: RootState) => state.user.username);
  const { register, handleSubmit, formState: { errors }, reset,setValue ,watch} = useForm<CreateOrder>({defaultValues:{
    customer:username,
    address:"",
    priority:false,
    phone:""

  }});
  const status = useSelector((state:RootState)=>state.user.status);
  const address =useSelector((state:RootState)=>state.user.address);
  // const [withPriority, setWithPriority] = useState(false);
  // const isSubmitting = navigation.state === "submitting";
  const isSubmitting = useRef(false);
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  const submitForm: SubmitHandler<CreateOrder> = async (data) => {
    const order: IOrder = {
      ...data,
      cart,
      priority: data.priority ? "true" :"false"
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


  const handleSetAddress = ()=>{
      dispatch(fecthAddress());
      setValue("address",address)
  }

  useEffect(()=>{
    reset({customer:username})
  },[username,watch])
  
  if (!cart.length) return <EmptyCart />

  return (
    <div className="shadow-md m-4 p-2" >
      <h2 className="p-2 font-semibold">Ready to order? Let's go!</h2>
      <form className="p-4" onSubmit={handleSubmit(submitForm)}>
        <div className="form-field">
          <label className="sm:basis-40">userName</label>
          <div className="grow">
            <input className="input w-full" type="text"  {...register("customer", { required: true })} />
            {errors?.customer && <span className="text-error mt-2 ">username is required!</span>}
          </div>
        </div>

        <div className="form-field mb-2">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow mt-2">
            <input className="input w-full" type="tel" {...register("phone", { required: true })} />
            {errors?.phone && <span className="text-error mt-2">Phone number is required! </span>}
          </div>
        </div>

        <div className="form-field mb-2 relative">
       
          <label className="sm:basis-40">Address</label>
          <div className="grow mt-2">
            <input type="text" className="input w-full" {...register("address", { required: true })} onFocus={handleSetAddress} />
        {/* {errors.address && <div className="rounded-md text-red-500 bg-red-100 mt-2 p-2 text-xs ">address is required!</div>} */}
          </div>

          <span className="absolute right-1 bottom-2">
            <span className="bg-yellow-300 py-2 px-4 text-xs font-medium rounded-full cursor-pointer"  onClick={handleSetAddress}>Get Position</span>
          </span>
        </div>


        <div className="flex items-center gap-4 my-4">
          <input
            className="mr-2 accent-yellow-400 h-6 w-6"
            type="checkbox"
            id="priority"
            {...register("priority")}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-8">
          <Button type="submit" variant="solid" disabled={isSubmitting.current}
          >
            {isSubmitting ? `Placing order here ${formatCurrency(totalPrice)} ` : "Order now"}
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
