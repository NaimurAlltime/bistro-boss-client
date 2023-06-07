import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import CheckOutForm from "./CheckOutForm";

// TODO: provide publish key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const [cart] = useCart();
  // work reduce
  const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
  const price = parseFloat(totalPrice.toFixed(2));
  return (
    <div>
      <SectionTitle
        subHeading={"please process"}
        heading="Payment"
      ></SectionTitle>
      <h2 className="text-center font-semibold mt-4">Payment system</h2>
      <Elements stripe={stripePromise}>
        <CheckOutForm cart={cart} price={price}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
