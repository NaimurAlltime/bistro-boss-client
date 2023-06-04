import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaUserShield } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.json();
  });

  const handleDelete = (user) => {
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
        fetch(`http://localhost:5000/users/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "User remove successful.", "success");
            }
          });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    // update admin role
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an admin now`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="md:ml-14">
      <Helmet>
        <title>Bistro Boss | All Users</title>
      </Helmet>
      <div className="uppercase font-semibold h-[65px]">
        <h3 className="text-3xl">Total Users: {users.length} </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[892px]">
          {/* head */}
          <thead className="uppercase bg-[#D1A054]">
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="mt-7">
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-square bg-orange-500 border-0 btn-sm"
                    >
                      <FaUserShield className="text-white p-[6px] text-3xl" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
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

export default AllUsers;
