import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import RegisterUser from "./pages/app/signUp/RegisterUser";
import LoginUser from "./pages/app/login/LoginUser";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "signup",
          element: <RegisterUser />,
        },
        {
          path: "login",
          element: <LoginUser />,
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
