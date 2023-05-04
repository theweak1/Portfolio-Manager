import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import '../index.css';
import * as FaIcons from "react-icons/fa";//menu icon
import * as AiIcons from "react-icons/ai";//x icon

export default function Sidebar() {
    const [sidebar, setSidebar] = useState(false);

    //const showSidebar = () => setSidebar(!sidebar);

    return(
        <> 
               
            {/*top bar where the menu icon is located*/}
            <div className="fixed flex justify-start top-0 left-0 h-full w-14 md:w-20 bg-darkGrey shadow-md">{/*navbar*/}
                <Link to="#" className="m-4 md:m-5 text-2xl md:text-4xl bg-none text-white ">{/*menu-bars*/}
                    <FaIcons.FaBars onClick={()=>setSidebar(!sidebar)} />{/*menu icon and action*/}
                </Link>
            </div>

            {/*open and close the menu*/}         {/*nav-menu when hidden/active(true) left-0*/}
            <nav className={sidebar ? "fixed flex justify-center w-52 md:w-64 h-full top-0 left-0 transition-all duration-[100ms] ease-linear bg-darkGrey shadow-md" 
                                    : "fixed flex justify-center w-52 md:w-64 h-full top-0 -left-full transition-all duration-[100ms] ease-linear bg-darkGrey shadow-md"}>
                <ul className="w-full" onClick={()=>setSidebar(!sidebar)}> {/*nav-menu-items*/}   {/*nav-menu shown(false) -left-full*/}
                        
                    {/*where the close(X) icon is located*/}
                    <li className="flex justify-start items-center h-12 md:h-16 w-full bg-white">{/*container for x*/}
                        <Link to="#" className="px-44 md:px-52 text-2xl md:text-4xl bg-none text-darkGrey">{/*menu-cross (x)*/}
                            <AiIcons.AiOutlineClose />{/*close icon and action*/}
                        </Link>
                    </li>
                    {/* where the menu options are located*/}
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index}>
                            <Link to={item.path} onClick={()=>setSidebar(!sidebar)}>{/*nav-text*/}
                                <span className="flex items-center w-full h-full no-underline px-4 md:px-6 py-3 md:py-4 text-xl md:text-3xl text-white hover:bg-white hover:text-darkGrey">{item.title}</span>
                            </Link>          
                            </li>
                                
                        );
                    })}

                </ul>    
            </nav>
   
        </>
    )

};
