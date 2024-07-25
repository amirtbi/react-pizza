import { Link } from "react-router-dom";
import { SearchOrder } from "../faetures/order/SearchOrder";

export function Header(){
    return <>
        <Link to="/">Home</Link>
        <SearchOrder/>
        <p>Pizza react app</p>
    </>
}