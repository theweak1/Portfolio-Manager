import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import '../index.css';
import * as FaIcons from "react-icons/fa";//menu icon
import * as AiIcons from "react-icons/ai";//x icon
import { IconContext } from "react-icons";//Se usa para mantener los icons con el mismo formato

export default function Sidebar() {
    const [sidebar, setSidebar] = useState(false);

    //const showSidebar = () => setSidebar(!sidebar);

    return(
        <> 
            <IconContext.Provider value={{ color: "f0f0f0" }}>{/*keeps icons the same color*/}
                
                {/*top bar where the menu icon is located*/}
                <div className="fixed flex justify-start top-0 left-0 h-full w-20 bg-darkGrey shadow">{/*navbar*/}
                    <Link to="#" className="m-5 text-[2.5rem] bg-none text-white ">{/*menu-bars*/}
                        <FaIcons.FaBars onClick={()=>setSidebar(!sidebar)} />{/*menu icon and action*/}
                    </Link>
                </div>

                {/*open and close the menu*/}         {/*nav-menu when hidden/active(true) left-0*/}
                <nav className={sidebar ? "fixed flex justify-center w-[250px] h-full top-0 left-0 transition-all duration-[850ms] ease-linear bg-darkGrey shadow" 
                                        : "fixed flex justify-center w-[250px] h-full top-0 -left-full transition-all duration-[850ms] ease-linear bg-darkGrey shadow"}>
                    <ul className="w-full" onClick={()=>setSidebar(!sidebar)}> {/*nav-menu-items*/}   {/*nav-menu shown(false) -left-full*/}
                        
                        {/*where the close(X) icon is located*/}
                        <li className="flex justify-start items-center h-20 w-full bg-darkGrey">{/*container for x*/}
                            <Link to="#" className=" ml-48 text-[2.5rem] bg-none text-white">{/*menu-cross (x)*/}
                                <AiIcons.AiOutlineClose />{/*close icon and action*/}
                            </Link>
                        </li>

                        {/* where the menu options are located*/}
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index}>
                                <Link to={item.path} onClick={()=>setSidebar(!sidebar)}>{/*nav-text*/}
                                    <span className="mr-8 flex items-center  w-full h-full no-underline px-8 py-4 text-2xl text-white hover:bg-grey hover:text-yellow">{item.title}</span>
                                </Link>          
                                </li>
                                
                            );
                        })}

                    </ul>    
                </nav>
            </IconContext.Provider>
        </>
    )

};
