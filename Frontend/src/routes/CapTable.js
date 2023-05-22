import React from "react";
import '../index.css';
import Sidebar from "../components/SidebarInversionista/Sidebar";
import TableInvestor from '../components/TableInvestor';

import { useParams } from "react-router-dom";

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CapTable() {
const startupId = useParams().startupId
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-16"> {/* add left margin equal to sidebar width */}
        <h1 className="text-3xl font-bold mb-6">Captable Report</h1>
        <div>
         <TableInvestor startupId={startupId}/>
        </div>

      </div>
    </div>
  );
}

export default CapTable;
