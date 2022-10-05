import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useVerifyToken() {
  const navigate = useNavigate();

  useEffect (() => {
    if (!localStorage.getItem("docs-app-user")) {
        return navigate("/login");
      }
  }, []);
}
