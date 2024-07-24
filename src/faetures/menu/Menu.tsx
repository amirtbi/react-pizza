import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant"
import { MenuItem } from "./MenuItem";
import { IMenu } from "./types";

function Menu(){
    const menu = useLoaderData() as IMenu[];
    console.log(menu)
        return <>
            <div>
                <ul>
                  {menu.map((pizza)=><MenuItem key={pizza.id} pizza={pizza}/>)}
                </ul>
               
            </div>
        </>
}


 async function loader(){
    const menu = await getMenu();
    return menu
}

export {Menu,loader}