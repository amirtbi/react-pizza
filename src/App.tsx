import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./ui/Home"
import { Menu } from "./faetures/menu/Menu"
import { Cart } from "./faetures/cart/Cart"
import { Order } from "./faetures/order/Order"
import { CreateOrder } from "./faetures/order/CreateOrder"
import { AppLayout } from "./ui/AppLayout"

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/menu",
        element:<Menu/>
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
function App() {

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
