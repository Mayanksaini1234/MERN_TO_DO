import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token); // ✅ Store token
      navigate("/"); // or /dashboard
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging in with Google...</p>;
};

export default OAuthSuccess;
