import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Navigate to="/" replace={true} />,
    children: [
      {
        path: "/:id",
        element: <div>hi</div>,
      },
    ],
  },
  {
    path: "/signin",
    element: <Auth type="signin" />,
  },
  {
    path: "/signup",
    element: <Auth type="signup" />,
  },
]);
