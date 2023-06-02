import { useContext, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";
import authImg from "../../assets/others/authentication2.png";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signInUser, googleSignIn } = useContext(AuthContext);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleCaptchaValidate = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    // sign in user
    signInUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        form.reset();
        setSuccess("User Login Successful!");
        Swal.fire("Good job!", "User Login Successful!", "success");
        navigate(from, { replace: true });
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
        Swal.fire("Good job!", "Google Sign In Successful!", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-1/2 mr-14">
            <img src={authImg} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
            <div className="card-body">
              <h1 className="text-2xl text-center font-bold">Login</h1>
              <form onSubmit={handleLogin}>
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
                <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    type="text"
                    placeholder="type the captcha above"
                    name="captcha"
                    id="captcha"
                    onBlur={handleCaptchaValidate}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn border-0 bg-[#D1A054]"
                    type="submit"
                    value="Login"
                    disabled={disabled}
                  />
                </div>
              </form>
              <p className="text-center text-red-400">{error}</p>
              <p className="text-center text-emerald-400">{success}</p>
              <p className="my-4 text-center">
                New to Toy Trackers?{" "}
                <Link className="text-[#D1A054] font-bold" to="/sign-up">
                  SignUp
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
    </div>
  );
};

export default Login;
