import React, { useContext, useState } from "react";
import { Button } from "../components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { ToDoContext } from "../context/ToDOContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(ToDoContext);
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    const { email, password } = formData;
    try {
      const { data } = await axios.post(
        `${server}/api/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data) {
        toast.success("You are logged In!");
        setLoader(false);
        setFormdata({
          email: "",
          password: "",
        });
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      toast.error(error?.response?.data?.message || "Login Error");
      setIsAuthenticated(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${server}/api/user/google`;
    } catch (error) {
      toast.error("Failed to initiate Google login");
    }
  };
  // add
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Login your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                onChange={inputHandler}
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={inputHandler}
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loader}
            >
              {loader ? <Loader className="animate-spin w-5 h-5" /> : "Login"}
            </Button>
          </div>
        </form>
        <div className="text-right mt-2" >
          <button
          onClick={()=>navigate("/forgotPassword")}
            className="text-sm text-gray-500 hover:text-yellow-500 transition-colors underline focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>
        <div>
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <div>
          <Link to={"/register"}>
            <Button className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300">
              Create New Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
