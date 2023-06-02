import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authImg from "../../assets/others/authentication2.png";
import { AuthContext } from "../../providers/AuthProvider";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { createUser, googleSignIn, updateUserProfile, logOut } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, photo, email, password);

    // password validation
    if (password.length < 6) {
      setError("Please add at least 6 characters in your password");
      return;
    }

    // create User With Email And Password
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("User has been created successful!");

        Swal.fire(
          "Good job!",
          "User Created Successful!. Please Login and get started",
          "success"
        );
        navigate("/login");
        logOut();
        //   update user profile
        updateUserProfile(loggedUser, name, photo);
        setError("");
        form.reset();
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  //   google sign in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        setSuccess("Google Sign In Successful!");
        navigate("/");
        Swal.fire("Good job!", "Google Sign In Successful!", "success");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-1/2 mr-14">
            <img src={authImg} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
            <div className="card-body">
              <h1 className="text-3xl text-center font-bold">Sign Up</h1>
              <form onSubmit={handleSignUp}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    id="name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="photo url"
                    name="photo"
                    id="photo"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                    required
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    id="password"
                    required
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-5">
                  <input
                    className="btn border-0 bg-[#D1A054]"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
              </form>
              <p className="text-center text-red-400">{error}</p>
              <p className="text-center text-emerald-400">{success}</p>
              <p className="my-3 text-center">
                Already have an account?{" "}
                <Link className="text-[#D1A054] font-bold mb-0" to="/login">
                  Login
                </Link>
              </p>
              <div className="divider mt-0">OR</div>
              <div className="text-center mt-0">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-circle btn-outline mr-3"
                >
                  <FcGoogle className="text-3xl" />
                </button>
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-circle btn-outline"
                >
                  <FaGithub className="text-3xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
