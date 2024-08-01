import { Link } from "react-router-dom";
import { SearchOrder } from "../faetures/order/SearchOrder";
import { Username } from "../faetures/user/Username";

export function Header() {
  return (
    <>
      <header className="bg-yellow-500 uppercase">
        <Link to="/" className="tracking-widest">
          Fast react Pizza Co.
        </Link>
        <SearchOrder />
        <Username />
      </header>
    </>
  );
}
