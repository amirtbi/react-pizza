import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./ui/AppLayout"
import { Home } from "./ui/Home"
import { Menu,loader } from "./faetures/menu/Menu"
import { Cart } from "./faetures/cart/Cart"
import { CreateOrder } from "./faetures/order/CreateOrder"
import { Order } from "./faetures/order/Order"
import Error from "./ui/Error"

export const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: loader,
      },
      {
        path: "/cart",
        element: <Cart />,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        errorElement: <Error />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,
      },
    ],
  },
]);