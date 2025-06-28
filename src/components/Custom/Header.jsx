import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToDoContext } from "../../context/ToDOContext";
import axios from "axios";
import { server } from "../../main";
import { toast } from "sonner";

const Header = () => {
  const [loader, setLoader] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(ToDoContext);
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(`${server}/api/user/logout`,{}, {
        withCredentials: true,
      });
      if (data) {
        toast.success("You are successfully logged out!");
        setIsAuthenticated(false);
        navigate("/login");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoader(false);
    }
  };  
  return (
    <header className="bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold text-black tracking-wide">
              ToDoApp
            </h1>
          </Link>

          <nav className="flex space-x-8">
            <Link
              to={"/"}
              className="text-black hover:bg-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-gray-800"
            >
              Home
            </Link>
            <Link
              to={"/myProfile"}
              className="text-black hover:bg-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-gray-800"
            >
              Profile
            </Link>
            {!isAuthenticated ? (
              <Link
                to={"/login"}
                className="text-black hover:bg-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-gray-800"
                disabled={loader}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logoutUser}
                to={"/logout"}
                className="text-black hover:bg-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-gray-800"
                disabled={loader}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
