import React from "react";
import '../index.css';
import SidebarKpi from "../components/SidebarInversionista/SidebarKpi";
import Sidebar from "../components/SidebarInversionista/Sidebar";
import ProfitAndLoss from "../components/ProfitAndLoss";
import KpiDisplay from "../components/KpiDisplay";

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CFO() {
  return (
    <div>
      <div className="flex ">
        <Sidebar />
        <div className="ml-64 text-xl"><ProfitAndLoss/></div>
        <div className="ml-96"><KpiDisplay/></div>

        <SidebarKpi/>
      </div>
    </div>
  );
}

export default CFO;
