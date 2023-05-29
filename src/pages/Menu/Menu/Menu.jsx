import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";

import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import MenuCategory from "../MenuCategory/MenuCategory";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";
import useMenu from "./../../../hooks/useMenu";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      {/* offered start  */}
      <Cover img={menuImg} title={"our menu"}></Cover>
      <SectionTitle
        subHeading="Don't miss"
        heading="TODAY'S OFFER"
      ></SectionTitle>
      <MenuCategory
        items={offered}
        button="ORDER YOUR FAVOURITE FOOD"
      ></MenuCategory>
      {/* offered end  */}

      {/* dessert start  */}
      <Cover img={dessertImg} title={"Desserts"}></Cover>
      <MenuCategory
        items={dessert}
        button="ORDER YOUR FAVOURITE FOOD"
      ></MenuCategory>
      {/* dessert end  */}

      {/* pizza start  */}
      <Cover img={pizzaImg} title={"pizza"}></Cover>
      <MenuCategory
        items={pizza}
        button="ORDER YOUR FAVOURITE FOOD"
      ></MenuCategory>
      {/* pizza end  */}

      {/* salad start  */}
      <Cover img={saladImg} title={"salad"}></Cover>
      <MenuCategory
        items={salad}
        button="ORDER YOUR FAVOURITE FOOD"
      ></MenuCategory>
      {/* salad end  */}
    </div>
  );
};

export default Menu;
