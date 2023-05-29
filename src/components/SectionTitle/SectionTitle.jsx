const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-3/12 mx-auto text-center mt-12">
      <p className="text-lg font-medium text-yellow-500">---{subHeading}---</p>
      <h3 className="text-3xl uppercase font-semibold border-y-4 py-2 mt-2">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
