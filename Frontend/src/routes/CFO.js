import React from "react";
import '../index.css';
import SidebarKpi from "../components/SidebarKpi";

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CFO() {
  return (
    
    <div className="flex h-screen items-center justify-center text-5xl bg-grey text-white">
      <SidebarKpi/>
      <h1>Aqui esta el CFO</h1>
    </div>
  );
}

export default CFO;
