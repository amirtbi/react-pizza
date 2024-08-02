import { Link } from "react-router-dom";
import { SearchOrder } from "../faetures/order/SearchOrder";
import { Username } from "../faetures/user/Username";

export function Header() {
  return (
    <>
      <header className="item-center flex justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
        <Link to="/" className="tracking-widest">
          Fast react Pizza Co.
        </Link>
        <SearchOrder />
        <Username />
      </header>
    </>
  );
}
