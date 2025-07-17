import axios from "axios";
import {  Loader } from "lucide-react";
import React, { useState } from "react";
import { server } from "../main";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password , setPassword] = useState("")
const [loader , setLoader] = useState(false)
const navigate = useNavigate();
const {token} = useParams();
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const data = await axios.put(
        `${server}/api/user/reset-password/${token}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data) {
        setLoader(false)
        toast.success(data.data.message);
        navigate("/login")
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
        Reset Password
        </h2>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
           
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter your new Password"
            />
          </div>
          <button
          disabled={loader}
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300"
          >
            {loader ? <Loader className="animate-spin"/> : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
