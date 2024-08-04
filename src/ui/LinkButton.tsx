import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface LinkProps extends React.HtmlHTMLAttributes<HTMLElement>{
    children:ReactNode,
    path:string,
}
export function LinkButton(props:LinkProps){
    const navigate = useNavigate();
    const {children,path,...rest} = props;

    if(path ==="-1"){
        return <Button onClick={()=>navigate(-1)}>{children}</Button>
    }

    return <>
        <Link to={`${path}`} {...rest} className="text-sm text-blue-500 hover:text-blur-600 hoer:underline">
            {children}
            </Link>
    </>

}