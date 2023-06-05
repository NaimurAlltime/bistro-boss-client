import { Helmet } from "react-helmet-async";
import { RiDeleteBinLine, RiEditBoxLine } from "react-icons/ri";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import useMenu from "./../../../hooks/useMenu";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();
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
        axiosSecure.delete(`/menu/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
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
        <title>Bistro Boss | Manage Items</title>
      </Helmet>
      <SectionTitle
        heading="MANAGE ITEMS"
        subHeading="Hurry Up!"
      ></SectionTitle>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full md:w-[892px] md:ml-14">
          {/* head */}
          <thead className="uppercase bg-[#D1A054]">
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="mt-7">
            {menu.map((item, index) => (
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
                      {/* <div className="font-bold">
                        <td>{item.name}</td>
                      </div> */}
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-square bg-[#D1A054] border-0 btn-sm"
                  >
                    <RiEditBoxLine className="text-white p-[6px] text-3xl" />
                  </button>
                </td>
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

export default ManageItems;
