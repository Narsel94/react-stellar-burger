import { Navigate, useLocation } from "react-router-dom";

function RequireState({ children }) {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/login" replace="true" />;
  }

  return children;
}

export default RequireState;
