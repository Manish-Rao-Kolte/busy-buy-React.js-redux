import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import RegisterUser from "./pages/app/signUp/RegisterUser";
import LoginUser from "./pages/app/login/LoginUser";
import Product from "./pages/app/products/Product";
import Cart from "./pages/app/cart/Cart";
import Order from "./pages/app/orders/Order";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Product />,
        },
        {
          path: "signup",
          element: <RegisterUser />,
        },
        {
          path: "login",
          element: <LoginUser />,
        },
        {
          path: "user/:userId",
          children: [
            {
              index: true,
              element: <Product />,
            },
            {
              path: "orders",
              element: <Order />,
            },
            {
              path: "cart",
              element: <Cart />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
