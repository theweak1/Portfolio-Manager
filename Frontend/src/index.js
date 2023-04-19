import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import CapTable from "./routes/CapTable";
import CFO from "./routes/CFO";
import Updates from "./routes/Updates";
import App from "./App";
import './index.css';

const AppLayout = () => (
    <>
      <div className="m-0 p-0 box-border font-serif">
        <App />
        <Outlet />
      </div>
    </>
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
        path: "captable",
        element: <CapTable />,
      },
      {
        path: "updates",
        element: <Updates />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
