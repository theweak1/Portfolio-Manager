import React from 'react';
import PostList from '../components/PostList';
import SidebarStartup from '../components/SidebarStartup/SidebarStartup';
import '../index.css';

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function CreateUpdates() {
	return (
		<div className="flex relative bg-darkGrey h-screen overflow-y-scroll ">
			<SidebarStartup />
			<PostList />
		</div>
	);
}

export default CreateUpdates;
