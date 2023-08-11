import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: PropsType) => {
  const { totalItem, totalPrice } = useCart();

  const year: number = new Date().getUTCDate();

  const pageContent = viewCart ? (
    <p>Shopping Cart &copy; {year} </p>
  ) : (
    <>
      <p>Total Items: {totalItem}</p>
      <p>Total Price: {totalPrice}</p>
      <p>Shopping Cart &copy; {year}</p>
    </>
  );

  const content = <footer className="footer">{pageContent}</footer>;
  return content;
};

export default Footer;
