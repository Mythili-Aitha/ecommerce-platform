import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../Utils/Api";
import { CircularProgress } from "@mui/material";
const AdminRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserDetails();
        setUser(userData);
      } catch (error) {
        console.error("User not authenticated");
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <CircularProgress size={24} />;

  if (!user || user.role !== "Admin") {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
