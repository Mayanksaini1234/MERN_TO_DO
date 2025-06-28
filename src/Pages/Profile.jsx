import React, { useContext, useEffect } from "react";
import { ToDoContext } from "../context/ToDOContext";
import { Loader2, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const { user, setUSer, loader, setLoader , isAuthenticated , autoloading } = useContext(ToDoContext);
const navigate = useNavigate();

if(!isAuthenticated) return navigate("/login")
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      {loader ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin w-10 h-10 text-yellow-500" />
        </div>
      ) : (
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
            <div className="flex items-center justify-center">
              <div className="bg-white p-4 rounded-full shadow-lg">
                <User className="w-12 h-12 text-yellow-500" />
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
