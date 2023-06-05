import {
  FaBookMedical,
  FaCalendarAlt,
  FaHome,
  FaListUl,
  FaShoppingCart,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { ImSpoonKnife } from "react-icons/im";
import { MdAddCard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "./../hooks/useAdmin";
import useCart from "./../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  // TODO: isAdmin dynamically get database
  // const isAdmin = true;
  const [isAdmin] = useAdmin();
  return (
    <div className="drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side text-base-content bg-[#D1A054]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 mt-10 text-lg uppercase">
          <li className="text-4xl text-center font-bold">BISTRO BOSS</li>
          <li className="text-2xl text-center font-semibold">Restaurant</li>

          {isAdmin ? (
            <>
              <li className="mt-10">
                <NavLink to="/dashboard/user-home">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-item">
                  <ImSpoonKnife /> add items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-items">
                  <FaListUl /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-bookings">
                  <FaBookMedical /> manage bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users">
                  <FaUsers /> all users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="mt-10">
                <NavLink to="/dashboard/user-home">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendarAlt /> reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaWallet /> payment history
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-cart">
                  {" "}
                  <FaShoppingCart /> My Cart
                  <span className="badge inl badge-secondary -mt-2">
                    +{cart?.length || 0}
                  </span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink to="/menu">
              {" "}
              <FiMenu /> Our Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <MdAddCard />
              Order Food
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
