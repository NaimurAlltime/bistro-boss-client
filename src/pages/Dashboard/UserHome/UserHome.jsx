import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mt-12">
        Welcome back! {user.displayName}
      </h2>
    </div>
  );
};

export default UserHome;
