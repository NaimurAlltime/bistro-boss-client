import { Helmet } from "react-helmet-async";
import useCart from "./../../../hooks/useCart";

const MyCart = () => {
  const [cart] = useCart();
  const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <div className="uppercase">
        <h3 className="text-3xl">Total Orders: {cart.length} </h3>
        <h3 className="text-3xl">Total Price: ${totalPrice} </h3>
        <button className="btn btn-warning btn-sm">pay</button>
      </div>
    </div>
  );
};

export default MyCart;
