import React, { useContext, useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../main";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { ToDoContext } from "../context/ToDOContext";
import { FcGoogle } from "react-icons/fc";


const validateRegister = ({ name, email, password, confirmPassword }) => {
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push("Name must be at least 3 characters");
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Valid email is required");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match");
  }

  return errors;
};

const Register = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(ToDoContext);

  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword:""
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

    const { name, email, password , confirmPassword} = formData;
    const errors = validateRegister({ name, email, password, confirmPassword });

  if (errors.length > 0) {
    errors.forEach(err => toast.error(err));
    return; 
  }
  setLoader(true);

    console.log(name, email, password , confirmPassword);
    try {
      const { data } = await axios.post(
        `${server}/api/user/register`,
        {
          name,
          email,
          password,
          confirmPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data) {
        toast.success("User is registered!");
        setLoader(false);
        setIsAuthenticated(true);
        setFormdata({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);        // full response
      console.log(error.response.data);   // actual backend data
    
      const errors = error.response?.data?.errors;
    
      if (errors && Array.isArray(errors)) {
        errors.forEach(err => toast.error(err));
        // when  there are multiple errors in the form of array
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
        // when there  is only one error in the form of string
      }
    }finally{
      setLoader(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${server}/api/user/google`;
    } catch (error) {
      toast.error("Failed to initiate Google login");
    }
  };

  if (isAuthenticated) {
    navigate("/");
  }
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-900/90 backdrop-blur rounded-2xl shadow-xl border border-slate-800 p-8">

        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold text-slate-50">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Start organizing your tasks in seconds.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={inputHandler}
                value={formData.name}
                className="mt-1 block w-full px-3 py-2 border border-slate-700 bg-slate-950/60 rounded-md focus:ring-amber-400 focus:border-amber-400 text-slate-100"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-slate-200">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={inputHandler}
                value={formData.confirmPassword}
                className="mt-1 block w-full px-3 py-2 border border-slate-700 bg-slate-950/60 rounded-md focus:ring-amber-400 focus:border-amber-400 text-slate-100"
              />
            </div>

          </div>

          <Button
            type="submit"
            disabled={loader}
            className="w-full flex justify-center py-2.5 px-4 text-sm font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all disabled:opacity-50"
          >
            {loader ? (
              <Loader className="animate-spin w-5 h-5" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

         <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-slate-500">
              OR
            </span>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-700 text-slate-100 bg-slate-900 hover:bg-slate-800 transition-all"
        >
          <FcGoogle className="w-5 h-5" />
          Continue with Google
        </Button> 

        <div>
          <Link to="/login">
            <Button className="w-full mt-4 text-slate-950 bg-amber-400 hover:bg-amber-300">
              Sign In to Existing Account
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
