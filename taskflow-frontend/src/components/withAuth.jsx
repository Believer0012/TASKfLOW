    /* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";

export default function withAuth(Component) {
  return function Guarded(props) {
    const token = localStorage.getItem("accessToken");
    return token ? <Component {...props} /> : <Navigate to="/" replace />;
  };
}
