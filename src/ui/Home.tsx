import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-semibold text-purple-400">
          The best pizza.
          <br />
          Straight out of the oven, straight to you.
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
