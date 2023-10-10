import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./components/landingPage/LandingPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/landingPage",
    element: (
      <PrivateRoute>
        <LandingPage />
      </PrivateRoute>
    ),
  },
]);
