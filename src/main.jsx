import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "@/components/ui/sonner";
import { ToDoContext } from "./context/ToDOContext";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loader , setLoader] = useState(false)
  const [autoloading ,setAutoloading] = useState(true)
  useEffect(() => {
    setLoader(true)
    axios
      .get(`${server}/api/user/my`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUser(res.data.user)
        setIsAuthenticated(true)
        setLoader(false)
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false)
        setUser({})
        setLoader(false)
      }).finally(
        setAutoloading(false)
      )
  },[isAuthenticated]);

  return (
    <ToDoContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser ,loader , setLoader , autoloading , setAutoloading }}
    >
      <App />
      <Toaster />
    </ToDoContext.Provider>
  );
};

export const server = "https://todoapppractice.onrender.com";
const root = createRoot(document.getElementById("root"));
root.render(<AppWrapper />);
