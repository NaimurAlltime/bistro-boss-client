import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Menu from "../pages/Menu/Menu/Menu";
import Home from "./../pages/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    //   errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
    ],
  },
]);

export default router;
