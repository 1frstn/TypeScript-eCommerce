import { ReactElement, ReducerAction, memo } from "react";
import { ProductType } from "../context/ProductsProvider";
import { ReducerActionType } from "../context/CartProvider";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTION,
  inCart,
}: PropsType): ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href; /* require(`../images/${product}.jpg`) */

  const onADdToCart = () =>
    dispatch({ type: REDUCER_ACTION.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? "Item in Cart: ✔️" : null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onADdToCart}>Add to Cart</button>
    </article>
  );
  return content;
};

function areProductsEquel(
  { product: prevProduct, inCart: prevIncart }: PropsType,
  { product: nextProduct, inCart: nextIncart }: PropsType
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevIncart === nextIncart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEquel);

export default MemoizedProduct;
