import React from "react";
import '../index.css';
import SidebarStartup from "../components/SidebarStartup/SidebarStartup";
import Table from '../components/Table';

function CFOStartup() {
  return (
    <div className="flex">
      <SidebarStartup />
      <div className="flex-1 p-6 ml-16"> {/* add left margin equal to sidebar width */}
        <h1 className="text-3xl font-bold mb-6">CFO STARTUP</h1>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default CFOStartup;
