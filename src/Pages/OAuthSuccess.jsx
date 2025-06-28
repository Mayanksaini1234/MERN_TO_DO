import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  // It is used to access query Params 
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    console.log(token)
    if (token) {
      localStorage.setItem("token", token); // ✅ Store token
      navigate("/"); // or /dashboard
    } else {
      navigate("/login");
    }
  }, []);

  return <p className="flex justify-center items-center animate-bounce">Logging in with Google...</p>;
};

export default OAuthSuccess;
