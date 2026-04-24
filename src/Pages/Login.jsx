import React, { useContext, useState } from "react";
import { Button } from "../components/ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { ToDoContext } from "../context/ToDOContext";
import { FcGoogle } from "react-icons/fc";

const validateLogin = ({ email, password }) => {
  const errors = [];

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Valid email is required");
  }

  if (!password) {
    errors.push("Password is required");
  }

  return errors;
};

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
    const { email, password } = formData;
    const errors = validateLogin({ email, password });

    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
      return;
    }
    setLoader(true);
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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-900/90 backdrop-blur rounded-2xl shadow-xl border border-slate-800 p-8">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold text-slate-50">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Log in to manage your tasks and stay on track.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={inputHandler}
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 border border-slate-700 bg-slate-950/60 rounded-md focus:ring-amber-400 focus:border-amber-400 text-slate-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={inputHandler}
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-slate-700 bg-slate-950/60 rounded-md focus:ring-amber-400 focus:border-amber-400 text-slate-100"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loader}
            className="w-full flex justify-center py-2.5 px-4 text-sm font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all disabled:opacity-50"
          >
            {loader ? <Loader className="animate-spin w-5 h-5" /> : "Login"}
          </Button>
        </form>

        <div className="text-right mt-2">
          <button
            onClick={() => navigate("/forgotPassword")}
            className="text-sm text-slate-400 hover:text-amber-400 underline"
          >
            Forgot Password?
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-slate-500">OR</span>
          </div>
        </div>

        <Link to="/register">
          <Button className="w-full mt-4  text-slate-950 bg-amber-400 hover:bg-amber-300">
            Create New Account
          </Button>

        </Link>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-slate-500 pt-2">
              OR
            </span>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-700 text-slate-100 bg-slate-900 hover:bg-slate-800"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;

