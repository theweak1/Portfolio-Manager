import React from "react";
import '../index.css';
import SidebarStartup from "../components/SidebarStartup/SidebarStartup";
import FinancialsContainer from "../components/FinancialContainer";

function CFOStartup() {
  return (
    <div className="flex flex-col bg-darkGrey min-h-screen">
<h1 className="text-center text-white text-4xl font-bold tracking-wider uppercase shadow-text">Chief Financial Officer Menu</h1>
        <div className=" items-start  mt-10">
            
            <div className="w-1/4 p-4">
                <SidebarStartup className="bg-white rounded-lg shadow-md" />
            </div>

            <div className=" p-4 ml-4">
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

export default CFOStartup;
