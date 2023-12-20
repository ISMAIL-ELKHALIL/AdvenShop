import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import "./styles/global.scss";
import Customers from "./pages/customers/Customers";
import Categories from "./pages/categories/Categories";
import Subcategories from "./pages/subcategories/SubCategories";
import Orders from "./pages/orders/Orders";
import UserEditModal from "./components/update/UserEditModal";
import SignInSide from "./pages/login/SignInSide";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  const Layout = () => {
    return (
      <PrivateRoute>
        <div className="main">
          <Navbar />
          <div className="container">
            <div className="menuContainer">
              <Menu />
            </div>
            <div className="contentContainer">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </PrivateRoute>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/v1",
      element: <Layout />,
      children: [
        {
          path: "/v1/home",
          element: <Home />,
        },
        {
          path: "/v1/users",
          element: <Users />,
        },
        {
          path: "/v1/users/:id",
          element: <UserEditModal />,
        },
        {
          path: "/v1/products",
          element: <Products />,
        },
        {
          path: "/v1/customers",
          element: <Customers />,
        },
        {
          path: "/v1/categories",
          element: <Categories />,
        },
        {
          path: "/v1/profile",
          element: <Profile />,
        },
        {
          path: "/v1/subcategories",
          element: <Subcategories />,
        },
        {
          path: "/v1/orders",
          element: <Orders />,
        },
        {
          path: "/v1/customers/:id",
          element: <Customers />,
        },


      ],
    },
    {
      path: "/",
      element: <SignInSide />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
