const MenuItem = ({ item }) => {
  const { name, image, price, recipe } = item;
  return (
    <div className="flex space-x-2">
      <img
        style={{ borderRadius: "0px 200px 200px 200px" }}
        className="w-[120px] h-[105px]"
        src={image}
        alt=""
      />
      <div>
        <h4 className="text-lg uppercase"> {name}--------------- </h4>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-500">${price}</p>
    </div>
  );
};

export default MenuItem;
