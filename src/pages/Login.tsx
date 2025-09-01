import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import toast from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  email: yup.string().email("*Invalid email").required("*Email is required"),
  password: yup
    .string()
    .min(6, "*Password must be at least 6 characters")
    .required("*Password is required"),
});

const Login = () => {
  const [authLoading, setAuthLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

type Data ={
    email: string;  
    password: string;
};

  const onSubmit = async (data:Data) => {
    console.log(data)
    setAuthLoading(true)
    await axios
      .post("/auth/login", data)
      .then((res) => {
        Cookies.set("token", res.data.accessToken, {
          path: "/",
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        Cookies.set("refresh", res.data.refreshToken);
        if (res.data.user.role === "admin") {
          navigate("/admin/dashboard");
           toast.success("Logined successfully.");
        } else {
          toast.error("You are not authorized to access this page.");
          navigate("/");
        }
       
      })
      .catch((err) => {
        console.log(err.response?.data);
        toast.error("Invalid email or password");
      });
    setAuthLoading(false);
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" w-full flex flex-col items-center gap-4 bg-[rgb(236,253,245)] min-h-dvh pb-10 justify-center max-sm:px-6 font-font ">
      <div className="bg-white w-md h-full shadow-lg shadow-teal-500/10 rounded-lg flex flex-col items-center justify-between max-md:w-[448px] max-sm:w-full ">
        <div className="flex flex-col items-center p-[24px] w-full ">
          <div className="w-[64px] h-[64px] bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center rounded-2xl text-[32px] text-white ">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="text-center mt-[13px]">
            <h1 className="font-bold text-3xl text-text">Admin Login </h1>
            <p className="text-sm text-text-muted mt-2">
           Access your healthcare management dashboard
            </p>
          </div>
        </div>
        <div className="w-full px-6 py-4 pb-10 ">
          <form onSubmit={handleSubmit(onSubmit)} noValidate action="">
            <div className="flex flex-col ">
              <label className="text-text/90  font-medium text-sm ">
                Email Address
              </label>
              <input
                type="email"
                className="mt-[16px] text-sm p-3.5 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
                {...register("email")}
                placeholder="Enter Your Email"
              />
              <p className=" text-red-600 text-sm p-0.5 ">
                {errors.email?.message}
              </p>
            </div>
            <div className="flex flex-col  ">
              <label className="text-text/90 font-medium text-sm py-4 ">
                Password
              </label>
              <div className="relative">
                <input
                  className="  w-full  text-sm p-3.5 pr-11 placeholder-gray-200 border-gray-300 rounded-xl border focus:ring-2 focus:outline-none focus:ring-teal text-text "
                  {...register("password")}
                  placeholder="Enter Your Password"
                  type={showPassword ? "text" : "password"}
                />

                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[50%] right-3.5 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FontAwesomeIcon
                      className="text-text-muted hover:text-text transition duration-300 ease-in-out cursor-pointer "
                      icon={faEyeSlash}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="text-text-muted hover:text-text transition duration-300 ease-in-out  cursor-pointer "
                      icon={faEye}
                    />
                  )}
                </div>
              </div>
              <p className=" text-red-600 text-sm p-0.5 ">
                {errors.password?.message}
              </p>
            </div>
            <div className="flex justify-between py-4 ">
              <div className="flex gap-[3px]  ">
                <input
                  type="checkbox"
                  className=" accent-teal-600   "
                  id="tick"
                />
                <label
                  htmlFor="tick"
                  className="text-sm text-[rgb(100,116,139)]   "
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-teal text-[14px] font-medium hover:text-teal-600 transition duration-300 ease-in-out "
              >
                Forgot Password?
              </Link>
            </div>

            <button className=" flex items-center justify-center text-[18px] h-[48px] w-full text-white bg-gradient-to-br from-teal-400 to-teal-700 font-medium text-lg  py-2 px-4 rounded-xl hover:shadow-lg transition  duration-300 ease-in-out ">
              {authLoading ? (
                <div className="w-7 h-7 border-4 border-white border-t-teal-600 rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
