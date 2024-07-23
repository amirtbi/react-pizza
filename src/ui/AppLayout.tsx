import { Outlet } from "react-router-dom";
import { CartOverview } from "../faetures/cart/CartOverview";
import { Header } from "./Header"
export function AppLayout(){
    return (
      <>
        <div>
          <Header />
          <main>
            <Outlet/>
          </main>
          <CartOverview/>
        </div>
      </>
    );
}