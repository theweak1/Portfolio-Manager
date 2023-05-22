import React from "react";
import '../index.css';
import SidebarStartup from "../components/SidebarStartup/SidebarStartup";
import PostList from "../components/PostList";

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CreateUpdates() {
  return (
    <div className="flex relative bg-darkGrey h-screen overflow-y-scroll ">
      <SidebarStartup />
      <PostList/>
    </div>
  );
}

export default CreateUpdates;
