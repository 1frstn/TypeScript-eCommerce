import { useState } from "react";
import CartLineItem from "./CartLineItem";
import useCart from "../hooks/useCart";

const Cart = () => {
  const [confirm, setConfirm] = useState(false);
  const { dispatch, REDUCER_ACTION, totalItem, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTION.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispacth={dispatch}
              REDUCER_ACTION={REDUCER_ACTION}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItem}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className="cart__submit"
          disabled={!totalItem}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
      </div>
    </>
  );
  const content = <main className="main main--cart">{pageContent}</main>;
  return content;
};

export default Cart;
