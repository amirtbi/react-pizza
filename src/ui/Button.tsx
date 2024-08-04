import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends React.HTMLAttributes<HTMLElement>{
    children:ReactNode,
    disabled?:boolean,
    to?:string,
    variant:"outline" | "solid"
}

export function Button(props: ButtonProps) {
    const { variant,to,children,...rest } = props;
    let cls = "duration-30 inline-block rounded-full px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors  focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
    
    if(variant ==="solid"){
        cls += " bg-yellow-400 hover:bg-yellow-300"; 
    }else if(variant ==="outline"){
        cls+= " bg-transparent border border-lg border-yellow-400";
    }
    if(to){
        return <Link to={to} className={cls}>{children}</Link>
    }
    return <>
        <button {...rest} className={cls}>{children} </button>
    </>
}

