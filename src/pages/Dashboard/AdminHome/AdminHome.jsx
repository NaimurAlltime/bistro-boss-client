import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mt-12">
        Hi Admin! {user.displayName}
      </h2>
    </div>
  );
};

export default AdminHome;
