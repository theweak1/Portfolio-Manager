import React from "react";
import '../index.css';
import SidebarKpi from "../components/SidebarInversionista/SidebarKpi";
import Sidebar from "../components/SidebarInversionista/Sidebar";

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CapTable() {
  return (
    <div className="flex h-screen items-center justify-center text-5xl bg-grey text-white">
      <Sidebar />
      <SidebarKpi/>
      <h1>Aqui esta el Cap Table</h1>
    </div>
  );
}

export default CapTable;
