import React from "react";
import { BrowserRouter as Router, Routes, Route ,useLocation } from "react-router-dom";
import CapTable from "./routes/CapTable";
import CFO from "./routes/CFO";
import Updates from "./routes/Updates";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./Home";
import Navbar from "./shared/hooks/components/Navigation/Navbar";
import './index.css';

import ResetPasswordPage from "./auth/forgot-password";
import UpdatePasswordPage from "./auth/ResetPassword";
import CFOStartup from "./routes/CFOStartup";
import CreateUpdates from "./routes/CreateUpdates";
import CaptableStartup from "./routes/CaptableStartup";


function NavbarWithConditionalRendering() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return isHomePage ? <Navbar /> : null;
}

function App() {
  return (
    <Router>
      <div className="m-0 p-0 box-border font-serif">
      <NavbarWithConditionalRendering />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cfo" element={<CFO />} />
          <Route path="/cfo-Startup" element={<CFOStartup />} />
          <Route path="/captable" element={<CapTable />} />
          <Route path="/captable-startup" element={<CaptableStartup/>}/>
          <Route path="/updates" element={<Updates />} />
          <Route path="/create-updates" element={<CreateUpdates />} />
          <Route path="/forgot-password" element={<ResetPasswordPage />} />
          <Route path="/reset-password" element={<UpdatePasswordPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;