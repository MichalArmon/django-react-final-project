import { Navigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";

function ManagerRoute({ children }) {
  const { user } = useUser();

  const canManageArticles = user?.role === "manager" || user?.role === "admin";

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!canManageArticles) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ManagerRoute;
