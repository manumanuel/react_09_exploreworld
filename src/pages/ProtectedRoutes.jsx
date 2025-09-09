import { useNavigate } from "react-router-dom";
import { useFakeAuth } from "../../contexts/useFakeAuth";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useFakeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoutes;
