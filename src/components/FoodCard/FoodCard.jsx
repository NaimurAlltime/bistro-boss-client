const FoodCard = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 px-4 py-1 mr-5 mt-3">
        {price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline uppercase bg-slate-200 text-[#BB8506] border-0 border-b-4 border-[#BB8506] mb-14">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
