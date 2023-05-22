import React from "react";
import '../index.css';
import SidebarKpi from "../components/SidebarInversionista/SidebarKpi";
import Sidebar from "../components/SidebarInversionista/Sidebar";
import ProfitAndLoss from "../components/ProfitAndLoss";
import KpiDisplay from "../components/KpiDisplay";
import FinancialsContainer from "../components/FinancialContainer";

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CFO() {
  return (
    <div className="flex flex-col bg-darkGrey min-h-screen">
        <div className="flex items-start  mt-10">
            
            <div className="w-1/4 p-4">
                <Sidebar className="bg-white rounded-lg shadow-md" />
            </div>

            <div className="w-1/4 p-4 ml-4">
                {/* <ProfitAndLoss className="text-3xl text-gray-700 bg-white rounded-lg p-6 shadow-md"/> */}
                <FinancialsContainer/>
            </div>

            {/* <div className="w-1/4 p-4 ml-4">
                <KpiDisplay className="text-3xl text-gray-700 bg-white rounded-lg p-6 shadow-md"/>
            </div> */}

            
            
        </div>
    </div>
);
}

export default CFO;
