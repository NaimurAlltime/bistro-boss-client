import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";

const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const onSubmit = (data) => {
    // console.log(data);
    // upload image into database with image bb server
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imageURL = imgResponse.data.display_url;
          const { name, price, category, recipe } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: imageURL,
          };
          console.log(newItem);
          axiosSecure.post("/menu", newItem).then((data) => {
            console.log("after adding item", data.data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item added successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };
  // console.log(errors);
  // console.log(image_hosting_token);
  return (
    <div className="w-full px-12">
      <SectionTitle
        subHeading="What's new?"
        heading="Add an Item"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text font-semibold text-lg">
              Recipe name*
            </span>
          </label>
          <input
            type="text"
            placeholder="Recipe Name"
            className="input input-bordered w-full "
            {...register("name", { required: true, maxLength: 120 })}
          />
        </div>
        <div className="md:flex my-3">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold text-lg">
                Category*
              </span>
            </label>
            <select
              defaultValue="Pick One"
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Pick One</option>
              <option>Salads</option>
              <option>Soups</option>
              <option>Pizzas</option>
              <option>Desserts</option>
              <option>Drinks</option>
            </select>
          </div>
          <div className="form-control w-full md:ml-4">
            <label className="label">
              <span className="label-text font-semibold text-lg">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-lg">
              Recipe Details
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="details"
            {...register("recipe", { required: true })}
          ></textarea>
        </div>
        <div className="form-control w-full my-2">
          <label className="label">
            <span className="label-text font-semibold text-lg">
              Item Image*
            </span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full "
            {...register("image", { required: true })}
          />
        </div>
        <input
          className="btn btn-sm bg-[#B58130] border-0 mt-3"
          type="submit"
          value="Add Item"
        />
      </form>
    </div>
  );
};

export default AddItem;
