import Main from "./Layout/Main";
import Home from "./pages/home/home/Home";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Checkout from "./pages/checkout/Checkout";
import Bookings from "./pages/bookings/Bookings";
import PrivateRoute from "./PrivateRoute";
import Services from "./pages/home/services/Services";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
          path: '/services',
          element: <Services></Services>
        },
        {
            path: '/signup',
            element: <Signup></Signup>
        },
        {
          path: '/checkout/:id',
          element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
          loader: ({params}) => fetch(`https://car-doctor-server-mu-teal.vercel.app/services/${params.id}`)
        },
      {
        path: '/bookings',
        element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
      }
      ]
    },
  ]);

  export default router;