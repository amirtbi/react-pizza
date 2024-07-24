import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./ui/AppLayout"
import { Home } from "./ui/Home"
import { Menu,loader } from "./faetures/menu/Menu"
import { Cart } from "./faetures/cart/Cart"
import { CreateOrder } from "./faetures/order/CreateOrder"
import { Order } from "./faetures/order/Order"

export const routes = createBrowserRouter([
    {
        element:<AppLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
              },
              {
                path:"/menu",
                element:<Menu/>,
                loader:loader
              },{
                path:"/cart",
                element:<Cart/>
              },
              {
                path:"/order/new",
                element:<CreateOrder/>
              },
              {
                path:"/order/:orderId",
                element:<Order/>
              },
        ]
    }
])