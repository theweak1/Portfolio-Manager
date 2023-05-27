import React from 'react';
import ReadList from '../components/ReadList';
import Sidebar from '../components/SidebarInversionista/Sidebar';
import '../index.css';

/*Esta es la pagina que se muestra al seleccionar una opcion del menu principal*/
function Updates() {
	return (
		<div className="flex relative h-screen  bg-darkGrey">
			<Sidebar />

			<ReadList />
		</div>
	);
}

export default Updates;
