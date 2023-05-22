import React from "react";
import '../index.css';
import Sidebar from "../components/SidebarInversionista/Sidebar";
import ReadList from "../components/ReadList";



//Reads 

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function Updates() {
  return (

    
      <div className="flex relative h-screen  bg-darkGrey">
      <Sidebar />

       <ReadList/>
        </div>

      
  
  );
}

export default Updates;
