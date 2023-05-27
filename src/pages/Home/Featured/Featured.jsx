import featuredImg from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import "./Featured.css";

const Featured = () => {
  return (
    <section className="mb-5 mt-12 bg-fixed bg-slate-600 bg-opacity-25 featured-item text-white pt-14">
      <SectionTitle
        subHeading={"Check it out"}
        heading={"Featured item"}
      ></SectionTitle>
      <div className="mt-5 md:flex items-center justify-center pb-24 pt-7 px-36">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className="md:ml-8">
          <p>March 20, 2023 </p>
          <h6>WHERE CAN I GET SOME?</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn btn-outline border-0 border-b-4 border-cyan-50 text-cyan-50 mt-3">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
