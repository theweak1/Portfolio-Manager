import React from "react";
import '../index.css';
import SidebarStartup from "../components/SidebarStartup/SidebarStartup";

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CreateUpdates() {
  return (
    <div className="flex h-screen items-center justify-center text-5xl bg-grey text-white">
      <SidebarStartup />
      <h1>Aqui esta el Create Updates</h1>
    </div>
  );
}

export default CreateUpdates;
