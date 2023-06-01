import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import authImg from "../../assets/others/authentication2.png";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
  };

  const handleCaptchaValidate = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
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
                    ref={captchaRef}
                    required
                    className="input input-bordered"
                  />
                  <button
                    onClick={handleCaptchaValidate}
                    className="btn btn-outline btn-xs mt-2"
                  >
                    Validate
                  </button>
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
              <p className="text-center text-red-400"></p>
              <p className="text-center text-emerald-400"></p>
              <p className="my-4 text-center">
                New to Toy Trackers?{" "}
                <Link className="text-[#D1A054] font-bold" to="/sign-up">
                  SignUp
                </Link>
              </p>
              <div className="divider mt-0">OR</div>
              <div className="text-center mt-0">
                <button
                  //   onClick={handleGoogleSignIn}
                  className="btn btn-info btn-outline"
                >
                  {/* <FcGoogle className="text-4xl mr-4" /> Sign-in With Google */}
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
