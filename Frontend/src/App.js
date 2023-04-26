import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CapTable from "./routes/CapTable";
import CFO from "./routes/CFO";
import Updates from "./routes/Updates";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./Home";
import Navbar from "./components/Navbar";
import './index.css';
import Sidebar from "./components/Sidebar";

const AppLayout = () => (
  <div className="m-0 p-0 box-border font-serif">
    <Sidebar />
    <Outlet />
  </div>
);

const NavLayout = () => (
  <div className="m-0 p-0 box-border font-serif">
    <Navbar />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <NavLayout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
              ]
  },
  {
    element: <AppLayout />,
    children: [
      
        {
          path: "/cfo",
          element: <CFO />,
        },
      {
        path: "/captable",
        element: <CapTable />,
      },
      {
        path: "/updates",
        element: <Updates />,
      },
      
      
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
      
    
  );
}

export default App;
