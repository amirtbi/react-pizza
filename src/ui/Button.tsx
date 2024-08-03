import { ReactNode } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLElement>{
    children:ReactNode,
    disabled?:boolean
}

export function Button(props: ButtonProps) {
    const { children,...rest } = props;
    return <>
        <button {...rest} className="duration-30 inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed">{children} </button>
    </>
}