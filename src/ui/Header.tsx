import { Link } from "react-router-dom";
import { SearchOrder } from "../faetures/order/SearchOrder";
import { Username } from "../faetures/user/Username";

export function Header() {
  return (
    <>
      <header className="border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase">
        <Link to="/" className="tracking-widest">
          Fast react Pizza Co.
        </Link>
        <SearchOrder />
        <Username />
      </header>
    </>
  );
}
