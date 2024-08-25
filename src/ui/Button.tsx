import {  ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    children?: ReactNode,
    disabled?: boolean,
    to?: string,
    iconName?: string,
    variant: "outline" | "solid" | "round",
    type?:"submit"
}

export function Button(props: ButtonProps) {
    const { type,iconName, variant="solid", to, children, ...rest } = props;
    let cls = "text-sm duration-30 inline-block rounded-full px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors focus:outline-none focus:ring  focus:ring-offset-2 disabled:cursor-not-allowed";
    let variantCls = "bg-yellow-400 focus:bg-yellow-300 hover:bg-yellow-300 focus:ring-stone-300";
    let outlineCls = "bg-transparent focus:bg-stone-300 focus:ring-stone-300 border border-lg hover:bg-stone-100 border-stone-400 text-stone-400 focus:text-stone-500";
    let roundCls = "px-2.5 py-2.5 rounded-full px-2 py-3 bg-yellow-400 text-sm";
    const btnStyles = clsx(cls, variant === "solid" && variantCls, variant === "outline" && outlineCls,variant==="round" && roundCls);
    const hasIcon = ()=>{
        if(iconName){
            return <Icon icon={iconName}/>
        }else{
            return null
        }
    }

    if(to){
        return <Link {...rest} to={to} className={btnStyles} >{hasIcon()}{children}</Link>
    }else{
       return  type ? <button type={type} {...rest} className={btnStyles}>{hasIcon()}{children}</button>:
         <button {...rest} className={btnStyles}>{hasIcon()}{children}</button>
    }
}

