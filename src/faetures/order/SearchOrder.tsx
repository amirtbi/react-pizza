import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchOrder(){
    const [query,setQuery] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e:FormEvent)=>{
        e.preventDefault();
        if(!query)return;
        navigate(`order/${query}`);
        setQuery("")


    }
    return <>
        <form onSubmit={handleSubmit}>
            <input className="rounded-full px-4 py-2 bg-yellow-100 text-sm placeholder:text-stone-800 sm:focus:ring-yellow-600
             sm:focus:ring-opacity-50 focus:outline-none sm:focus:ring w-28 sm:w-64 sm:focus:w-72 transition-all duration-75"  placeholder="order" value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <button>Order</button>
        </form>
    </>
}