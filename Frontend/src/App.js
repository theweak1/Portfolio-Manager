import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CapTable from "./routes/CapTable";
import CFO from "./routes/CFO";
import Updates from "./routes/Updates";
// import Home from "./routes/Home";
import './index.css';
import Sidebar from "./components/Sidebar";

const AppLayout = () => (
  <div className="m-0 p-0 box-border font-serif">
    <Sidebar />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
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
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
