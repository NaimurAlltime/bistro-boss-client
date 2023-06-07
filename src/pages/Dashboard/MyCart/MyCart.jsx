import { Helmet } from "react-helmet-async";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "./../../../hooks/useCart";

const MyCart = () => {
  const [cart, refetch] = useCart();
  // work reduce
  const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete api to database
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Bistro Boss | My Cart</title>
      </Helmet>
      <div className="uppercase font-semibold flex h-[65px] justify-evenly items-center">
        <h3 className="text-3xl">Total Orders: {cart.length} </h3>
        <h3 className="text-3xl">Total Price: ${totalPrice.toFixed(2)} </h3>
        <Link to="/dashboard/payment">
          <button className="btn btn-warning btn-sm">pay</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full md:w-[892px] md:ml-14">
          {/* head */}
          <thead className="uppercase bg-[#D1A054]">
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="mt-7">
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="food" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-square bg-red-700 border-0 btn-sm"
                  >
                    <RiDeleteBinLine className="text-white p-[6px] text-3xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
