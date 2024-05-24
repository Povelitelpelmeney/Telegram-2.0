import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Auth from "./Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/:id",
        element: <div>hi</div>,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default router;
