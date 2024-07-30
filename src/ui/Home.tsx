import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div>
        <h1 className="text-center text-xl font-semibold text-stone-700">
          The best pizza.
          <br />
          <span className="text-yellow-500">
            Straight out of the oven, straight to you.
          </span>
        </h1>
        <div style={{ display: "flex", gap: "4px" }}>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/order">Order</Link>
        </div>
      </div>
    </>
  );
}
export { Home };
