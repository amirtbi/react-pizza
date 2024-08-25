import { LinkButton } from "../../ui/LinkButton";
function EmptyCart() {
  return (
    <div>
            <LinkButton
        path="/menu"
      >
        &larr; Back to menu
      </LinkButton>
      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export  {EmptyCart};