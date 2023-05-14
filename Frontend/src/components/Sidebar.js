import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { SidebarData } from './SidebarData';
// import * as FaIcons from "react-icons/fa";//menu icon
// import * as AiIcons from "react-icons/ai";//x icon

import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';

export default function Sidebar() {
	const [sidebar, setSidebar] = useState(false);

	//const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			{/*top bar where the menu icon is located*/}
			<div className="fixed flex justify-center items-start top-0 left-0 h-full w-12 sm:w-14 md:w-16 bg-white border-b-yellow shadow-sm mt-20">
				{/*navbar*/}
				<Link
					to="#"
					className=" p-4 text-xl sm:text-2xl md:text-3xl text-darkGrey "
				>
					{/*menu-bars*/}
					<FaBars onClick={() => setSidebar(!sidebar)} />
					{/*menu icon and action*/}
				</Link>
			</div>
			{/*open and close the menu*/}
			{/*nav-menu when hidden/active(true) left-0*/}
			<nav
				className={
					sidebar
						? 'fixed flex justify-center w-44 sm:w-52 md:w-60 h-full top-0 left-0 transition-all duration-[700ms] ease-out  bg-white shadow-sm mt-20'
						: 'fixed flex justify-center w-44 sm:w-52 md:w-60 h-full top-0 -left-full transition-all duration-[700ms] ease-in bg-white shadow-sm mt-20'
				}
			>
				{/*nav-menu shown(false) -left-full*/}
				<ul className="w-full " onClick={() => setSidebar(!sidebar)}>
					{/*nav-menu-items*/}
					{/*where the close(X) icon is located*/}
					<li className="flex justify-end items-end p-3 bg-white border-b-4 border-yellow">
						{/*container for x*/}
						<Link
							to="#"
							className="text-xl sm:text-2xl md:text-3xl text-darkGrey"
						>
							{/*menu-cross (x)*/}
							<AiOutlineClose />
							{/*close icon and action*/}
						</Link>
					</li>
					{/* where the menu options are located*/}
					{SidebarData.map((item, index) => {
						return (
							<li key={index}>
								<Link to={item.path} onClick={() => setSidebar(!sidebar)}>
									{/*nav-text*/}
									<span className="flex justify-start items-center p-5 mx-2 text-md sm:text-xl md:text-2xl rounded-sm text-darkGrey hover:bg-lightGrey hover:opacity-80 hover:bg-opacity-10 shadow-sm">
										{item.title}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
}
