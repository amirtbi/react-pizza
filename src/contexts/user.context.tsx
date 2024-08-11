import { createContext, useContext, useState } from "react";

const UserContext = createContext<{ username: string,setUsername: React.Dispatch<React.SetStateAction<string>>} | null>(null);

const UserProvider = (props: { children: JSX.Element }) => {

    const [username,setUsername] = useState("");

    const value = {
        username: username,
        setUsername
    }
    return <>
        <UserContext.Provider value={value}> {props.children} </UserContext.Provider>
    </>
}


const useUserData = ()=>{
    const context = useContext(UserContext);
    if(!context) throw new Error("UserData context is not provider");
    return context;
}

export {UserProvider,useUserData};