import MenuItem from "./../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, button }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-12 mt-7 mb-7">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center">
        <button className="btn btn-outline uppercase border-0 border-b-4 mb-14">
          {button}
        </button>
      </div>
    </>
  );
};

export default MenuCategory;
