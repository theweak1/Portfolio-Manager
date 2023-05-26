import React from "react";
import '../index.css';
import SidebarStartup from "../components/SidebarStartup/SidebarStartup";
import Table from '../components/Table';
import ConvertNote from "../components/ConvertNote";
/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CaptableStartup() {
  return (
    
    <div className="flex">
    <SidebarStartup />
    <div className="flex-1 p-6 ml-16"> {/* add left margin equal to sidebar width */}
      <h1 className="text-3xl font-bold mb-6">Captable Report</h1>
      <div>
        <Table />
      </div>
      <div className="flex h-screen items-center justify-center  bg-lightGrey text-white">
      <ConvertNote />
      </div>
    </div>
  </div>
  );
}

export default CaptableStartup;