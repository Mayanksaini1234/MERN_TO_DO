import axios from "axios";
import {  Loader } from "lucide-react";
import React, { useState } from "react";
import { server } from "../main";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
const [loader , setLoader] = useState(false)
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const data = await axios.post(
        `${server}/api/user/forgotPassword`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data) {
        setLoader(false)
        setEmail("");
        toast.success(data.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoader(false)
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Forgot Password
        </h2>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter your email"
            />
          </div>
          <button
          disabled={loader}
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300"
          >
            {loader ? <Loader className="animate-spin"/> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
