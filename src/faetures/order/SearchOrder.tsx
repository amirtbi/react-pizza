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
            <input placeholder="order" value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <button>Order</button>
        </form>
    </>
}