import { Outlet, Navigate } from "react-router-dom";
import axios from "./axiosInstance";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const ProtectRouter = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;
        const res = await axios.get(`user/profile/${user?.id}`);
        if (res.data) {
          // console.log(user)
          const tokenFromCookie = Cookies.get("token");
          setToken(tokenFromCookie ?? null);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };

    userData();
  });

  if (loading) return null;

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRouter;
