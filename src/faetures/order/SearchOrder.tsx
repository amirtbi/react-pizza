import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";



type Inputs = {
    Order:string
}
export function SearchOrder(){
    const {register,handleSubmit,formState:{errors}} = useForm<Inputs>()
    const [query,setQuery] = useState("");
    const navigate = useNavigate();
    
    const submitForm:SubmitHandler<Inputs> = (data)=>{
        console.log(data)        
        // if(!query)return;
        // navigate(`order/${query}`);
        // setQuery("")


    }
    return <>
        <form onSubmit={handleSubmit(submitForm)}>
            <input className={`${errors.Order ? "sm:focus:ring-red-800" :"sm:focus:ring-yellow-600" } rounded-full px-4 py-2
             bg-yellow-100 text-sm placeholder:text-stone-400 
             sm:focus:ring-opacity-50 focus:outline-none sm:focus:ring w-28 sm:w-64 sm:focus:w-72 transition-all duration-75`} 
             {...register("Order",{required:true})}  placeholder="Search order #"/>
            <button type="submit" className="mx-2">Order</button>
        </form>
    </>
}