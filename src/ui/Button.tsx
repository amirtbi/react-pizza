import { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface ButtonProps extends React.HTMLAttributes<HTMLElement>{
    children:ReactNode,
    disabled?:boolean,
    to?:string,
    variant:"outline" | "solid"
}

export function Button(props: ButtonProps) {
    const { variant,to,children,...rest } = props;
    let cls = "duration-30 inline-block rounded-full px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors  focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
    let variantCls = "bg-yellow-400 hover:bg-yellow-300";
    let outlineCls = "bg-transparent border border-lg hover:bg-yellow-100 border-yellow-400";

    const btnClassnames = clsx(cls,variant==="solid" && variantCls,variant==="outline" && outlineCls);
    if(to){
        return <Link to={to} className={btnClassnames}>{children}</Link>
    }
    return <>
        <button {...rest} className={btnClassnames}>{children} </button>
    </>
}

