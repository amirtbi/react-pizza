import { Link } from "react-router-dom";

export function Header(){
    return <>
        <Link to="/">Home</Link>
        <Link to="/order/1">Order 1</Link>
        <p>Pizza react app</p>
    </>
}