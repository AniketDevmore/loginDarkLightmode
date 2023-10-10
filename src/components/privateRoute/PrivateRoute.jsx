import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  let password = localStorage.getItem("password");
  return password && password !== "undefined" ? children : <Navigate to="/" />;
}
